// (function () {
//     var ctx = document.getElementById('canvas');
// 	var width = canvas.width;
// 	var height = canvas.height;
	
//     if (canvas.getContext) {
//         canvas = canvas.getContext('2d');
        
// 		var img = new Image();
//         img.onload = function () {
// 			var imgWidth = img.naturalWidth; 
// 			var imgHeight = img.naturalHeight;
// 			var paddingBottom = 10;
			
//             canvas.drawImage(img, (width/2 - imgWidth/2), (height - imgHeight - paddingBottom));
//         };
		
//         img.src = 'imgs/perseus-logo.svg';
//     }
// })();