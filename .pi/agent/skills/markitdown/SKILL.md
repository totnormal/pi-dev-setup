---
disable-model-invocation: true
name: markitdown
description: Converts PDFs, Office documents, HTML, images, audio, EPUB, and other files to Markdown using Microsoft's markitdown CLI.
---

# markitdown — Convert files to Markdown

Use Microsoft's `markitdown` CLI to convert binary and document files to Markdown text. Ships as a standalone pipx tool.

## When to use

- User asks to extract text/content from PDFs, DOCX, PPTX, XLSX, HTML, images, audio, or other document formats
- User wants to convert a file to markdown
- User needs to read or analyze content from a non-text file (binary document)

## How to use

Run the CLI directly via bash:

```bash
markitdown /path/to/file.ext
```

### With piped input

```bash
cat file.pdf | markitdown
```

### Save output to file

```bash
markitdown /path/to/file.ext > /path/to/output.md
```

## Supported formats

- PDF (`.pdf`)
- PowerPoint (`.pptx`)
- Word (`.docx`)
- Excel (`.xlsx`)
- HTML (`.html`, `.htm`)
- Images (`.jpg`, `.png`, `.gif`, `.webp`) — extracts EXIF + OCR
- Audio (`.mp3`, `.wav`) — transcribes via speech recognition
- EPUB (`.epub`)
- CSV / TSV
- JSON / XML
- ZIP archives (processes each file inside)
- Plain text files (passthrough)

## Tips

- For large files, pipe to a temp file and read in chunks
- If output is truncated, use `markitdown file.ext > /tmp/converted.md` then read the saved file
- The tool is installed globally via pipx, no venv needed
