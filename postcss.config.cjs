module.exports = {
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    '@csstools/postcss-global-data': {
      files: ['./src/assets/styles/settings/_custom-media.css'],
    },
    'postcss-custom-media': {},
    cssnano: {
      preset: 'default',
    },
  },
};
