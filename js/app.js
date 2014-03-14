/*global angular: false */
/*global AcronymsSearchCtrl: false */
angular.module('acronyms', ['ngRoute']).
    config(function ($routeProvider, $locationProvider) {
        "use strict";
        $routeProvider.
            when('/acronyms/search', {templateUrl: 'partials/search.html', controller: AcronymsSearchCtrl}).
            otherwise({redirectTo: '/acronyms/search'});
        $locationProvider.hashPrefix('!');
    });
