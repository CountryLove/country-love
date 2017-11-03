/* globals $ alert */
/// <reference path="../typings/tsd.d.ts" />

const global = this;

const tokenManager = {
    store: (token) => {
        sessionStorage.setItem('thing', JSON.stringify(token));
    },
    retrieve: () => {
        return JSON.parse(sessionStorage.getItem('thing'));
    }
};


$('#signup-form').submit( function(event) {
    event.preventDefault();

    const data = {
        name: $('#signup-name').val(),
        password: $('#signup-pass').val(),
        email: $('#signup-email').val(),
        home: $('#signup-home').val(),
    };

    $.ajax({
        type: 'POST',
        url: '/api/auth/signup',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: res => {
            tokenManager.store(res);
            global.location = '/';
        },
        error: err => {
            if(err.status === 400) $('#signup-email').val('Email invalid or already in use.');
        }
    });

});
