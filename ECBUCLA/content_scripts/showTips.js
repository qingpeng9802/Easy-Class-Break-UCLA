// Copyright (c) 2019-2021 Qingpeng Li. All rights reserved.
// Author: qingpeng9802@gmail.com (Qingpeng Li).

'use strict';

//Test calling short#1
/*
let returnResult = [
  [0, 0],
  [0, 0],
  [82, 97],
  [0, 0],
  [203, 229],
  [212, 221],
  [294, 365],
  [208, 290],
  [0, 0],
  [0, 0],
  [0, 0],
  [212, 221],
  [82, 97],
  [0, 0],
  [203, 229],
  [212, 221],
  [294, 365],
  [208, 290],
  [0, 0],
  [0, 0],
  [297, 372],
  [181, 217],
  [482, 686],
  [268, 355],
  [635, 874],
  [392, 553],
  [0, 0]
]
*/

const m2mile = function (meter) { return (meter / 1609.344).toFixed(2); };
const s2min = function (s) { return (s / 60).toFixed(2); };
const min2s = function (min) { return Math.round(min * 60); };

/**
  * Construct a ButtonPopup node.
  * @param {array} classArr current class info array
  * @param {array} nextclassArr next class info array
  * @param {string} str which string need to display
  * @return a node of info string
  */
const getButtonPopupNode = function (classArr, nextclassArr, str) {
  // The Class Title
  const titlelineStr = '<b>' + str + nextclassArr[0] + ' ' + nextclassArr[1] + ' ' + nextclassArr[6] + '</b>';
  const classStr = $('<li></li>').html(titlelineStr).attr({ class: 'classline' });

  // The Class Info
  const bT = classArr[8];
  const wT = s2min(classArr[9]);
  const rTmin = s2min(min2s(classArr[8]) - classArr[9]);
  const rTs = min2s(classArr[8]) - classArr[9];
  const dmile = m2mile(classArr[10]);
  const dm = classArr[10];

  const infoStr =
    '<table>' +
    '<tr><td><b>BreakTime:</b></td>' + '<td class=infodata>' + bT + ' min</td></tr>' +
    '<tr><td><b>WalkTime:</b></td>' + '<td class=infodata>' + wT + ' min</td></tr>' +
    '<tr><td><b>ResTime:</b></td>' + '<td class=infodata>' + rTmin + ' min (' + rTs + ' s)</td></tr>' +
    '<tr><td><b>Distance:</b></td>' + '<td class=infodata>' + dmile + ' miles (' + dm + ' m)</td></tr>' +
    '</table>';
  const infoList = $('<li></li>').html(infoStr).attr({ class: 'infoline' });

  // Append `classstr` and `infolist` to `infonode` to control `tabinfo` style
  const infoNode = $('<ul></ul>').attr({ class: 'tabinfo' });
  infoNode.append(classStr).append(infoList);

  return infoNode;
};

/** Add button and info to the web page of Class Planner */
const showInfoButton = function (ind, oriSwitch, destSwitch, boxClasses, planClasses) {
  // no show invalid boxClass
  if (boxClasses[ind][classnumberIndex] === 'invalid' || 
      boxClasses[boxClasses[ind][nextClassIndIndex]][classnumberIndex] === 'invalid') {
    return;
  }

  // Search corresponding hurry class in planClasses
  const oriHurryID = boxClasses[ind][idIndex];
  const nextind = boxClasses[ind][nextClassIndIndex];
  const desHurryID = boxClasses[nextind][idIndex];

  for (let j = 0; j < planClasses.length; j++) {
    // Origin class is hurry
    if (planClasses[j][2] === oriHurryID && oriSwitch) {
      const oriModifyNodeInd = j;
      const locationBox = $($("td[class='centerColumn']")[oriModifyNodeInd]).next().next();

      // Create the container of ButtonPopup
      const BPNode = $('<div></div>').attr({ class: 'infotab' });
      locationBox.append(BPNode);

      // Insert the color Button INTO a new <div> node (container)
      // to keep the relative position of the other nodes
      const theWeekday = boxClasses[ind][weekdayIndex];
      const button = $('<a></a>').html('Ori ' + theWeekday).attr({ class: 'hurry', href: 'javascript:;' });
      BPNode.append(button);

      // Insert the class info after the Button
      const oriInsertNode = getButtonPopupNode(boxClasses[ind], boxClasses[nextind], 'Next: &nbsp');
      BPNode.append(oriInsertNode);

      continue;
    }

    // Destination class is hurry
    if (planClasses[j][2] === desHurryID && destSwitch) {
      const desModifyNodeInd = j;
      const locationBox = $($("td[class='centerColumn']")[desModifyNodeInd]).next().next();

      const BPNode = $('<div></div>').attr({ class: 'infotab' });
      locationBox.append(BPNode);

      const theWeekday = boxClasses[ind][weekdayIndex];
      const button = $('<a></a>').html('Dest ' + theWeekday).attr({ class: 'hurry', href: 'javascript:;' });
      BPNode.append(button);

      const desInsertNode = getButtonPopupNode(boxClasses[ind], boxClasses[ind], 'Prev: &nbsp');
      BPNode.append(desInsertNode);

      continue;
    }
  }

};

// Append `hurry` flag to `boxClasses`
const appendHurryFlag = function (ind, oriSwitch, destSwitch, boxClasses, planClasses, threshold) {
  if ((min2s(boxClasses[ind][gapTimeIndex]) - boxClasses[ind][walkTimeIndex]) <= threshold * 60) {
    boxClasses[ind].push(1);
    // If the class is hurry, show the button
    showInfoButton(ind, oriSwitch, destSwitch, boxClasses, planClasses);
    return 1;
  } else {
    boxClasses[ind].push(0);
    return 0;
  }
};

// Append the result (`walkTime`, `walkTistance`) from background.js to `boxClasses`
const appendResult = function (oriSwitch, destSwitch, boxClasses, planClasses, threshold, returnResult) {
  // Count the number of hurry classes
  let hurryCount = 0;

  // When a class is deleted from `boxClasses` but `returnResult` is not updated yet
  if (boxClasses.length !== returnResult.length) {
    console.log('****** ERROR: boxClasses.length !== returnResult.length ******');
    return;
  }

  for (let i = 0; i < boxClasses.length; i++) {
    boxClasses[i].push(returnResult[i][0], returnResult[i][1]);
    // Check if the class is hurry and append `hurry` flag
    hurryCount += appendHurryFlag(i, oriSwitch, destSwitch, boxClasses, planClasses, threshold);
  }

  return hurryCount;
};

const processAndShowResult = function (oriSwitch, destSwitch, boxClasses, planClasses, threshold, returnResult) {
  //Test
  //console.log(boxClasses);
  //console.log(planClasses);
  //console.log(threshold);

  // clean old `.infotab` nodes
  $('.infotab').remove();

  let hurryCount = appendResult(oriSwitch, destSwitch, boxClasses, planClasses, threshold, returnResult);

  //Test
  //console.log(boxClasses);
  //console.log(planClasses);

  // Google Analytics
  let timeHoverStart;

  const hurryTabs = document.getElementsByClassName('hurry');
  for (let i = 0; i < hurryTabs.length; i++) {
    hurryTabs[i].addEventListener("mouseover", function () {
      timeHoverStart = window.performance.now();
      chrome.runtime.sendMessage({ 'mouseoverHurry': 1 });
    });

    hurryTabs[i].addEventListener("mouseout", function () {
      chrome.runtime.sendMessage({ 'mouseoutHurry': window.performance.now() - timeHoverStart });
    });
  }

  chrome.runtime.sendMessage({ 'hurryCount': hurryCount }, function (response) {
    hurryCount = 0;
  });

  // store `boxClasses` for `popup.js`
  chrome.storage.local.set({ 'finalboxClasses': boxClasses });
};
