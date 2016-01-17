/*!
 * jstohtml v1.1.0
 * Copyright 2014 Denis Seleznev
 * Released under the MIT license.
 *
 * https://github.com/hcodes/jstohtml/
*/

(function(root, factory) {
    if(typeof define === 'function' && define.amd) {
        define('jstohtml', [], factory);
    } else if(typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.jstohtml = factory();
    }
}(this, function() {
    'use strict';

    var noClosingTag = [
            'img', 'input', 'br', 'embed', 'source',
            'link', 'meta', 'area', 'command',
            'base', 'col', 'param', 'wbr', 'hr', 'keygen'
        ],
        ignoredKeys = ['c', 'cl', 't', 'class'],
        isArray = Array.isArray,
        toString = Object.prototype.toString,
        entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;',
            '/': '&#x2F;'
        },
        escapeRE = /[&<>"'\/]/g;

    function escapeHtml(str) {
        return str.replace(escapeRE, function(s) {
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
        var cl = data['cl'] || data['class'],
            text = cl ? attr('class', cl) : '';

        for(var key in data) {
            if(data.hasOwnProperty(key) && ignoredKeys.indexOf(key) === -1) {
                text += attr(key, data[key]);
            }
        }

        return text;
    }

    function attr(name, value) {
        if(value === undefined || value === null || value === false) {
            return '';
        }

        return ' ' + name + '="' + escapeHtml(isArray(value) ? value.join(' ') : '' + value) + '"';
    }

    return buildItem;
}));
