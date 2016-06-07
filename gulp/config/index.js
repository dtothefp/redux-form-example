export default {
  eslint: {
    basic: false,
    react: true,
    generate: false
  },
  webpack: {
    shouldRev: true,
    includePaths: [],
    hot: true,
    expose: {
      'js-cookie': 'Cookie',
      'query-string': 'qs'
    },
    externals: [
      {
        name: {
          jquery: 'jQuery'
        },
        provide: {
          'global.jQuery': 'jquery',
          'window.jQuery': 'jquery',
          '$': 'jquery'
        }
      }
    ]
  },
  cb(config) {
    const {environment} = config;
    const {branch, asset_path: assetPath} = environment;

    if (branch) {
      Object.assign(environment, {
        asset_path: assetPath.replace(branch + '/', '')
      });
    }

    return config;
  }
};
