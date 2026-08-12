import { tags as t } from '@lezer/highlight';
import { createTheme } from '@uiw/codemirror-themes';

export const light = {
  background: '#ffffff',
  foreground: '#27272a',
  caret: '#18181b',
  selection: '#e4e4e7',
  selectionMatch: '#d4d4d8',
  lineHighlight: '#f4f4f5',
  gutterBackground: '#fafafa',
  gutterForeground: '#a1a1aa',
  gutterActiveForeground: '#52525b',
  gutterBorder: 'transparent',
  fontFamily: 'var(--font-mono), Menlo, Monaco, Consolas, monospace',
};

/**
 * Monochrome CodeMirror light theme, mirroring the dark vscode theme's
 * structure but with grayscale tones suited to a light editor surface.
 */
export function vscodeLightInit(settings = {}) {
  return createTheme({
    theme: 'light',
    settings: { ...light, ...settings },
    styles: [
      {
        tag: [
          t.keyword,
          t.operatorKeyword,
          t.modifier,
          t.atom,
          t.bool,
          t.controlKeyword,
          t.moduleKeyword,
        ],
        color: '#9d9da3',
      },
      {
        tag: [
          t.name,
          t.propertyName,
          t.variableName,
          t.definition(t.name),
          t.labelName,
        ],
        color: '#18181b',
      },
      {
        tag: [
          t.typeName,
          t.className,
          t.tagName,
          t.number,
          t.annotation,
          t.self,
          t.namespace,
          t.constant(t.name),
          t.standard(t.name),
          t.standard(t.tagName),
        ],
        color: '#52525b',
      },
      {
        tag: [
          t.string,
          t.special(t.string),
          t.inserted,
          t.processingInstruction,
          t.regexp,
        ],
        color: '#3f3f46',
      },
      {
        tag: [t.comment, t.meta, t.link, t.url],
        color: '#a1a1aa',
        fontStyle: 'italic',
      },
      {
        tag: [t.operator, t.punctuation, t.separator, t.special(t.brace), t.angleBracket],
        color: '#71717a',
      },
      {
        tag: t.heading,
        fontWeight: 'bold',
        color: '#18181b',
      },
      {
        tag: t.strong,
        fontWeight: 'bold',
      },
      {
        tag: t.emphasis,
        fontStyle: 'italic',
      },
      {
        tag: t.strikethrough,
        textDecoration: 'line-through',
      },
      {
        tag: t.invalid,
        color: '#dc2626',
      },
    ],
  });
}
