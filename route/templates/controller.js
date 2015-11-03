'use strict';

angular.module('<%= appName %>')
  .controller('<%= controllerName %>', function ($log) {

    angular.extend(this, {
      name: '<%= controllerName %>'
    });

  });
