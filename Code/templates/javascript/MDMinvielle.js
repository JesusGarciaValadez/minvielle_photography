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

    var _MDMinvielle    = window._MDMinvielle,
    // Use the correct document accordingly with window argument (sandbox)
    document    = window.document,
    location    = window.location,
    navigator   = window.navigator,
    // Map over MDMinvielle in case of overwrite
    _MDMinvielle    = window.MDMinvielle;
    // Define a local copy of MDMinvielle
    MDMinvielle = function() {
        if ( !( this instanceof MDMinvielle ) ) {
            // The MDMinvielle object is actually just the init constructor 'enhanced'
            return new MDMinvielle.fn.init();
        }
        return MDMinvielle.fn.init();
    };

    MDMinvielle.overlay;
    MDMinvielle.closer;
    MDMinvielle.radio;
    MDMinvielle.tool;
    MDMinvielle.columnWidth = 188;

    //  Object prototyping
    MDMinvielle.fn = MDMinvielle.prototype = {
        /**
         *
         *  @function:  !constructor
         *  @description:   Constructor method
         *  @author: @_Chucho_
         *
         */
        //  Método constructor
        constructor:    MDMinvielle,
        /**
         *
         *  @function:  !init
         *  @description:   Inicializer method
         *  @author: @_Chucho_
         *
         */
        //  !Método inicializador
        init:                   function ( ) {
            //MDMinvielle.obtainActualDocument();
            if( $( window ).innerWidth() <= 568 ) {
                MDMinvielle.columnWidth = 50;
            } else if ( $( window ).innerWidth() >= 569 && $( window ).innerWidth() <= 1918 ) {
                MDMinvielle.columnWidth = 22;
            } else {
                MDMinvielle.columnWidth = 347;
            }
        },
        /**
         *
         *  @function:  !smoothScroll
         *  @description:   Do smooth scroll for the anchors in menu
         *  @params jQuery selector.- A jQuery Selector
         *  @params Number durationInSec.- A number to indicate the duration of
         *                                 the animation
         *  @see:   http://flesler.blogspot.com/2007/10/jqueryscrollto.html
         *  @author: @_Chucho_
         *
         */
        //  !Realiza el efecto para dar la impresión de scroll "suavizado"
        smoothScroll:           function ( selector, durationInSec ) {

            var _selector       = ( typeof( selector ) === "undefined" ) ? "*" : selector;
            _selector       = ( typeof( _selector ) === "object" ) ? _selector : ( typeof( _selector ) === "number" ) ? _selector : $( _selector );

            var _durationInSec  = ( durationInSec === "" ) ? 1000 : durationInSec;
            _durationInSec  = ( typeof( _durationInSec ) === "string" ) ? parseInt( _durationInSec ) : _durationInSec;
            _durationInSec  = ( typeof( _durationInSec ) !== "number" ) ? parseInt( _durationInSec ) : _durationInSec;
            var _scrollYOffset;

            if ( typeof( _selector ) === "object" ) {

                _scrollYOffset  = _selector.offset().top;
                _scrollYOffset  = Math.ceil ( Number( _scrollYOffset ) );
            } else if ( typeof( _selector ) === "number" ) {

                _scrollYOffset  = _selector;
            }

            $.scrollTo( _scrollYOffset, {
                duration: _durationInSec,
                axis: 'y'
            } );
        },
        /**
         *
         *  @function:  !managerTimelineFill
         *  @description:   Carrousel inicializer
         *  @params jQuery slider.- A jQuery Selector
         *  @params String progressBar.- A class to add to target
         *  @params Object ui.- An object with css properties to apply to the jQuery selector
         *  @params Number leftOffset.- A number to indicate the duration of the animation
         *  @params Number rightOffset.- A number to indicate the duration of the animation
         *  @see:   http://jquerytools.org
         *  @author: @_Chucho_
         *
         */
        //  !Inicializador de un carrusel jQuery Tools
        inicializeCarrousel:    function ( selector, optionsScrollable, optionsNavigator, optionsAutoscroll ) {

            var _selector;
            _selector       = ( typeof( selector )  === "undefined" ) ? "*" : selector;
            _selector       = ( typeof( _selector ) === "object" )    ? _selector : $( _selector );

            if( !optionsScrollable || optionsScrollable === {} ) {
                optionsScrollable = {};
            }
            if( !optionsNavigator || optionsNavigator === {} ) {
                optionsNavigator = {};
            }
            if( !optionsAutoscroll || optionsAutoscroll === {} ) {
                optionsAutoscroll = {};
            }

            _selector.scrollable( optionsScrollable ).navigator( optionsNavigator ).autoscroll( optionsAutoscroll );
        },
        _validateMail:          function ( mail ) {
            return ( /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test( mail ) ) ? true : false;
        },
        _validateNumber:        function ( numberToCheck ) {
            return /^\d+[^a-zA-Z]+$/.test( parseInt( numberToCheck ) );
        },
        _validateRange:         function ( rangeTo, rangeFrom, valueToCheck ) {
            return ( rangeTo >= valueToCheck && rangeFrom <= valueToCheck ) ? true : false;
        },
        _validateMinLength:     function ( minLength, valueToCheck ) {
            return ( minLength < valueToCheck ) ? true : false;
        },
        _validateMaxLength:     function ( maxLength, valueToCheck ) {
            return ( valueToCheck <= maxLength ) ? true : false;
        },
        _validateDate:          function ( dateToCheck ) {
            return ( !/Invalid|NaN/.test(new Date(dateToCheck).toUTCString() ) ) ? true : false;
        },
        /**
         *
         *  @function:  !anchorMenu
         *  @description:   Anchor the menu
         *  @params jQuery selectorToApply.- A jQuery Selector
         *  @params Object toFix.- An object with css properties to apply to the
         *                         jQuery selector
         *  @params Object toDeFix.- An object with css properties to apply to
         *                         the jQuery selector
         *  @author: @_Chucho_
         *
         */
        //  !Ancla el menú cuando a una altura determinada mediante css
        anchorMenu:             function ( selectorToApply, offsetTop, classToFix, classToDeFix ) {
            MDMinvielle.tool = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            var _selector       = ( typeof( selectorToApply ) === "undefined" ) ? "*" : selectorToApply;
            _selector       = ( typeof( _selector ) === "object" ) ? _selector : $( _selector );
            var _offsetTop      = ( offsetTop === "" ) ? 0 : offsetTop;
            _offsetTop      = ( typeof( _offsetTop ) === "string" ) ? parseInt( _offsetTop ) : ( typeof( _offsetTop ) === "number" ) ? _offsetTop : parseInt( _offsetTop );
            var _classToFix     = ( typeof( classToFix ) === "object" ) ? classToFix : "anchored";
            var _classToDeFix   = ( typeof( classToDeFix ) === "object" ) ? classToDeFix : "unanchored";
            if ( MDMinvielle.tool >= _offsetTop ) {
                _selector.removeClass( _classToDeFix ).addClass( _classToFix );
            } else {
                _selector.removeClass( _classToFix ).addClass( _classToDeFix );
            }
        },
        /**
         *
         *  @function:  doOverlay
         *  @description:  Make and overlay effect
         *  @params jQuery selector.- A jQuery Selector
         *  @params Object options.- A JSON object with the options to make a
         *                           target element a jqdock Element
         *  @author: @_Chucho_
         *  @see:   http://jquerytools.org
         *
         */
        //  !Hace un efecto de overlay sobre un elemento determinado
        doOverlay:              function ( selector, options ) {
            var _selector   = ( typeof( selector )  === "string" ) ? $( selector ) : ( ( typeof( selector ) === "object" )? selector : $( '*' ) );
            var _options    = ( typeof( options )   === "object" ) ? options : {};

            _selector.overlay( _options );
        },
        //  !Abre un cuadro de diálogo con un mensaje
        openAlert:              function ( title, markupMessage ) {
            var _title      = ( title === "" || title === undefined ) ? "Error" : title;
            var _message    = ( markupMessage === "" || markupMessage === undefined ) ? "<p>Hubo un error inesperado.</p>" : markupMessage;

            var alertView   = Backbone.View.extend( {
                tagName:   'p',
                events:    {
                    'click input[name="submit-button"]': this.showAlert
                },
                showAlert:     function () { console.log( 'hi' ); }
            } );
            /*$( '.alert h4' ).text( '' );
            $( '.alert p' ).remove( );
            $( '.alert form' ).remove( );
            $( '.alert table' ).remove( );
            $( '.alert div' ).remove( );
            $( '.alert button' ).remove( );

            if ( $( '.alert h2' ).exists() ) {

                $( '.alert h2' ).text( _title );
            } else {

                $( '.alert' ).append( '<h2>' + _title + '</h2>' );
            }
            $( '.alert' ).append( _message );
            //MDMinvielle.overlay.load();
            //$( '.alert_trigger' ).click( );
            $( '.alert' ).centerHeight( );
            $( '.alert' ).centerWidth( );
            $( '.alert_background' ).fadeIn( 50, function (  ) {

                $( '.alert' ).fadeIn( 100 );
            } );*/
        },
        /**
         *
         *  @function:  !closeAlert
         *  @description:   Close an alert box with a message
         *  @author: @_Chucho_
         *
         */
        //  !Cierra un cuadro de diálogo con un mensaje
        closeAlert:             function ( ) {

            if ( typeof( MDMinvielle.closer ) !== 'undefined' ){
                MDMinvielle.overlay.close();
            } else {
                $( '.alert' ).fadeOut( 150, function () {
                    $( '.alert h4' ).text( '' );
                    $( '.alert p' ).remove( );
                    $( '.alert form' ).remove( );
                    $( '.alert table' ).remove( );
                    $( '.alert div' ).remove( );
                    $( '.alert button' ).remove( );

                    $( '.alert_background' ).fadeOut( 'fast' );
                } );
            }
        },
        /**
         *
         *  @function:  !closeAlert
         *  @description:   Validación del formulario de encuesta de Marzo 2014.
         *  @params:    Object _rules Rules for each filed of the form
         *  @params:    Object _messages Messages for each filed of the form
         *  @params:    Object _submitFunction Function to handle succes in petition
         *  @params:    Object _invalidFunction Function to handle a invalid petition
         *  @see:   http://bassistance.de/jquery-plugins/jquery-plugin-validation/ ||
         *          http://docs.jquery.com/Plugins/Validation
         *  @author: @_Chucho_
         *
         */
        //  !Validación del formulario de encuesta de Marzo 2014.
        validateContactForm:    function ( _rules, _messages, _submitFunction, _invalidFunction ) {
            var formActive = $( 'form' ).validate( {
                onfocusout: false,
                onclick: true,
                onkeyup: false,
                onsubmit: true,
                focusCleanup: true,
                focusInvalid: false,
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                /*showErrors: function( errorMap, errorList ) {
                    $('#message').empty().removeClass();
                    $("#message").html('<p>Error al ingresar la información.</p><p>Verifique que sus datos están correctos o que no falte ningún dato.</p><p>Por favor, vuelvalo a intentar.</p>');
                    $('#message').addClass('wrong').show('fast', function(){
                        $('#message').show('fast');
                    });
                    this.defaultShowErrors();
                },*/
                errorPlacement: function( error, element ) {
                    //element.addClass( 'error' );
                },
                //debug:true,
                rules: _rules,
                messages: _messages,
                ignore: 'textarea, checkbox',
                highlight: function( element, errorClass, validClass ) {
                    $( element ).addClass( errorClass );
                },
                unhighlight: function( element, errorClass ){
                    $( element ).removeClass( errorClass );
                },
                submitHandler: _submitFunction,
                invalidHandler: _invalidFunction
            } ); 
        },
        /**
         *
         *  @function:  calculateHeightOfMainCarrusel
         *  @description: Calculate the height of the carrusels placed in Home
         *  @author: @_Chucho_
         *
         */
        //  !Calculate the height of the carrusels placed in Home
        calculateHeightOfMainCarrusel:    function () {
            _innerWidth = $( '.scrollable_main_photography' ).width();
            $( '.items_glympse figure' ).width( _innerWidth );

            _innerHeight = $( '.items_glympse figure' ).height();
            $( '.scrollable_main_photography' ).height( _innerHeight );
        }, 
        /**
         *
         *  @function:  stickyFooter
         *  @description: Ayuda a emplazar el footer si el contenido no es lo 
         *                suficientemente grande para llenar la pantalla
         *  @author: @_Chucho_
         */
        //  !Ayuda a emplazar el footer si el contenido no es lo 
        //  suficientemente grande para llenar la pantalla
        stickyFooter:   function () {
            var docHeight       = $( '.wrapper' ).height();
            var windowHeight    = $( window ).innerHeight();
            if ( docHeight <= windowHeight ) {
                $( 'footer' ).addClass( 'sticky' );
            }
        }
    };

    // Give the init function the MDMinvielle prototype for later instantiation
    MDMinvielle.fn.init.prototype = MDMinvielle.fn;

    MDMinvielle = MDMinvielle.fn;

    // Expose MDMinvielle to the global object
    window.MDMinvielle  = MDMinvielle;
} ) ( jQuery, window, document );