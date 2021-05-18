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
let temperature_data
let humidity_data
let season_data
let data_data 
let card_data

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

  // button color
  // reset button color and font color
  $('.navbutton').removeClass('btn_selected')
  //change selected button color and font color
  $(bid).addClass('btn_selected')
}

//customize data format
function operateFormatter(value, row, index) {
  return `
  <button class="" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${warning_data[index].warning_message}</button>
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