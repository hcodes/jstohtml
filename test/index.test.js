const jstohtml = require('../dist/jstohtml');

describe('API', () => {
    describe('Simple', () => {
        it('Empty string', () => {
            expect(jstohtml('')).toEqual('');
        });

        it('String', () => {
            expect(jstohtml('Hello')).toEqual('Hello');
        });

        it('null', () => {
            expect(jstohtml(null)).toEqual('');
        });

        it('undefined', () => {
            expect(jstohtml(undefined)).toEqual('');
        });

        it('number', () => {
            expect(jstohtml(123)).toEqual('123');
        });

        it('regexp', () => {
            expect(jstohtml(/regexp/)).toEqual('/regexp/');
        });

        it('Array', () => {
            expect(jstohtml([])).toEqual('');
        });
    });

    describe('Attrs', () => {
        it('align: true', () => {
            expect(jstohtml({align: true})).toEqual('<div align="true"></div>');
        });

        it('align: false', () => {
            expect(jstohtml({align: false})).toEqual('<div></div>');
        });

        it('align: null', () => {
            expect(jstohtml({align: null})).toEqual('<div></div>');
        });

        it('align: 123', () => {
            expect(jstohtml({align: 123})).toEqual('<div align="123"></div>');
        });

        it('align: {}', () => {
            expect(jstohtml({align: {}})).toEqual('<div align="[object Object]"></div>');
        });

        it('align: []', () => {
            expect(jstohtml({align: []})).toEqual('<div align=""></div>');
        });

        it('align: ["first", "second"]', () => {
            expect(jstohtml({align: ['first', 'second']})).toEqual('<div align="first second"></div>');
        });

        it('align: "center"', () => {
            expect(jstohtml({align: 'center'})).toEqual('<div align="center"></div>');
        });

        it('cl: "center"', () => {
            expect(jstohtml({cl: 'center'})).toEqual('<div class="center"></div>');
        });

        it('cl: ["first", "second"]', () => {
            expect(jstohtml({cl: ['first', 'second']})).toEqual('<div class="first second"></div>');
        });

        it('Escaping a class', () => {
            expect(jstohtml({cl: '<p>"Hello"</p>'})).toEqual('<div class="&lt;p&gt;&quot;Hello&quot;&lt;/p&gt;"></div>');
        });

        it('Escaping a href', () => {
            expect(jstohtml({t: 'a', href: '/path?param=value', c: 'link'})).toEqual('<a href="/path?param=value">link</a>');
        });

        it('Always first class', () => {
            expect(jstohtml({'data-id': 123, cl: 'warning'})).toEqual('<div class="warning" data-id="123"></div>');
        });
    });

    describe('Tags', () => {
        it('div', () => {
            expect(jstohtml({})).toEqual('<div></div>');
        });

        it('img', () => {
            expect(jstohtml({t: 'img', src: 'a.png'})).toEqual('<img src="a.png"/>');
        });

        it('br', () => {
            expect(jstohtml({t: 'br'})).toEqual('<br/>');
        });

        it('span', () => {
            expect(jstohtml({t: 'span'})).toEqual('<span></span>');
        });
    });

    describe('Children', () => {
        it('c: "Hello"', () => {
            expect(jstohtml({c: 'Hello'})).toEqual('<div>Hello</div>');
        });

        it('c: ...', () => {
            expect(jstohtml({c: {t: 'span', cl: 'first', c: 'Hello'}})).toEqual('<div><span class="first">Hello</span></div>');
        });

        it('c: []', () => {
            expect(jstohtml({c: []})).toEqual('<div></div>');
        });

        it('c: [{}, {}]', () => {
            expect(jstohtml({c: [{}, {}]})).toEqual('<div><div></div><div></div></div>');
        });

        it('c: [\'Hello\', \' \', \'world!\']', () => {
            expect(jstohtml({c: ['Hello', ' ', 'world!']})).toEqual('<div>Hello world!</div>');
        });
    });

    describe('BEM', () => {
        it('block', () => {
            expect(jstohtml({b: 'example'})).toEqual('<div class="example"></div>');
        });

        it('block, elem', () => {
            expect(jstohtml({b: 'example', e: 'elem'})).toEqual('<div class="example__elem"></div>');
        });

        it('block, mod', () => {
            expect(jstohtml({
                b: 'example',
                m: {
                    a: true,
                    b: 'val',
                }
            })).toEqual('<div class="example example_a example_b_val"></div>');
        });

        it('block, elem, mod', () => {
            expect(jstohtml({
                b: 'example',
                e: 'elem',
                m: {
                    a: true, 
                    b: 'val',
                },
            })).toEqual('<div class="example__elem example__elem_a example__elem_b_val"></div>');
        });

        it('empty elem, mod', () => {
            expect(jstohtml({
                b: 'example',
                c: {
                    e: 'elem',
                    m: {
                        a: true,
                        b: 'val',
                    },
                },
            })).toEqual('<div class="example"><div class="example__elem example__elem_a example__elem_b_val"></div></div>');
        });

        it('elem without block', () => {
            expect(jstohtml({e: 'elem'})).toEqual('<div class="__elem"></div>');
        });
    });
});
