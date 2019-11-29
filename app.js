// UI variables
let country = document.querySelector('#select-box');
let year = document.querySelector('#enter-year');

// Display function
function getUserData(displayFunction) {
  var result = null;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://calendarific.com/api/v2/holidays?&api_key=d112a5c604051baf181fef67c71af0eeff9122b2&country=${country.value}&year=${parseInt(year.value)}`);
  xhr.send()
  xhr.onload = function () {
    if (xhr.status == 200) {
      result = xhr.response;
      displayFunction(result);
    }
    else {
      console.log("Error Code is:" + xhr.status);
    }
  }
}

// Print user data
var printUserData = function (input) {
  showdata = '';
  var showdata = document.querySelector('#show-data');
  showdata.style.overflowY = 'scroll'
  var display = document.createElement('p');
  if (input == null) { // checking if the input is null
    display.textContent = "Error! No user data received or invalid request!";
    //It will print an error if the input is null
  }
  else {
    //If success print this
    var res = JSON.parse(input)
    console.log(res.response)
    var myDAta = res.response.holidays
    myDAta.forEach(function (val) {
      var name = val.name;
      var des = val.description;
      var date = val.date.datetime.day
      var month = val.date.datetime.month
      var year = val.date.datetime.year
      var type = val.type[0]
      console.log(type)
      var print =
        `<div>
          <p><span>Date</span> >> ${date}</p>
          <hr>
          <p><span>Month</span> >> ${month}</p>
          <hr>
          <p><span>Year</span> >> ${year}</p>
          <hr>
          <p><span>Name</span> >> ${name}</p>
          <hr>
          <p><span>Holiday type</span> >> ${type}</p>
          <hr>
          <p><span>Description</span> >> ${des}</p>
          <hr>
          <hr>
          <br>
          <br>
        </div> `
      display.innerHTML += print;
    })
  }
  showdata.append(display);
}

//Button and listener for the `click here to print the user data!` button
var displayBtn = document.querySelector('#printUsers')
displayBtn.addEventListener('click', function () {
  getUserData(printUserData);
});

var body = document.querySelector('body');
var body_color = document.querySelector('.body-color');
body.addEventListener('mousemove', runEvent)
  
function runEvent(e) {
  body.style.background = `linear-gradient(to right, rgb(${e.offsetX}, ${e.offsetY}, 50),rgb(${e.offsetY},50,${e.offsetX}))`
}
