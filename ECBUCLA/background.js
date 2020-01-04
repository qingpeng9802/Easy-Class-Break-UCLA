// Copyright (c) 2019 Qingpeng Li. All rights reserved.
// Author: qingpeng9802@gmail.com (Qingpeng Li).

'use strict'

// Google Analytics
window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date;
//window.ga_debug = { trace: true };
ga('create', 'UA-154846897-1', 'auto');
ga('set', 'checkProtocolTask', function () { });
ga('send', 'pageview', '/_generated_background_page.html');
(function () {
  let ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://www.google-analytics.com/analytics.js';
  let s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// The return result from `requestData`
// [duration_value, distance_value]
// [             0,              1]
let returnResult = [];

// 60 elements of the addresses of the classes
let fullList = [
  "Biomedical Sciences Research Building",
  "Boelter Hall",
  "Botany Building",
  "Boyer Hall",
  "Broad Art Center",
  "Bunche Hall",
  "Campbell Hall",
  "Collins Center for Executive Education",
  "Cornell Hall",
  "Covel Commons",
  "De Neve Plaza Commons Building",
  "Dodd Hall",
  "Engineering IV",
  "Engineering V",
  "Engineering VI",
  "Entrepreneurs Hall",
  "Factor Health Sciences Building",
  "Field",
  "Fowler Museum at UCLA",
  "Franz Hall",
  "Geology Building",
  "Gold Hall",
  "Gonda (Goldschmied) Neuroscience and Genetics Research Center",
  "Graduate School of Education and Information Studies Building",
  "Haines Hall",
  "Hedrick Hall",
  "Hershey Hall",
  "Center for the Health Sciences",
  "Kaplan Hall",
  "Kaufman Hall",
  "Kinsey Science Teaching Pavilion",
  "Knudsen Hall",
  "Korn Convocation Hall",
  "La Kretz Garden Pavilion",
  "La Kretz Hall",
  "Law Building",
  "Life Sciences",
  "Macgowan Hall",
  "Macgowan Hall East",
  "Melnitz Hall",
  "Molecular Sciences Building",
  "Moore Hall",
  "Mathematical Sciences",
  "Northwest Campus Auditorium",
  "Ostin Music Center",
  "Physics and Astronomy Building",
  "Perloff Hall",
  "Powell Library Building",
  "Public Affairs Building",
  "Public Health, School of",
  "Rolfe Hall",
  "Royce Hall",
  "Student Activities Center",
  "Semel Institute for Neuroscience and Human Behavior",
  "Slichter Hall",
  "Schoenberg Music Building",
  "Sproul Hall",
  "Young Hall",
  "Wooden Recreation and Sports Center",
  "Young Research Library"
];

let fullListAbbr = [
  "BIO SCI",
  "BOELTER",
  "BOTANY",
  "BOYER",
  "BROAD",
  "BUNCHE",
  "CAMPBEL",
  "COLLINS",
  "CORNELL",
  "COVEL",
  "DE NEVE",
  "DODD",
  "ENGR IV",
  "ENGR V",
  "ENGR VI",
  "ENTRPNR",
  "FACTOR",
  "FIELD",
  "FOWLER",
  "FRANZ",
  "GEOLOGY",
  "GOLD",
  "GONDA",
  "GSEIS",
  "HAINES",
  "HEDRICK",
  "HERSHEY",
  "HLTHSCI",
  "KAPLAN",
  "KAUFMAN",
  "KNSY PV",
  "KNUDSEN",
  "KORN",
  "LKGP",
  "LAKRETZ",
  "LAW",
  "LS",
  "MACGOWN",
  "MCGWN E",
  "MELNITZ",
  "MOL SCI",
  "MOORE",
  "MS",
  "NWAUD",
  "OSTIN",
  "PAB",
  "PERLOFF",
  "POWELL",
  "PUB AFF",
  "PUB HLT",
  "ROLFE",
  "ROYCE",
  "SAC",
  "SEMEL",
  "SLICHTR",
  "SMB",
  "SPROUL",
  "WGYOUNG",
  "WOODEN",
  "YRL"
];



// Request the distance matrix from json file
// and get the duration and distance of each address pair
let requestData = function () {
  // Load `distanceMat.json`
  fetch('./distanceMat.json')
    .then(response => response.json())
    .then((jsonArr) => {
      // Report exception to GA
      try {
        getDuaDis(jsonArr);
        //Test
        //console.log(returnResult);
      } catch (e) {
        console.log('****** FATAL: ' + e.message + ' ******');
        ga('send', 'exception', {
          'exDescription': 'getDuaDis(jsonArr): ' + e.stack,
          'exFatal': true
        });
      }
    });
}

// Find the index of the address string in the `fullList`
let findIndexofFullList = function (addrStr) {
  for (let i = 0; i < fullList.length; i++) {
    if (addrStr.includes(fullList[i])) {
      return i;
    }
  }
  for (let j = 0; j < fullListAbbr.length; j++) {
    if (addrStr.toUpperCase().includes(fullListAbbr[j])) {
      return j;
    }
  }
  return -1;
}

// Get the duaration value and distance value from `disMat`
// and push it into `returnResult`
// and send them to contentscript.js
let getDuaDis = function (disMat) {
  for (let i = 0; i < addrArr.length; i++) {
    let oriInd = findIndexofFullList(addrArr[i][0]);
    let desInd = findIndexofFullList(addrArr[i][1]);

    // Google Analytics to find unhit addresses
    if (oriInd === -1) {
      if (addrArr[i][0] === 'none') {
        console.log('****** ERROR:  Origin Address should NOT be "none" ******');
        ga('send', 'exception', {
          'exDescription': '* oriAddr==="none" *',
          'exFatal': true
        });
      }
      ga('send', 'exception', {
        'exDescription': addrArr[i][0],
        'exFatal': false
      });
    } else if ((desInd === -1 && addrArr[i][1] !== 'none')) {
      ga('send', 'exception', {
        'exDescription': addrArr[i][1],
        'exFatal': false
      });
    } else { }

    if (oriInd === -1 || desInd === -1) {
      returnResult.push([0, 0]);
    } else {
      returnResult.push([disMat[oriInd][desInd][0], disMat[oriInd][desInd][1]]);
    }
  }
  //Test calling short#1
  chrome.tabs.sendMessage(currentTabID, {
    'returnData': returnResult
  }, function (response) {
    //console.log('Response: `' + response.resp4b + '` for `returnData`' + ' has got!!!');
  });
  //Test
  //console.log("Request result has been sent back !!!");
}

//Test calling short#2
/*
let addrArr = [
  ["Boelter Hall 3400", "Boelter Hall 2444"],
  ["Boelter Hall 2444", "Boelter Hall 2444"],
  ["Boelter Hall 2444", "Franz Hall 1260"],
  ["Franz Hall 1260", "none"],
  ["Mathematical Sciences 5200", "Engineering VI Mong Learning Center"],
  ["Engineering VI Mong Learning Center", "Boelter Hall 3428"],
  ["Boelter Hall 3428", "Royce Hall 362"],
  ["Royce Hall 362", "Moore Hall 100"],
  ["Moore Hall 100", "none"],
  ["Boelter Hall 3400", "Boelter Hall 2444"],
  ["Boelter Hall 2444", "Boelter Hall 2444"],
  ["Engineering VI 134A", "Boelter Hall 2444"],
  ["Boelter Hall 2444", "Franz Hall 1260"],
  ["Franz Hall 1260", "none"],
  ["Mathematical Sciences 5200", "Engineering VI Mong Learning Center"],
  ["Engineering VI Mong Learning Center", "Boelter Hall 3428"],
  ["Boelter Hall 3428", "Royce Hall 362"],
  ["Royce Hall 362", "Moore Hall 100"],
  ["Moore Hall 100", "none"],
  ["Public Affairs Building 1234", "Public Affairs Building 1234"],
  ["Haines Hall A2", "Public Affairs Building 1234"],
  ["Bunche Hall 3150", "Public Affairs Building 1234"],
  ["Public Affairs Building 1234", "Geology Building 4660"],
  ["Geology Building 4660", "Boelter Hall 4404"],
  ["Public Affairs Building 2238", "Boelter Hall 4404"],
  ["Haines Hall A18", "Boelter Hall 4404"],
  ["Boelter Hall 4404", "none"],
];
*/

// Store the tab ID of my.ucla.edu/ClassPlanner/*
let currentTabID;
// The address array from contentscript.js
// [origin, destination]
// [     0,           1]
let addrArr = [];

// Timer for `background.js`
//let timeBackStart;

chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  //timeBackStart = window.performance.now();
  // Get the addresses pairs from contentscipt.js and request data
  if (req.addressPair !== undefined) {
    addrArr = [];
    addrArr = req.addressPair;
    //Test
    //console.log(addrArr);
    currentTabID = sender.tab.id;
    // Fire the icon when message is recived
    chrome.pageAction.show(currentTabID);
    // Reset the `returnRestult` important to avoid repushing
    returnResult = [];

    requestData();

    sendResponse({ 'resp4c': 'addressPair' });
  }
  //ga('send', 'timing', 'background.js', 'execute', Math.round(window.performance.now() - timeBackStart));
});

// Google Analytics for `contentscript.js`
chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  if (req.mouseoverHurry === 1) {
    ga('send', 'event', 'infoTab', 'mouseover', 'infoTab0');
    sendResponse({});
  }
  if (req.mouseoutHurry !== undefined) {
    ga('send', 'event', 'infoTab', 'mouseout', 'infoTab0', Math.round(req.mouseoutHurry));
    sendResponse({});
  }
  if (req.hurryCount !== undefined) {
    ga('set', 'dimension3', '' + req.hurryCount);
    ga('send', 'event', 'hurryClass', 'count', 'hurryCount');
    sendResponse({});
  }
  if (req.timeContent !== undefined) {
    ga('send', 'timing', 'contentscript.js', 'execute', Math.round(req.timeContent));
    sendResponse({});
  }
  if (req.pageViewContent === 1) {
    ga('send', 'pageview', '/content_script.html');
    sendResponse({});
  }
  if (req.exceptionOfc !== undefined) {
    ga('send', 'exception', {
      'exDescription': 'requestDistance(): ' + req.exceptionOfc,
      'exFatal': true
    });
    sendResponse({});
  }
});
