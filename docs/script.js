var data = {
	songboard: [
		{title: 'a01', uploader: 'adler', filename: 'a01'},
		{title: 'a02', uploader: 'adler', filename: 'a02'},
		{title: 'a03', uploader: 'adler', filename: 'a03'},
		{title: 't01', uploader: 'trevor', filename: 't01'},
		{title: 't02', uploader: 'trevor', filename: 't02'}
	]
},

init = function(){
	build.songboard();
},

build = {
	songboard: function(){
		var list = '';
		var addRow = function(song){
			list += '<tr>\
				<td>' + song.title + '</td>\
				<td>' + song.uploader + '</td>\
				<td><a href="mp3/' + song.filename + '.mp3" target="_blank">download/play</a></td>\
				</tr>';
		};
		data.songboard.forEach(addRow);
		$('#songboardTable tbody').html(list);
	}
};

$(init);