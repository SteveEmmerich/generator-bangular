'use strict';

var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var utils = require('../util');

var BangularGenerator = yeoman.generators.NamedBase.extend({

    initializing: function () {
        this.appName = _.camelize(this.appname);
        this.controllerName = _.capitalize(_.camelize(this.name)) + 'Ctrl';
        this.dashName = _.dasherize(this.name);
        this.filters = this.config.get('filters');
        this.routes = this.config.get('routes');
        this.routes = this.routes || []
        this.routes.push({value: 'complex', name: 'complex', checked: false});
    },
    prompting: function ()
    {
        var self = this;
        var done = self.async();

        self.prompt([{
            type: 'list',
            name: 'parentState',
            message: 'Which state is the parent',
            choices: self.routes
        },{
            type: 'confirm',
            name: 'import',
            message: 'Do you want to create and import the ' + chalk.blue(self.dashName + '.scss') + ' style in your app.scss?',
            default: false
        }],
        function (props)
        {
            self.parentState  = props.parentState;
            self.import = props.import;
            self.route = props.parentState.url;
            this.controllerName = _.capitalize(_.camelize(this.name)) + _.capitalize(_.camelize(self.parentState)) + 'Ctrl';
            done();
        }.bind(this));
    },

    writing: function ()
    {
        // for consistancy
        var self = this;
        
        var filters = self.config.get('filters');
        var files = ['controller.js', 'view.html'];
        var basePath = 'client/views/' + self.parentState + '/' + self.dashName + '/' + self.dashName + '.' + self.parentState;

    if (self.filters && self.filters.karma) {
      self.template('spec.js', basePath + '.spec.js');
    }
    if (self.filters && self.filters.e2e) {
      self.template('e2e.js', basePath + '.e2e.js');
    }

   // self.template('index.js', basePath + '.js');
    self.template('controller.js', basePath + '.controller.js');
    self.template('view.html', basePath + '.html');

    utils.rewriteFile({
        file: 'client/views/' + self.parentState + '/' + self.parentState + '.js',
        needle: '// sub-state insert',
        splicable: [
            self.dashName + ": {\n\t\t\t\t\t\ttemplateUrl: '" + self.dashName + '.' + self.parentState + ".html',\n\t\t\t\t\t\tcontroller: '" + self.controllerName + "',\n\t\t\t\t\t\tcontrollerAs: 'vm'\n\t\t\t\t\t},"
        ]
    });
    utils.rewriteFile({
        file: 'client/views/' + self.parentState + '/' + self.parentState + '.html',
        needle: '// sub-state insert',
        splicable: [
            '<div ui-view="' + self.dashName + '"></div>'
        ]
    });
  }
});

module.exports = BangularGenerator;