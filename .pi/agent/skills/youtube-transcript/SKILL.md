---
name: youtube-transcript
description: "Extract YouTube transcript, title, and description from any video URL using yt-dlp. Token-efficient one-liners for quick extraction."
disable-model-invocation: true
---

# YouTube Transcript Extractor

Extract transcript, title, and description from any YouTube video URL using yt-dlp.

## When to Use

User asks to get a YouTube transcript, extract subtitles, get video description, or analyze YouTube video content.

## Quick Commands

### Transcript only (plain text)
```bash
yt-dlp --write-auto-sub --skip-download --sub-lang en --sub-format vtt -o "/tmp/yt" "<URL>" 2>/dev/null && cat /tmp/yt.en.vtt | grep -v '^[0-9]' | grep -v '^$' | grep -v 'align:' | head -200
```

### Title + Description
```bash
yt-dlp --print title --print description --skip-download "<URL>" 2>/dev/null
```

### Full metadata JSON
```bash
yt-dlp --dump-json --skip-download "<URL>" 2>/dev/null
```

### Full extraction (transcript with timestamps + metadata)
```bash
yt-dlp --dump-json --write-auto-sub --skip-download --sub-lang en --sub-format json3 -o "/tmp/yt_<ID>" "<URL>" 2>/dev/null
```

Then parse json3 for timestamped transcript:
```bash
python3 -c "
import json
with open('/tmp/yt_<ID>.en.json3') as f:
    subs = json.load(f)
text = ' '.join(s['content'] for s in subs.get('events', []) if 'content' in s)
print(text)
"
```

## Available Metadata Fields (--dump-json)

- `title` — video title
- `description` — full description
- `duration` — length in seconds
- `uploader` — channel name
- `upload_date` — YYYYMMDD format
- `subtitles` / `requested_subtitles` — available subtitle tracks

## Pitfalls

- Auto-generated subs (--write-auto-sub) may have minor transcription errors
- Some videos have no subtitles — check `subtitles` field first
- For non-English videos, change `--sub-lang` to the appropriate language code
- json3 format preserves timestamps; vtt is simpler for plain text extraction
- Use `--skip-download` to avoid downloading the actual video
