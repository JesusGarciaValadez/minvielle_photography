//  @codekit-prepend "plugins.js";
/**
 *
 *  @function
 *  @description:   Anonimous function autoexecutable
 *  @params jQuery $.- An jQuery object instance
 *  @params window window.- A Window object Instance
 *  @author: @_Chucho_
 *
 */
( function ( $, window, document, undefined ) {
    //  Revisa la disponibilidad de localStorage
    var storage, deviceWidth, isPortable, typeOfDevice, minDeviceWidth  = 320, maxDeviceWidth = 568, timeLapseOfCarrousel    = 6000;

    if( 'localStorage' in window && window.localStorage !== null ) {
        storage = localStorage;
    } else {
        try {
            if ( localStorage.getItem ) {
                storage = localStorage;
            }
        } catch( e ) {
            storage = {};
        }
    }

    //  When DOM is loaded
    $( function ( ) {

        window.navigator.userAgent = userAgent    = ( window.navigator.userAgent );
        //( deviceWidth >= minDeviceWidth && deviceWidth <= maxDeviceWidth ) ? isPortable  = true : isPortable  = false;
        ( userAgent.indexOf( 'iPhone ' ) || userAgent.indexOf( 'Android' ) ) ? isPortable  = true : isPortable  = false;

        window.typeOfDevice = typeOfDevice  = ( isPortable ) ? "mobile" : "desktop";

        window.isPortable   = isPortable;

        if ( isPortable ) { //  Si es un móvil...


        } //  Si es un móvil...

        MDMinvielle.init();
    } );

    //  When page is finished loaded
    $( 'document' ).ready( function ( e ) {

        // Inicialización de carrusel de imágenes
        if ( $( '.scrollable_main_photography' ).exists() ) {

            MDMinvielle.inicializeCarrousel( '.scrollable_main_photography', {
                speed: 300,
                circular: true,
                keyboard: false,
                items: '.items_glympse',
                next: '',
                prev: ''
            }, {
                activeClass: "active",
                navi: ".navigation",
                naviItem: "a",
                indexed: false
            }, {
                steps: 1,
                interval: 5000,
                autoplay: true,
                autopause: false
            } );
        }

        // Inicialización de carrusel de imágenes
        if ( $( '.scrollable_categories' ).exists() ) {
            MDMinvielle.inicializeCarrousel( '.scrollable_categories', {
                speed: 300,
                circular: false,
                keyboard: false,
                items: '.items_categories',
                next: '.next',
                prev: '.prev'
            }, {}, {
                steps: 1,
                interval: 5000,
                autoplay: false,
                autopause: false
            } );
        }
        console.log('hi');
        if ( $( '.category,.album' ).exists() ) {
            console.log('hi');
            // Masonry para la sección de categorias
            $( '.masonry' ).masonry( {
                columnWidth:    widthThumbnailCategory,
                itemSelector:   '.item'
            } );
        }
    } );
} ) ( jQuery, window, document );