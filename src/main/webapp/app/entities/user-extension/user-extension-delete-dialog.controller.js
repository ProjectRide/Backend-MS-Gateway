(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('UserExtensionDeleteController',UserExtensionDeleteController);

    UserExtensionDeleteController.$inject = ['$uibModalInstance', 'entity', 'UserExtension'];

    function UserExtensionDeleteController($uibModalInstance, entity, UserExtension) {
        var vm = this;

        vm.userExtension = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            UserExtension.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
