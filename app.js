$(document).ready(function() {
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
    };
    
    // .sidebar-menu Toggle  
    if ( $("#menu-toggle").length > 0 ) { 
        $("#menu-toggle").click(debounce(function(e) {
            $(this).toggleClass('open');
            if( $(".sidebar-menu").length > 0 ) {
                $(".sidebar-menu").toggleClass("active");
            }
        }));
    }

    // .sidebar-menu Close  
    if ( $(".sidebar-menu-close").length > 0 ) { 
        $(".sidebar-menu-close").click(debounce(function(e) {
                $("#menu-toggle").removeClass('open');
                $(".sidebar-menu.active").removeClass("active");
        }));
    }


    // Close or Hide .sidebar-menu when Click Outside 
    $(document).on('click', debounce(function (e) {
        var container = $(".sidebar-menu");
        // If the target of the click isn't the container
        if(!container.is(e.target) && container.has(e.target).length === 0){
            $("#menu-toggle").removeClass('open');
            $(".sidebar-menu.active").removeClass("active");
        }
    }));

    // beforebegin Method add new Element the HTML into the container before the element
    var inner_value = `<span class="sub-toggle">
                    <svg width="14" height="14" viewBox="0 0 8 16">
                        <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z"></path>
                    </svg>
                </span>`;

    if ( $(".sub-menu").length > 0 ) { 
        $(".sub-menu").each( function( index, value ) {
            value.insertAdjacentHTML('beforebegin', inner_value);
        });
    }

    // .sidebar-menu > .sub-menu > .sub-toggle |&and&|.sidebar-menu > .sub-menu.active Toggle 
    if ( $(".sub-toggle").length > 0 ) {
        $(".sub-toggle").click(debounce(function(e) {
            $(this).toggleClass('open');

            var sub_menu = $(this).next();
            if (sub_menu.height() == "0px" || sub_menu.height() == "") {
                sub_menu.animate({
                    height: sub_menu.get(0).scrollHeight
            }, 500, function(){
                    $(this).height('auto');
            });
            } else {
                sub_menu.animate({
                height: "0"
            }, 500);
            }
        }));
    }

});


