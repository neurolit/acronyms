function AcronymsSearchCtrl($scope, $http) {
    "use strict";

    var options = {
            keys: ['id', 'value']
        },
        fuse ; 

    $scope.filter = {};
    $scope.filter.value = "";
    $scope.acronyms = [];

    $http.get('data/list.json').success(function (data) {
        $scope.acronyms = data.sort(function (a,b) { return a.id < b.id ; });
        fuse = new Fuse($scope.acronyms, options);
    });


    $scope.getFilteredAcronyms = function () {
        function compare(value) {
            var re = new RegExp (this.filter.value,"i")  
            return re.test(value.id);
        }
        if ($scope.filter.value === "") {
            return [];
        }
        return fuse.search($scope.filter.value);
    }
}
