(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('UserExtensionDetailController', UserExtensionDetailController);

    UserExtensionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'UserExtension'];

    function UserExtensionDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, UserExtension) {
        var vm = this;

        vm.userExtension = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('gatewayApp:userExtensionUpdate', function(event, result) {
            vm.userExtension = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
