window.onscroll = function() {
	var nav = document.getElementById('main-navbar');
	if(this.scrollY <= 10) {
		nav.classList.remove('navbar-color-on-scroll'); 
	} else {
		nav.classList.add('navbar-color-on-scroll'); 
	}
};