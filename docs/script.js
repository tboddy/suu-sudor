var data = {
	songboard: [
		{title: 'AM01', uploader: 'adler', filename: 'a01'},
		{title: 'AM02', uploader: 'adler', filename: 'a02'},
		{title: 'AM03', uploader: 'adler', filename: 'a03'},
		{title: 'TB01', uploader: 'trevor', filename: 't01'},
		{title: 'TB02', uploader: 'trevor', filename: 't02'}
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
		$('#songboard').show();
	}
};

$(init);