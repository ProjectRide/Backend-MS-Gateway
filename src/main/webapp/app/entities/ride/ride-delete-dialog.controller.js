(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('RideDeleteController',RideDeleteController);

    RideDeleteController.$inject = ['$uibModalInstance', 'entity', 'Ride'];

    function RideDeleteController($uibModalInstance, entity, Ride) {
        var vm = this;

        vm.ride = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Ride.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
