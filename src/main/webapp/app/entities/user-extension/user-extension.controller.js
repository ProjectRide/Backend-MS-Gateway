(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('UserExtensionController', UserExtensionController);

    UserExtensionController.$inject = ['$scope', '$state', 'DataUtils', 'UserExtension'];

    function UserExtensionController ($scope, $state, DataUtils, UserExtension) {
        var vm = this;
        
        vm.userExtensions = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            UserExtension.query(function(result) {
                vm.userExtensions = result;
            });
        }
    }
})();
