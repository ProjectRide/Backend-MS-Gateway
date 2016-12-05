(function() {
    'use strict';
    angular
        .module('gatewayApp')
        .factory('UserExtension', UserExtension);

    UserExtension.$inject = ['$resource', 'DateUtils'];

    function UserExtension ($resource, DateUtils) {
        var resourceUrl =  'authentication/' + 'api/user-extensions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.birthdate = DateUtils.convertLocalDateFromServer(data.birthdate);
                        data.memberSince = DateUtils.convertDateTimeFromServer(data.memberSince);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.birthdate = DateUtils.convertLocalDateToServer(copy.birthdate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.birthdate = DateUtils.convertLocalDateToServer(copy.birthdate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
