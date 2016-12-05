(function() {
    'use strict';
    angular
        .module('gatewayApp')
        .factory('Registration', Registration);

    Registration.$inject = ['$resource'];

    function Registration ($resource) {
        var resourceUrl =  'trip/' + 'api/registrations/:id';

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
