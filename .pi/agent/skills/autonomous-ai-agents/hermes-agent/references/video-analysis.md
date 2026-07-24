# Video Analysis in Hermes Agent

Hermes Agent supports video analysis through the `video_analyze` tool, which requires proper vision model configuration.

## Configuration Requirements

To use video analysis, you must configure a vision-capable model:

```bash
# Set vision model provider (typically openrouter for free models)
hermes config set vision.provider openrouter

# Set a vision-capable model (example: Google Gemma 3 4B IT)
hermes config set vision.model google/gemma-3-4b-it:free

# Verify configuration
hermes config get model.vision
```

## Common Issues and Solutions

### "No LLM provider configured for task=vision provider=auto"

This error occurs when:
1. No vision model is configured
2. The vision provider is not set
3. API credentials are missing or invalid

Solution:
- Ensure `vision.provider` and `vision.model` are set in config
- Verify API keys are configured (e.g., `OPENROUTER_API_KEY` for OpenRouter)
- Run `hermes config get model.vision` to confirm settings

### Video Analysis Limitations

- Video analysis extracts frames and analyzes them as images
- Very long videos may be truncated or sampled
- Audio content is not analyzed unless separately transcribed
- Some models have limitations on video length or resolution

### Best Practices

1. Always verify your vision model configuration before attempting video analysis
2. For long videos, consider extracting specific segments or keyframes first
3. Combine video analysis with transcription tools for comprehensive understanding
4. Be aware of API rate limits and costs when using paid vision models

## Troubleshooting Steps

If video analysis fails:

1. Check vision configuration: `hermes config get model.vision`
2. Verify API credentials are set:
   - For OpenRouter: `OPENROUTER_API_KEY` in ~/.hermes/.env
   - For other providers: check respective API key environment variables
3. Test with a simple image first to isolate vision model issues
4. Check Hermes logs for detailed error messages: `~/.hermes/logs/gateway.log`

## Supported Video Platforms

The `video_analyze` tool works with:
- Direct video file URLs (MP4, MOV, AVI, etc.)
- YouTube URLs (youtube.com/watch?v=...)
- Other publicly accessible video URLs

Note: Some platforms may require additional authentication or have restrictions on automated access.