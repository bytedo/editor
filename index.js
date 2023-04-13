import {
  EditorView,
  lineNumbers,
  drawSelection,
  keymap
} from '@codemirror/view'
import {
  history,
  defaultKeymap,
  standardKeymap,
  historyKeymap,
  indentWithTab
} from '@codemirror/commands'
import {
  foldGutter,
  indentOnInput,
  syntaxHighlighting,
  HighlightStyle
} from '@codemirror/language'
import { tags as t } from '@lezer/highlight'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { vue } from '@codemirror/lang-vue'
import { html } from '@codemirror/lang-html'

const chalky = '#e5c07b',
  blue = '#0096ff',
  strings = '#53c659',
  whiskey = '#d19a66',
  darkBackground = '#f2f5fc',
  highlightBackground = '#80CBC440',
  foreground = '#546e7a', //
  background = '#fff',
  tooltipBackground = '#353a42',
  selection = '#80CBC440',
  cursor = '#35373b',
  keyword = '#ff5370',
  property = '#8796B0'

const onePlain = EditorView.theme({
  '&': {
    color: foreground,
    backgroundColor: background
  },

  '.cm-content': {
    caretColor: cursor
  },

  '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
    { backgroundColor: selection },

  '.cm-panels': { backgroundColor: darkBackground, color: foreground },
  '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
  '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

  '.cm-searchMatch': {
    backgroundColor: '#72a1ff59',
    outline: '1px solid #457dff'
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: '#6199ff2f'
  },

  '.cm-activeLine': { backgroundColor: '#6699ff0b' },
  '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

  '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
    backgroundColor: '#bad0f847'
  },

  '.cm-gutters': {
    backgroundColor: darkBackground,
    color: foreground,
    border: 'none'
  },

  '.cm-activeLineGutter': {
    backgroundColor: highlightBackground
  },

  '.cm-foldPlaceholder': {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ddd'
  },

  '.cm-tooltip': {
    border: 'none',
    backgroundColor: tooltipBackground
  },
  '.cm-tooltip .cm-tooltip-arrow:before': {
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  '.cm-tooltip .cm-tooltip-arrow:after': {
    borderTopColor: tooltipBackground,
    borderBottomColor: tooltipBackground
  },
  '.cm-tooltip-autocomplete': {
    '& > ul > li[aria-selected]': {
      backgroundColor: highlightBackground,
      color: foreground
    }
  }
})

const onePlainHighlight = HighlightStyle.define([
  { tag: t.keyword, color: keyword },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: property,
    fontWeight: 'bold'
  },
  {
    tag: [t.attributeName],
    color: '#ffb62c'
  },
  { tag: [t.function(t.variableName), t.labelName], color: blue },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], color: whiskey },
  { tag: [t.definition(t.name), t.separator], color: foreground },
  { tag: [t.typeName], color: keyword },
  { tag: [t.number, t.atom, t.bool], fontStyle: 'italic', color: '#7c4dff' },
  {
    tag: [t.className, t.namespace, t.self],
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#ffb62c'
  },
  {
    tag: [t.changed, t.annotation, t.modifier],
    color: chalky
  },
  {
    tag: [
      t.operator,
      t.operatorKeyword,
      t.url,
      t.escape,
      t.regexp,
      t.link,
      t.special(t.string)
    ],
    color: keyword
  },
  { tag: [t.meta, t.comment], fontStyle: 'italic', color: '#b6d5e0' },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: foreground, textDecoration: 'underline' },
  { tag: t.heading, fontWeight: 'bold', color: property },
  { tag: [t.special(t.variableName)], color: whiskey },
  { tag: [t.processingInstruction, t.string, t.inserted], color: strings },
  { tag: t.invalid, color: foreground }
])

export function minimalSetup(...args) {
  return [
    lineNumbers(),
    foldGutter(),
    indentOnInput(),
    history(),
    drawSelection(),
    ...args,
    [onePlain, syntaxHighlighting(onePlainHighlight)],
    keymap.of([
      ...standardKeymap,
      ...defaultKeymap,
      indentWithTab,
      ...historyKeymap
    ])
  ]
}

export { EditorView, css, html, javascript, vue }
