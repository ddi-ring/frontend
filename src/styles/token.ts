import * as stylex from '@stylexjs/stylex';

export const COLORS = {
    primary: '#FF731D',
    text: {
        default: '#191919',
        secondary: '#8A8A8A',
        tertiary: '#909090',
    },
} as const;

export const FONT_SIZES = {
    h1: '20px',
    h2: '18px',
    base: '16px',
    sm: '14px',
    xs: '12px',
} as const;

export const FONT_WEIGHTS = {
    light: '300',
    medium: '500',
    bold: '700',
} as const;

export const tokens = stylex.defineVars({
    colorPrimary: COLORS.primary,
    colorTextDefault: COLORS.text.default,
    colorTextSecondary: COLORS.text.secondary,
    colorTextTertiary: COLORS.text.tertiary,

    fontSizeH1: FONT_SIZES.h1,
    fontSizeH2: FONT_SIZES.h2,
    fontSizeBase: FONT_SIZES.base,
    fontSizeSm: FONT_SIZES.sm,
    fontSizeXs: FONT_SIZES.xs,

    fontWeightLight: FONT_WEIGHTS.light,
    fontWeightMedium: FONT_WEIGHTS.medium,
    fontWeightBold: FONT_WEIGHTS.bold,
});

export const TEXT_STYLES = stylex.create({
    h1: {
        fontSize: tokens.fontSizeH1,
        fontWeight: tokens.fontWeightBold,
    },
    h2: {
        fontSize: tokens.fontSizeH2,
        fontWeight: tokens.fontWeightMedium,
    },
    body: {
        fontSize: tokens.fontSizeBase,
        fontWeight: tokens.fontWeightMedium,
    },
    bodySm: {
        fontSize: tokens.fontSizeSm,
        fontWeight: tokens.fontWeightMedium,
    },
    caption: {
        fontSize: tokens.fontSizeXs,
        fontWeight: tokens.fontWeightLight,
    },
});