
// القائمة
$(document).ready(function () {
    $('#icon').click(function () {
        $('ul').toggleClass('show');
    })
})

document.addEventListener("DOMContentLoaded", function() {
    const animationContainer = document.querySelector(".animation-container");

    function startAnimation() {
        animationContainer.classList.add("move");
    }

    function stopAnimation() {
        animationContainer.classList.remove("move");
    }

    animationContainer.addEventListener("mouseover", startAnimation);
    animationContainer.addEventListener("mouseout", stopAnimation);
});

