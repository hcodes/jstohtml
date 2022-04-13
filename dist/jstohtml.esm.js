/*!
 * jstohtml
 * © 2022 Denis Seleznev
 * License: MIT
 *
 * https://github.com/hcodes/jstohtml/
*/

var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;'
    },
    escapeRE = /[&<>"']/g,
    escapeAttr = function(str) {
        return str.replace(escapeRE, function(s) {
            return entityMap[s];
        });
    };

var Engine = {
    noClosingTag: [
        'img', 'input', 'br', 'embed', 'source',
        'link', 'meta', 'area', 'command',
        'base', 'col', 'param', 'wbr', 'hr', 'keygen'
    ],

    ignoredKeys: [
        'b', // block
        'e', // element
        'm', // modifier
        'c', // content
        't', // tagName
        'cl', // class
        'class' // class
    ],

    /**
     * Is plain object?
     *
     * @param {*} obj
     * @returns {boolean}
     */
    isPlainObj: function(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    },

    /**
     * Build a item.
     *
     * @param {*} data
     * @returns {string}
     */
    build: function(data) {
        if (data === null || data === undefined) {
            return '';
        }

        var buf = [];

        if (this.isPlainObj(data)) {
            return this.tag(data);
        } else if (Array.isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                buf.push(this.build(data[i]));
            }

            return buf.join('');
        } else {
            return '' + data;
        }
    },

    /**
     * Build a tag.
     *
     * @param {*} data
     * @returns {string}
     */
    tag: function(data) {
        var t = data.t || 'div',
            text = '<' + t + this.attrs(data);

        if (this.noClosingTag.indexOf(t) !== -1) {
            return text + '/>';
        }

        text += '>';

        if (data.c) {
            text += this.build(data.c);
        }

        text += '</' + t + '>';

        return text;
    },

    /**
     * Build attrs.
     *
     * @param {Object} data
     * @returns {string}
     */
    attrs: function(data) {
        var b = data.b,
            e = data.e,
            m = data.m,
            buf = [],
            cl = [],
            result,
            key;

        if (b || e) {
            b = b || this._currentBlock;
            if (e) {
                buf.push(this.elem(b, e));
            } else {
                buf.push(this.block(b));
            }

            if (this.isPlainObj(m)) {
                for (key in m) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (m.hasOwnProperty(key)) {
                        buf.push(this.elem(b, e, key, m[key]));
                    }
                }

                buf.sort();
                for (var i = 0, len = buf.length; i < len; i++) {
                    if (buf[i] !== buf[i - 1]) {
                        cl.push(buf[i]);
                    }
                }
            } else {
                cl = buf;
            }

            result = this.attr('class', cl);
            this._currentBlock = b;
        } else {
            cl = data['cl'] || data['class'];
            result = cl ? this.attr('class', cl) : '';
        }

        for (key in data) {
            // eslint-disable-next-line no-prototype-builtins
            if (data.hasOwnProperty(key) && this.ignoredKeys.indexOf(key) === -1) {
                result += this.attr(key, data[key]);
            }
        }

        return result;
    },

    /**
     * Build a attr.
     *
     * @param {string} name
     * @param {*} value
     * @returns {string}
     */
    attr: function(name, value) {
        if (value === undefined || value === null || value === false) {
            return '';
        }

        return ' ' + name + '="' + escapeAttr(Array.isArray(value) ? value.join(' ') : '' + value) + '"';
    },

    /**
     * Build a block.
     *
     * @param {string} block
     * @param {string} [modName]
     * @param {*} [modVal]
     * @returns {string}
     */
    block: function(block, modName, modVal) {
        return block + this.mod(modName, modVal);
    },

    /**
     * Build a elem.
     *
     * @param {string} block
     * @param {string} [elemName]
     * @param {string} [modName]
     * @param {*} [modVal]
     * @returns {string}
     */
    elem: function(block, elemName, modName, modVal) {
        return block + (elemName ? '__' + elemName : '') + this.mod(modName, modVal);
    },

    /**
     * Build a mod.
     *
     * @param {string} modName
     * @param {*} [modVal]
     * @returns {string}
     */
    mod: function(modName, modVal) {
        if (modVal === false || modVal === null || modVal === undefined) {
            return '';
        }

        return '_' + modName + (modVal === '' || modVal === true ? '' : '_' + modVal);
    },

    /**
     * Reset inner properties.
     */
    reset: function() {
        this._currentBlock = '';
        return this;
    }
};

/**
 * JS to HTML.
 * 
 * @param {*} data
 * @returns {string}
 */
export default function jstohtml(data) {
    return Engine.reset().build(data);
}
