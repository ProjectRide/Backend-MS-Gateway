(function() {
    'use strict';

    angular
        .module('gatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('reservation', {
            parent: 'entity',
            url: '/reservation',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'gatewayApp.reservation.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/reservation/reservations.html',
                    controller: 'ReservationController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('reservation');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('reservation-detail', {
            parent: 'entity',
            url: '/reservation/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'gatewayApp.reservation.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/reservation/reservation-detail.html',
                    controller: 'ReservationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('reservation');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Reservation', function($stateParams, Reservation) {
                    return Reservation.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'reservation',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('reservation-detail.edit', {
            parent: 'reservation-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/reservation/reservation-dialog.html',
                    controller: 'ReservationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Reservation', function(Reservation) {
                            return Reservation.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('reservation.new', {
            parent: 'reservation',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/reservation/reservation-dialog.html',
                    controller: 'ReservationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                passengerId: null,
                                confirmed: null,
                                cancled: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('reservation', null, { reload: 'reservation' });
                }, function() {
                    $state.go('reservation');
                });
            }]
        })
        .state('reservation.edit', {
            parent: 'reservation',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/reservation/reservation-dialog.html',
                    controller: 'ReservationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Reservation', function(Reservation) {
                            return Reservation.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('reservation', null, { reload: 'reservation' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('reservation.delete', {
            parent: 'reservation',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/reservation/reservation-delete-dialog.html',
                    controller: 'ReservationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Reservation', function(Reservation) {
                            return Reservation.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('reservation', null, { reload: 'reservation' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
