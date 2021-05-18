var covid19App = angular.module ('covid19App', [
    'ngRoute', 
    'ngAnimate', 
    'ngTouch', 
    'ui.grid', 
    'ui.grid.selection', 
    'ngSanitize',
    'chart.js']);

// define routes for app
covid19App.config(function ($routeProvider) {
    $routeProvider
        .when('/home',
            {
                controller: 'homeController',
                templateUrl: 'app/partials/home.html'
            }) 
        .when('/sql',
            {
                controller: 'sqlController',
                templateUrl: 'app/partials/sql.html'
            })   
        .when('/charts',
            {
                controller: 'chartsController',
                templateUrl: 'app/partials/charts.html'
            })   
        .when('/faqs',
            {
                controller: 'faqsController',
                templateUrl: 'app/partials/faqs.html'
            })       
        .when('/resources',
            {
                controller: 'resourcesController',
                templateUrl: 'app/partials/resources.html'
            }) 
        .when('/contact',
            {
                controller: 'contactController',
                templateUrl: 'app/partials/contact.html'
            })                         
        .when('/login',
            {
                controller: 'loginController',
                templateUrl: 'app/partials/login.html'
            }) 

        .otherwise({redirectTo: '/home' });
});