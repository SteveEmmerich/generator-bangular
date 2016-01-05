'use strict';

angular.module('<%= appname %>')
  .config(function ( <% if (filters.uirouter) { %> $stateProvider <% } else { %> $routeProvider <% } %>) {
    <% if (filters.uirouter)
    { %>
        $stateProvider
            .state('<%= dashName %>',
            {
                views:
                {
                    '': {
                        url: '<%= route %>',
                        templateUrl: 'views/<%= dashName %>/<%= dashName %>.html',
                        controller: '<%= controllerName %>',
                        controllerAs: 'vm'
                    },
                    // sub-state insert
                }
            });
    <% } else { %>
        $routeProvider
          .when('<%= route %>', {
            templateUrl: 'views/<%= dashName %>/<%= dashName %>.html',
            controller: '<%= controllerName %>',
            controllerAs: 'vm'
          });
    <% } %>
  });
