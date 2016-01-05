'use strict';

angular.module('<%= appName %>')
    .controller('<%= controllerName %>',
        function ($log)
        {
            var vm = this;
            angular.extend(vm, {
                name: '<%= controllerName %>'
            });
        });