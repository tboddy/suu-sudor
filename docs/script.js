var data = {
	songboard: [
		{title: 'AM01', uploader: 'adler', filename: 'a01'},
		{title: 'AM02', uploader: 'adler', filename: 'a02'},
		{title: 'AM03', uploader: 'adler', filename: 'a03'},
		{title: 'the other one', uploader: 'adler', filename: 'otherone'},
		{title: 'TB01', uploader: 'trevor', filename: 't01'},
		{title: 'coward', uploader: 'trevor', filename: 'coward', tab: true},
		{title: 'uroborus', uploader: 'trevor', filename: 'uroborus'},
		{title: 'doujin', uploader: 'trevor', filename: 'doujin', tab: true},
		{title: 'FM01', uploader: 'frank', filename: 'f01', lyrics: true}
	]
},

init = function(){
	// setup.songs();
	build.songboard();
},

build = {
	songboard: function(){
		var list = '';
		var addRow = function(song){
			var tabButton = song.tab ? ' <a title="Download Tab" href="tabs/' + song.filename + '.txt" target="_blank">\
				<i class="fas fa-fw fa-sticky-note"></i></a>' : '<i class="fas fa-fw fa-sticky-note" style="opacity:0;"></i>',
				lyricsButton = song.lyrics ? '<a title="Download Lyrics" href="lyrics/' + song.filename + '.txt" target="_blank">\
				<i class="fas fa-fw fa-file-alt"></i>' : '<i class="fas fa-fw fa-file-alt" style="opacity:0;"></i>';
			list += '<tr>\
				<td>' + song.title + '</td>\
				<td>' + song.uploader + '</td>\
				<td class="littleCell">\
					<span title="Listen" data-song="' + song.title + '" data-file="https://tboddy.github.io/suu-sudor/mp3/' + song.filename + '.mp3" data-playing="false"><i class="fas fa-fw fa-play"></i></span>\
					<a title="Download MP3" href="mp3/' + song.filename + '.mp3" target="_blank"><i class="fas fa-fw fa-download"></i></a>' +
					tabButton +
					lyricsButton +
				'</td>\
				</tr>';
		};
		data.songboard.forEach(addRow);
		$('#songboardTable tbody').html(list);
		$('#songboard').show();
		events.songs();
	}
},

events = {
	songs: function(){
		var currentButton, howlSound,
		buttonClick = function(e){
			currentButton = $(e.target).closest('span');
			currentButton.attr('data-playing') == 'false' ? playSong() : stopSong();
		}, clearSong = function(){
			howlSound.unload();
			howlSound = false;
		}, playSong = function(){
			currentButton.css('opacity', '0.5').html('<i class="fas fa-fw fa-spinner fa-pulse"></i>');
			if(howlSound) clearSong();
			howlSound = new Howl({
				src: [currentButton.attr('data-file')],
				html: true
			});
			howlSound.once('load', function(){
				currentButton.css('opacity', '1').html('<i class="fas fa-fw fa-stop"></i>').attr('data-playing', 'true');
				howlSound.play();
			});
			var clearPlayingSong = function(song){
				if($('[data-song="' + song.title + '"]').attr('data-playing') == 'true') $('[data-song="' + song.title + '"]').html('<i class="fas fa-fw fa-play"></i></span>').attr('data-playing', 'false');
			};
			data.songboard.forEach(clearPlayingSong);
		}, stopSong = function(){
			clearSong();
			currentButton.html('<i class="fas fa-fw fa-play"></i>').attr('data-playing', 'false');
		};
		$('[data-file]').click(buttonClick);
	}
}

$(init);