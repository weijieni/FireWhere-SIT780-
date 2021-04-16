// connect to the socket
let socket = io();

let warning_data = [
  {
    region: "VIC",
    warning: "Orange",
    warning_message: "view",
    urgent: "Urgent"
  }
]

let temperature_data = [
  {
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  }
]

let humidity_data = [
  {
    region: "VIC",
    humidity: "70",
    warning: "blue",
    urgent: "Nah"
  }
]

let data_data = [
  {
    region: "VIC",
    temperature: "40",
    humidity: "40",
    bushfire_level: "Extreme",
    warning: "Red",
  }
]

socket.on('number', (msg) => {
})

console.log('test')

// JS
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

// jQuery
$(function() {
  var ifUrgent = $('.ifUrgent')

  //handle nav-list click task
  $('#nav_dev').click(function() {
    var dev_item = $('#dev_item')
    if (dev_item.css("display") == "none") {
      dev_item.show(300)
    } else {
      dev_item.hide(300)
    }
  })

  //handle nav-bar show and hide
  $('.nav_icon').click(function() {
    var nav_bar = $('.navsection')
    if (nav_bar.css("display") == "none") {
      nav_bar.fadeIn(600)
    } else {
      nav_bar.fadeOut(300)
    }
  })

  //handle urgent text color
  // console.log(ifUrgent.text())
  // if (ifUrgent.text() == "Urgent") {
  //   ifUrgent.css("color", "orange")
  // } else {
  //   ifUrgent.css("color", "green")
  // }

  initWarningTable(warning_data)
  initTemperatureTable(temperature_data)
  initHumidityTable(humidity_data)
  initDataTable(data_data)
})

//handle nav-button click task - tab switch
function handleTab(id, bid) {
  // tab switch
  $('.pages').hide(0)
  $(id).fadeIn(300)

  // button color
  // reset button color and font color
  $('.navbutton').removeClass('btn_selected')
  //change selected button color and font color
  $(bid).addClass('btn_selected')
}

//initial table data - warning tab
function initWarningTable(dataObj){
  let tr = "";
  for(let i=0; i<dataObj.length;i++){
    tr+= `<tr><td>${dataObj[i].region}</td>
              <td>${dataObj[i].warning}</td>
              <td><button class='' data-bs-toggle="modal" data-bs-target="#staticBackdrop">${dataObj[i].warning_message}</button></td>
              <td><p class=''>${dataObj[i].urgent}</p ></td>
          </tr>`
  }
  $("#warning_data").html(tr)
}

//initial table data - temperature tab
function initTemperatureTable(dataObj){
  let tr = "";
  for(let i=0; i<dataObj.length;i++){
    tr+= `<tr><td>${dataObj[i].region}</td>
              <td>${dataObj[i].temperature}</td>
              <td>${dataObj[i].warning}</td>
              <td><p class=''>${dataObj[i].urgent}</p ></td>
          </tr>`
  }
  $("#temperature_data").html(tr)
}

//initial table data - humidity tab
function initHumidityTable(dataObj){
  let tr = "";
  for(let i=0; i<dataObj.length;i++){
    tr+= `<tr><td>${dataObj[i].region}</td>
              <td>${dataObj[i].humidity}</td>
              <td>${dataObj[i].warning}</td>
              <td><p class=''>${dataObj[i].urgent}</p ></td>
          </tr>`
  }
  $("#humidity_data").html(tr)
}

//initial table data - data tab
function initDataTable(dataObj){
  let tr = "";
  for(let i=0; i<dataObj.length;i++){
    tr+= `<tr><td>${dataObj[i].region}</td>
              <td>${dataObj[i].temperature}</td>
              <td>${dataObj[i].humidity}</td>
              <td>${dataObj[i].bushfire_level}</td>
              <td>${dataObj[i].warning}</td>
          </tr>`
  }
  $("#data_data").html(tr)
}
