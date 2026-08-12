import { dark } from '@/theme/dark';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
export const cmOptions = {
    className: 'h-full text-[13px] sm:text-sm leading-relaxed',
    maxHeight: '100%',
    height: '100%',
    theme: vscodeDarkInit({ settings: dark }),
    basicSetup: {
        foldGutter: true,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        autocompletion: true,
        lineNumbers: true,
    },
};