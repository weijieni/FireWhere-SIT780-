// datasets for test
let warning_data = [
  {
    region: "VIC",
    warning: "Orange",
    warning_message: "view",
    urgent: "Urgent"
  }
]
let temperature_data, humidity_data, season_data, data_data, card_data, daily_data=[]
let VIC, NSW, QLD, NT, SA, WA, TAS = []
let currentLocation, times, areas, emergencyCount=0

const socket = io()
const query = document.querySelector('.chat-messages')
var messageContainer = document.getElementById('chat-messages')
var messageForm = document.getElementById('chat-form')

// jQuery
$(function() {
  //handle nav-list click task
  $('#nav_dev').on('click', function() {
    var dev_item = $('#dev_item')
    if (dev_item.css("display") == "none") {
      dev_item.show(300)
    } else {
      dev_item.hide(300)
    }
  })

  //handle nav-bar show and hide
  $('.nav_icon').on('click', function() {
    var nav_bar = $('.navsection')
    if (nav_bar.css("display") == "none") {
      nav_bar.fadeIn(600)
    } else {
      nav_bar.fadeOut(300)
    }
  })

  //handle chatbox show and hide
  $('#chatIcon').on('click', function() {
    var box = $('#chatbox')
    if (box.css("display") == "none") {
      box.fadeIn(600)
      $(this).removeClass('bounce')
    } else {
      box.fadeOut(300)
      $(this).removeClass('bounce')
    }
  })

  //custom events
  $('#r1').on('r1_event', ()=>{
    $('#r1').hide()
    $('#r1-checked').show()
    emergencyCount++
  })

  $('#r1-checked').on('r1_c_event', ()=>{
    $('#r1-checked').hide()
    $('#r1').show()
    emergencyCount--
  })

  $('#r2').on('r2_event', ()=>{
    $('#r2').hide()
    $('#r2-checked').show()
    emergencyCount++
  })

  $('#r2-checked').on('r2_c_event', ()=>{
    $('#r2-checked').hide()
    $('#r2').show()
    emergencyCount--
  })

  $('#r3').on('r3_event', ()=>{
    $('#r3').hide()
    $('#r3-checked').show()
    emergencyCount++
  })

  $('#r3-checked').on('r3_c_event', ()=>{
    $('#r3-checked').hide()
    $('#r3').show()
    emergencyCount--
  })

  $('#breathing').on('rescue', ()=>{
    let div = `
    <hr>
    <h5>Your Rescue is in Progress</h5>
    <p>Our staff will contact you as soon as possible</p>
  `
    $('#breathing').hide()
    if (emergencyCount>0) {
      $('#breathing-after1').hide()
      $('#breathing').show()
      $('#breathing').removeClass('breathing')
      $('#breathing').addClass('breathing-after')
      $('#breathing').html("Rescue In Progress")
      $('#rescue-message').html(div) 
    } else {
      div = `
      <hr>
      <h5>Your Are Safe!</h5>
      <p>Take care bro!</p>
    `
      $('#breathing-after1').show()
      $('#rescue-message').html(div)
    }
  })

  //handle click (rescue options)
  $('#r1').on('click', ()=>{
    $('#r1').trigger('r1_event')
    $('#breathing').trigger('rescue')
  })

  $('#r1-checked').on('click', ()=>{
    $('#r1-checked').trigger('r1_c_event')
    $('#breathing').trigger('rescue')
  })

  $('#r2').on('click', ()=>{
    $('#r2').trigger('r2_event')
    $('#breathing').trigger('rescue')
  })

  $('#r2-checked').on('click', ()=>{
    $('#r2-checked').trigger('r2_c_event')
    $('#breathing').trigger('rescue')
  })

  $('#r3').on('click', ()=>{
    $('#r3').trigger('r3_event')
    $('#breathing').trigger('rescue')
  })

  $('#r3-checked').on('click', ()=>{
    $('#r3-checked').trigger('r3_c_event')
    $('#breathing').trigger('rescue')
  })

  //handle rescue click
  $('#breathing').on('click', ()=>{
    $('#breathing').removeClass('breathing')
    $('#breathing').addClass('breathing-after')
  })

  //create tables
  $('#warning_table').bootstrapTable({
    data: warning_data,
    classes: 'table'
  })

  $('#data_table').bootstrapTable({
    data: data_data,
    classes: 'table'
  })

  //add cards
  addCards(card_data)
})

//handle nav-button click task - tab switch
function handleTab(id, bid) {
  // tab switch
  $('.pages').hide(0)
  $(id).fadeIn(300)
  $('#tab_title').html(id.replace("#",""))

  // button color
  // reset button color and font color
  $('.navbutton').removeClass('btn_selected')
  //change selected button color and font color
  $(bid).addClass('btn_selected')
}

//customize data format
function operateFormatter(value, row, index) {
  return `
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">${warning_data[index].warning_message}</button>
  `
}

//ajax
let ajax_region_Arr = [VIC, NSW, QLD, NT, SA, WA, TAS]
let ajax_param_Arr = [
  { url: './module/VIC.json', data: VIC },
  { url: './module/NSW.json', data: NSW }, 
  { url: './module/QLD.json', data: QLD }, 
  { url: './module/NT.json', data: NT },
  { url: './module/SA.json', data: SA },
  { url: './module/WA.json', data: WA },
  { url: './module/TAS.json', data: TAS }
]

// data request ajax
function request(params) {
  $.ajax({
    type: "GET",
    url:params.url,
    dataType: "json",
    async: false,
    data: {},
    success: (data) => {
      params.callBack(data)
    },
    error(error){
      console.log(error);
    }
  });
}

// request from cloud
request({
  url: 'https://firewhere-backend.herokuapp.com/api/getcard',
  callBack: res => {
    card_data = res.data
  }
})

//request daily weather AU
let urls=["https://api.openweathermap.org/data/2.5/onecall?lat=-38.150002&lon=144.350006&exclude=minutely,hourly,alerts&units=metric&appid=5605e86f9bd5db980b3c2dfbd330811e", 
"https://api.openweathermap.org/data/2.5/onecall?lat=-33.557&lon=146.469&exclude=minutely,hourly,alerts&units=metric&appid=5605e86f9bd5db980b3c2dfbd330811e", 
"https://api.openweathermap.org/data/2.5/onecall?lat=-23&lon=143&exclude=minutely,hourly,alerts&units=metric&appid=5605e86f9bd5db980b3c2dfbd330811e", 
"https://api.openweathermap.org/data/2.5/onecall?lat=-22.5&lon=133&exclude=minutely,hourly,alerts&units=metric&appid=5605e86f9bd5db980b3c2dfbd330811e", 
"https://api.openweathermap.org/data/2.5/onecall?lat=-29.557&lon=133.469&exclude=minutely,hourly,alerts&units=metric&appid=5605e86f9bd5db980b3c2dfbd330811e", 
"https://api.openweathermap.org/data/2.5/onecall?lat=-27&lon=125&exclude=minutely,hourly,alerts&units=metric&appid=5605e86f9bd5db980b3c2dfbd330811e", 
"https://api.openweathermap.org/data/2.5/onecall?lat=-42.1&lon=146.38&exclude=minutely,hourly,alerts&units=metric&appid=5605e86f9bd5db980b3c2dfbd330811e"]

//This loop will be used if all APIs are filled
for (let i = 0; i<7; i++){
  request({
    url: urls[i],
    callBack: res=>{
      if (res) {
        daily_data[i] = res
      } else daily_data[i] = {
        daily: [{temp: {day:"No data"}, humidity:"No data", rain:"No data"}]
      }
    }
  })
}

// request({
//   url: urls[0],
//   callBack: res=>{
//     if (res) {
//       daily_data[0] = res
//     } else daily_data[0] = {
//       daily: [{temp: {day:"No data"}, humidity:"No data", rain:"No data"}]
//     }
//   }
// })

console.log(daily_data[0].daily[0])

// request from local files
for (let i = 0; i < ajax_param_Arr.length; i++) {
  request({
    url: ajax_param_Arr[i].url,
    callBack: res => {
      ajax_region_Arr[i] = res
    }
  })
}

//create pop-up div contents
let content_arr = ["#VIC_content", "#NSW_content", "#QLD_content", "#NT_content", "#SA_content", "#WA_content", "#TAS_content"]

for (let i = 0; i < content_arr.length; i++) {
  let div = `
  <span>Temperature: ${daily_data[i].daily[0].temp.day} ℃</span><br>
  <span>Humidity: ${daily_data[i].daily[0].humidity}</span><br>
  <span>Rain: ${(daily_data[i].daily[0].rain)*100}%</span><br>
  <span>Warning Level: </span>
  <span style="color: red;">HIGH</span>
  `
  $(content_arr[i]).html(div)
}

//create research cards html
function addCards(card_data) {
  let div = ""
  for (let i=0; i<card_data.length;i++) {
    div += `
    <div class="research_card">
    <div class="card_main">
      <div class="card_image">
        <img class="image_pic" src="${card_data[i].imageUrl}">
        <div class="card_image_after">&nbsp;</div>
        </div>
          <div class="card_stacked">
            <div class="card_header">
              <h3>${card_data[i].header}</h3>
              <div class="category">${card_data[i].category}</div>
            </div>
            <div class="stack_line">&nbsp;</div>
            <div class="card_content">
              ${card_data[i].content}
            </div>
            <div class="stack_line">&nbsp;</div>
            <div class="card_action">
              <a class="link" href="${card_data[i].link}">This is the link</a>
            </div>
          </div>
        </div>
    </div>
    `
  }
  $('#research_cards').html(div)
}

// algorithms for deciding if a coordinate locates in a certain region
function ifCoordinPoly(cLat, cLng, regionArr) {
  var sum = 0
  var count = regionArr.length
  
  if (count < 3) return false
  for (var i = 0; i < count; i++){
    pLat1 = regionArr[i].lat
    pLng1 = regionArr[i].lng

    if (i == count - 1){
      pLat2 = regionArr[0].lat
      pLng2 = regionArr[0].lng
    } else {
      pLat2 = regionArr[i + 1].lat
      pLng2 = regionArr[i + 1].lng
    }

    if (((cLat >= pLat1) && (cLat < pLat2)) || ((cLat < pLat1) && (cLat >= pLat2))){
      if (Math.abs(pLat1 - pLat2) > 0){
        pLng = pLng1 - ((pLng1 - pLng2) * (pLat1 - cLat)) / (pLat1 - pLat2)
        if (pLng < cLng){
          sum += 1
        }
      }
    }
  }
  if (sum % 2 != 0) return true 
  else return false
}

function ployToLocate (cLat, cLng) {
  if (ifCoordinPoly(cLat, cLng, ajax_region_Arr[0]))
  return "VIC"
  else if (ifCoordinPoly(cLat, cLng, ajax_region_Arr[1]))
  return "NSW"
  else if (ifCoordinPoly(cLat, cLng, ajax_region_Arr[2]))
  return "QLD"
  else if (ifCoordinPoly(cLat, cLng, ajax_region_Arr[3]))
  return "NT"
  else if (ifCoordinPoly(cLat, cLng, ajax_region_Arr[4]))
  return "SA"
  else if (ifCoordinPoly(cLat, cLng, ajax_region_Arr[5]))
  return "WA"
  else if (ifCoordinPoly(cLat, cLng, ajax_region_Arr[6]))
  return "TAS"
  else return "Wherever"
}

// JS - Google Vector Map popups 
let map, Popup;

function initMap() {}
$(() => {
  initMap = function(){
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: { lat: -25, lng: 133 },
      disableDefaultUI: true,
    });
        
   // A customized popup on the map.
    class Popup extends google.maps.OverlayView {
      constructor(position, content) {
        super();
        this.position = position;
        content.classList.add("popup-bubble");
        // This zero-height div is positioned at the bottom of the bubble.
        const bubbleAnchor = document.createElement("div");
        bubbleAnchor.classList.add("popup-bubble-anchor");
        bubbleAnchor.appendChild(content);
        // This zero-height div is positioned at the bottom of the tip.
        this.containerDiv = document.createElement("div");
        this.containerDiv.classList.add("popup-container");
        this.containerDiv.appendChild(bubbleAnchor);
        // Optionally stop clicks, etc., from bubbling up to the map.
        Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
      }
      /** Called when the popup is added to the map. */
      onAdd() {
        this.getPanes().floatPane.appendChild(this.containerDiv);
      }
      /** Called when the popup is removed from the map. */
      onRemove() {
        if (this.containerDiv.parentElement) {
          this.containerDiv.parentElement.removeChild(this.containerDiv);
        }
      }
      /** Called each frame when the popup needs to draw itself. */
      draw() {
        const divPosition = this.getProjection().fromLatLngToDivPixel(
          this.position
        );
        // Hide the popup when it is far out of view.
        const display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
            ? "block"
            : "none";

        if (display === "block") {
          this.containerDiv.style.left = divPosition.x + "px";
          this.containerDiv.style.top = divPosition.y + "px";
        }

        if (this.containerDiv.style.display !== display) {
          this.containerDiv.style.display = display;
        }
      }
    }

    // create popup objects
    function newPopup(lat, lng, id) {
      let popup = new Popup(
        new google.maps.LatLng(lat, lng),
        document.getElementById(id)
      );
      return popup
    }
    const [VIC_popup, NSW_popup,QLD_popup ,NT_popup ,SA_popup,WA_popup,TAS_popup] = [
      newPopup(-37.48, 144.57, 'VIC_content'), newPopup(-33.557, 146.469, 'NSW_content'),
      newPopup(-23, 143, 'QLD_content'), newPopup(-22.5, 133, 'NT_content'),
      newPopup(-29.557, 133.469, 'SA_content'), newPopup(-27, 125, 'WA_content'),
      newPopup(-42.1, 146.38, 'TAS_content')
    ]

    // Construct shapes
    function initShape (coordinates, fillColor) {
      let shape = new google.maps.Polygon({
        paths: coordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: fillColor,
        fillOpacity: 0.35,
      })
      return shape
    }
    const [VIC_shape, NEW_VIC_shape, NSW_shape, NEW_NSW_shape, QLD_shape, NEW_QLD_shape, NT_shape, NEW_NT_shape, SA_shape, NEW_SA_shape, WA_shape, NEW_WA_shape, TAS_shape, NEW_TAS_shape] = [
      initShape(ajax_region_Arr[0], '#FFFFFF'), initShape(ajax_region_Arr[0], '#FF0000'),
      initShape(ajax_region_Arr[1], '#FFFFFF'), initShape(ajax_region_Arr[1], '#FF0000'),
      initShape(ajax_region_Arr[2], '#FFFFFF'), initShape(ajax_region_Arr[2], '#FF0000'),
      initShape(ajax_region_Arr[3], '#FFFFFF'), initShape(ajax_region_Arr[3], '#FF0000'),
      initShape(ajax_region_Arr[4], '#FFFFFF'), initShape(ajax_region_Arr[4], '#FF0000'),
      initShape(ajax_region_Arr[5], '#FFFFFF'), initShape(ajax_region_Arr[5], '#FF0000'),
      initShape(ajax_region_Arr[6], '#FFFFFF'), initShape(ajax_region_Arr[6], '#FF0000')
    ]
    const obj_Arr = [
      {shape: VIC_shape, newShape: NEW_VIC_shape, popup: VIC_popup},
      {shape: NSW_shape, newShape: NEW_NSW_shape, popup: NSW_popup},
      {shape: QLD_shape, newShape: NEW_QLD_shape, popup: QLD_popup},
      {shape: NT_shape, newShape: NEW_NT_shape, popup: NT_popup},
      {shape: SA_shape, newShape: NEW_SA_shape, popup: SA_popup},
      {shape: WA_shape, newShape: NEW_WA_shape, popup: WA_popup},
      {shape: TAS_shape, newShape: NEW_TAS_shape, popup: TAS_popup},
    ]

    // add listeners
    function add_mouseover_listener(obj) {
      obj.shape.addListener('mouseover', () => {
        obj.popup.setMap(map)
        obj.shape.setMap(null)
        obj.newShape.setMap(map)
      })
    }
    function add_mouseout_listener(obj) {
      obj.newShape.addListener('mouseout', () => {
        obj.popup.setMap(null)
        obj.shape.setMap(map)
        obj.newShape.setMap(null)
      })
    }
    for (let i = 0; i < obj_Arr.length; i++) {
      obj_Arr[i].shape.setMap(map)
      add_mouseover_listener(obj_Arr[i])
      add_mouseout_listener(obj_Arr[i])
    }
    let infoWindow

    const contentString =
    '<div>'+
    '<p>You are currently located in: </p>'+
    '<p id="userLocation"></p>'+
    '</div>'
  
    infoWindow = new google.maps.InfoWindow({
      // content: contentString,
      maxWidth: 200,
    });

    const marker = new google.maps.Marker({
      map,
    });
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            // lat: -34.5,
            // lng: 138.5
          };
          marker.setPosition(pos)
          infoWindow.setContent('<div>'+
          '<p>You are currently located in: </p>'+
          '<p>'+
          ployToLocate(pos.lat, pos.lng)+
          '</p>'+
          '</div>')
          console.log(pos)
          areas = ployToLocate(pos.lat, pos.lng)
          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
          browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(map);
      }
  }
})

navigator.geolocation.getCurrentPosition((res) => {
  let pos = {
    lat : res.coords.latitude,
    lng : res.coords.longitude
  }
  currentLocation = pos

  let ajax_post_param_Arr =[
      {url: "https://firewhere-backend.herokuapp.com/api/sms", data: {message: '[FireWhere] ' + ' Current bush fire level in your area is "low risk of bush fire"' 
      // + $('#message').text()
      ,to: '+61415140829' }},
      {
        url: "https://wc0l31mge7.execute-api.ap-southeast-2.amazonaws.com/newtest/newfirewhere", 
        data: {data: JSON.stringify(daily_data[0].daily[0].temp.min + "," + daily_data[0].daily[0].temp.max + "," + daily_data[0].daily[0].wind_gust + "," + daily_data[0].daily[0].wind_speed + "," + daily_data[0].daily[0].wind_speed + "," + daily_data[0].daily[0].humidity + "," + daily_data[0].daily[0].humidity + "," + daily_data[0].daily[0].pressure + "," + daily_data[0].daily[0].pressure + "," + daily_data[0].daily[0].temp.morn + "," + daily_data[0].daily[0].temp.day)}
      }
    ]
  
  // data post ajax
  function post(params) {
    console.log(params.data)
    $.ajax({
      type: "POST",
      url:params.url,
      dataType: "json",
      data: params.data,
      // contentType:"application/json",
      beforeSend: function(request) { 
        request.setRequestHeader("Content-Type","application/json")
        request.setRequestHeader("Access-Control-Allow-Origin","*")  
        request.setRequestHeader("host","ap-southeast-2")
        // request.setRequestHeader("X-CSRF-TOKEN","%5B%7B%22token%22%3A%22V1Q05yKQFjHbrr0simPZ0jIWBpknwv2OSkCA0Hdeu6A%3D%22%2C%22version%22%3A%22hash-v1%22%7D%5D");
      }, 
      success: (data) => {
        params.callBack(data)
        console.log(data)
      },
      error(error){
        console.log(error);
      }
    });
  }
  
  //post location data and get prediction response data from cloud
  post({
    url: ajax_post_param_Arr[1].url, 
    data: ajax_post_param_Arr[1].data, 
    callBack: res => {
      $('#message').html(res)
      console.log(res)
    }
  })
  
  //handle send message button event
  $('#send').on('click', () => {
    let success = false
  //post api for sending message
    post({
      url: ajax_post_param_Arr[0].url,
      data: ajax_post_param_Arr[0].data,
      callBack: res => {
        console.log(res),
        success = true
      }
    })
    if (success) {
      var notification = $('#notification')
      notification.show(200)
    } else {
      var notification = $('#notification')
      notification.show(200)
    }
  })
})

//real-time socket.io

socket.on('init', message => {
  welcomeMessage(message);
})

socket.on('message', message => {
  outputMessage(message);
  $('#chatIcon').addClass('bounce')

  query.scrollTop = query.scrollHeight;
})

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  var message = {text: e.target.elements.msg.value, area: areas};
  socket.emit('chatMessage', message);
  console.log(message)
  e.target.elements.msg.value = '';
})

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<div class="message">
  <p class="meta">A user from ${message.areas} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>
</div>`;
  document.querySelector('.chat-messages').appendChild(div);
}

function welcomeMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<div class="message">
  <p class="meta">Firewhere Bot <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>
</div>`;
  document.querySelector('.chat-messages').appendChild(div);
} 