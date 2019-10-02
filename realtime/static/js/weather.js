function showweather() {
    document.getElementById('gmap_canvas').style.display = 'none';
    document.getElementById('crypto').style.display = 'none';
    document.getElementById('weather').style.display = 'block';
  }
  
  $(function() {
    
    var owAppId = "489706503860fc84259653e9b1e4d0b4";
    
    function displayWeather(unitType) {
        var lat = 30.327684,long = 78.081208,
        owApiUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=" + unitType + "&APPID=" + owAppId;
        getWeather(owApiUrl, unitType); 
    }
    
    // getWeather function retrieves data from the OpenWeather API and displays it
    function getWeather(url, unitType) {
      // access the OpenWeather API
      $.getJSON(url, function(data) {
        var current = new Weather(data, unitType);
        modifyDOM(current);
      });
    }
    
    function modifyDOM(current) {
      var city = "<p>" + current.city + "</p>",
      date = "<p>" + current.date + "</p>",
      icon = "<img src='" + current.icon + "'>",
      desc = "<p>" + current.condition + "</p>",
      temp = "<p class='small'>Temp</p><p>" + current.temp + " <span>&deg;C</span></p>",
      hum = "<p class='small'>Humidity</p><p>" + current.humidity + "<span>&#37;</span></p>",
      windspeed = "<p class='small'>Wind</p><p>" + current.windSpeed + " <span>kph</span></p>",
      winddir = "<span class='glyphicon glyphicon-circle-arrow-up' aria-hidden='true'></span>";
      
      $(".city").html(city);
      $(".date").html(date);
      $(".icon").html(icon);
      $(".desc").html(desc);
      $(".temp").html(temp);
      $(".humidity").html(hum);
      $(".windspeed").html(windspeed);
      $(".winddir").html(winddir);
      $(".winddir .glyphicon").css({"transform": "rotate(-" + current.windDir + "deg)", "-ms-transform": "rotate(-" + current.windDir + "deg)", "-webkit-transform": "rotate(-" + current.windDir + "deg)"});
    }
    
    function Weather(data, unitType) {
      var d = new Date();
      this.city = data.name + ", " + data.sys.country;
      this.icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      this.condition = data.weather[0].description;
      this.temp = Math.round(data.main.temp);
      this.humidity = data.main.humidity;
      this.windDir = data.wind.deg;
      this.sunrise = data.sys.sunrise;
      this.sunset = data.sys.sunset;
      this.unitType = unitType;
      this.date = d.toDateString();
      this.windSpeed = Math.round(data.wind.speed * 3.6);
    }
    
    displayWeather("metric");
    
  });
  