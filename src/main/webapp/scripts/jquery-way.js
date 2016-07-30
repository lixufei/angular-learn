$(document).ready(function () {
    $('.main').append('<h2>Hello jQuery!</h2>');
    $('.jQueryInput').keyup(function () {
        inputVal = $('.jQueryInput').val();
        $('.getInpputValue').text(inputVal);
    });
    $.ajax({
            url: '/api/pets',
            method: 'get',
            success: function (pets) {
                console.log('pets', pets);
            }
        }
    );
    $.ajax({
            url: '/api/pets',
            method: 'get',
            success: function (pets) {
                for(i=0;i<pets.length;i++) {
                    $('.overRoll').append('<li>' + pets[i].name + '</li>');
                }
            }
        }
    );
});