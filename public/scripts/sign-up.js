/* globals $ alert */
/// <reference path="../typings/tsd.d.ts" />

const global = this;

const tokenManager = {
    store: (token, email) => {
        sessionStorage.setItem('thing', token);
        sessionStorage.setItem('email', email);
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
            tokenManager.store(res.token, data.email);
            global.location = '/';
        },
        error: err => {
            if(err.status === 400) $('#signup-email').val('Email invalid.');
            else if(err.status === 404) $('#signup-email').val('Email is already in use.')
        }
    });

});
