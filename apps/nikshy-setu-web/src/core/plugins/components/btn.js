/* eslint-disable max-len */
import plugin from 'tailwindcss/plugin';

export default plugin(({ addComponents, theme }) => {
  // Base
  addComponents({
    '.btn': {
      display: 'block flex',
      'align-items': 'center',
      cursor: 'pointer',
      'line-height': '1',
      'border-radius': theme('custom.components.common.borderRadius.btn'),
      border: '1px solid transparent',
      'padding-inline': theme('custom.components.btn.DEFAULT.px'),
      'padding-top': theme('custom.components.btn.DEFAULT.py'),
      'padding-bottom': theme('custom.components.btn.DEFAULT.py'),
      gap: theme('custom.components.btn.DEFAULT.gap'),
      'font-weight': theme('custom.components.btn.DEFAULT.fontWeight'),
      'font-size': theme('custom.components.btn.DEFAULT.fontSize'),
      outline: 'none',
      'justify-content': 'center',
    },
    '.btn-sm': {
      'padding-inline': theme('custom.components.btn.sm.px'),
      'padding-top': theme('custom.components.btn.sm.py'),
      'padding-bottom': theme('custom.components.btn.sm.py'),
      'font-weight': theme('custom.components.btn.sm.fontWeight'),
      'font-size': theme('custom.components.btn.sm.fontSize'),
      gap: theme('custom.components.btn.sm.gap'),
    },
    '.btn-lg': {
      'padding-inline': theme('custom.components.btn.lg.px'),
      'padding-top': theme('custom.components.btn.lg.py'),
      'padding-bottom': theme('custom.components.btn.lg.py'),
      'font-weight': theme('custom.components.btn.lg.fontWeight'),
      'font-size': theme('custom.components.btn.lg.fontSize'),
      gap: theme('custom.components.btn.lg.gap'),
    },
  });

  // Disabled state
  addComponents({
    '.btn': {
      '&[disabled], &.disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
      },
    },
  });

  // add colors class
  const storeBtnColorObject = Object.entries(
    theme('custom.components.btnColor')
  );

  storeBtnColorObject.map(([colorKey, colorObject]) => {
    const outlineBtn = colorObject.outline;

    const colorClass = {
      [`.btn-${colorKey}`]: {
        color: colorObject.color,
        background: colorObject.background,
      },
      [`.btn-outline.btn-${colorKey}`]: {
        'border-color':
          outlineBtn && outlineBtn.borderColor
            ? outlineBtn.borderColor
            : colorObject.background,
        background:
          outlineBtn && outlineBtn.background
            ? outlineBtn.background
            : theme('colors.white'),
        color:
          outlineBtn && outlineBtn.color
            ? outlineBtn.color
            : colorObject.background,
      },
    };
    addComponents(colorClass);
  });
});
