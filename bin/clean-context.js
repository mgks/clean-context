#!/usr/bin/env node

const fs = require('fs');
const { clean } = require('../src/index');
const packageJson = require('../package.json');

const args = process.argv.slice(2);

// --- Simple Argument Parser ---
const flags = {
    out: null,      // -o, --out
    lang: null,     // -l, --lang
    keepBlock: false, // --keep-block
    keepLine: false,  // --keep-line
    help: false,    // -h, --help
    version: false, // -v, --version
    file: null
};

// Parse Args
for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '-h' || arg === '--help') flags.help = true;
    else if (arg === '-v' || arg === '--version') flags.version = true;
    else if (arg === '--keep-block') flags.keepBlock = true;
    else if (arg === '--keep-line') flags.keepLine = true;
    else if (arg === '-o' || arg === '--out') {
        flags.out = args[i + 1];
        i++; // Skip next
    }
    else if (arg === '-l' || arg === '--lang') {
        flags.lang = args[i + 1];
        i++; // Skip next
    }
    else if (!arg.startsWith('-')) {
        flags.file = arg;
    }
}

// --- Handlers ---

if (flags.help || args.length === 0) {
    console.log(`
  clean-context v${packageJson.version}

  Usage:
    clean-context <file> [options]

  Options:
    -o, --out <path>    Output file path (default: stdout)
    -l, --lang <ext>    Force language (e.g. .js, .py)
    --keep-block        Preserve block comments
    --keep-line         Preserve line comments
    -h, --help          Show help
    -v, --version       Show version

  Examples:
    clean-context script.js
    clean-context script.js -o clean.js
`);
    process.exit(0);
}

if (flags.version) {
    console.log(packageJson.version);
    process.exit(0);
}

if (!flags.file) {
    console.error("Error: No input file specified.");
    process.exit(1);
}

if (!fs.existsSync(flags.file)) {
    console.error(`Error: File not found: "${flags.file}"`);
    process.exit(1);
}

// --- Execution ---

try {
    const result = clean(flags.file, {
        lang: flags.lang,
        keepBlock: flags.keepBlock,
        keepLine: flags.keepLine
    });

    if (flags.out) {
        fs.writeFileSync(flags.out, result);
        console.log(`✨ Cleaned file written to: ${flags.out}`);
    } else {
        process.stdout.write(result);
    }
} catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
}