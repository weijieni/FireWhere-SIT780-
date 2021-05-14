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
let temperature_data = [
  {
    region: "VIC",
    temperature: "45",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    region: "VIC",
    temperature: "45",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 3,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 4,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
]
let humidity_data = [
  // {
  //   id: 0,
  //   region: "VIC",
  //   humidity: "70",
  //   warning: "blue",
  //   urgent: "Nah"
  // }
]
let season_data = [
  {
    region: "NSW",
    season: "Summer",
    warning: "red",
    urgent: "urgent"
  }
]
let data_data = [
  {
    id: 0,
    region: "VIC",
    temperature: "40",
    humidity: "40",
    bushfire_level: "Extreme",
    warning: "Red",
  }
]
let card_data = [
  {
    id: 0,
    header: "This is the header",
    imageUrl: "assets/1.jpg",
    content: "This is the content",
    link: "#"
  },
  {
    id: 0,
    header: "This is the header",
    imageUrl: "assets/1.jpg",
    content: "This is the content",
    link: "#"
  },
  {
    id: 1,
    header: "This is the header",
    imageUrl: "assets/1.jpg",
    content: "This is the content",
    link: "#"
  },
  {
    id: 2,
    header: "This is the header",
    imageUrl: "assets/1.jpg",
    content: "This is the content",
    link: "#"
  },
  {
    id: 3,
    header: "This is the header",
    imageUrl: "assets/1.jpg",
    content: "This is the content",
    link: "#"
  },
  {
    id: 4,
    header: "This is the header",
    imageUrl: "assets/1.jpg",
    content: "This is the content",
    link: "#"
  },
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

  $('#temperature_table').bootstrapTable({
    data: temperature_data,
    classes: 'table'
  })

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

//create research cards html
function addCards(dataObj) {
  let div = ""
  for (let i=0; i<dataObj.length;i++) {
    div += `
    <div class="research_card">
      <h3 class="card_header">${dataObj[i].header}</h3>
        <div class="card_main">
          <div class="card_image">
            <img src="${dataObj[i].imageUrl}">
          </div>
          <div class="card_stacked">
            <div class="card_content">
              <p>${dataObj[i].content}</p>
            </div>
            <div class="card_action">
              <a class="link" href="${dataObj[i].link}">This is the link</a>
            </div>
          </div>
        </div>
    </div>
    `
  }
  $('#research_cards').html(div)
}