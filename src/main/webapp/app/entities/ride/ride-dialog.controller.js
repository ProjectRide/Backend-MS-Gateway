(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('RideDialogController', RideDialogController);

    RideDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Ride', 'Place', 'Reservation'];

    function RideDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Ride, Place, Reservation) {
        var vm = this;

        vm.ride = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.startplaces = Place.query({filter: 'ride-is-null'});
        $q.all([vm.ride.$promise, vm.startplaces.$promise]).then(function() {
            if (!vm.ride.startPlace || !vm.ride.startPlace.id) {
                return $q.reject();
            }
            return Place.get({id : vm.ride.startPlace.id}).$promise;
        }).then(function(startPlace) {
            vm.startplaces.push(startPlace);
        });
        vm.endplaces = Place.query({filter: 'ride-is-null'});
        $q.all([vm.ride.$promise, vm.endplaces.$promise]).then(function() {
            if (!vm.ride.endPlace || !vm.ride.endPlace.id) {
                return $q.reject();
            }
            return Place.get({id : vm.ride.endPlace.id}).$promise;
        }).then(function(endPlace) {
            vm.endplaces.push(endPlace);
        });
        vm.reservations = Reservation.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.ride.id !== null) {
                Ride.update(vm.ride, onSaveSuccess, onSaveError);
            } else {
                Ride.save(vm.ride, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('gatewayApp:rideUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.startDateTime = false;
        vm.datePickerOpenStatus.createdAt = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
