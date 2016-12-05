(function() {
    'use strict';
    angular
        .module('gatewayApp')
        .factory('Ride', Ride);

    Ride.$inject = ['$resource', 'DateUtils'];

    function Ride ($resource, DateUtils) {
        var resourceUrl =  'ride/' + 'api/rides/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.startDateTime = DateUtils.convertDateTimeFromServer(data.startDateTime);
                        data.createdAt = DateUtils.convertDateTimeFromServer(data.createdAt);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
