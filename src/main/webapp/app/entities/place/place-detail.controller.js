(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('PlaceDetailController', PlaceDetailController);

    PlaceDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Place'];

    function PlaceDetailController($scope, $rootScope, $stateParams, previousState, entity, Place) {
        var vm = this;

        vm.place = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('gatewayApp:placeUpdate', function(event, result) {
            vm.place = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
