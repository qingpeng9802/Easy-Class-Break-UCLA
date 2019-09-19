// Copyright (c) 2019 Qingpeng Li. All rights reserved.
// Author: qingpeng9802@gmail.com (Qingpeng Li).

// Node of range slider
let rangeSlider;
// Node of range box
let rangeBox;

// Reset threshold to 2
let resetVal = function (e) {
  rangeSlider.value = 2;
  rangeBox.value = 2;
  chrome.storage.sync.set({ "varThreshold": 2 });
}

// Initial slider value and box value by storage
// and bind slider value, box value and stored threshold
let main = function () {
  rangeSlider = document.getElementById('rangeslider');
  rangeBox = document.getElementById('inputbox');

  chrome.storage.sync.get(['varThreshold'], function (result) {
    let val = Object.is(result.varThreshold, undefined) ? 2 : result.varThreshold;
    rangeSlider.value = val;
    rangeBox.value = val;
  });

  rangeBox.oninput = function () {
    rangeSlider.value = this.value;
    chrome.storage.sync.set({ "varThreshold": this.value });
  }
  rangeSlider.oninput = function () {
    rangeBox.value = this.value;
    chrome.storage.sync.set({ "varThreshold": this.value });
  }
}

// Initial adding click event to reset button and initial `main()`
// to meet Content Security Policy (CSP)
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('resetbut').addEventListener('click', resetVal);
  main();
});