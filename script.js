function startTime() {
    var today = new Date();
    var h = today.getHours();
    //america
    if (h >= 13) {
        h -= 12;
    } else if (h < 1) {
        h += 12;
    }
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

startTime();

function search(query=null) {
    if (query === null) {
        query = document.getElementById('searchbar').value;
    }
    console.log(query);
    let original = query;
    let modifier = query.substr(query.length - 2);
    query = encodeURIComponent(query.slice(0, query.length - 2)).trim();
    switch (modifier) {
        case "-s":
            window.location = "https://soundcloud.com/search?q=" + query;
            break;
        case "-y":
            window.location = "https://www.youtube.com/results?search_query=" + query;
            break;
        case "-w":
            window.location = "https://en.wikipedia.org/w/index.php?search=" + query;
            break;
        case "-m":
            window.location = "http://www.wolframalpha.com/input/?i=" + query;
            break;
        default:
            window.location = "https://www.google.com/search?q=" + query;
    }
}

document.getElementById("searchbar").focus();

document.getElementById("searchbar")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            search()
        }
    });


//weather shamelessly stolen from Austin Kilduff
var json_url = "http://api.openweathermap.org/data/2.5/weather?q=Lynnwood,wa&appid=6e131a2916d5d45d8367b72a4675be0a";
var city;
var temp_curr;
var temp_low;
var temp_high;
var description;
var weatherCode;
var humidity;
$.when(
    $.getJSON(json_url)
).done(function (json_obj) {
    city = json_obj["name"];
    temp_curr = k_to_f(json_obj["main"]["temp"]);
    temp_low = k_to_f(json_obj["main"]["temp_min"]);
    temp_high = k_to_f(json_obj["main"]["temp_max"]);
    description = json_obj["weather"][0]["description"];
    weatherCode = Number(json_obj["weather"][0]["id"]);
    humidity = Number(json_obj["main"]["humidity"])
    insertWeatherInfo();
}
    );
function k_to_f(kelvin) {
    return ((9 / 5) * (kelvin - 273) + 32).toFixed(0);
}
function insertWeatherInfo() {
    //$("#city").append(city.toLowerCase());
    document.getElementById("description").innerHTML = (description.toLowerCase());
    document.getElementById("temp_curr").innerHTML = ("it's " + temp_curr + "&deg; out");
    $("#temp_low").append("lo " + temp_low + "&deg; /");
    $("#temp_high").append("hi " + temp_high + "&deg;");
    console.log("weather code: " + weatherCode);
    console.log("humidity: " + humidity);
    var disgusting = (weatherCode > 500 && weatherCode < 800);
    if (disgusting || Number(temp_low) < 30 || Number(temp_high) > 95
        || humidity > 75) {
        document.getElementById("badness").innerHTML = ("disgusting");
    } else {
        document.getElementById("badness").innerHTML = ("not bad");
    }
}


var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var date = new Date();
var day = date.getDate();
var weekday = date.getDay();
var monthIndex = date.getMonth();
var year = date.getFullYear();

document.getElementById("date").innerHTML = days[weekday] + ", " + monthNames[monthIndex] + " " + day;

$("#searchbar-container").click(function () {
    $("#searchbar").focus();
})

const randomGreeter = function () {
    const choices = [
        "Hello",
        "Greetings",
        "Good to see you",
        "How are you,"
    ];
    const name = [
        "<span>Norton</span>",
        "<span>Mr. Pengra</span>",
        "<span>Norton Pengra</span>",
    ];
    const greeting = choices[Math.floor(Math.random() * choices.length)] + ' ' + name[Math.floor(Math.random() * name.length)];
    // document.getElementById('greeting').innerHtml = greeting;
    return greeting;
}
document.getElementById('greeting').innerHTML = randomGreeter();