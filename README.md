# clean-context

**The robust code cleaner for AI context generation.**

<p>
  <img src="https://img.shields.io/npm/v/clean-context.svg?style=flat-square&color=d25353" alt="npm version">
  <img src="https://img.shields.io/bundlephobia/minzip/clean-context?style=flat-square&color=38bd24" alt="size">
  <img src="https://img.shields.io/npm/dt/clean-context.svg?style=flat-square&color=success&color=38bd24" alt="npm downloads">
  <img src="https://img.shields.io/github/license/mgks/clean-context.svg?style=flat-square&color=blue" alt="license">
</p>

<img width="720" src="https://github.com/mgks/clean-context/blob/main/preview.gif?raw=true">

`clean-context` strips comments and whitespace noise from code files. Unlike standard compilers, it is designed for **LLM Context**, meaning it prioritizes token reduction while strictly protecting strings, URLs, and Regex literals.

## Features

- **Token Efficient**: Drastically reduces file size for LLM prompts.
- **Safety First**: Uses a "Consumer Pattern" regex strategy to ensure `http://website.com` inside a string isn't truncated by `//`.
- **Smart Line Removal**: Automatically removes the empty whitespace left behind when a full-line comment is deleted.
- **Zero Dependencies**: Lightweight and fast.

## Quick Start

### CLI

```bash
# Clean a file and output to console
npx clean-context script.js

# Clean and save to new file
npx clean-context script.js -o clean.js

# Force a specific language strategy
npx clean-context raw-data.txt --lang .py
```

### Programmatic API

```javascript
const { clean } = require('clean-context');

// 1. Clean a file (Auto-detects extension)
const cleanCode = clean('./src/index.js');

// 2. Clean a string
const raw = `const x = 10; // comment`;
const result = clean(raw, { lang: '.js' });
```

## Supported Languages

`clean-context` supports **40+ languages** out of the box by mapping file extensions to robust stripping strategies.

| Language / Framework | Extensions | Comment Style |
| :--- | :--- | :--- |
| **JavaScript / TypeScript** | `.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`, `.cjs` | `//`, `/* ... */` |
| **Python** | `.py` | `#` (Triple quotes preserved) |
| **Java / Kotlin / Scala** | `.java`, `.kt`, `.kts`, `.scala` | `//`, `/* ... */` |
| **C / C++ / C#** | `.c`, `.cpp`, `.h`, `.cs` | `//`, `/* ... */` |
| **Go / Rust / Swift** | `.go`, `.rs`, `.swift` | `//`, `/* ... */` |
| **PHP** | `.php` | `//`, `/* ... */` |
| **Ruby / Perl** | `.rb`, `.pl` | `#` |
| **Shell / Bash / Zsh** | `.sh`, `.bash`, `.zsh` | `#` |
| **Config & Data** | `.yaml`, `.yml`, `.toml`, `.properties`, `.conf` | `#` |
| **DevOps** | `Dockerfile`, `Makefile` | `#` |
| **Web** | `.html`, `.xml`, `.svg`, `.vue`, `.svelte` | `<!-- ... -->` |
| **Styles** | `.css`, `.scss`, `.less`, `.sass` | `/* ... */`, `//` (for preprocessors) |
| **SQL** | `.sql` | `--`, `/* ... */` |
| **Markdown** | `.md`, `.markdown` | `<!-- ... -->` |

### Smart Fallbacks
If a specific extension isn't listed, you can force a strategy using the `--lang` flag:
- Use `.js` for any C-style language (supports `//` and `/* */`).
- Use `.py` for any Hash-style language (supports `#`).
- Use `.html` for any XML-style language (supports `<!-- -->`).

## Safety Features

We take extra care not to break your code context.

| Feature | Behavior |
| :--- | :--- |
| **Strings** | `"http://example.com"` is **preserved** (not stripped at `//`). |
| **Regex Literals** | `/^https:\/\//` in JS is **preserved**. |
| **Triple Quotes** | `"""Docstrings"""` in Python are **preserved**. |
| **Hash Colors** | `color: "#ff0000"` in Configs/Code is **preserved**. |

## License

MIT

> **{ github.com/mgks }**
> 
> ![Website Badge](https://img.shields.io/badge/Visit-mgks.dev-blue?style=flat&link=https%3A%2F%2Fmgks.dev) ![Sponsor Badge](https://img.shields.io/badge/%20%20Become%20a%20Sponsor%20%20-red?style=flat&logo=github&link=https%3A%2F%2Fgithub.com%2Fsponsors%2Fmgks)
