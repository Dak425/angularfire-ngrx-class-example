// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  if (process.env.NODE_ENV === 'test') {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-junit-reporter'),
        require('karma-coverage-istanbul-reporter'),
        require('@angular-devkit/build-angular/plugins/karma'),
      ],
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, '../coverage'),
        reports: ['html', 'lcovonly'],
        fixWebpackSourcePaths: true,
      },
      reporters: ['progress', 'junit'],
      junitReporter: {
        outputDir: require('path').join(__dirname, '../junit'),
        outputFile: undefined,
        suite: 'Angularfire-Class Unit Tests',
        useBrowserName: false,
        nameFormatter: undefined,
        classNameFormatter: undefined,
        properties: {},
      },
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: ['Chrome'],
      singleRun: true,
    });
  } else {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage-istanbul-reporter'),
        require('@angular-devkit/build-angular/plugins/karma'),
      ],
      client: {
        clearContext: false, // leave Jasmine Spec Runner output visible in browser
      },
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, '../coverage'),
        reports: ['html', 'lcovonly'],
        fixWebpackSourcePaths: true,
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: ['Chrome'],
      singleRun: true,
    });
  }
};
