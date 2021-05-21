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

  // $('#send').on('click', function() {
  //   console.log("click")
  //   vonage.message.sendSms(from, to, text, (err, responseData) => {
  //       if (err) {
  //           console.log(err);
  //       } else {
  //           if(responseData.messages[0]['status'] === "0") {
  //               console.log("Message sent successfully.");
  //           } else {
  //               console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
  //           }
  //       }
  //   })
  // })

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

  //handle hover events
  $('#map_container').mouseover(function() {
    $('#hover_part').show(300)
  })
  $('#map_container').mouseout(function() {
    $('#hover_part').hide(300)
  })

  //create tables
  $('#warning_table').bootstrapTable({
    data: warning_data,
    classes: 'table'
  })

  // $('#temperature_table').bootstrapTable({
  //   data: temperature_data,
  //   classes: 'table'
  // })

  // $('#humidity_table').bootstrapTable({
  //   url: '/api/gethumidity',
  //   classes: 'table'
  // })

  // $('#season_table').bootstrapTable({
  //   data: season_data,
  //   classes: 'table'
  // })

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
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  ${warning_data[index].warning_message}
</button>
  `
}

//ajax
$.ajax({
  type: "GET",
  url: '/api/getcard',
  dataType: "json",
  async: false,
  data: {},
  success: function (data) {
      //var datas = JSON.stringify(data);
      // var datas = JSON.parse(data);
      //eval("(" + data + ")");
      card_data = data.data
  },
  error(error){
      console.log(error);
  }
});
$.ajax({
  type: "GET",
  url: './module/VIC.json',
  dataType: "json",
  async: false,
  data: {},
  success: function (obj) {
      //var datas = JSON.stringify(data);
      // var datas = JSON.parse(data);
      //eval("(" + data + ")");
      // console.log(obj)
      VIC = obj
  },
  error(error){
      console.log(error);
  }
});
$.ajax({
  type: "GET",
  url: './module/NSW.json',
  dataType: "json",
  async: false,
  data: {},
  success: function (obj) {
      //var datas = JSON.stringify(data);
      // var datas = JSON.parse(data);
      //eval("(" + data + ")");
      // console.log(obj)
      NSW = obj
  },
  error(error){
      console.log(error);
  }
});
$.ajax({
  type: "GET",
  url: './module/QLD.json',
  dataType: "json",
  async: false,
  data: {},
  success: function (obj) {
      //var datas = JSON.stringify(data);
      // var datas = JSON.parse(data);
      //eval("(" + data + ")");
      // console.log(obj)
      QLD = obj
  },
  error(error){
      console.log(error);
  }
});
$.ajax({
  type: "GET",
  url: './module/NT.json',
  dataType: "json",
  async: false,
  data: {},
  success: function (obj) {
      //var datas = JSON.stringify(data);
      // var datas = JSON.parse(data);
      //eval("(" + data + ")");
      // console.log(obj)
      NT = obj
  },
  error(error){
      console.log(error);
  }
});
$.ajax({
  type: "GET",
  url: './module/SA.json',
  dataType: "json",
  async: false,
  data: {},
  success: function (obj) {
      //var datas = JSON.stringify(data);
      // var datas = JSON.parse(data);
      //eval("(" + data + ")");
      // console.log(obj)
      SA = obj
  },
  error(error){
      console.log(error);
  }
});
$.ajax({
  type: "GET",
  url: './module/WA.json',
  dataType: "json",
  async: false,
  data: {},
  success: function (obj) {
      //var datas = JSON.stringify(data);
      // var datas = JSON.parse(data);
      //eval("(" + data + ")");
      // console.log(obj)
      WA = obj
  },
  error(error){
      console.log(error);
  }
});
$.ajax({
  type: "GET",
  url: './module/TAS.json',
  dataType: "json",
  async: false,
  data: {},
  success: function (obj) {
      //var datas = JSON.stringify(data);
      // var datas = JSON.parse(data);
      //eval("(" + data + ")");
      // console.log(obj)
      TAS = obj
  },
  error(error){
      console.log(error);
  }
});

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

// coordinates
// const VIC_coor = JSON.parse(VIC)

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
    
    // Define the LatLng coordinates for the polygon's path.
    let test = []
  
  // handle map boundries
  // for (i = 0; i <TAS.length; i++) {
  //   let temp = JSON.stringify(TAS[i]).match(/-?([1-9]\d*(\.\d*)*|0\.[1-9]\d*)/g)
  //   let item ={}
  //   item.lat = JSON.parse(temp[1])
  //   item.lng = JSON.parse(temp[0])
  //   test.push(item)
  // }
  // let print = JSON.stringify(test)
  // console.log(print)

  /**
   * A customized popup on the map.
   */
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

  const VIC_popup = new Popup(
    new google.maps.LatLng(-37.48, 144.57),
    document.getElementById("VIC_content")
  );
  const NSW_popup = new Popup(
    new google.maps.LatLng(-33.557, 146.469),
    document.getElementById("NSW_content")
  );
  const QLD_popup = new Popup(
    new google.maps.LatLng(-23, 143),
    document.getElementById("QLD_content")
  );
  const NT_popup = new Popup(
    new google.maps.LatLng(-22.5, 133),
    document.getElementById("NT_content")
  );
  const SA_popup = new Popup(
    new google.maps.LatLng(-29.557, 133.469),
    document.getElementById("SA_content")
  );  
  const WA_popup = new Popup(
    new google.maps.LatLng(-27, 125),
    document.getElementById("WA_content")
  );
  const TAS_popup = new Popup(
    new google.maps.LatLng(-42.1, 146.38),
    document.getElementById("TAS_content")
  );

  // Construct shapes
  // VIC
  const VIC_shape = new google.maps.Polygon({
    paths: VIC,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFFFFF",
    fillOpacity: 0.35,
  });
  const NEW_VIC_shape = new google.maps.Polygon({
    paths: VIC,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });
  VIC_shape.setMap(map);
  VIC_shape.addListener('mouseover', () => {
    VIC_popup.setMap(map);
    VIC_shape.setMap(null)
    NEW_VIC_shape.setMap(map)
  })
  NEW_VIC_shape.addListener('mouseout', () => {
    NEW_VIC_shape.setMap(null)
    VIC_shape.setMap(map)
    VIC_popup.setMap(null);
  })
  // NSW
  const NSW_shape = new google.maps.Polygon({
    paths: NSW,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFFFFF",
    fillOpacity: 0.35,
  });
  const NEW_NSW_shape = new google.maps.Polygon({
    paths: NSW,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });
  NSW_shape.setMap(map);
  NSW_shape.addListener('mouseover', () => {
    NSW_shape.setMap(null)
    NEW_NSW_shape.setMap(map)
    NSW_popup.setMap(map)
  })
  NEW_NSW_shape.addListener('mouseout', () => {
    NEW_NSW_shape.setMap(null)
    NSW_shape.setMap(map)
    NSW_popup.setMap(null)
  })
  // QLD
  const QLD_shape = new google.maps.Polygon({
    paths: QLD,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFFFFF",
    fillOpacity: 0.35,
  });
  const NEW_QLD_shape = new google.maps.Polygon({
    paths: QLD,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });
  QLD_shape.setMap(map);
  QLD_shape.addListener('mouseover', () => {
    QLD_popup.setMap(map)
    QLD_shape.setMap(null)
    NEW_QLD_shape.setMap(map)
  })
  NEW_QLD_shape.addListener('mouseout', () => {
    NEW_QLD_shape.setMap(null)
    QLD_shape.setMap(map)
    QLD_popup.setMap(null)
  })
  // NT
  const NT_shape = new google.maps.Polygon({
    paths: NT,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFFFFF",
    fillOpacity: 0.35,
  });
  const NEW_NT_shape = new google.maps.Polygon({
    paths: NT,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });
  NT_shape.setMap(map);
  NT_shape.addListener('mouseover', () => {
    NT_popup.setMap(map)
    NT_shape.setMap(null)
    NEW_NT_shape.setMap(map)
  })
  NEW_NT_shape.addListener('mouseout', () => {
    NEW_NT_shape.setMap(null)
    NT_shape.setMap(map)
    NT_popup.setMap(null)
  })
  // SA
  const SA_shape = new google.maps.Polygon({
    paths: SA,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFFFFF",
    fillOpacity: 0.35,
  });
  const NEW_SA_shape = new google.maps.Polygon({
    paths: SA,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });
  SA_shape.setMap(map);
  SA_shape.addListener('mouseover', () => {
    SA_popup.setMap(map)
    SA_shape.setMap(null)
    NEW_SA_shape.setMap(map)
  })
  NEW_SA_shape.addListener('mouseout', () => {
    NEW_SA_shape.setMap(null)
    SA_shape.setMap(map)
    SA_popup.setMap(null)
  })
  // WA
  const WA_shape = new google.maps.Polygon({
    paths: WA,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFFFFF",
    fillOpacity: 0.35,
  });
  const NEW_WA_shape = new google.maps.Polygon({
    paths: WA,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });
  WA_shape.setMap(map);
  WA_shape.addListener('mouseover', () => {
    WA_popup.setMap(map)
    WA_shape.setMap(null)
    NEW_WA_shape.setMap(map)
  })
  NEW_WA_shape.addListener('mouseout', () => {
    NEW_WA_shape.setMap(null)
    WA_shape.setMap(map)
    WA_popup.setMap(null)
  })
  // TAS
  const TAS_shape = new google.maps.Polygon({
    paths: TAS,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FFFFFF",
    fillOpacity: 0.35,
  });
  const NEW_TAS_shape = new google.maps.Polygon({
    paths: TAS,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });
  TAS_shape.setMap(map);
  TAS_shape.addListener('mouseover', () => {
    TAS_popup.setMap(map)
    TAS_shape.setMap(null)
    NEW_TAS_shape.setMap(map)
  })
  NEW_TAS_shape.addListener('mouseout', () => {
    NEW_TAS_shape.setMap(null)
    TAS_shape.setMap(map)
    TAS_popup.setMap(null)
  })



  }
})