/* globals $ alert */
/// <reference path="../typings/tsd.d.ts" />


$(document).ready(function() {

    var $restrictedLinks = $('.restricted-link');
    var $aggregationLinks = $('#aggregation-links a');
    var $sampleAggregations = $('.sample-aggregation');
    var $signin = $('.login-link');
    var $logout = $('#logout-link');

    var validUser = sessionStorage.getItem('thing');

    $sampleAggregations.show();
    if(validUser) {
        $signin.hide();
        $restrictedLinks.show();
        $aggregationLinks.show();

    }

    $restrictedLinks.click(function(event) {
        if(!validUser) return false;
    });
    $logout.click(function() {
        sessionStorage.removeItem('thing');
    });
});



// $(document).ready(function() {
//     $('.restricted-link').click(function() {
//         console.log('HEY');
//         if(!sessionStorage.getItem('token')) return false;
//     });
// });