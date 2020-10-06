module.exports = {
  purge: [
    'dist/**/*.html',
    'site/**/*.njk',
    'resources/**/*.js',
    'resources/**/*.scss',
  ],
  theme: {
    extend: {},
    colors: {
      primary: 'var(--color-primary)',
      theme: 'var(--color-theme)',
      text: 'var(--color-text)',
    },
  },
  variants: {
    primary: ['hover', 'focus', 'active'],
    text: ['hover', 'focus', 'active'],
    theme: ['hover', 'focus', 'active'],
  },
  plugins: [],
};
