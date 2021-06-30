// Copyright (c) 2019-2021 Qingpeng Li. All rights reserved.
// Author: qingpeng9802@gmail.com (Qingpeng Li).

'use strict';

/*
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
*/

/** Find the index of the address string in the `fullList` */
const findIndexOfFullList = function (addrStr) {
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
};

/** Get the duaration value and distance value from `disMat`.
  * Push it into `returnResult`
  * and send them to contentscript.js
  */
const getDuaDis = function (disMat, addrsArr, currentTabID) {
  // The return result from `requestData`
  // [duration_value, distance_value]
  // [             0,              1]
  let returnResult = [];

  for (let i = 0; i < addrsArr.length; i++) {
    const oriInd = findIndexOfFullList(addrsArr[i][0]);
    const desInd = findIndexOfFullList(addrsArr[i][1]);

    /*
    // Google Analytics to find unhit addresses
    if (oriInd === -1) {
      if (addrsArr[i][0] === 'none') {
        console.log('****** ERROR:  Origin Address should NOT be "none" ******');
        ga('send', 'exception', {
          'exDescription': '* oriAddr==="none" *',
          'exFatal': true
        });
      }
      ga('send', 'exception', {
        'exDescription': addrsArr[i][0],
        'exFatal': false
      });
    } else if ((desInd === -1 && addrsArr[i][1] !== 'none')) {
      ga('send', 'exception', {
        'exDescription': addrsArr[i][1],
        'exFatal': false
      });
    } else { }
    */

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
};

//Test calling short#2
/*
let addrsArr = [
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


// Timer for `background.js`
//let timeBackStart;

/** Execute the background */
const backGround = function () {
  chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    const addedPayload = {
      t: 'pageview',
      dp: '/_generated_background_page.html'
    };
    sendAnalyticsEvent(addedPayload);
    
    //timeBackStart = window.performance.now();
    // Get the addresses pairs from contentscipt.js and request data
    if (req.addressPair !== undefined) {
      // The address array from contentscript.js
      // [origin, destination]
      // [     0,           1]
      let addrsArr = [];

      addrsArr = req.addressPair;
      //Test
      //console.log(addrsArr);

      // Store the tab ID of my.ucla.edu/ClassPlanner/*
      let currentTabID = sender.tab.id;
      // Change the icon when message is recived
      chrome.action.setIcon({tabId:currentTabID, path: '../icon.png'});

      // Use the distance matrix from `distanceMat.js`
      // and get the duration and distance of each address pair
      getDuaDis(jsonArr, addrsArr, currentTabID);

      sendResponse({ 'resp4c': 'addressPair' });
    }
    //ga('send', 'timing', 'background.js', 'execute', Math.round(window.performance.now() - timeBackStart));
  });

  // Google Analytics for `contentscript.js`
  chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    /*
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
        'exDescription': 'v0.4.7 requestDistance(): ' + req.exceptionOfc,
        'exFatal': true
      });
      sendResponse({});
    }
    */
    if (req.exceptionOfc !== undefined) {
      const addedPayload = {
        t: 'exception',
        exp: 'v0.4.7 mv3 Test requestDistance(): ' + req.exceptionOfc,
        exf: 1
      };
      sendAnalyticsEvent(addedPayload);
    }
    
  });
};

backGround();
