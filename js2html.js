/*!
 * js2html v1.0.0
 * Copyright 2014 Denis Seleznev
 * Released under the MIT license.
 *
 * https://github.com/hcodes/js2html/
 */

var js2html = (function() {

'use strict';

var noClosingTag = [
        'img', 'input', 'br', 'embed', 'source',
        'link', 'meta', 'area', 'command',
        'base', 'col', 'param', 'wbr', 'hr', 'keygen'
    ],
    entityMap = {
        '&': "&amp;",
        '<': "&lt;",
        '>': "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
    },
    isArray = Array.isArray,
    toString = Object.prototype.toString;

function escapeHtml(str) {
    return ('' + str).replace(/[&<>"'\/]/g, function(s) {
        return entityMap[s];
    });
}

function isPlainObj(obj) {
    return toString.call(obj) === '[object Object]';
}

function buildItem(data) {
    if(data === null || data === undefined) {
        return '';
    }

    var buf = [];

    if(isPlainObj(data)) {
        return tag(data);
    } else if(isArray(data)) {
        for(var i = 0, len = data.length; i < len; i++) {
            buf.push(buildItem(data[i]));
        }

        return buf.join('');
    } else {
        return '' + data;
    }
}

function tag(data) {
    var t = data.t || 'div',
        text = '<' + t + attrs(data);

    if(noClosingTag.indexOf(t) !== -1) {
        return text + '/>';
    }

    text += '>';

    if(data.c) {
        text += buildItem(data.c);
    }

    text += '</' + t + '>';

    return text;
}

function attrs(data) {
    var keys = Object.keys(data),
        ignoredItems = ['cl', 'class', 'c', 't'],
        cl = data['cl'] || data['class'],
        text = [],
        buf = '';

    if(cl) {
        text.push(attr('class', cl));
    }

    for(var i = 0, len = keys.length; i < len; i++) {
        var item = keys[i];
        if(ignoredItems.indexOf(item) === -1) {
            text.push(attr(item, data[item]));
        }
    }

    buf = text.join(' ');

    return buf ? ' ' + buf : '';
}

function attr(name, value) {
    if(value === null || value === undefined) {
        return '';
    }

    var v = isArray(value) ? value.join(' ') : value;

    return name + '="' + escapeHtml(v) + '"' : '';
}

return buildItem;

})();
