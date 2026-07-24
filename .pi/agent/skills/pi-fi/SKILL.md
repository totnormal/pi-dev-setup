---
disable-model-invocation: true
description: Call free LLM models using fi CLI. Gemini, Groq, Cerebras, NVIDIA NIM, OpenRouter free pool, Pollinations. Zero-cost alternatives to paid APIs.
---

# fi — Free LLM Integration for Pi

Call free LLM models using the `fi` CLI tool. No API costs, no servers, just text in, text out.

## Setup

```bash
# Install fi (if not already)
ln -sf ~/Projects/fi-local/fi ~/bin/fi

# Add your API keys
fi keys add <provider> <your-key>
# e.g., fi keys add gemini AIza...
# e.g., fi keys add openrouter sk-or-...
```

## Supported Providers

### Keyed (free tier)
- **gemini**: 2.5-pro, 2.5-flash, 2.5-flash-lite
- **groq**: llama-3.3-70b, qwen3-32b
- **cerebras**: llama-3.3-70b, qwen3-235b
- **openrouter**: 28+ free models

### Keyless (no keys needed)
- **pollinations**: openai, deepseek, claude, mistral, qwen-coder

## Usage

```bash
# Call a free model
fi call gemini-2.5-flash --prompt "Your prompt"

# Stream tokens
fi stream deepseek --prompt "Your prompt"

# List all models
fi models

# Quick model info
fi call <alias> --prompt "Hello" --info
```

## Quick Commands

```bash
# Gemini Flash (fastest free tier)
fi call gemini-2.5-flash --prompt "..."

# DeepSeek (no key needed)
fi call deepseek --prompt "..."

# Groq 70B (best free quality)
fi call llama-3.3-70b-groq --prompt "..."

# OpenRouter free
fi call google/gemma-4-31b-it:free --prompt "..."
```

## Pi Integration

Use with `bash` tool for LLM calls:

```bash
PYTHONIOENCODING=utf-8 fi call <model> --prompt "Your task"
```

## Tips

- Gemini Flash: fastest, good for summaries
- DeepSeek: excellent coder, no key needed
- Groq 70B: best quality free tier
- Pollinations: zero setup, unlimited

## See Also
- [bradAGI/fi](https://github.com/bradAGI/fi) — upstream
- [bradAGI/fi-gateway](https://github.com/bradAGI/fi-gateway) — unified API
