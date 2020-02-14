$(document).ready(function(){
    $('.short').hide();

    if(navigator.geolocation){
        var currentpostion = '';
        navigator.geolocation.getCurrentPosition(function(position){
            currentpostion = position;

            var latitude = currentpostion.coords.latitude;
            var longitude = currentpostion.coords.longitude;

            var url = 'http://api.weatherstack.com/current?access_key=c2aa5d6d58a635a9d00ce457cdbec57b&query=';
            $.getJSON(url + latitude + ',' + longitude, function(data){

                //JSON.stringify is used to convert javascript object to
                // JSON text and then stores that JSON text into string
                var data = JSON.stringify(data);  //first turn the JSON text to string

                //JSON.stringify is used to convert javascript object to a string
                var json = JSON.parse(data); // then turn the string to javascript object

                var country = json.location.country;
                var city = json.location.name;
                var state = json.location.region;

                var temp = json.current.temperature;
                var temp_f = (json.current.temperature * 9/5 + 32);
                var last_updated = json.current.observation_time;

                var wind = json.current.wind_speed;
                var humidity = json.current.humidity;
                var time = json.location.localtime.split(' ')[1];
                var cloud = json.current.cloudcover;

                $('#weather').html(city + ', ' + state + ', ' + country);

                $('#info1').html(time);
                $('#info2').html('Wind ' + wind + 'kph');
                $('#info3').html(temp + '&#8451');

                $('.short').show();

                // toggle temp
                var yes  = true;
                $('#switch').on('click', function(){
                    if(yes){
                        $('#info3').html(temp_f + '&#8457');
                        $('#switch').html('Show in Celsius');
                        yes = false;
                    }
                    else{
                        $('#info3').html(temp + '&#8451');
                        $('#switch').html('Show in Farenheight');
                        yes = true;
                    }
                });

                // console.log(data);

                // cloud Status
                if(cloud <= 30){
                    $('#info5').html('Clear Sky');
                }
                else{
                    $('#info5').html('Cloudy Sky');
                }

                $('#info6').html('Humidity ' + humidity + '%');

                if(temp => 30){
                    $('.grey-jumbo').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/10/10/07/48/hills-2836301_960_720.jpg)'
                    });
                    $('.weathercheck').html("<h1>It's Sunny Out There..<hr></h1>");
                }
                else{
                    $('.grey-jumbo').css({
                        backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_960_720.jpg)'
                    });
                    $('.weathercheck').html("It's Cold Out There");
                }
            });
            // console.log(latitude, longitude);
        });
    }

});