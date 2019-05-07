function showcrypto() {
    document.getElementById('gmap_canvas').style.display='none';
    document.getElementById('weather').style.display = 'none';
    document.getElementById('crypto').style.display='block';
  }
  
  
  function crypto() {
    
  let btn = document.querySelector(".btn"),
      inrButton = document.querySelector("#inr-button"),
      usdButton = document.querySelector("#usd-button"),
      eurButton = document.querySelector("#eur-button"),
      gbpButton = document.querySelector("#gbp-button"),
      currency = "INR",
      rateDisplay = document.querySelector("#btc-price");
  
  getRate("INR");
  getHistorical("INR");
  
  inrButton.addEventListener("click", function(){
    getRate("INR");
    getHistorical("INR")
  });
  
  usdButton.addEventListener("click", function(){
    getRate("USD");
    getHistorical("USD")
  });
  
  gbpButton.addEventListener("click", function(){
    getRate("GBP");
    getHistorical("GBP")
  });
  
  eurButton.addEventListener("click", function(){
    getRate("EUR");
    getHistorical("EUR")
    
  });
  
  function getRate(code){
    let XHR = new XMLHttpRequest();
    let url = "https://api.coindesk.com/v1/bpi/currentprice/"+code+".json";
    
    XHR.onreadystatechange = function(){
      if(XHR.readyState == 4 && XHR.status == 200){
         let data = JSON.parse(XHR.responseText);
         let rate = (data.bpi[code].rate);
         console.log(rate) 
         rateDisplay.innerHTML = rate + " " + code;
      }
    }
    XHR.open("GET", url);
    XHR.send();
  }
  
  function getHistorical(code){
    
    let XHR = new XMLHttpRequest();
    let url= "https://api.coindesk.com/v1/bpi/historical/close.json?currency=" + code;
  
    XHR.onreadystatechange = function(){
      if(XHR.readyState == 4 && XHR.status == 200){
        let data = JSON.parse(XHR.responseText),   
            historicalRates = Object.values(data.bpi),
            historicalDates = Object.keys(data.bpi);
        
        createChart(historicalDates, historicalRates, code);    
      }
    }
    XHR.open("GET", url);
    XHR.send();
  }
  
  //Chart.js
  function createChart(dates, rates, code){
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Bitcoin Rate in ' + code,
                data: rates,
                backgroundColor: 'rgba(29, 168, 215, 0.2)',
                borderColor: 'rgba(22,130,166,1)',
                borderWidth: 1
            }]
        }
    });
  }
  
  }