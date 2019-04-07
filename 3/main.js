function getAuthorQuote() {
	var quote_source = 'http://quotes.stormconsultancy.co.uk/random.json'

	var xhr = new XMLHttpRequest();
	xhr.open('GET', quote_source, false);
	xhr.send();
	if (xhr.status != 200) {
		alert(xhr.status + ': ' + xhr.statusText);
	} else {
		response = JSON.parse(xhr.responseText);
		return [response['author'], response['quote']]
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}



var img_source = 'https://source.unsplash.com/collection/1127163/';

var canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d');
canvas.height = 1000;
canvas.width = 1000;

var img1 = new Image(),
	img2 = new Image(),
	img3 = new Image(),
	img4 = new Image();

var xSize = getRandomInt(200, 800),
	ySize = getRandomInt(200, 800);
	
img1.src = img_source + xSize + 'x' + ySize;
img1.onload = function() {
	ctx.drawImage(img1, 0, 0);
	img2.src = img_source + xSize + 'x' + (1000 - ySize);
	img2.onload = function() {
		ctx.drawImage(img2, 0, ySize);
		img3.src = img_source + (1000 - xSize) + 'x' + ySize;
		img3.onload = function() {
			ctx.drawImage(img3, xSize, 0);
			img4.src = img_source + (1000 - xSize) + 'x' + (1000 - ySize);
			img4.onload = function() {
				ctx.drawImage(img4, xSize, ySize);
			}
		}
	}
}

document.body.appendChild(canvas);
