'use strict';

angular.module('<%= appname %>')
  .config(function ( <% if (filters.uirouter) { %> $stateProvider <% } else { %> $routeProvider <% } %>) {
    <% if (filters.uirouter)
    { %>
        $stateProvider
            .state('<%= dashName %>',
            {
                url: '<%= route %>',
                templateUrl: 'views/<%= dashName %>/<%= dashName %>.html',
                controller: '<%= controllerName %>',
                controllerAs: 'vm'
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
