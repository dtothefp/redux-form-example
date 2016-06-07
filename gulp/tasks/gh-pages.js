export default function(gulp, plugins, config) {
  const {ghPages} = plugins;
  const {environment, sources, utils} = config;
  const {branch} = environment;
  const {buildDir} = sources;
  const {addbase} = utils;
  const {GITHUB_API_KEY} = process.env;
  const src = addbase(buildDir, '**/*');

  const remoteUrl = branch ?
    `https://dtothefp:${GITHUB_API_KEY}@github.com/dtothefp/speedcurve-test.git` :
    'git@github.com:dtothefp/speedcurve-test.git';

  return () => {
    return gulp.src(src)
    .pipe(
      ghPages({
        remoteUrl,
        force: true
      })
    );
  };
}
