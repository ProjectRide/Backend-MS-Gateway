(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('RegistrationDetailController', RegistrationDetailController);

    RegistrationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Registration', 'Ride'];

    function RegistrationDetailController($scope, $rootScope, $stateParams, previousState, entity, Registration, Ride) {
        var vm = this;

        vm.registration = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('gatewayApp:registrationUpdate', function(event, result) {
            vm.registration = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
