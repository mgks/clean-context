// src/index.js
const fs = require('fs');
const path = require('path');
const { EXT_LOOKUP } = require('./languages');
const { stripEngine } = require('./engine');

function detectStyle(langOrExt) {
    if (!langOrExt) return 'plaintext';
    const normalized = langOrExt.toLowerCase();
    
    // Check extension
    if (normalized.startsWith('.') || EXT_LOOKUP['.' + normalized]) {
        const ext = normalized.startsWith('.') ? normalized : '.' + normalized;
        return EXT_LOOKUP[ext] || 'plaintext';
    }
    return 'plaintext'; // Simplified for this example, can add named lookup back
}

/**
 * Main API function.
 * usage: clean(codeString, { lang: 'js' }) 
 * usage: clean(filePath)
 */
function clean(input, optionsOrLang = {}) {
    if (!input) return '';

    let content = input;
    let lang = null;
    let options = {};

    // Argument handling
    if (typeof optionsOrLang === 'string') {
        lang = optionsOrLang;
    } else {
        options = optionsOrLang || {};
        lang = options.lang;
    }

    // 1. File Handling
    // If input is a path that exists, read it.
    if (input.length < 255 && fs.existsSync(input)) {
        try {
            if (!lang) lang = path.extname(input);
            content = fs.readFileSync(input, 'utf8');
        } catch (e) {
            // Not a file, proceed as string
        }
    }

    // 2. Detection & Execution
    const style = detectStyle(lang);
    return stripEngine(content, style, options);
}

module.exports = { clean };