// datasets for test
let warning_data = [
  {
    region: "VIC",
    warning: "Orange",
    warning_message: "view",
    urgent: "Urgent"
  }
]
let temperature_data, humidity_data, season_data, data_data, card_data
let VIC, NSW, QLD, NT, SA, WA, TAS = []
let currentLocation, times, areas

// const socket = io('https://40j2u94005.oicp.vip')
const socket = io()
const query = document.querySelector('.chat-messages')
var messageContainer = document.getElementById('chat-messages')
var messageForm = document.getElementById('chat-form')

// jQuery
$(function() {
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

  //handle chatbox show and hide
  $('#chatIcon').click(function() {
    var box = $('#chatbox')
    if (box.css("display") == "none") {
      box.fadeIn(600)
    } else {
      box.fadeOut(300)
    }
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
  url: '/api/getcard',
  callBack: res => {
    card_data = res.data
  }
})

// request from local files
for (let i = 0; i < ajax_param_Arr.length; i++) {
  request({
    url: ajax_param_Arr[i].url,
    callBack: res => {
      ajax_region_Arr[i] = res
    }
  })
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
  else return "Undefined"
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
      {url: "/api/sms", data: {message: '[FireWhere] ' + ' Current bush fire level in your area is "low risk of bush fire"' 
      // + $('#message').text()
      ,to: '+61415140829' }},
      {
        url: "https://4zvhzhjn2h.execute-api.us-east-2.amazonaws.com/test2/firewhere", 
        data: {data: '"' + currentLocation.lat + ',' + currentLocation.lng + '"'}
      }
    ]
  
  // data post ajax
  function post(params) {
    $.ajax({
      type: "POST",
      url:params.url,
      dataType: "json",
      data: params.data,
      // contentType:"application/json",
      beforeSend: function(request) {        
        request.setRequestHeader("X-CSRF-TOKEN","%5B%7B%22token%22%3A%22V1Q05yKQFjHbrr0simPZ0jIWBpknwv2OSkCA0Hdeu6A%3D%22%2C%22version%22%3A%22hash-v1%22%7D%5D");
      }, 
      success: (data) => {
        params.callBack(data)
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
  $('#send').click(() => {
  //post api for sending message
    post({
      url: ajax_post_param_Arr[0].url,
      data: ajax_post_param_Arr[0].data,
      callBack: res => {
        console.log(res)
      }
    }).success(() => {
      var notification = $('#notification')
      notification.show(200)
    })
  })
})

//real-time socket.io

socket.on('init', message => {
  welcomeMessage(message);
})

socket.on('message', message => {
  outputMessage(message);

  query.scrollTop = query.scrollHeight;
})

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  var message = e.target.elements.msg.value;
  socket.emit('chatMessage', message);
  e.target.elements.msg.value = '';
})

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<div class="message">
  <p class="meta">A user from ${areas} <span>${message.time}</span></p>
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
  <p class="meta">Fireware Bot <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>
</div>`;
  document.querySelector('.chat-messages').appendChild(div);
} 