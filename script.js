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
		
		tempMax=weatherData.list[0].main.temp_max;
		tempMin=weatherData.list[0].main.temp_min;
		weatherDescription=weatherData.list[0].weather[0].description;
		weatherIcon=weatherData.list[0].weather[0].icon;
		console.log(tempMax);
		console.log(tempMin);
		console.log(weatherDescription);
		console.log(currentTemp);
		animate(0,currentSkies);
		drawBox(tempMax,tempMin,weatherDescription,currentTemp,weatherIcon);
		var src1 = "http://openweathermap.org/img/w/"+weatherIcon+".png";
                $('.weather-icon').attr("src", src1);
		
		console.log(context);
		
	})
})
		})

function animate(current,currentSkies){


if(current<70){
	var tempColor='#2DC2B0';
	//outer circle 
}else if((current>=70)&&(current<90)){
	var tempColor='#EEA513';
}else if(current>=90){
	var tempColor='#ff0';
}

context.strokeStyle=tempColor;
context.lineWidth=10;
// context.clearRect(0,0,300,300);

context.clearRect(0,0,300,300);
//second circl
context.beginPath();
context.arc(600,300,60,Math.PI*0,Math.PI*2);
context.fillStyle="#9294AD"
	weatherBg(currentSkies);




context.fill();
		context.beginPath();
		context.arc(600,300,70,Math.PI*1.5,(current/100)*(Math.PI*2)+(Math.PI*1.5));

		context.stroke();
		current++;
		if(current<currentTemp){
			requestAnimationFrame(function(){
				animate(current);
			})
		}
		context.fillStyle="#000"
		context.font="28px Arial";
		context.fillText(currentTemp,570,310);
	
		
};

//info rectangle
function drawBox(tempMax,tempMin,weatherDescription,currentTemp){


//draw rectangle filled with info
context.beginPath();
context.rect(800,100,450,500);
context.stroke();
context.fillStyle="#ffffff";
context.fill();

//setting the color based on temp
	if(currentTemp<70){
		var tempColor='#2DC2B0';
		//outer circle 
	}else if((currentTemp>=70)&&(currentTemp<90)){
		var tempColor='#EEA513';
	}else if(currentTemp>=90){
		var tempColor='#ff0';
	}

	//setting border around box to the color of the set temp color
	context.strokeStyle=tempColor;
	context.lineWidth=10;





			//28 px font
			context.fillStyle="#000"
			context.font="28px Arial";
			context.fillText("High: "+tempMin,820,470);
			context.fillText('Low: '+tempMin,820,520);

			//20 px font
			context.font="20px Arial";
			
			context.fillText(weatherDescription,970,300);
			context.stroke();


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

	console.log("test")
	context.beginPath();
	context.arc(10,10,50,Math.PI*0,Math.PI*1);
	context.fillStyle="#9294AD"
	context.fill();

}
