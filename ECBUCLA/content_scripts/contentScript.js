// Copyright (c) 2019-2021 Qingpeng Li. All rights reserved.
// Author: qingpeng9802@gmail.com (Qingpeng Li).

'use strict';

/** Send addressPairsArr to `background.js` */
const requestDistance = function (mappedBoxClasses, planClasses) {
  // Finish preprocess `BoxClasses` #2
  // [number, classtype, location, id, startTime, endTime, weekday, nextClassInd, gapTime]
  // [     0,         1,        2,  3,         4,       5        6,            7,       8]
  const addressPairsArr = getMinDiffAndAddrPairs(mappedBoxClasses);
  //Test
  //console.log("PAIR");
  //console.log(addressPairsArr);

  // Test if the address pairs are extract correctly
  if (addressPairsArr.length !== mappedBoxClasses.length) {
    console.log('****** ERROR: addressPairArr.length !== mappedBoxClasses.length ******');
    return;
  }

  const saveContext = [mappedBoxClasses, planClasses];
  chrome.storage.local.set({
    'curContext': saveContext
  });

  // Send `addressPairArr` to background.js
  chrome.runtime.sendMessage({
    'addressPair': addressPairsArr
  }, function (response) {
    //console.log('Response: `' + response.resp4c + '` for `addressPair`' + ' has got!!!');
  });

};

/** Timer for `contentScript()` */
let timeContentStart;

/** Execute the main script */
const contentScript = function (isFirstTime) {
  timeContentStart = window.performance.now();

  const boxClasses = extractBoxClasses();
  const planClasses = extractPlanClasses();
  //Test
  //console.log(boxClasses);
  //console.log(planClasses);

  // Finish preprocess `BoxClasses` #1
  // [number, classtype, location, id, startTime, endTime]
  // [     0,         1,        2,  3,         4,       5]
  const mappedBoxClasses = mapIDTime2BoxClasses(boxClasses, planClasses);
  //Test
  //console.log(mappedBoxClasses);

  // Google Analytics
  chrome.runtime.sendMessage({ 'pageViewContent': 1 });

  // Report exception to GA
  try {
    requestDistance(mappedBoxClasses, planClasses);
  } catch (e) {
    console.log('****** FATAL: ' + e.stack + ' ******');

    let astr = [];
    const debug = function () {
      $('td.section-header a').each(
        function () { astr.push($(this).attr('href')); }
      );
    };
    if ($('td.section-header a').length != 0) { debug(); }

    chrome.runtime.sendMessage({
      'exceptionOfc':
        e.stack + '\n' + JSON.stringify(boxClasses) + '\n' +
        JSON.stringify(planClasses) + '\n' + JSON.stringify(mappedBoxClasses) + '\n' +
        $('.courseItem').length + astr
    });
  }

  // Only execute above functions when first time call `contentScript()`
  if (isFirstTime) {
    croAddListener();
    pageMO();
  }

};

/** Add a listener to recive message from `background.js` */
const croAddListener = function () {
  chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    if (req.returnData !== undefined) {
      // Recieve the result of data from background.js
      let returnResult = [];
      returnResult = req.returnData;

      // Recover current context (since the listener will be only added once)
      chrome.storage.local.get(['curContext', 'varThreshold', 'varOriSwi', 'varDestSwi'], function (result) {
        const boxClasses = result.curContext[0];
        const planClasses = result.curContext[1];

        // Residual time (`gapTime` - `walkTime`) of tolerance, Initial `threshold` to 2 min
        const threshold = result.varThreshold === undefined ? 2 : result.varThreshold;

        // If show [ori] button
        const oriSwitch = result.varOriSwi === undefined ? true : result.varOriSwi;
        // If show [Dest] button
        const destSwitch = result.varDestSwi === undefined ? true : result.varDestSwi;

        //Test
        //console.log("Return: " + returnResult);

        // Report exception to GA
        try {
          processAndShowResult(oriSwitch, destSwitch, boxClasses, planClasses, threshold, returnResult);
        } catch (e) {
          console.log('****** FATAL: ' + e.stack + ' ******');
          chrome.runtime.sendMessage({ 'exceptionOfc': e.stack + '\n' + JSON.stringify(boxClasses) });
        }

      });

      sendResponse({ 'resp4b': 'returnData' });
    }

    // Google Analytics
    chrome.runtime.sendMessage({ 'timeContent': window.performance.now() - timeContentStart });

  });
};

/** TimeoutID (must be global) */
let timeoutID = null;

/** Detect mutation in the page */
const pageMO = function () {
  const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  const obNode = document.getElementById('ctl00_main_wrapper');
  const observer = new MutationObserver(function (mutations) {
    // Call when detect a mutation
    //Test
    //console.log(mutations);

    // Wait for finishing DOM tree reconstruct
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = null;
    }
    timeoutID = setTimeout(function () {
      contentScript(false);
    }, 1000);

  });
  const config = { childList: true };
  observer.observe(obNode, config);
};

contentScript(true);
