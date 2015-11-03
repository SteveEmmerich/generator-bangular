'use strict';

angular.module('<%= appname %>')
  .config(function (<% if (filters.uirouter) { %> $stateProvider <% } else { %> $routeProvider <% } %>) {
    <% if (filters.uirouter)
    { %>
    $stateProvider
        .state('home',
        {
            url: '/',
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
        });    
    <% } else { %>
    $routeProvider
          .when('/', {
            templateUrl: 'views/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
          });
    <% } %>
  });
