/* eslint-disable import/first */
require('dotenv').config();
const webpack = require('webpack');
const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
require('mix-env-file');
require('laravel-mix-purgecss');

// Paths
const paths = {
  sass: {
    source: './resources/sass/main.scss',
    dest: 'css/',
  },
  javascript: {
    source: './resources/js/main.js',
    home: './resources/js/singles/home.js',
    submit: './resources/js/singles/submit.js',
    dest: 'js/',
  },
};

// Run mix
mix
  .env(process.env.ENV_FILE)
  .webpackConfig({
    resolve: {
      alias: {
        '@utilities': path.resolve(__dirname, 'resources/js/utilities'),
        '@modules': path.resolve(__dirname, 'resources/js/modules'),
        '@state': path.resolve(__dirname, 'resources/js/state'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          REACT_APP_AIRTABLE_KEY: JSON.stringify(process.env.REACT_APP_AIRTABLE_KEY),
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
      }),
    ],
  })

  // Concatenate & Compile Javascript
  .js(paths.javascript.source, paths.javascript.dest)

  // Compile singles
  .js(paths.javascript.home, paths.javascript.dest)
  .js(paths.javascript.submit, paths.javascript.dest)

  // Compile SCSS & TailwindCSS
  .sass(paths.sass.source, paths.sass.dest)
  .options({
    processCssUrls: false,
    postCss: [tailwindcss('tailwind.config.js')],
  });

// Production only
if (mix.inProduction()) {
  // Remove any unused CSS using Purge
  mix

    // .purgeCss({
    //   folders: ['site', 'resources/js'],
    //   extensions: ['html', 'njk', 'js'],
    //   whitelist: [
    //     'body',
    //     'html',
    //     'a',
    //     'h1',
    //     'h2',
    //     'h3',
    //     'h4',
    //     'p',
    //     'blockquote',
    //     'breadcrumbs',
    //     'content',
    //     'form',
    //     'input',
    //     'textarea',
    //     'intro',
    //     'btn',
    //     'loaded',
    //     'page-title',
    //     'required',
    //     'row',
    //     'visually-hidden',
    //     'menu-visible',
    //     'tooltip',
    //     'nameList__item',
    //     'nameList__itemRecord',
    //   ],
    // })

    // Minifies CSS & JS files
    .minify(`${paths.sass.dest}main.css`)
    .minify(`${paths.javascript.dest}main.js`)
    .minify(`${paths.javascript.dest}home.js`)
    .minify(`${paths.javascript.dest}submit.js`);
}
