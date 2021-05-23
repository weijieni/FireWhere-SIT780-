// connect to the socket
let socket = io();

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

socket.on('number', (msg) => {
})

console.log('test')

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
  {url: './module/VIC.json', data: VIC },
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
for (i = 0; i < ajax_param_Arr.length; i++) {
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
    const popup_Arr = [
      {lat: '-37.48', lng:'144.57', id: 'VIC_content'},
      {lat: '-33.557', lng:'146.469', id: 'NSW_content'},
      {lat: '-23', lng:'143', id: 'QLD_content'},
      {lat: '-22.5', lng:'133', id: 'NT_content'},
      {lat: '-29.557', lng:'133.469', id: 'SA_content'},
      {lat: '-27', lng:'125', id: 'WA_content'},
      {lat: '-42.1', lng:'146.38', id: 'TAS_content'},
    ]
    function newPopup(obj) {
      let popup = new Popup(
        new google.maps.LatLng(obj.lat, obj.lng),
        document.getElementById(obj.id)
      );
      return popup
    }
    const VIC_popup = newPopup(popup_Arr[0])
    const NSW_popup = newPopup(popup_Arr[1])
    const QLD_popup = newPopup(popup_Arr[2])
    const NT_popup = newPopup(popup_Arr[3])
    const SA_popup = newPopup(popup_Arr[4])
    const WA_popup = newPopup(popup_Arr[5])
    const TAS_popup = newPopup(popup_Arr[6])

    // Construct shapes
    const shape_Arr = [
      {coordinates: ajax_region_Arr[0], fillColor:'#FFFFFF'},
      {coordinates: ajax_region_Arr[0], fillColor:'#FF0000'},
      {coordinates: ajax_region_Arr[1], fillColor:'#FFFFFF'},
      {coordinates: ajax_region_Arr[1], fillColor:'#FF0000'},
      {coordinates: ajax_region_Arr[2], fillColor:'#FFFFFF'},
      {coordinates: ajax_region_Arr[2], fillColor:'#FF0000'},
      {coordinates: ajax_region_Arr[3], fillColor:'#FFFFFF'},
      {coordinates: ajax_region_Arr[3], fillColor:'#FF0000'},
      {coordinates: ajax_region_Arr[4], fillColor:'#FFFFFF'},
      {coordinates: ajax_region_Arr[4], fillColor:'#FF0000'},
      {coordinates: ajax_region_Arr[5], fillColor:'#FFFFFF'},
      {coordinates: ajax_region_Arr[5], fillColor:'#FF0000'},
      {coordinates: ajax_region_Arr[6], fillColor:'#FFFFFF'},
      {coordinates: ajax_region_Arr[6], fillColor:'#FF0000'},
    ]
    function initShape (obj) {
      let shape = new google.maps.Polygon({
        paths: obj.coordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: obj.fillColor,
        fillOpacity: 0.35,
      })
      return shape
    }

    // VIC
    const VIC_shape = initShape(shape_Arr[0])
    const NEW_VIC_shape = initShape(shape_Arr[1])
    // NSW
    const NSW_shape = initShape(shape_Arr[2])
    const NEW_NSW_shape = initShape(shape_Arr[3])
    // QLD
    const QLD_shape = initShape(shape_Arr[4])
    const NEW_QLD_shape = initShape(shape_Arr[5])
    // NT
    const NT_shape = initShape(shape_Arr[6])
    const NEW_NT_shape = initShape(shape_Arr[7])
    // SA
    const SA_shape = initShape(shape_Arr[8])
    const NEW_SA_shape = initShape(shape_Arr[9])
    // TAS
    const TAS_shape = initShape(shape_Arr[12])
    const NEW_TAS_shape = initShape(shape_Arr[13])

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
      console.log(1)
    }
    function add_mouseout_listener(obj) {
      obj.newShape.addListener('mouseout', () => {
        obj.popup.setMap(null)
        obj.shape.setMap(map)
        obj.newShape.setMap(null)
      })
    }
    for (i = 0; i < obj_Arr.length; i++) {
      obj_Arr[i].shape.setMap(map)
      add_mouseover_listener(obj_Arr[i])
      add_mouseout_listener(obj_Arr[i])
    }
  }
})