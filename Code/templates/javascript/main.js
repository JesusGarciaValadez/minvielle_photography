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
    } );

    //  When page is finished loaded
    $( 'document' ).ready( function ( e ) {

        
    } );
} ) ( jQuery, window, document );