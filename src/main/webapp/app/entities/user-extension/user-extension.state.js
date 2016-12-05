(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('user-extension', {
            parent: 'entity',
            url: '/user-extension',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'gatewayApp.userExtension.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-extension/user-extensions.html',
                    controller: 'UserExtensionController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userExtension');
                    $translatePartialLoader.addPart('sex');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('user-extension-detail', {
            parent: 'entity',
            url: '/user-extension/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'gatewayApp.userExtension.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/user-extension/user-extension-detail.html',
                    controller: 'UserExtensionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('userExtension');
                    $translatePartialLoader.addPart('sex');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'UserExtension', function($stateParams, UserExtension) {
                    return UserExtension.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'user-extension',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('user-extension-detail.edit', {
            parent: 'user-extension-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-extension/user-extension-dialog.html',
                    controller: 'UserExtensionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['UserExtension', function(UserExtension) {
                            return UserExtension.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('user-extension.new', {
            parent: 'user-extension',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-extension/user-extension-dialog.html',
                    controller: 'UserExtensionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                sex: null,
                                birthdate: null,
                                memberSince: null,
                                firstName: null,
                                lastName: null,
                                phoneNumber: null,
                                image: null,
                                imageContentType: null,
                                aboutMe: null,
                                userId: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('user-extension', null, { reload: 'user-extension' });
                }, function() {
                    $state.go('user-extension');
                });
            }]
        })
        .state('user-extension.edit', {
            parent: 'user-extension',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-extension/user-extension-dialog.html',
                    controller: 'UserExtensionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['UserExtension', function(UserExtension) {
                            return UserExtension.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-extension', null, { reload: 'user-extension' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('user-extension.delete', {
            parent: 'user-extension',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/user-extension/user-extension-delete-dialog.html',
                    controller: 'UserExtensionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['UserExtension', function(UserExtension) {
                            return UserExtension.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('user-extension', null, { reload: 'user-extension' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
