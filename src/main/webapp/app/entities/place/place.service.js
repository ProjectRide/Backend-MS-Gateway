(function() {
    'use strict';
    angular
        .module('gatewayApp')
        .factory('Place', Place);

    Place.$inject = ['$resource'];

    function Place ($resource) {
        var resourceUrl =  'ride/' + 'api/places/:id';

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
