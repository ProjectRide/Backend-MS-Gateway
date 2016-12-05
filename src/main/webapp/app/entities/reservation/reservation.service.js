(function() {
    'use strict';
    angular
        .module('gatewayApp')
        .factory('Reservation', Reservation);

    Reservation.$inject = ['$resource'];

    function Reservation ($resource) {
        var resourceUrl =  'ride/' + 'api/reservations/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
