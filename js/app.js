"use strict";

// Waiting for content to load 
document.addEventListener("DOMContentLoaded", function () {
    const parallax = document.querySelector(".parallax");

    if (parallax) {
        const content = document.querySelector(".parallax__container");
        const clouds = document.querySelector(".images-parallax__clouds");
        const mountains = document.querySelector(".images-parallax__mountains");
        const human = document.querySelector(".images-parallax__human");

        // Coefficients 
        const forClouds = 40;
        const forMountains = 20;
        const forHuman = 10;

        // Animation speed  
        const speed = 0.05;

        // Variable declaration 
        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            // Style transfer 
            clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%);`;
            mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%);`;
            human.style.cssText = `transform: translate(${positionX / forHuman}%, ${positionY / forHuman}%);`;

            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();

        parallax.addEventListener("mousemove", function (e) {
            // Getting the width and height of the block 
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            // Zero in the middle 
            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            // Receipt of interest 
            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
        });

        // Parallax when scrolling 
        let tresholdSets = [];
        for (let i = 0; i < 1.0; i += 0.005) {
            tresholdSets.push(i);
        }
        const callback = function (entries, observer) {
            const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItemsStyle(scrollTopProcent);
        };
        const observer = new IntersectionObserver(callback, {
            threshold: tresholdSets
        });

        observer.observe(document.querySelector(".content"));

        function setParallaxItemsStyle(scrollTopProcent) {
            content.style.cssText = `transform: translate(0%, -${scrollTopProcent / 9}%);`;
            mountains.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 6}%);`;
            human.parentElement.style.cssText = `transform: translate(0%, -${scrollTopProcent / 3}%);`;
        }
    }
})
