var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 50;
var numStars = 500;
var EndlessLogoText = document.getElementById('EndlessLogoText');
const EndlessStartScreen = document.querySelector("#EndlessStartScreen");
function Star(x, y, length, opacity) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.length = parseInt(length);
	this.opacity = opacity;
	this.factor = 1;
	this.increment = Math.random() * .03;
}
//$('document').b(function() {
	// var typewriter = new Typewriter(EndlessLogoText, {
	// 	loop: false,
	// 	cursor:"",
	// });
	// typewriter.typeString('Endless').start();
  // Calculate the screen size
	
//});

/**
 * Animate the canvas
 */
function animate() {
	context.clearRect(0, 0, screenW, screenH);
	$.each(stars, function() {
		console.log(this)
		this.draw(context);
	})
}

/* stop Animation */
function stopAnimation()
{
     clearInterval(animateInterval);
}

//stopAnimation();



Star.prototype.draw = function() {
	context.rotate((Math.PI * 1 / 10));
	
	// Save the context
	context.save();
	
	// move into the middle of the canvas, just to make room
	context.translate(this.x, this.y);
	
	// Change the opacity
	if(this.opacity > 1) {
		this.factor = -1;
	}
	else if(this.opacity <= 0) {
		this.factor = 1;
		
		this.x = Math.round(Math.random() * screenW);
		this.y = Math.round(Math.random() * screenH);
	}
		
	this.opacity += this.increment * this.factor;
	
	context.beginPath()
	for (var i = 5; i--;) {
		context.lineTo(0, this.length);
		context.translate(0, this.length);
		context.rotate((Math.PI * 2 / 10));
		context.lineTo(0, - this.length);
		context.translate(0, - this.length);
		context.rotate(-(Math.PI * 6 / 10));
	}
	context.lineTo(0, this.length);
	context.closePath();
	context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
	context.shadowBlur = 5;
	context.shadowColor = '#fff';
	context.fill();
	
	context.restore();
	
}




screenH = $(window).height();
	screenW = $(window).width();
	
	// Get the canvas
	canvas = $('#space');
	
	// Fill out the canvas
	canvas.attr('height', screenH);
	canvas.attr('width', screenW);
	context = canvas[0].getContext('2d');
	
	// Create all the stars
	for(var i = 0; i < numStars; i++) {
		var x = Math.round(Math.random() * screenW);
		var y = Math.round(Math.random() * screenH);
		var length = 1 + Math.random() * 1.5;
		var opacity = Math.random();
		
		// Create a new star and draw
		var star = new Star(x, y, length, opacity);
		
		// Add the the stars array
		stars.push(star);
	}
	
	var animateInterval = setInterval(animate, 1000 / fps);
    
// setTimeout(() => {
// 	EndlessLogoText.style.color = 'white'
// }, 1000);

window.onload = function(){
	setTimeout(() => {
    EndlessStartScreen.style.transform = `scale(10)`
    document.querySelector('#app').style.zIndex ="1"
    document.querySelector('#app').style.transform="scale(1)"
	stopAnimation()
}, 1000);
    // EndlessStartScreen.style.transform = `scale(10)`
    // document.querySelector('#app').style.zIndex ="1"
    // document.querySelector('#app').style.transform="scale(1)"
}


// setTimeout(() => {
//     EndlessStartScreen.style.transform = `scale(10)`
//     document.querySelector('#app').style.zIndex ="1"
//     document.querySelector('#app').style.transform="scale(1)"
// }, 5000);