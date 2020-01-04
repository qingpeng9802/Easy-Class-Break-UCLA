// Copyright (c) 2019 Qingpeng Li. All rights reserved.
// Author: qingpeng9802@gmail.com (Qingpeng Li).

'use strict'

// Google Analytics
window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date;
//window.ga_debug = { trace: true };
ga('create', 'UA-154846897-1', 'auto');
ga('set', 'checkProtocolTask', function () { });
ga('send', 'pageview', '/popup.html');

// Store the id of timer (must be global)
let timerId;

// Raw Summary information from `content_script.js`
let finalSummary;

// Fold state of summary table
let foldState;
// Height of summary table
let height;

/**
 * Debounce function implement
 * @param {function} func The function debounced
 * @param {number} delay The timeout for the function
 * @param {array} args The array of args
 * @return Debounced function
 */
let debounce = function (func, delay) {
  delay = delay || 0;
  return (args) => {
    if (timerId) {
      // Cancel the funciton if there is `timerId` (reset the timer)
      clearTimeout(timerId);
      timerId = null;
    }
    // Set timeout to the function
    timerId = setTimeout(function () {
      func(args);
    }, delay);
  };
}

// Implement debounced `cslSet` function with 200ms
let deb_cslSetThr = debounce((val) => {
  chrome.storage.local.set({ 'varThreshold': val });
}, 300);

let deb_cslSetOriSwi = debounce((val) => {
  chrome.storage.local.set({ 'varOriSwi': val });
  ga('set', 'dimension1', '' + (+oriSwitch.checked) + (+destSwitch.checked));
  ga('send', 'event', 'Checkbox', 'check', 'OriSwitch');
}, 300);
let deb_cslSetDestSwi = debounce((val) => {
  chrome.storage.local.set({ 'varDestSwi': val });
  ga('set', 'dimension1', '' + (+oriSwitch.checked) + (+destSwitch.checked));
  ga('send', 'event', 'Checkbox', 'check', 'DestSwitch');
}, 300);

// Node of range slider
let rangeSlider;
// Node of range box
let rangeBox;
// Node of oriSwitch
let oriSwitch;
// Node of destSwitch
let destSwitch;

// Reset threshold to 2
let resetVal = function (e) {
  rangeSlider.value = 2;
  rangeBox.value = 2;
  deb_cslSetThr(2);
  ga('set', 'dimension2', '2');
  ga('send', 'event', 'Button', 'click', 'RESETbutton');
}

// Initial slider value and box value by storage
// and bind slider value, box value and stored threshold
let main = function () {
  rangeSlider = document.getElementById('rangeslider');
  rangeBox = document.getElementById('inputbox');
  oriSwitch = document.getElementById('oris');
  destSwitch = document.getElementById('dests');

  // Initial storage values
  chrome.storage.local.get(['varThreshold'], function (result) {
    let val = result.varThreshold === undefined ? 2 : result.varThreshold;
    rangeSlider.value = val;
    rangeBox.value = val;
  });

  chrome.storage.local.get(['varOriSwi'], function (result) {
    oriSwitch.checked = result.varOriSwi === undefined ? true : result.varOriSwi;
  });
  chrome.storage.local.get(['varDestSwi'], function (result) {
    destSwitch.checked = result.varDestSwi === undefined ? true : result.varDestSwi;
  });
  chrome.storage.local.get(['varFoldState'], function (result) {
    foldState = result.varFoldState === undefined ? 'block' : result.varFoldState;
  });
  chrome.storage.local.get(['varHeight'], function (result) {
    height = result.varHeight === undefined ? '100%' : result.varHeight;
  });

  // Associate values and update storage `Threshold` for `rangeBox` and `rangeSlider`
  rangeBox.oninput = function () {
    rangeSlider.value = this.value;
  }
  rangeBox.onchange = function () {
    rangeSlider.value = this.value;
    deb_cslSetThr(parseFloat(this.value));
    ga('set', 'dimension2', this.value);
    ga('send', 'event', 'rangeBox', 'onchange', 'rangeBox0');
  }
  rangeSlider.oninput = function () {
    rangeBox.value = this.value;
  }
  rangeSlider.onchange = function () {
    rangeBox.value = this.value;
    deb_cslSetThr(parseFloat(this.value));
    ga('set', 'dimension2', this.value);
    ga('send', 'event', 'rangeSlider', 'onchange', 'rangeSlider0');
  }

  // Update storage `Tip Button Selected` for `oriSwitch` and `destSwitch`
  oriSwitch.onchange = function () {
    deb_cslSetOriSwi(oriSwitch.checked);
  }
  destSwitch.onchange = function () {
    deb_cslSetDestSwi(destSwitch.checked);
  }

}

let m2mile = function (meter) { return (meter / 1609.344).toFixed(2); }
let s2min = function (s) { return (s / 60).toFixed(2); }
let min2s = function (min) { return Math.round(min * 60); }

let constructSummaryEntry = function (currclassArr, nextclassArr) {
  // The Class Titles
  let currclassTitle = '<b>&nbsp&nbsp&nbsp&nbsp' + currclassArr[0] + ' ' + currclassArr[1] + ' ' + currclassArr[6] + '</b><br/>';
  let nextclassTitle = '<b> \u2B62 ' + nextclassArr[0] + ' ' + nextclassArr[1] + ' ' + nextclassArr[6] + '</b>';
  let classTitle = document.createElement('td');
  classTitle.className = 'classdata';
  classTitle.innerHTML = currclassTitle + nextclassTitle;

  // The Class Info
  let bT = currclassArr[8];
  let wT = s2min(currclassArr[9]);
  let rTmin = s2min(min2s(currclassArr[8]) - currclassArr[9]);
  let rTs = min2s(currclassArr[8]) - currclassArr[9];
  let dmile = m2mile(currclassArr[10]);
  let dm = currclassArr[10];

  let summaryEntryStr =
    '<td class=summarydata>' + bT + '</td>' +
    '<td class=summarydata>' + wT + '</td>' +
    '<td class=summarydata>' + rTmin + '<br/>(' + rTs + ')</td>' +
    '<td class=summarydata>' + dmile + '<br/>(' + dm + ')</td>';

  let summaryEntry = document.createElement('tr');
  summaryEntry.className = 'summaryentry';
  summaryEntry.innerHTML = summaryEntryStr;

  // If the class is hurry, color is set to be red
  if (currclassArr[11]) {
    summaryEntry.style.color = '#B00020';
  } else {
    classTitle.style.color = '#0055A6';
  }

  // Insert data table behind the legend
  summaryEntry.insertBefore(classTitle, summaryEntry.firstChild);
  return summaryEntry;
}

let showSummaryTable = function () {
  let summaryTable = document.getElementsByClassName('summarytable')[0];

  for (let i = 0; i < finalSummary.length; i++) {
    if (finalSummary[i][7] == 'none') {
      continue;
    }
    let currEntry = constructSummaryEntry(finalSummary[i], finalSummary[finalSummary[i][7]]);
    summaryTable.appendChild(currEntry);
  }
}

let collapsibleSummaryTable = function () {
  let tablecontainer = document.getElementsByClassName('summarytablecontainer')[0];
  let collsign = document.getElementsByClassName('collapsible')[0];

  // recover store state of the summary table 
  tablecontainer.style.display = foldState;
  tablecontainer.style.maxHeight = height;
  if (foldState == 'block') {
    collsign.classList.toggle("active");
  }

  // control show or hide summary table 
  collsign.addEventListener("click", function () {
    ga('send', 'event', 'collsign', 'click', tablecontainer.style.display);

    this.classList.toggle("active");
    if (tablecontainer.style.display === "block") {
      tablecontainer.style.display = "none";
      chrome.storage.local.set({ 'varFoldState': tablecontainer.style.display });
    } else {
      tablecontainer.style.display = "block";
      chrome.storage.local.set({ 'varFoldState': tablecontainer.style.display });
    }
    // animated collapsible (slide down)
    if (tablecontainer.style.maxHeight !== '0px') {
      tablecontainer.style.maxHeight = '0px';
      chrome.storage.local.set({ 'varHeight': '0px' });
    } else {
      tablecontainer.style.maxHeight = tablecontainer.scrollHeight + "px";
      chrome.storage.local.set({ 'varHeight': '100%' });
    }
  });
}

// Timer for `popup.js`
//let timePopStart;

// Initial adding click event to reset button and initial `main()`
// to meet Content Security Policy (CSP)
document.addEventListener('DOMContentLoaded', function () {
  //timePopStart = window.performance.now();
  document.getElementById('resetbut').addEventListener('click', resetVal);

  // Report exception to GA
  try {
    main();
  } catch (e) {
    console.log('****** FATAL: ' + e.message + ' ******');
    ga('send', 'exception', {
      'exDescription': 'main(): ' + e.stack,
      'exFatal': true
    });
  }

  chrome.storage.local.get(['finalboxClasses'], function (result) {
    if (result.finalboxClasses === undefined) {
      finalSummary = [];
    } else {
      finalSummary = result.finalboxClasses;

      // Report exception to GA
      try {
        showSummaryTable();
        collapsibleSummaryTable();
      } catch (e) {
        console.log('****** FATAL: ' + e.message + ' ******');
        ga('send', 'exception', {
          'exDescription': 'show_OR_coll: ' + e.stack,
          'exFatal': true
        });
      }

    }
  });
  //ga('send', 'timing', 'popup.js', 'execute', Math.round(window.performance.now() - timePopStart));
});
