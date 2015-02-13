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
    var storage, deviceWidth, isPortable, typeOfDevice, minDeviceWidth  = 320,
    maxDeviceWidth = 568, _innerWidth = 0, _innerHeight = 0, touch;

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

        touch = ( typeof( Touch ) === "object" ) ? new Touch() : false;

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

            function resizeMobileMenu () {
                var _height = $( 'body >div.wrapper' ).height();
                $( 'body >div.wrapper nav.mobile' ).height( _height );
            }
            resizeMobileMenu();

            $( window ).on( 'resize', function ( e ) {
                resizeMobileMenu();
            } );
        }

        // Inicialización de carrusel de imágenes en el Home
        if ( $( '.scrollable_main_photography' ).exists() ) {
            //MDMinvielle.calculateHeightOfMainCarrusel();
            if ( window.innerWidth <= 580 ) {
                var thumbnailsHeight    = $( '.items_categories' ).height();
                $( '.scrollable_categories, .wrapper_categories' ).height( thumbnailsHeight );
            }

            var _carrusel    = MDMinvielle.inicializeCarrousel( '.scrollable_main_photography', {
                speed: 600,
                circular: true,
                keyboard: false,
                items: '.items_glympse',
                next: '.next-control',
                prev: '.prev-control'
            }, {
                activeClass: "active",
                navi: "",
                naviItem: "a",
                indexed: false
            }, {
                steps: 1,
                interval: 5000,
                autoplay: true,
                autopause: false
            } );

            var carrusel     = _carrusel.data( 'scrollable' );

            //  Botón play
            $( '.navigation ul li' ).on( 'click', '.play', function ( e ) {
                e.preventDefault;
                e.stopPropagation;

                carrusel.play();
                $( e.currentTarget ).toggleClass( 'play' )
                                    .toggleClass( 'pause' )
                                    .attr( 'title', 'Play' )
                                    .text( 'Play' );
            } );

            //  Botón pausa
            $( '.navigation ul li' ).on( 'click', '.pause', function ( e ) {
                e.preventDefault;
                e.stopPropagation;

                carrusel.pause();
                $( e.currentTarget ).toggleClass( 'play' )
                                    .toggleClass( 'pause' )
                                    .attr( 'title', 'Pausa' )
                                    .text( 'Pausa' );
            } );

            MDMinvielle.sortScrollNavigator();
            $( window ).on( 'resize', function ( e ) {
                e.stopPropagation();
                e.preventDefault();

                //MDMinvielle.calculateHeightOfMainCarrusel();

                if ( window.innerWidth <= 580 ) {
                    var thumbnailsHeight    = $( '.items_categories' ).height();
                    $( '.scrollable_categories, .wrapper_categories' ).height( thumbnailsHeight );
                }

                MDMinvielle.sortScrollNavigator();
            } );
        }

        //  Thumbnails de las categorias en el Home
        if ( $( '.scrollable_categories' ).exists() && typeof( touch ) !== "object" ) {
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

            var _masonry;
            var isotope = setInterval( function () {

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

                _masonry = $( '.masonry' ).data( 'isotope' )._isLayoutInited;
                if ( _masonry ) {
                    clearInterval( isotope );
                }
            }, 500 );
        }

        //  Centrado horizontal de la paginación del blog
        if ( $( '.page-nav' ).exists() ) {

            var numberOfLists   = $( '.page-list li' ).length - 1;
            var widthOfLists    = numberOfLists * $( '.page-list li' ).width();

            $( '.page-list' ).width( widthOfLists );
        }

        // Control de imágenes para la sección Artista Invitado
        if ( $( '.invited-artist aside' ).exists() ) {

            function alignBigPicture () {
                var newHeight   = $( 'aside .wrapper_photos .bigger' ).height();
                $( 'aside .wrapper_photos' ).height( newHeight );
            }

            alignBigPicture();

            $( window ).on( 'resize', function ( e ) {
                alignBigPicture();
            } );

            $('aside ul li figure').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var related = $( e.currentTarget ).data( 'related' );
                $( 'aside > .wrapper_photos figure' ).fadeOut( 150 );

                $( 'aside .wrapper_photos figure' ).map( function ( index, domElement ) {
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
                            } );
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
                            MDMinvielle.openAlert( _title, _markup );
                        } else {
                            window.alert( 'There\'s an error sending the information. Can you please try again?' );
                        }
                    },
                    cache: false
                });
            };
            invalidFunction    = function( form, validator ) {
                var errors = validator.numberOfInvalids();
                if ( errors ) {
                    var message = ( errors === 1 ) ? 'You missed 1 field. It has been highlighted' : 'You missed ' + errors + ' fields. They have been highlighted';
                    //message.appendTo( .parents( '.question_wrapper' )
                    //.find( 'p' ) );
                }
            };

            MDMinvielle.validateContactForm ( rules, messages, submitFunction, invalidFunction );
        }

        //  Validación del formulario de suscripción
        if ( $( '.suscribe form' ).exists() ) {

            var rules, messages, submitFunction, invalidFunction;
            rules       = {
                name: {
                    required: true
                },
                email: {
                    email: true,
                    required: true
                }
            };
            messages    = {
                name: "Please, write your name.",
                email: "Please, write your email.",
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

                                var _finished   = '<p class="thanks">Thank you for suscribe.</p>';

                                $( 'form fieldset' ).first()
                                                    .empty()
                                                    .append( _finished );
                                $( 'form' ).fadeIn( 150 );
                            } );
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
                            MDMinvielle.openAlert( _title, _markup );
                        } else {
                            window.alert( 'There\'s an error sending the information. Can you please try again?' );
                        }
                    },
                    cache: false
                });
            };
            invalidFunction    = function( form, validator ) {
                var errors = validator.numberOfInvalids();
                if ( errors ) {
                    var message = ( errors === 1 ) ? 'You missed 1 field. It has been highlighted' : 'You missed ' + errors + ' fields. They have been highlighted';
                    //message.appendTo( .parents( '.question_wrapper' )
                    //.find( 'p' ) );
                }
            };

            MDMinvielle.validateContactForm ( rules, messages, submitFunction, invalidFunction );
        }

        //  Emplaza el footer en la parte baja del browser si el contenido no es
        //  lo suficientemente grande para llenar la pantalla.
        if ( $( '.wrapper' ).exists() ) {
            MDMinvielle.stickyFooter();

            $( window ).on( 'resize', function ( e ) {
                e.stopPropagation();
                e.preventDefault();

                setTimeout( function() {
                    MDMinvielle.stickyFooter();
                }, 500 );
            } );
        }
    } );
} ) ( jQuery, window, document );