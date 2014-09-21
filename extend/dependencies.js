var bower = require('bower')
  , npm = require('npm')
  , async = require('async')
  , bowerJSON = require('../bower.json')
  , packageJSON = require('../package.json');

module.exports.bower = function (done) {
  var steps = {};

  Object.keys(bowerJSON.dependencies).forEach(function (project) {
    steps[project] = function (next) {
      bower.commands.info(project)
        .on('end', function (data) {
          next(null, data.latest);
        })
        .on('error', function () {
          next(null);
        });
    };
  });

  async.parallel(steps, function (err, projects) {
    Object.keys(projects).forEach(function (project) {
      if (!projects[project] || !projects[project].homepage || projects[project].homepage.indexOf('github.com') === -1) {
        delete projects[project];
      }
    });

    done(projects);
  });
};

module.exports.node = function (done) {
  npm.load(packageJSON, function (err, npm) {
    var steps = {};

    Object.keys(packageJSON.dependencies || {}).forEach(function (project) {
      steps[project] = function (next) {
        npm.commands.view([project], true, function (err, project) {
          next(null, !err && project[Object.keys(project).shift()] || null);
        });
      };
    });

    async.parallel(steps, function (err, projects) {
      Object.keys(projects).forEach(function (project) {
        if (!projects[project] || !projects[project].homepage || projects[project].homepage.indexOf('github.com') === -1) {
          delete projects[project];
        }
      });

      done(projects);
    });
  });
};
