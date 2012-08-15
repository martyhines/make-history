navigator.geolocation.getCurrentPosition(locationSuccess, locationFail);
      var latLong = [],
        key = "d6b8aca0d248ec0e"
      ls = window.localStorage;

      function locationSuccess(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        getWeather("http://api.wunderground.com/api/" + key + "/geolookup/conditions/q/" + latitude + "," + longitude + ".json")
        getNews("proxy.php");

        //getNearby("proxygeo.php", latitude, longitude)

      }

      function locationFail() {
        alert('Out of range.');
      }

      function getWeather(weatherUrl) {
        $.ajax({
          url: weatherUrl,
          dataType: "jsonp",
          success: function (data) {
            displayInfo($("#current-temp"), "Current temperature in " + data.location.city + " is: " + data.current_observation.temp_f);
            displayInfo($("#time"), data.current_observation.observation_time);
            $("#icon").attr("src", data.current_observation.icon_url);
            console.log(data);

            getVerses(data.current_observation.weather);

        		getTweets(data.location.city + "," + data.location.state)
            
            $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
              tags: data.location.city + "," + data.location.state,
              tagmode: "all",
              format: "json"
            },

            function (data) {
              console.log(data)
              $.each(data.items, function (i, item) {
                $("<img/>").attr({
                  "src": item.media.m,
                  "title": item.title
                }).appendTo("#images");
              });
            });

          }
        });
      }

      function displayInfo(el, info) {
        el.html(info);
      }

      function updateWeather() {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationFail);
      }
      intervalId = setInterval(updateWeather, 60000);

      $("#sh").click(function () {
        clearInterval(intervalId);
      })
       var historyCount = 0;
      $("#mh").click(function () {
        historyCount += 1;
        ls.setItem("histTemp" + historyCount, $("#current-temp").text())
        ls.setItem("histTime" + historyCount, $("#time").text())
        var htmlString = '';
        htmlString += "<p>" + ls.getItem("histTemp" + historyCount) + "</p>";
        htmlString += "<p>" + ls.getItem("histTime" + historyCount) + "</p>";
        $("#history").append(htmlString)
      })

      //News

      function getNews(newsUrl) {
        $.ajax({
          url: newsUrl,
          dataType: "json",
          success: function (data, ts, xhr) {
            $("#news").attr({
              "href": data.results[0].url,
            }).html(data.results[0].title)
            // $("#news-img").attr({"src": data.results[0].media[0]["media-metadata"][2].url})
          },
          error: function (data, textStatus, error) {
            console.log(textStatus)
          }
        });
      }

      //Nearby

      function getNearby(newsUrl, lat, long) {
        $.ajax({
          url: newsUrl,
          data: {
            "lat": lat,
            "long": long
          },
          dataType: "json",
          success: function (data, ts, xhr) {
            console.log(data)
            console.log(xhr)
          },
          error: function (data, textStatus, error) {
            console.log(textStatus)
          }
        });
      }

      //Bible
      //http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=Mark+5&output-format=crossway-xml-1.0
      function getVerses(weather) {
        $.ajax({
          url: "proxyverses.php",
          data: {
            "weather": weather
          },
          success: function (data, ts, xhr) {
            $("#verses").html(data)
          },
          error: function (data, textStatus, error) {
            console.log(textStatus)
          }
        });
      }

      function getTweets(q){
      	 $.ajax({
          url: "http://search.twitter.com/search.json?callback=?&q="+q,
          dataType:"jsonp",
          success: function (data) {
              $.each(data.results, function (i, results) {
              	console.log(i+1)
                $("<p>").html(results.text).appendTo("#tweet");
              });
            },
          error: function (data, textStatus, error) {
            console.log(textStatus)
          }
        });
      }