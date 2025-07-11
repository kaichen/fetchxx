# fetchxx

A simple CLI tool to fetch web pages and convert them to Markdown.

## Installation

```bash
npm install -g fetchxx
```

## Usage

```bash
fetchxx <url> [options]

Options:
  -o, --output <file>  Save output to file instead of stdout
  -h, --help           Show help
  -v, --version        Show version
```

## Examples

```bash
# Output to stdout
fetchxx https://example.com

# Save to file
fetchxx https://example.com -o article.md
```

## Requirements

- Node.js >=18.0.0

## License

MIT