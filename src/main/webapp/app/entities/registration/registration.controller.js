(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['$scope', '$state', 'Registration'];

    function RegistrationController ($scope, $state, Registration) {
        var vm = this;
        
        vm.registrations = [];

        loadAll();

        function loadAll() {
            Registration.query(function(result) {
                vm.registrations = result;
            });
        }
    }
})();
