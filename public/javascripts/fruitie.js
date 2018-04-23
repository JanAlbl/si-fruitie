function addToCollection(fruit, name) {
	if($('#fruit-collection').children('.fruit-collection-item').length == 0) {
		$('#fruit-collection').empty();
	}

	var item = $('<div class="fruit-collection-item"></div>');

	$('#fruit-collection').prepend(item);

	item.append($('<img></img>')
        .attr({ src : fruit.dataURL })
        .css({ maxHeight: '150px', maxWidth: '140px'})
    );

    item.prepend($('<strong>' + name + '</strong>'))
}

function handleFruits(classes) {
	var ret = "";

	for (var i = 0; i < classes.length; i++) {
		ret += classes[i].class;
		ret += ' (' + Math.round(classes[i].score * 100) + ' %)'; 
		if(i < classes.length - 1) {
			ret += ', ';
		}
	}

	return ret
}

function handleResult(file, details) {
	console.log(file);
	console.log(details);
	addToCollection(file, details.images[0].classifiers[0].classes[0].class);
	$('#result-area').empty();
	$('#result-area').append($('<img></img>')
        .attr({ src : file.dataURL })
        .css({ maxWidth: '500px', maxHeight: '300px', margin: '0 auto'})
    );
    $('#result-area').append($('<p>Odhadované ovoce: <strong>' + handleFruits(details.images[0].classifiers[0].classes) + '</strong></p>'));
}

Dropzone.options.myAwesomeDropzone = {
	dictDefaultMessage: 'Tady nahrajte ovoce!',
  init: function() {
    this.on("addedfile", function(file) { $.LoadingOverlay("show"); });
    this.on("success", function(file, details) { this.removeFile(file); handleResult(file, JSON.parse(details)); $.LoadingOverlay("hide"); });
  }
};