// Copyright (c) 2019 Qingpeng Li. All rights reserved.
// Author: qingpeng9802@gmail.com (Qingpeng Li).

'use strict'

// Store the id of timer (must be global)
let timerId;

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

// Implement debounced `cslSet` function with 500ms
let deb_cslSet = debounce((val) => {
  chrome.storage.local.set({ 'varThreshold': val });
}, 200);

// Node of range slider
let rangeSlider;
// Node of range box
let rangeBox;

// Reset threshold to 2
let resetVal = function (e) {
  rangeSlider.value = 2;
  rangeBox.value = 2;
  deb_cslSet(2);
}

// Initial slider value and box value by storage
// and bind slider value, box value and stored threshold
let main = function () {
  rangeSlider = document.getElementById('rangeslider');
  rangeBox = document.getElementById('inputbox');

  chrome.storage.local.get(['varThreshold'], function (result) {
    let val = result.varThreshold === undefined ? 2 : result.varThreshold;
    rangeSlider.value = val;
    rangeBox.value = val;
  });

  rangeBox.oninput = function () {
    rangeSlider.value = this.value;
    deb_cslSet(parseFloat(this.value));
  }
  rangeSlider.oninput = function () {
    rangeBox.value = this.value;
    deb_cslSet(parseFloat(this.value));
  }
}

// Initial adding click event to reset button and initial `main()`
// to meet Content Security Policy (CSP)
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('resetbut').addEventListener('click', resetVal);
  main();
});