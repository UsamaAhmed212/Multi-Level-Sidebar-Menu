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
    
    // .sidebar-menu Close  
    const sidebar_menu_close = document.querySelector(".sidebar-menu-close");

    if(sidebar_menu_close != null) {
        sidebar_menu_close.addEventListener('click', debounce(function(e) {
            const sidebar_menu_active = document.querySelector(".sidebar-menu.active");
            
            menu_toggle.classList.remove("open");
            sidebar_menu_active.classList.remove("active");
        }));
    }
    
    // Close or Hide .sidebar-menu when Click Outside 
    window.addEventListener('click', function(e) {
        if ( menu_toggle.classList.contains("open") && sidebar_menu.classList.contains("active") ) {
            if ( sidebar_menu !== e.target && !sidebar_menu.contains(e.target) ) {
                menu_toggle.classList.remove('open');
                const sidebar_menu_active = document.querySelector(".sidebar-menu.active");
                sidebar_menu_active.classList.remove("active");
            }
        }
    });
});