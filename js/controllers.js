function AcronymsSearchCtrl($scope, $http) {
    "use strict";

    $scope.filter = {};
    $scope.filter.value = "";
    $scope.acronyms = [];

    $http.get('data/list.json').success(function (data) {
        $scope.acronyms = data;
    });


    $scope.getFilteredAcronyms = function () {
        function compareAcronyms(value) {
            var re = new RegExp(this.filter.value, "i");
            return re.test(value.id) || re.test(value.value);
        }
        if ($scope.filter.value === "") {
            return [];
        }
        return $scope.acronyms.filter(compareAcronyms, $scope);
    };
}
