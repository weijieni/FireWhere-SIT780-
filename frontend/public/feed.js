var arrMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var arrDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var states = ['NSW','VIC','SA','QLD','NT','WA_DFES','WA_DFES_INCIDENTS','WA_DPAW'];
		
$(function() {
			for (var i = 0; i < states.length; i++) {
					loadRSSfeed(states[i]);
				}
      $('.head').click(function(e){
        var issame=false;
        if ($(this).hasClass('top-selected')) {
            $(this).toggleClass("top-selected");
            $(this).closest('li').find('.content').slideToggle();
            return;
        } else {
          $(".top-selected").toggleClass("top-selected");
        }
        $(this).toggleClass("top-selected");
        $(this).closest('li').find('.content').slideToggle();
      });


	


function loadRSSfeed(state) {
  if (typeof state === undefined|| state ==="") return;
    var loadurl = "https://myfirewatch.landgate.wa.gov.au/map.html";
    loadurl = loadurl.split('/').slice(0, -1).join('/') + '/rss/readrss6.php?state='+state;
    $.ajax( {
      url: loadurl,
      dataType: 'json',
      accept: {json: 'application/json'},
      type: 'GET',
      success: function(data) {
        h = ' <ul id="rss-'+state.toLowerCase()+'">';
        if (data !== undefined) {
          if (data.items !== undefined && Array.isArray(data.items) && data.items.length > 0) {
            for (var i = 0; i < data.items.length; i++) {
              var item = data.items[i];

              var link = item.link;
              var title = item.title;

              var pubdate = new Date(item.publisheddate);
              var pdate = '';
              if (pubdate instanceof Date && !isNaN(pubdate.getTime())) {
                 pubdate.setTime(pubdate.getTime()+pubdate.getTimezoneOffset());
                 var mth = pubdate.getMonth(),
                 mths=arrMonths[mth];
                 pdate = ' - '+pubdate.getDate()+' '+mths+', '+('00'+pubdate.getHours()).slice(-2)+':'+('00'+pubdate.getMinutes()).slice(-2);
              }

              var str = item.title+' '+item.description;
              var cat = item.category, acat="";
              if (cat !='') {
                cat=cat.toLowerCase();
                acat ='[ '+cat.toUpperCase()+' ] ';
                aclass = ' class="'+cat.toLowerCase()+'" ';
              }
              if (cat=='') {
                cat='nocat';
              }
                h = h + ['<li><a href="',
                link,
                '">',
                '<b>',
                title,
                '</b>',
                '</a>',
                pdate,
                '</li>'].join('');
            }
          }
          else {
            switch (state) {
              case 'QLD':
                h =  [
                  '<li><a target"_blank" ',
                  'href="https://www.qfes.qld.gov.au/Current-Incidents">',
                  'Please visit Queensland Fire and Emergency Service Website',
                  '</a></li>'
                ].join('');
                break;
              case 'NT':
                h =  [
                  '<li><a target"_blank" ',
                  'href="https://bushfires.nt.gov.au/incidentmap">',
                  'Please visit BushFires NT Website',
                  '</a></li>'].join('');
                break;
              default:
                h = h + '<li>No news items today.</li>';
                break;
            }
          }
        }
        else {
          h = h + '<li>No alerts currently published.</li>';
        }
        h = h + '</ul>';
        $("#"+state.toLowerCase()+"list").html(h);
     }
    });

}
});
