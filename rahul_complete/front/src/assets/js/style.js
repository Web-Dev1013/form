function toggleDropdown(e) {
    const _d = $(e.target).closest('.dropdown'),
        _m = $('.dropdown-menu', _d);
    setTimeout(function () {
        const shouldOpen = e.type !== 'click' && _d.is(':hover');
        _m.toggleClass('show', shouldOpen);
        _d.toggleClass('show', shouldOpen);
        $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
    }, e.type === 'mouseleave' ? 300 : 0);
}


$(window).on("scroll", function () {
	
	if ($(window)[0].pageYOffset >= 323) {
	
		$(".top-scroll").css("display", "block");
	}
	if ($(window)[0].pageYOffset < 323) {
	
		$(".top-scroll").css("display", "none");
	}
});