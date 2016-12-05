(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('ride', {
            parent: 'entity',
            url: '/ride',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'gatewayApp.ride.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/ride/rides.html',
                    controller: 'RideController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('ride');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('ride-detail', {
            parent: 'entity',
            url: '/ride/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'gatewayApp.ride.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/ride/ride-detail.html',
                    controller: 'RideDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('ride');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Ride', function($stateParams, Ride) {
                    return Ride.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'ride',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('ride-detail.edit', {
            parent: 'ride-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ride/ride-dialog.html',
                    controller: 'RideDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Ride', function(Ride) {
                            return Ride.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('ride.new', {
            parent: 'ride',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ride/ride-dialog.html',
                    controller: 'RideDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                driverId: null,
                                startDateTime: null,
                                flexibleStartPlace: null,
                                flexibleEndPlace: null,
                                price: null,
                                numberOfSeats: null,
                                description: null,
                                createdAt: null,
                                deleted: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('ride', null, { reload: 'ride' });
                }, function() {
                    $state.go('ride');
                });
            }]
        })
        .state('ride.edit', {
            parent: 'ride',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ride/ride-dialog.html',
                    controller: 'RideDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Ride', function(Ride) {
                            return Ride.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('ride', null, { reload: 'ride' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('ride.delete', {
            parent: 'ride',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/ride/ride-delete-dialog.html',
                    controller: 'RideDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Ride', function(Ride) {
                            return Ride.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('ride', null, { reload: 'ride' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
