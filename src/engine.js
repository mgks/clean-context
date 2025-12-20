// src/engine.js

function stripEngine(content, style, options = {}) {
    if (style === 'plaintext') return content;

    let pattern;

    if (style === 'c') {
        // Group 1: Strings (Keep)
        // Group 2: Full Line Block (Remove)
        // Group 3: Inline Block (Remove)
        // Group 4: Full Line // (Remove)
        // Group 5: Inline // (Remove)
        pattern = /((?:'(?:\\'|[^'])*')|(?:"(?:\\"|[^"])*")|(?:`(?:\\`|[^`])*`)|(?:\/(?![*])(?:\\.|[^/\\\r\n])+\/[gimuy]*))|((?:^|\r?\n)[ \t]*\/\*[\s\S]*?\*\/)|(\/\*[\s\S]*?\*\/)|((?:^|\r?\n)[ \t]*\/\/[^\r\n]*)|(\/\/[^\r\n]*)/g;
    } 
    else if (style === 'hash') {
        pattern = /((?:'''(?:\\'|[^'])*?''')|(?:"{3}(?:\\"|[^"])*?"{3})|(?:'(?:\\'|[^'])*')|(?:"(?:\\"|[^"])*"))|((?:^|\r?\n)[ \t]*#[^\r\n]*)|(#[^\r\n]*)/g;
    }
    else if (style === 'sql') {
        pattern = /((?:'(?:''|[^'])*'))|((?:^|\r?\n)[ \t]*\/\*[\s\S]*?\*\/)|(\/\*[\s\S]*?\*\/)|((?:^|\r?\n)[ \t]*--[^\r\n]*)|(--[^\r\n]*)/g;
    }
    else if (style === 'css') {
        pattern = /((?:'(?:\\'|[^'])*')|(?:"(?:\\"|[^"])*"))|((?:^|\r?\n)[ \t]*\/\*[\s\S]*?\*\/)|(\/\*[\s\S]*?\*\/)/g;
    }
    else if (style === 'xml') {
        // FIX: Added empty group () at start.
        // This ensures 'str' (Group 1) is undefined, so comments fall into Group 2/3 (Delete).
        pattern = /()|((?:^|\r?\n)[ \t]*<!--[\s\S]*?-->)|(<!--[\s\S]*?-->)/g;
    }

    if (!pattern) return content;

    return content.replace(pattern, (match, str, fullBlock, inlineBlock, fullLine, inlineLine) => {
        if (str) return match; // Keep strings
        
        // Handle Options to Keep comments
        if ((fullBlock || inlineBlock) && options.keepBlock) return match;
        if ((fullLine || inlineLine) && options.keepLine) return match;

        // If removing, return empty for full lines to consume the newline
        if (fullBlock || fullLine) return ''; 
        return ''; 
    });
}

module.exports = { stripEngine };