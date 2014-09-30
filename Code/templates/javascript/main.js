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
    var storage, deviceWidth, isPortable, typeOfDevice, minDeviceWidth  = 320, maxDeviceWidth = 568;

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

        //  Comportamiento del botón de menú para dispositivos moviles
        if ( $( '.cell' ).exists() ) {

            $( 'header .cell' ).on( 'click', function( e ) {
                e.preventDefault();
                e.stopPropagation();

                $( 'nav.mobile' ).toggleClass( 'active' );
            } );

            $( 'nav.mobile p' ).on( 'click', function ( e ) {
                $( 'nav.mobile' ).toggleClass( 'active' );
            } );
        }

        // Inicialización de carrusel de imágenes en el Home
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

        //  Masonry para las secciones de albumes y categorías
        if ( $( '.category,.album' ).exists() ) {

            setTimeout( function () {
                // Masonry para la sección de categorias
                $( '.masonry' ).isotope( {
                    itemSelector: '.item',
                    masonry: {
                        //columnWidth: MDMinvielle.columnWidth,
                        isFitWidth: false,
                        isAnimated: true,
                        gutterWidth:    0.5,
                        containerStyle: { position: 'absolute' },
                    }
                } );
            }, 1000 );
        }

        //  Centrado horizontal de la paginación del blog
        if ( $( '.page-nav' ).exists() ) {

            var numberOfLists   = $( '.page-list li' ).length - 1;
            var widthOfLists    = numberOfLists * $( '.page-list li' ).width();

            $( '.page-list' ).width( widthOfLists );
        }

        // Control de imágenes para la sección Artista Invitado
        if ( $( '.invited-artist aside' ).exists() ) {

            $('aside ul li figure').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                
                var related = $( e.currentTarget ).data( 'related' );
                $( 'aside > figure' ).fadeOut( 150 );

                $( 'aside figure' ).map( function ( index, domElement ) {
                    if ( $( domElement ).data( 'position' ) === related ) {
                        $( domElement ).fadeIn( 150 );
                    }
                });
            });
        }

        //  Validación del formulario de contacto
        if ( $( '.contact form' ).exists() ) {

            var rules, messages, submitFunction, invalidFunction;
            rules       = {
                name: {
                    required: true
                },
                email: {
                    email: true,
                    required: true
                },
                subject: {
                    required: true
                }
            };
            messages    = {
                name: "Please, write your name.",
                email: "Please, write your email.",
                subject: "Please, write a subject.",
                required: "This file is required", 
                minlength: "Por favor, haga su respuesta más amplia.", 
                maxlength: "Por favor, acorte su respuesta", 
                email: "Write a valid email",
                number: "Escriba solo números", 
                digits: "Escriba solo números", 
            };
            submitFunction = function( form ){
                // Form submit
                $( form ).ajaxSubmit ( {
                    //    Before submitting the form
                    beforeSubmit: function showRequestLogin( arr, form, options ) {
                        if ( $( '.error' ).exists() ) {
                            $('.error').remove();
                        }
                    },
                    //  !Function for handle data from server
                    success: function showResponseLogin( responseText, statusText, xhr, form ) {
                        
                        //console.log(responseText.success);
                        responseText    = $.parseJSON( responseText );
                        
                        if( responseText && ( responseText.success === 'true' || responseText.success === true ) ) {
                            
                            $( 'form' ).fadeOut( 300, function () {
                                
                                var _finished   = '<p class="thanks">Thank you for answer our form.</p>';
                                
                                $( 'form fieldset' ).first()
                                                    .empty()
                                                    .append( _finished );
                                $( 'form' ).fadeIn( 150 );
                            } )
                        }
                    }, 
                    resetForm: false, 
                    clearForm: false, 
                    //   If something is wrong
                    error: function( jqXHR, textStatus, errorThrown ) {
                        //console.log(textStatus);
                        //console.log(errorThrown);
                        if ( $( '.alert_box' ).exists() ) {
                            $( '.alert_box' ).addClass( 'error' );
                            var _title  = 'Error';
                            var _markup = '<p></p>';
                            AxaS.openAlert( _title, _markup );
                        } else {
                            alert( 'There\'s an error sending the information. Can you please try again?' );
                        }
                    }, 
                    cache: false
                });
            };
            invalidFunction    = function( form, validator ) {
                var errors = validator.numberOfInvalids();
                if ( errors ) {
                    var message = errors == 1 ? 'You missed 1 field. It has been highlighted' : 'You missed ' + errors + ' fields. They have been highlighted';
                    //message.appendTo( .parents( '.question_wrapper' )
                    //.find( 'p' ) );
                }
            };

            MDMinvielle.validateContactForm ( rules, messages, submitFunction, invalidFunction );
        }
    } );
} ) ( jQuery, window, document );