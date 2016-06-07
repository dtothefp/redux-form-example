import 'babel-polyfill';
import gulp from 'gulp';
import build from 'boiler-core';

const {tasks, config, plugins: $} = build(gulp);
const {sources, utils, environment} = config;
const {isDev} = environment;
const {buildDir} = sources;
const {addbase} = utils;
const noop = (cb) => cb();

gulp.task('assemble', tasks.assemble);
gulp.task('browser-sync', tasks.browserSync);
gulp.task('clean', tasks.clean);
gulp.task('copy', tasks.copy);
gulp.task('deploy', tasks.ghPages);
gulp.task('lint:test', tasks.eslint);
gulp.task('lint:build', tasks.eslint);
gulp.task('lint', gulp.parallel('lint:test', 'lint:build'));
gulp.task('webpack:global', tasks.webpack);
gulp.task('webpack:main', tasks.webpack);
gulp.task('webpack', gulp.series('webpack:global', 'webpack:main'));

gulp.task('build', gulp.series(
  'clean',
  'lint',
  'webpack',
  'assemble',
  isDev ? 'browser-sync' : noop
));

gulp.task('default', gulp.series('build'));

gulp.task('watch', gulp.series('build', () => {
  gulp.watch(
    addbase(buildDir, '{js,css}/**/*.{js,css}')
  ).on('change', $.browserSync.reload);
}));
