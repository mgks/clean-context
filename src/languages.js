// src/languages.js

const LANGUAGE_MAP = {
    'c': ['js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx', 'java', 'c', 'cpp', 'h', 'hpp', 'cs', 'go', 'rs', 'swift', 'dart', 'php', 'kt', 'kts', 'scala', 'groovy', 'less', 'scss', 'sass', 'vue', 'svelte'],
    'hash': ['py', 'rb', 'pl', 'r', 'sh', 'bash', 'zsh', 'yaml', 'yml', 'toml', 'dockerfile', 'makefile', 'conf', 'properties'],
    'sql': ['sql'],
    'xml': ['html', 'htm', 'xml', 'svg', 'md', 'markdown', 'jsp', 'asp', 'aspx'],
    'css': ['css']
};

const EXT_LOOKUP = {};
Object.entries(LANGUAGE_MAP).forEach(([style, exts]) => {
    exts.forEach(ext => EXT_LOOKUP['.' + ext] = style);
});

module.exports = { LANGUAGE_MAP, EXT_LOOKUP };