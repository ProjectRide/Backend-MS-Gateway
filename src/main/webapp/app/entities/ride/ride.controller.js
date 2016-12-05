(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('RideController', RideController);

    RideController.$inject = ['$scope', '$state', 'Ride'];

    function RideController ($scope, $state, Ride) {
        var vm = this;
        
        vm.rides = [];

        loadAll();

        function loadAll() {
            Ride.query(function(result) {
                vm.rides = result;
            });
        }
    }
})();
