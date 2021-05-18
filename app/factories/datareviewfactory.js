covid19App.factory('datareviewFactory', function($q, $http) {
    var factory = {};

    factory.runSql = function (data) {
        return $http({
            method: 'POST',
            url: "app/ajax/runsql.php",
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
    }

    return factory;
});