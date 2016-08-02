var canvas;
var context;

$(document).ready(function(){

	var apiKey='097ec9abf814d5e31970a1c1c0cf475f';
canvas=document.getElementById('current-temp');
context=canvas.getContext('2d');
//http://api.openweathermap.org/data/2.5/forecast/city?id=


	$('.weather-form').submit(function(){
	
		event.preventDefault();

		var cityText=$('.city').val();
		var url='http://api.openweathermap.org/data/2.5/forecast/city?q='+cityText+',us&units=imperial&APPID='+apiKey+'';

	$.getJSON(url,function(weatherData){
		console.log(weatherData);
		currentTemp=weatherData.list[0].main.temp;
		currentSkies=weatherData.list[0].weather[0].id;
		console.log(currentTemp);
		animate(0);
		weatherBg(currentSkies);
		
		console.log(context);
		
	})
})
		})

function animate(current){

	//outer circle 
var tempColor='#2DC2B0';
context.strokeStyle=tempColor;
context.lineWidth=10;
// context.clearRect(0,0,300,300);

context.clearRect(0,0,300,300);
//second circl
context.beginPath();
context.arc(200,200,60,Math.PI*0,Math.PI*2);
context.fillStyle="#9294AD"




context.fill();
		context.beginPath();
		context.arc(200,200,70,Math.PI*1.5,(current/100)*(Math.PI*2)+(Math.PI*1.5));

		context.stroke();
		current++;
		if(current<currentTemp){
			requestAnimationFrame(function(){
				animate(current);
			})
		}
		context.fillStyle="#000"
		context.font="28px Arial";
		context.fillText(currentTemp,170,210);
};



function weatherBg(weatherNum){
	if(weatherNum==800){

		var getImageSrc = 'sunny.jpg';	
	$('.weatherPic').css('background-image', 'url(' + getImageSrc + ')');

	drawSunny();
	
	}else if(((weatherNum>=801) &&(weatherNum<900))|| ((weatherNum>=500) &&(weatherNum<600))){

console.log(weatherNum);
	var getImageSrc = 'rainday.jpg';	
	$('.weatherPic').css('background-image', 'url(' + getImageSrc + ')');

	}else if((weatherNum>=600) &&(weatherNum<700)){

		var getImageSrc = 'snowDay.jpg';	
	$('.weatherPic').css('background-image', 'url(' + getImageSrc + ')');

	}else if(weatherNum==741){
			var getImageSrc = 'foggy.jpg';	
	$('.weatherPic').css('background-image', 'url(' + getImageSrc + ')');
	}


};


function drawSunny(){



	context.beginPath();
	context.arc(0,0,50,Math.PI*0,Math.PI*2);
	context.fillStyle="#9294AD"
	context.stroke();

}
