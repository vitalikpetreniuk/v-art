$(function() {

	$('.intro-carousel .owl-carousel').on('initialized.owl.carousel changed.owl.carousel', function(e) {
	    if (!e.namespace)  {
	      return;
	    }
    	var carousel = e.relatedTarget;
    	var changing_number = parseInt(carousel.relative(carousel.current())) + 1;
    	let artist_title = $(this).find('.owl-item.active .ii-title').text();
    	let artist_info = $(this).find('.owl-item.active .ii-info').text();

    	if(changing_number < 10)
    	{
    		changing_number = '0'+changing_number;
    	}

    	$(this).parents('.vart-intro').find('.carousel-info .counter').find('span.current').text(changing_number);
    	$(this).parents('.vart-intro').find('.carousel-info .counter').find('span.total').text(carousel.items().length);
    	$(this).parents('.vart-intro').find('.carousel-info .artist-name').text(artist_title);
    	$(this).parents('.vart-intro').find('.carousel-info .artist-info').text(artist_info);
  	}).owlCarousel({
	    items: 1,
	    loop: true,
	    nav: true,
	    dots: false,
	    slideTransition: 'cubic-bezier(.785,.135,.15,.86) 0s'
	});

	$('.carousel-info .ci-nav .prev').on('click', function(){
		$('.intro-carousel .owl-prev').trigger('click');
	})
	$('.carousel-info .ci-nav .next').on('click', function(){
		$('.intro-carousel .owl-next').trigger('click');
	})

	$('.grid').masonry({
	  // options
	  itemSelector: '.grid-item',
	  gutter: 24
	});

	$('.vart-head-tabs li a').on('click', function(e){
		e.preventDefault();

		$(this).parents('ul').find('li').removeClass('active');
		$(this).parent().addClass('active');
		$(this).parents('section').find('.tab').removeClass('active');
		$('.tab'+$(this).attr('href')).addClass('active');
	})

	$('button.menu-toggle').on('click', function(){
		$('body').toggleClass('mobile-menu-opened');
	})

});
