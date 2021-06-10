// import {sendSMS} from '../model/SMSmodule'
// console.log(sendSMS)

// const accountSid = "AC220f11629e7329aa75eb30753dec3db7";
// const authToken = "7caa2517026f9d387c2253fafab7edd3";
// const SMSclient = require('twilio')(accountSid, authToken);

// $.ajax({
//     type: "POST",
//     url: "/api/sms",
//     dataType: "json",
//     async: false,
//     data: {},
//     success: (req,res) => {
//         SMSclient.messages
//         .create({
//             body: '[FireWhere] ' + $('#message').text(),
//             from: '+17573201561',
//             to: req.body.to
//           })
//         .then(message => {
//           console.log(message.sid)
//           res.json({status:'ok'})
//         }).catch(err => console.log(err))
//       },
//     error(error){
//       console.log(error);
//     }
// });
const accountSid = "AC220f11629e7329aa75eb30753dec3db7";
const authToken = "7caa2517026f9d387c2253fafab7edd3";
const SMSclient = require('twilio')(accountSid, authToken);

console.log(SMSclient)

$(function() {
    $('#send').click(() => {
      console.log('clicked')
      SMSclient.messages
      .create({
        body: '[FireWhere] ' + $('#message').text(),
        from: '+17573201561',
        to: req.body.to
      })
      .then(message => {
        console.log(message.sid)
        res.json({status:'ok'})
      }).catch(err => console.log(err))
    })
})
