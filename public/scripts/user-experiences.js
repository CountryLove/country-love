/* globals $ sessionStorage Handlebars */
/// <reference path="../typings/tsd.d.ts" />




function updateExps() {
    
    const $expDiv = $('#user-exps-div');
    $expDiv.empty();

    $.ajax({
        type: 'GET',
        url: `/api/agg/userExpLogAuto?email=${sessionStorage.getItem('email')}`,
        success: res => {
            let template = Handlebars.compile($('#experience-log-template').text());            
            res[0].countries.forEach(exp => $expDiv.append(template(exp)));
        }
    });
}


$(() => {

    $.ajax({
        type: 'GET',
        url: '/api/countries',
        success: res => {

            const $countryInput = $('#country-input');
            let template = Handlebars.compile($('#country-option-template').text());
            res
                .sort((a, b) => a.name > b.name)
                .forEach(countryData => $countryInput.append(template(countryData)));
        }
    });

    updateExps();

    $('#user-input').submit(function(event) {
        event.preventDefault();
        const data = {
            country: $('#country-input').val(),
            rating: parseInt($('#rating-input').val()),
            city: $('#city-input').val(),
            tags: $('#tags-input').val().split(' '),
            comment: $('#comment-input').val()
        };
        
        $.ajax({
            type: 'POST',
            url: '/api/experiences/',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            headers: {'Authorization': sessionStorage.getItem('thing')},
            datatype: 'json',
            success: updateExps,
            error: err => {
                console.log(err); // eslint-disable-line
            }
        });
    });
});