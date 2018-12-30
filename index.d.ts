type JSToHTMLContent = JSToHTMLObject | JSToHTMLObject[] | string | string[] | number | number[] | boolean | boolean[] | RegExp | null;

interface JSToHTMLMod {
    [key as string]: boolean | string | number;
}

interface JSToHTMLObject {
    b?: string;
    e?: string;
    m?: JSToHTMLMod;
    c?: JSToHTMLContent;
    cl?: string | string[];
    class?: string | string[];
    t?: string;
    [key as string]?: boolean | string | number | null;
}

export default function jstohtml(data?: JSToHTMLContent): string;
