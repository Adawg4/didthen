// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.
//importScripts('apexcharts.js');
//https://apexcharts.com/javascript-chart-demos/treemap-charts/
console.log("This prints to the console of the page (injected only if the page url matched)");

//https://thisinterestsme.com/javascript-one-week-ago/
//Get today's date using the JavaScript Date object.
var ourDate = new Date();

//Change it so that it is 7 days in the past.
var pastDate = ourDate.getDate() - 7;
console.log(ourDate.getDate());
ourDate.setDate(pastDate);
ourDate = Math.round(ourDate / 1000);

//https://stackoverflow.com/questions/24894627/how-to-get-browsing-history-using-history-api-in-chrome-extension
//https://stackoverflow.com/questions/22225913/how-can-i-get-my-entire-history-with-chrome-history-search/22262748
chrome.history.search({
  'text': '',               // Return every history item....
  'startTime': ourDate,  // that was accessed less than one week ago.
  'maxResults': 0,        // Optionally state a limit
},
function(historyItems) {
  var ct = 0;
  var dict = {};
  // For each history item, get details on all visits.
  for (var i = 0; i < historyItems.length; ++i) {
    //var url = historyItems[i].url;
    //https://w3collective.com/get-domain-name-url-javascript/
    let domain = (new URL(historyItems[i].url)).hostname.replace('www.','');
    //https://stackoverflow.com/questions/18690814/how-to-increment-an-object-property-value-if-it-exists-else-set-the-initial-val
    if(!(domain=="google.com")){
    	dict[domain] = (dict[domain] || 0) + 1;
   	}
    ct++;
     // do whatever you want with this visited url
  }
  console.log(dict);

//https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript

// Create items array
var items = Object.keys(dict).map(function(key) {
  return [key, dict[key]];
});

// Sort the array based on the second element
items.sort(function(first, second) {
  return second[1] - first[1];
});

    
//https://stackoverflow.com/questions/38790146/javascript-object-literal-possible-to-add-duplicate-keys
var objArray = [];
for (const [key, value] of Object.entries(dict)) {
  	objArray.push({x:key, y:value});
}

 // put in the home script and whenever a user opens it up idk 
var options = {
    series: [{
        name: 'Lol',
        data: objArray
    }, ],
    legend: {
        show: false
    },
    chart: {
        type: 'treemap'
    },
    title: {
        text: 'Multi-dimensional Treemap',
        align: 'center'
    },
    responsive: [{
        breakpoint: undefined,
        options: {},
    }],
    plotOptions: {
        treemap: {
            distributed: true,
            enableShades: false
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: []
        }
    }
};
var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
/*
      
        var options = {
          series: [
          {
            data: [
              {
                x: 'New Delhi',
                y: 218
              },
              {
                x: 'Kolkata',
                y: 149
              },
              {
                x: 'Mumbai',
                y: 184
              },
              {
                x: 'Ahmedabad',
                y: 55
              },
              {
                x: 'Bangaluru',
                y: 84
              },
              {
                x: 'Pune',
                y: 31
              },
              {
                x: 'Chennai',
                y: 70
              },
              {
                x: 'Jaipur',
                y: 30
              },
              {
                x: 'Surat',
                y: 44
              },
              {
                x: 'Hyderabad',
                y: 68
              },
              {
                x: 'Lucknow',
                y: 28
              },
              {
                x: 'Indore',
                y: 19
              },
              {
                x: 'Kanpur',
                y: 29
              }
            ]
          }
        ],
          legend: {
          show: false
        },
        chart: {
          height: 350,
          type: 'treemap'
        },
        title: {
          text: 'Distibuted Treemap (different color for each cell)',
          align: 'center'
        },
        colors: [
          '#3B93A5',
          '#F7B844',
          '#ADD8C7',
          '#EC3C65',
          '#CDD7B6',
          '#C1F666',
          '#D43F97',
          '#1E5D8C',
          '#421243',
          '#7F94B0',
          '#EF6537',
          '#C0ADDB'
        ],
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false
          }
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
      */


});
