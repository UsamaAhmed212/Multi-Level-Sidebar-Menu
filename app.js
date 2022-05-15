"use strict";
window.addEventListener('load', function (event) {
    // Debounce Handler
    function debounce(fn, delay = 300, immediate = true) {
        let timeout;
        return function executedFunction(e) {
            e.stopPropagation();
            e.preventDefault();
            
            let context = this;
            let args = arguments;
            let callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(function() {
                timeout = null;
                if (!immediate) fn.apply(context, args);
                    
            }, delay);

            if (callNow) fn.apply(context, args);
        };
    }

    
    // .sidebar-menu Toggle  
    const menu_toggle = document.querySelector("#menu-toggle");
    const sidebar_menu = document.querySelector(".sidebar-menu");

    if(menu_toggle != null) {
        menu_toggle.addEventListener('click', debounce(function(e) {
            this.classList.toggle("open");
            if(sidebar_menu != null) {
                sidebar_menu.classList.toggle("active");
            }
        }));
    }
});