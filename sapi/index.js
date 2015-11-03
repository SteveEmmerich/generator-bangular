'use strict';

var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var utils = require('../util');

var BangularGenerator = yeoman.generators.NamedBase.extend({

  prompting: function () {
    var done = this.async();

    this.instanceName = _.camelize(this.name);
    this.instancesName = _.camelize(this.name) + 's';

    this.fileName = _.decapitalize(_.dasherize(this.name));
    this.routeName = this.fileName + 's';

    this.objectName = _.capitalize(_.camelize(this.name));
    this.objectsName = this.objectName + 's';

    var filters = this.config.get('filters');
    this.filters = filters || {};

    var prompts = [{
      type: 'input',
      name: 'namespace',
      message: 'On which namespace do you want to attach the ' + chalk.red(this.objectName) + ' endpoint? ',
      default: '/api/' + this.routeName
    },
    {
        type: 'confirm',
        name: 'model',
        message: 'Do you want to attach the ' + chalk.red(this.objectName) + ' socket to a model? ',
        default: false
    }];

    if (filters && filters.ngResource) {
      prompts.push({
        type: 'confirm',
        name: 'service',
        message: 'Do you want to generate the associated service?',
        default: false
      });
    }

    this.prompt(prompts, function (props) {
        this.namespace  = props.namespace;
        this.resource   = props.resource;
        this.model      = props.model;
      done();
    }.bind(this));
  },

  writing: function () {

    var filters = this.config.get('filters');
    var filesByBackendType = {
      mongo: ['controller.js', 'model.js'],
      json: ['controller.js', 'data.json', 'model.js', 'socket.js'],
      restock: ['controller.js']
    };

    if (filters && filters.mocha) {
      filesByBackendType.mongo.push('spec.js');
    }

    if (this.model)
    {
       // this.template('index.js', 'server/api/' + this.fileName + '/index.js');

        filesByBackendType[filters.backend].forEach(function (file) {
          this.template(filters.backend + '/' + file, 'server/api/' + this.fileName + '/' + this.fileName + '.' + file);
        }.bind(this));

        utils.rewriteFile({
            file: 'server/config/sockets.js',
            needle: '// nps insert',
            splicable: [
                'require(\'../api/' + this.fileName + '/' + this.fileName + '.socket.js\').register(io);'
            ]
        });
    }
    else
    {
        this.template('socket.js', 'server/api/' + this.fileName + '/' + this.fileName + '.socket.js');

        utils.rewriteFile({
            file: 'server/config/sockets.js',
            needle: '// nps insert',
            splicable: [
                'require(\'../api/' + this.fileName + '/' + this.fileName + '.socket.js\').register(io);'
            ]
        });
    }
    if (this.resource) {
      this.template('service.js', 'client/services/' + this.fileName + '/' + this.fileName + '.js');
    }
  }
});

module.exports = BangularGenerator;
