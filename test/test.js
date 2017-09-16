'use strict';

const assert = require('chai').assert;
const jstohtml = require('../dist/jstohtml');

function c(data, expected, message) {
    assert.strictEqual(jstohtml(data), expected, message);
}

describe('API', function() {
    it('Simple', function() {
        c('', '', 'Empty string');

        c('Hello', 'Hello', 'String');

        c(null, '', 'null');

        c(undefined, '', 'undefined');

        c(123, '123', 'number');

        c(/regexp/, '/regexp/', 'regexp');

        c([], '', 'Array');
    });

    it('Attrs', function() {
        c({align: true}, '<div align="true"></div>', 'align: true');

        c({align: false}, '<div></div>', 'align: false');

        c({align: null}, '<div></div>', 'align: null');

        c({align: 123}, '<div align="123"></div>', 'align: 123');

        c({align: {}}, '<div align="[object Object]"></div>', 'align: {}');

        c({align: []}, '<div align=""></div>', 'align: []');

        c({align: ['first', 'second']}, '<div align="first second"></div>', 'align: ["first", "second"]');

        c({align: 'center'}, '<div align="center"></div>', 'align: "center"');

        c({cl: 'center'}, '<div class="center"></div>', 'cl: "center"');

        c({cl: ['first', 'second']}, '<div class="first second"></div>', 'cl: ["first", "second"]');

        c({cl: '<p>"Hello"</p>'}, '<div class="&lt;p&gt;&quot;Hello&quot;&lt;&#x2F;p&gt;"></div>', 'Escaping a attr');

        c({'data-id': 123, cl: 'warning'}, '<div class="warning" data-id="123"></div>', 'Always first class');
    });

    it('Tags', function() {
        c({}, '<div></div>', 'div');

        c({t: 'img', src: 'a.png'}, '<img src="a.png"/>', 'img');

        c({t: 'br'}, '<br/>', 'br');

        c({t: 'span'}, '<span></span>', 'span');
    });

    it('Children', function() {
        c({c: 'Hello'}, '<div>Hello</div>', 'c: "Hello"');

        c({c: {t: 'span', cl: 'first', c: 'Hello'}}, '<div><span class="first">Hello</span></div>', 'c: ...');

        c({c: []}, '<div></div>', 'c: []');

        c({c: [{}, {}]}, '<div><div></div><div></div></div>', 'c: [{}, {}]');

        c({c: ['Hello', ' ', 'world!']}, '<div>Hello world!</div>', 'c: [\'Hello\', \' \', \'world!\']');
    });

    it('BEM', function() {
        c(
            {b: 'example'},
            '<div class="example"></div>',
            'block'
        );

        c(
            {b: 'example', e: 'elem'},
            '<div class="example__elem"></div>',
            'block, elem'
        );

        c(
            {b: 'example', m: {a: true, b: 'val'}},
            '<div class="example example_a example_b_val"></div>',
            'block, mod'
        );

        c(
            {b: 'example', e: 'elem', m: {a: true, b: 'val'}},
            '<div class="example__elem example__elem_a example__elem_b_val"></div>',
            'block, elem, mod'
        );

        c(
            {b: 'example', c: {e: 'elem', m: {a: true, b: 'val'}}},
            '<div class="example"><div class="example__elem example__elem_a example__elem_b_val"></div></div>',
            'empty elem, mod'
        );

        c(
            {e: 'elem'},
            '<div class="__elem"></div>',
            'elem without block'
        );
    });
});
