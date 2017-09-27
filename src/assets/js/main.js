$(document).foundation();

$(document).ready(function(){


	// Получение курса валют
	(function(){
		var priceSet = function(data){
	        var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
	            //заменяем точку на запятую
	            price_sep   = price.replace(/(\D)/g, ","),
	            //добавляем пробел как разделитель в целых
	            price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

	        return price_sep;
	    };

		$.ajax({
            type: "GET",
            url: "https://bitpay.com/api/rates",
			// dataType: "jsonp",
            success:  function(data) {
				var bitcoins = Number($('.exchange-rates .bitcoin span').html());
				var usdTotal = data[1]['rate'] * bitcoins;

				$('.exchange-rates .usd span').html(priceSet(usdTotal));

				// Анимация счетчиков
				$('.spincrement').spincrement({
					from: 0,
					to: usdTotal,
					duration: 1800
				});
            }
        });
	})();

	// Выпадающие блоки
	$('.l-experience .dropdown-list .item .title').click(function(){
		var item = $(this).closest('.item');

		if (!item.hasClass('is-active')) {
			$('.l-experience .dropdown-list .item').removeClass('is-active');
			$('.l-experience .dropdown-list .item .desc').slideUp(200);
			item.addClass('is-active');
			item.find('.desc').slideDown(200);
		} else {
			item.removeClass('is-active');
			item.find('.desc').slideUp(200);
		}
	});

	// Слайдер с отзывами
	$('.testimonials-slider-body .testimonials-slider').slick({
		dots: true,
		slidesToShow: 1,
		adaptiveHeight: true
	});

	// Открытие мобильного меню
	$('.header .humburger').on('click', function(){
		$('.header .humburger').toggleClass('is-active');
		$('.header nav.top-menu').slideToggle(200);
	});

	// Закрытие мобильного меню при клике в меню
	$('.header nav.top-menu li a').click(function(){
		$('.header .humburger').removeClass('is-active');
		$('.header nav.top-menu').slideUp(200);
	});

	// Wow анимация
    new WOW().init();

	// Скрол к элементу
	$('.scroll-to').click(function(e) {
		e.preventDefault();
		var href = $(this).attr('href').replace(/#/,'.');
	    $('html, body').animate({
			scrollTop: $(href).offset().top
		}, 500);
	});

	// Отправка формы
	$('.common-form').on({
		'submit': function(e){
			e.preventDefault();
	        return false;
	    },
	    'formvalid.zf.abide': function(){
	    	var form = $(this),
				formData = form.serializeArray()

			$.ajax({
	            type: 'POST',
	            url: '/assets/php/send-mail.php',
	            data: formData,
	            success:  function() {
					form.foundation('resetForm');
					$('#modalContactUs').foundation('close');
		    		$('#modalSuccess').foundation('open');
	            }
	        });
	    }
	});

});

// Baron scroll
window.onload = function() {
    baron({
        root: '.baron__clipper-v',
        scroller: '.baron__scroller-v',
        bar: '.baron__bar-v',
		direction: 'v',
    });
    baron({
        root: '.baron__clipper-h',
        scroller: '.baron__scroller-h',
        bar: '.baron__bar-h',
		direction: 'h',
    });
};
