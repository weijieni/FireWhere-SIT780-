// connect to the socket

let socket = io();


socket.on('number', (msg) => {
})

console.log('test')
// $(document).ready(function(){
//   console.log('Ready')
  
//   //test get call
//   $.get('/test?user_name="Fantastic User"',(result)=>{
//     console.log(result)
//   })
// })

// $(document).ready(function(){
//   $('.button-collapse').click(() => {
//     console.log($('.side-nav'))
//     $('#slide-out').show(300);
//   })
// });

$(function() {
  $('#nav_dev').click(function() {
    var dev_item = $('#dev_item')
    if (dev_item.css("display") == "none") {
      dev_item.show(300)
    } else {
      dev_item.hide(300)
    }
  })
})

function handelTab(id, bid) {
  // tab switch
  $('.pages').fadeOut(300)
  $(id).fadeIn(300)

  // button color
  // reset button color and font color
  $('.navbutton').css("background-color", "#fff");
  $('.navbutton').css("color", "#000");  
  //change selected button color and font color
  $(bid).css("background-color", "#1a27ba");
  $(bid).css("color", "#fff");
}

