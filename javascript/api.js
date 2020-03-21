var json;
var settings = {
  async: true,
  crossDomain: true,
  url:
    "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
  method: "GET",
  headers: {
    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    "x-rapidapi-key": "fc6b8ce406msh2d2d06c2f68fa6fp18d7a1jsn1d810f6262bb"
  }
};

$.ajax(settings).done(function(response) {
  json = JSON.parse(response);
  console.log(json);
});
