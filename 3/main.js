var img_source = 'https://source.unsplash.com/collection/1127163/'

var quote_source = 'http://quotes.stormconsultancy.co.uk/random.json'

var xhr = new XMLHttpRequest();
xhr.open('GET', quote_source, false);
xhr.send();
if (xhr.status != 200) {
	alert(xhr.status + ': ' + xhr.statusText);
} else {
	alert( xhr.responseText ); // responseText -- текст ответа.
}