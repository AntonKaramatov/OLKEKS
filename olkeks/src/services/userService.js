import $ from 'jquery'

class UserService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    register(user) {
        let url = this.url;
        return new Promise(
            function(resolve, reject) {
                $.ajax({
                    url: `${url}/register`,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(user)
                }).done(resolve).fail(reject);
            }
        );
    }

    login(user) {
        let url = this.url;
        return new Promise(
            function(resolve, reject) {
                $.ajax({
                    url: `${url}/login`,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(user)
                }).done(resolve).fail(reject);
            }
        );
    }

    logout() {
        let url = this.url;
        return new Promise(
            function(resolve, reject) {
                $.ajax({
                    url: `${url}/logout`,
                    dataType: 'json',
                    type: 'GET'
                }).done(resolve).fail(reject);
            }
        );
    }
}

export default UserService;