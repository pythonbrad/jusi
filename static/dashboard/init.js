/*! Jusi | (c) Resulam */

App = {
	views: {
		base: (next) => {
			$('#main').load(STATIC_ROOT+'templates/base.html', next);
		},
		splash: () => {
			$('#splash-info').text("");
			$('#splash').toggle();
			$('#main').toggle();
		},
		footer: () => {
			$('#default-foot').toggle();
		},
		error: () => {
			$('#main').empty();
			$('#main').html('\
				<div class="splash" align="center">\
					<i class="fa fa-4x fa-warning"></i>\
					<span class="title is-5">Unexpected error occurred.</span>\
					<i class="subtitle is-size-7">If the issue persists, please contact the webmaster at contact@resulam.com</i>\
					<hr>\
				</div>');
			$('#splash').hide();
			$('#main').show();
		},
		index: () => {
			App.views.splash();

			$('#splash-info').text("Authentification...");
			App.data.curr_unit = 0;

			App.views.base(() => {
				$('#content').load(STATIC_ROOT+'templates/lessons.html');
			});
		},
		lesson: (chap_id, lesson_id) => {
			App.views.splash();

			$('#splash-info').text("Authentification...");
			App.data.curr_chapter = chap_id;
			App.data.curr_lesson = lesson_id;

			App.views.base(() => {
				App.views.footer();
				$('#content').load(STATIC_ROOT+'templates/exercises.html');
			});
		}
	},
	models: {
		units: [
			{
				title: 'English Pronunciation',
				chapters: [
					{
						title: 'The Sounds of English',
						progress: 10,
						lessons: [
							{
								title: 'Cat, sad, and',
								description: 'Practise the vowel sound /æ/ in common English words',
								img_url: 'https://bulma.io/images/placeholders/128x128.png',
								exercises: [
									{
										content: 
										"**Welcome to this pronunciation lesson!**\n\n"+
										"We are going to explore a common **sound** that "+
										"can be difficult for English learners. "+
										"Keep going even if you can't produce the sound at "+
										"first! We'll prepare ou in three stages:\n"+
										"1. Introduction to the sound and video instructions "+
										"for how to make it\n"+
										"2. Recognising the sound in common English words\n"+
										"3. Producing the sound",
									},
									{
										content:
										"**The IPA symbol /æ/ represents the sounds you "+
										"hear. You don't have to memorise the symbol, but you "+
										"will see it a few times in this lesson.**\n\n"+
										"**[VIDEO]**\n\n"+
										"`man, and`",
									},
									{
										content:
										"**Pronunciation: /æ/**\n\n"+
										"We are going to focus on how to pronunce the vowel sound /æ/.\n"+
										"This is the vowel sound in words such as ”and” and ”man”. "+
										"By the end of this lesson, you will have learned a few of the words "+
										"containing this sound!\n"+
										"Here are some examples before we start:\n\n"+
										"`sad, man, plan, cat, and`"
									},
									{
										content:
										"**Listen to the sound. We will learn how to produce it shortly.**\n\n"+
										"**[VIDEO]**\n\n"+
										"**/æ/**\n\n"+
										"**EXAMPLE**\n\n"+
										"`🔊 sad, man, plan, cat, and`"
									},
									{
										content:
										"**Listen to the audio. Which word do ou hear? Try to make the sound yourself.**\n\n"+
										"**[AUDIO]**\n\n",
										choices: ["men", "man", "mane"],
										answers: [0],
									},
									{
										content:
										"**Watch the video and read the pronunciation tips for the /æ/ sound.**\n\n"+
										"![IMAGE](https://bulma.io/images/placeholders/128x128.png)\n\n"+
										"**/æ/**\n\n"+
										"1. Drop our jaw.\n"+
										"2. Pull up the corners of your mouth.\n"+
										"3. Keep the tip of your tongue behind your lower front teeth.\n"+
										"4. Your tongue fills the bottom of our mouth.\n"
									},
									{
										content:
										"As we've seen before, spelling and sounds do not always correspond in English. "+
										"The letter ”a” is **not always** pronounced as /æ/. The spelling of the whole word "+
										"can help us work out whether the word contains the /æ/ sound.\n"+
										"Take a look at the examples we are about to listen to.\n\n"+
										"||\n"+
										"|---|\n"+
										"|**/æ/ sound**: plan, sad|\n"+
										"|**different vowel sound**: plane, said|\n"+
										"||"
									},
									{
										content:
										"**Listen and repeat the words.**\n"+
										"**Focus on the sounds.**\n\n"+
										"![IMAGE](https://bulma.io/images/placeholders/128x128.png)\n\n"+
										"`plan, plane`"
									},
									{
										content:
										"**Listen and repeat the words.**\n"+
										"**Focus on the sounds.**\n\n"+
										"![IMAGE](https://bulma.io/images/placeholders/128x128.png)\n\n"+
										"`sad, said`"
									},
									{
										content:
										"**Match the word to the sound it contains.**\n\n",
										matches: ['plan, sad', '/æ/ sound', 'plane, said', 'different vowel sound'],
										answers: [[0, 3], [1, 2]]
									},
								]
							}
						]
					}
				]
			}
		]
	},
	data: {},
	tasks: []
};

$(() => {
	// We config global ajax configuration to manage error
	$(document).ajaxError(() => {
		App.views.error();
	})

	// We init the view state
	$('#splash').hide();
	$('#main').show();

	// We load the final splash
	$('#splash').load(STATIC_ROOT+'templates/splash.html', () => {
		// We launch the default page
		App.views.index();
	});
});