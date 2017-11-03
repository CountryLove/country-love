/* globals $ alert */
/// <reference path="../typings/tsd.d.ts" />

const global = this;

const tokenManager = {
    store: (token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
    },
    retrieve: () => {
        return JSON.parse(sessionStorage.getItem('token'));
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
            console.log(res);
            console.log(tokenManager.retrieve());
            global.location = '/';
        },
        error: err => {
            if(err.status === 401) $('#signin-email').val('email/pass invalid');
        }
    });

});
