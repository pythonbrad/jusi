/*! Jusi | (c) Resulam */

App = {
	views: {
		base: function (next) {
			$('#main').load(STATIC_ROOT+'templates/base.html', next);
		},
		splash: function (on=true) {
			$('#splash-info').text("");
			$('#splash').toggle();
			$('#main').toggle();
		},
		error: function () {
			$('#main').empty();
			$('#main').html('\
				<div class="splash-image" align="center">\
					<i class="fa fa-4x fa-warning"></i>\
					<h4><b>Unexpected error occurred.</b></h4>\
					<i style="font-size: 75%">If the issue persists, please contact the webmaster at contact@resulam.com</i>\
					<hr size="#">\
				</div>');
		},
		index: function () {
			App.views.splash(true);
			$('#splash-info').text("Authentification...");
			// App.views.base(function () {
			// 	$('#content').load(STATIC_ROOT+'templates/lessons.html');
			// });
			// App.views.splash(false);
		},
	},
	tasks: []
};

// We config global ajax configuration to manage error
$(document).ajaxError(function () {
	App.views.error();
})

// We init the view state
$('#splash').hide();
$('#main').show();

// We load the final splash
$('#splash').load(STATIC_ROOT+'templates/splash.html', function () {
	// We launch the default page
	App.views.index();
});