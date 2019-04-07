function getQuote() {
	var quote_source = 'http://quotes.stormconsultancy.co.uk/random.json'

	var xhr = new XMLHttpRequest();
	xhr.open('GET', quote_source, false);
	xhr.send();
	if (xhr.status != 200) {
		alert(xhr.status + ': ' + xhr.statusText);
	} else {
		response = JSON.parse(xhr.responseText);
		return response['quote'];
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function makePic() {
	var img_source = 'https://source.unsplash.com/collection/1127163/';
	
	var img1 = new Image(),
		img2 = new Image(),
		img3 = new Image(),
		img4 = new Image();

	var xSize = getRandomInt(200, 800),
		ySize = getRandomInt(200, 800);
	
	img1.crossOrigin = 'anonymous';
	img1.src = img_source + xSize + 'x' + ySize;
	img1.onload = function() {
		ctx.drawImage(img1, 0, 0);
		img2.crossOrigin = 'anonymous';
		img2.src = img_source + xSize + 'x' + (1000 - ySize);
		img2.onload = function() {
			ctx.drawImage(img2, 0, ySize);
			img3.crossOrigin = 'anonymous';
			img3.src = img_source + (1000 - xSize) + 'x' + ySize;
			img3.onload = function() {
				ctx.drawImage(img3, xSize, 0);
				img4.crossOrigin = 'anonymous';
				img4.src = img_source + (1000 - xSize) + 'x' + (1000 - ySize);
				img4.onload = function() {
					ctx.drawImage(img4, xSize, ySize);
					ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
					ctx.fillRect(0, 0, 1000, 1000);
					
					ctx.font = '40px arial';
					ctx.fillStyle = 'white';
					ctx.textAlign = 'center';
					
					var words = getQuote().split(' '),
						lines = [],
						currentLine = '';
					
					for (word_id in words) {
						if (currentLine.length + words[word_id].length < 40) {
							if (currentLine.length != 0) {
								currentLine += ' ';
							}
							currentLine += words[word_id];
						} else {
							lines.push(currentLine);
							currentLine = '';
						}
					}
					lines.push(currentLine);	
					
					for (line_id in lines) {
						ctx.fillText(lines[line_id], 500, line_id * 40 + 40 * (13 - lines.length / 2));
					}
				}
			}
		}
	}
}

var canvas = document.createElement('canvas'),
	ctx = canvas.getContext('2d');
canvas.height = 1000;
canvas.width = 1000;

makePic();

document.body.appendChild(canvas);

canvas.onclick = function () {
	var dataURL = canvas.toDataURL('image/png');
	var link = document.createElement('a');
	link.href = dataURL;
	link.download = 'sos myslom.png';
	link.click();
}