/* globals $ sessionStorage */
/// <reference path="../typings/tsd.d.ts" />

const global = this;

const tokenManager = {
    store: (token, email) => {
        sessionStorage.setItem('thing', token);
        sessionStorage.setItem('email', email);
    },
    retrieve: () => {
        return sessionStorage.getItem('thing');
    }
};


$('#signin-form').submit( function(event) {
    event.preventDefault();

    const data = {
        email: $('#signin-email').val(),
        password: $('#signin-pass').val(),
    };

    $.ajax({
        type: 'POST',
        url: '/api/auth/signin',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: res => {
            tokenManager.store(res.token, data.email);
            global.location = '/';
        },
        error: err => {
            if(err.status === 401) $('#signin-email').val('email/pass invalid');
        }
    });

});
