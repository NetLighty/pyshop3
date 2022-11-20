const { configure } = require('quasar/wrappers');

module.exports = configure(function (/* ctx */) {
  return {
    eslint: {
      warnings: true,
      errors: true
    },
    boot: [
      'pinia',
      'axios',
    ],
    css: [
      'app.scss'
    ],

    extras: [
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    build: {
      target: {
        browser: [ 'chrome87'],
        node: 'node16'
      },
      publicPath: '/pyshop-3/client/dist/spa',
      vueRouterMode: 'hash', // available values: 'hash', 'history'
    },

    devServer: {
      open: true // opens browser window automatically
    },

    framework: {
      config: {},
      plugins: []
    },
    animations: [],
    ssr: {
      pwa: false,

      prodPort: 3000, // The default port that the production server should use
                      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render' // keep this as last one
      ]
    },

    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
    cordova: {
    },

    capacitor: {
      hideSplashscreen: true
    },
    electron: {

      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
      },

      builder: {
        appId: 'client'
      }
    },

    bex: {
      contentScripts: [
        'my-content-script'
      ],

    }
  }
}
});
