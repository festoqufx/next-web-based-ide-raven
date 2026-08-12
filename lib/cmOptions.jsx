import { dark } from '@/theme/dark';
import { vscodeLightInit } from '@/theme/light';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';

/**
 * Build CodeMirror options for the given resolved theme ("light" or "dark").
 * Keeps the same layout options while swapping the color scheme.
 */
export const getCmOptions = (resolvedTheme = 'dark') => ({
    className: 'h-full text-[13px] sm:text-sm leading-relaxed',
    maxHeight: '100%',
    height: '100%',
    theme:
      resolvedTheme === 'light'
        ? vscodeLightInit()
        : vscodeDarkInit({ settings: dark }),
    basicSetup: {
        foldGutter: true,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        autocompletion: true,
        lineNumbers: true,
    },
});

// Backwards-compatible default export for any existing consumers.
export const cmOptions = getCmOptions('dark');
