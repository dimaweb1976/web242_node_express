import $ from 'jquery';

$(document).ready(()=>{
    $('h3')
    .css({
        color:"red",
        fontSize:"55pt"
    })
    .click(()=>{
        alert("Clicked once")
    })

})