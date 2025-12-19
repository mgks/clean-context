// src/engine.js

function stripEngine(content, style, options = {}) {
    if (style === 'plaintext') return content;

    let pattern;

    if (style === 'c') {
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
        pattern = /((?:^|\r?\n)[ \t]*<!--[\s\S]*?-->)|(<!--[\s\S]*?-->)/g;
    }

    if (!pattern) return content;

    return content.replace(pattern, (match, str, fullBlock, inlineBlock, fullLine, inlineLine) => {
        if (str) return match; 
        
        if ((fullBlock || inlineBlock) && options.keepBlock) return match;
        if ((fullLine || inlineLine) && options.keepLine) return match;

        if (fullBlock || fullLine) return ''; 
        return ''; 
    });
}

module.exports = { stripEngine };