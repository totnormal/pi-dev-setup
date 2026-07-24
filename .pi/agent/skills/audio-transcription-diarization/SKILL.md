---
name: "audio-transcription-diarization"
description: "Transcribe audio/video files with speaker diarization using whisper-cli (GPU) + pyannote, then proofread with a cheap LLM (OpenRouter). Default pipeline: small.en → pyannote → Deepseek V4 Flash. Produces clean, punctuated, speaker-labeled, domain-corrected transcripts."
version: 4
created: "2026-06-26"
updated: "2026-06-27"
disable-model-invocation: true
---
## When to Use
Use when the user provides any audio/video file (.mp3, .m4a, .mp4, .wav, .m4a, etc.) and wants a transcription. Also when they mention "transcribe", "diarize", "who is speaking", "speaker labels", "proofread", or want to merge/append/prepend a new clip to an existing transcript. THIS IS THE DEFAULT WORKFLOW for all transcription requests.

## Procedure

**0. Pick model by language.** `ggml-small.en.bin` is ENGLISH-ONLY → garbage on any other language. For non-English (Romanian, etc.) use the multilingual `ggml-large-v3.bin` (2.9 GB, `huggingface.co/ggerganov/whisper.cpp`) and set `-l <lang>` (e.g. `-l ro`).

**0b. ALWAYS enable VAD (kills the loop bug).** Add `--vad --vad-model ~/.cache/whisper/ggml-silero-v5.1.2.bin -mc 0` to EVERY whisper-cli run. Download the Silero VAD model from `huggingface.co/ggml-org/silero-v5.1.2` (NOT from ggerganov/whisper.cpp — its `ggml-silero-vad.bin` URL 404s). VAD + `-mc 0` (no text-context carry) **completely eliminates the catastrophic decode loop** on every file tested, including large-v3 fp16. Do not run whisper-cli without VAD — without it, large-v3 looped on a 38-min Romanian interview (mid-file), and even small.en/medium can loop over silence.

1. **Extract audio** — `ffmpeg -y -i <input> -ar 16000 -ac 1 -c:a pcm_s16le /tmp/transcribe/<name>.wav` (always use `/tmp`; Google Drive paths cause whisper-cli to fail silently).

2. **Transcribe** (multilingual example) — `whisper-cli -m ~/.cache/whisper/ggml-large-v3.bin -f <wav> -l ro -t 8 -mc 0 -nf --vad --vad-model ~/.cache/whisper/ggml-silero-v5.1.2.bin -oj -osrt -of /tmp/transcribe/<name>`. Always `-nf`. Output JSON (`-oj`) gives `offsets.from/to` in ms for precise diarization alignment. For English-only, swap in `ggml-small.en.bin -l en` (still with VAD).

3. **Diarize** with pyannote (**4.x API changed** — see Pitfalls):
   - `Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", token=HF_TOKEN)` — use `token=`, NOT `use_auth_token=` (removed in pyannote 4.x / huggingface-hub 1.x).
   - Preload audio with `torchaudio.load()` and pass as `{"waveform": waveform, "sample_rate": sr}` to avoid torchcodec issues. `pipe.to(torch.device("mps"))` on Apple Silicon (or cuda) speeds it up.
   - The return is a `DiarizeOutput`; the `Annotation` is at **`out.speaker_diarization`** — call `.itertracks(yield_label=True)` on THAT, not on the output object.
   - Call with `min_speakers=2, max_speakers=2`.
   - **Multi-file / multi-clip interview: concatenate all WAVs and diarize ONCE** (`ffmpeg -f concat -safe 0 -i list.txt -c copy concat.wav`). Per-file diarization assigns SPEAKER_00/01 independently per file, so labels do NOT carry over across files — a single concat run gives globally-consistent labels. Offset each file's whisper timestamps by the cumulative duration of prior files to map onto the concat timeline.
   - Map first voice per user spec (e.g. "first voice is Ritson" → SPEAKER_00 = Ritson).

4. **Assign speakers** — For each whisper SRT segment, sample pyannote labels across its duration to find the dominant speaker. Split segments at speaker-change boundaries.

5. **Clean up** — Remove inter-segment overlap (suffix/prefix matching where the end of one segment repeats at the start of the next). Remove phrase-level repetitions (3–8 word sequences repeated back-to-back). Merge consecutive same-speaker segments.

6. **Proofread with LLM** — Send the merged diarized text to OpenRouter for proofreading. Use the `OPENROUTER_API_KEY` env var. Use a cheap flash model (e.g. `deepseek/deepseek-chat-v4-0324` or equivalent). Prompt must instruct: "Fix ASR errors — names, domain terms, garbled phrases, jargon. Fix capitalization and punctuation if needed. Preserve every word — do not add, remove, or rewrite. Do not alter speaker labels. Return the exact same paragraph structure." A ~5000-word transcript costs ~$0.01-0.02 at Flash pricing.

7. **Format** — Ensure each line starts with `**Speaker:** text`. Split paragraphs >200 words at sentence boundaries. If prepending/inserting into an existing transcript, wrap the inserted block with `[...]` markers.

8. **Save** — Write to the user-specified destination.
## Pitfalls
- **CATASTROPHIC DECODE LOOP — fixed by VAD.** Without VAD, whisper-cli (ANY model incl. large-v3 fp16 and small.en) can enter a loop, repeating one phrase endlessly over silence/quiet audio; it can even start mid-file and look clean at the end. **Solution: always run with `--vad --vad-model ggml-silero-v5.1.2.bin -mc 0`.** Get the VAD model from `huggingface.co/ggml-org/silero-v5.1.2` (the ggerganov/whisper.cpp `ggml-silero-vad.bin` URL 404s). Always check output for repetition (distinct-segment ratio; `Counter(texts).most_common`) before trusting it.
- **pyannote.audio 4.x API changed:** `Pipeline.from_pretrained(..., use_auth_token=...)` → use `token=`; the pipeline returns a `DiarizeOutput` — use `.speaker_diarization.itertracks(yield_label=True)`, NOT `.itertracks()` on the output. (torch/Python 3.14 lacks wheels — use a Python 3.12 venv.)
- **Cross-file speaker labels don't carry over:** per-file diarization assigns SPEAKER_00/01 independently per file (speaker_01-dominant in file 1 ≠ speaker_01 in file 2). Concatenate all clips and diarize once for consistent identity.
- The **large-v3-q5_0 model is unreliable** — it loops catastrophically on many audio files even with -nf. Prefer **ggml-small.en.bin** (English) or **ggml-large-v3.bin** (multilingual) + VAD.
- Always use -nf (no-fallback) flag with small.en to prevent any repetition issues
- Google Drive paths cause whisper-cli to silently fail with 'input file not found' — always copy audio to /tmp first, transcribe from /tmp, then copy results back
- pyannote models require HuggingFace auth — user must accept license at huggingface.co/pyannote/speaker-diarization-3.1 and provide HF token
- Torchcodec/ffmpeg library may be missing — preload audio as dict with torchaudio.load() and pass to pipeline
- The LLM proofreading prompt must be strict about preserving words — LLMs tend to paraphrase. Use explicit instructions: 'Preserve every word. Do not add, remove, or rewrite.'
- When prepending/inserting into an existing transcript, mark the inserted segment with [...] before and after
- The user's OpenRouter API key should be used only for the proofreading call — do not try to transcribe via API (whisper-cli is cheaper and faster locally)
## Verification
1. Check that the transcript has punctuation and capitalization (small.en should provide these natively)
2. Verify the first speaker label matches what the user specified
3. Check that speaker labels alternate naturally (not all one speaker)
4. Spot-check 3-4 domain-specific terms (e.g. 'Ehrenberg-Bass', 'mental availability', 'Kotler') to confirm the LLM proofreading pass fixed them
5. Preview the last paragraph to confirm the audio end was captured without trailing repetition loops