(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .controller('UserExtensionDialogController', UserExtensionDialogController);

    UserExtensionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'UserExtension'];

    function UserExtensionDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, UserExtension) {
        var vm = this;

        vm.userExtension = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.userExtension.id !== null) {
                UserExtension.update(vm.userExtension, onSaveSuccess, onSaveError);
            } else {
                UserExtension.save(vm.userExtension, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('gatewayApp:userExtensionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.birthdate = false;
        vm.datePickerOpenStatus.memberSince = false;

        vm.setImage = function ($file, userExtension) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        userExtension.image = base64Data;
                        userExtension.imageContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
