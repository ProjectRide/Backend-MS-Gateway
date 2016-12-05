(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('RideDetailController', RideDetailController);

    RideDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Ride', 'Place', 'Reservation'];

    function RideDetailController($scope, $rootScope, $stateParams, previousState, entity, Ride, Place, Reservation) {
        var vm = this;

        vm.ride = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('gatewayApp:rideUpdate', function(event, result) {
            vm.ride = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
