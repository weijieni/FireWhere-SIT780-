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
    id: 0,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 1,
    region: "VIC",
    temperature: "38",
    warning: "Red",
    urgent: "Urgent"
  },
  {
    id: 2,
    region: "VIC",
    temperature: "38",
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
]

var temperature_columns = [
  {
  field: 'region',
  title: 'Region'
  }, 
  {
    field: 'temperature',
    title: 'Temperature'
  }, 
  {
    field: 'warning',
    title: 'Warning'
  }, 
  {
    field: 'urgent',
    title: 'Urgent'
  }
]

let humidity_data = [
  {
    id: 0,
    region: "VIC",
    humidity: "70",
    warning: "blue",
    urgent: "Nah"
  }
]

var humidity_columns = [
  {
    field: 'region',
    title: 'Region'
  }, 
  {
    field: 'humidity',
    title: 'Humidity'
  }, 
  {
    field: 'warning',
    title: 'Warning'
  }, 
  {
    field: 'urgent',
    title: 'Urgent'
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

var data_columns = [
  {
    field: 'region',
    title: 'Region'
  }, 
  {
    field: 'temperature',
    title: 'Temperature'
  },
  {
    field: 'humidity',
    title: 'Humidity'
  }, 
  {
    field: 'bushfire_level',
    title: 'Bush Fire Level'
  }, 
  {
    field: 'warning',
    title: 'Warning'
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

  getWarningData(warning_data)

  $('#temperature_table').bootstrapTable({
    columns: temperature_columns,
    data: getData(temperature_data),
    classes: "table", 
    height: 600,
    pagination:true,
    pageNumber:1,
    pageSize:10,
    pageList:"[10, 20]",
    paginationHAlign:"left",
    paginationDetailHAlign:"right",
  })

  $('#humidity_table').bootstrapTable({
    columns: humidity_columns,
    data: getData(humidity_data),
    classes: "table", 
    height: 600,
    pagination:true,
    pageNumber:1,
    pageSize:10,
    pageList:"[10, 20]",
    paginationHAlign:"left",
    paginationDetailHAlign:"right",
  })

  $('#data_table').bootstrapTable({
    columns: data_columns,
    data: getData(data_data),
    classes: "table", 
    height: 600,
    pagination:true,
    pageNumber:1,
    pageSize:10,
    pageList:"[10, 20]",
    paginationHAlign:"left",
    paginationDetailHAlign:"right",
  })
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
function getWarningData(dataObj){
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

//initial table data - for all
function getData(dataObj){
  var data = [];

  //push data objects
  for (var i = 0; i < dataObj.length; i++)
  {
    data.push(dataObj[i]);
  };

  return data;
}
