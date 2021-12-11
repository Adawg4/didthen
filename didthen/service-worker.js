// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

//console.log("This prints to the console of the service worker (background script)")

// Importing and using functionality from external files is also possible.
importScripts('service-worker-utils.js')

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.
// add listener
/*chrome.tabs.onCreated.addListener(function(tabObj) {

  var tabId = tabObj.id;
  if (tabObj.url === 'chrome://newtab/') {


    chrome.storage.sync.get("url", function(items) {

      // update chrome tab URL if valid data
      if (!chrome.runtime.error && items.url)
        chrome.tabs.getCurrent(function(tab) {
            chrome.tabs.update(
              tabId,
              //get pages
              { url:items.url }
            );
        });
    });
  }
});*/
//https://thisinterestsme.com/javascript-one-week-ago/
//Get today's date using the JavaScript Date object.
var ourDate = new Date();

//Change it so that it is 7 days in the past.
var pastDate = ourDate.getDate() - 1;
console.log(ourDate.getDate());
ourDate.setDate(pastDate);
ourDate = Math.round(ourDate / 1000);

//https://stackoverflow.com/questions/24894627/how-to-get-browsing-history-using-history-api-in-chrome-extension
//https://stackoverflow.com/questions/22225913/how-can-i-get-my-entire-history-with-chrome-history-search/22262748
chrome.history.search({
  'text': '',               // Return every history item....
  //'startTime': ourDate,  // that was accessed less than one week ago.
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
    dict[domain] = (dict[domain] || 0) + 1;
    ct++;
     // do whatever you want with this visited url
  }
  console.log(dict);
 });


    

 // put in the home script and whenever a user opens it up idk 