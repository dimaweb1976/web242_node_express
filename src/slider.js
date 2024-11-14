import SliderPro, { Autoplay, Buttons, Thumbnails } from 'slider-pro-js';
//import 'slider-pro-js/css/core';
//import 'slider-pro-js/build/slider-pro.css';
document.addEventListener( 'DOMContentLoaded', () => {
    const mySlider = new SliderPro( '#my-slider', {
        addOns: [ Autoplay, Buttons, Thumbnails, ],
        width: '100vw',
        imageScaleMode:'cover',
        arrows:true
    });
})
