// Copyright (c) 2019 Qingpeng Li. All rights reserved.
// Author: qingpeng9802@gmail.com (Qingpeng Li).

'use strict'

// `boxClasses`: The classes in box
// [classnumber, classtype, location, id, startTime, endTime, weekday, nextClassInd, gapTime,  walkTime, walkTistance, hurry]
// [          0,         1,        2,  3,         4,       5,       6,            7,       8,         9,           10,    11]

// Reserve for understanding `boxClasses` array only
/** The Class that stores the infomation of a class. */
class ClassInfo {
  constructor(classnumber, classtype, location, id, startTime, endTime, weekday, nextClassInd,
    gapTime, walkTime, walkTistance, hurry) {
    /**
    * @param {string} classnumber The class number. eg. COM SCI 188
    * @param {string} classtype The class type. eg. Lec 1
    * @param {string} location The location of the class. eg. Boelter Hall 3400
    * @param {string} id The ID of the class. eg. 186799200
    * @param {string} startTime The start time of the class. eg. 2pm
    * @param {string} endTime The end time of the class. eg. 3:50pm
    * @param {string} weekday The weekday of the class. eg. W
    * @param {number} nextClassInd The index of the next class in the box. eg. 4
    * @param {number} gapTime The gap time between current class and next class with unit: min . eg. 10
    * @param {number} walkTime The walking time with unit: s . eg. 132
    * @param {number} walkTistance The walking time with distance: m . eg. 245
    * @param {number} hurry If (gapTime - walkTime) <= threshold eg. 1
    * 
    */
    this.classnumber = '';
    this.classtype = '';
    this.location = '';
    this.id = '';
    this.startTime = '';
    this.endTime = '';
    this.weekday = '';
    this.nextClassInd = -1;
    this.gapTime = 0;
    this.walkTime = 0;
    this.walkTistance = 0;
    this.hurry = 0;
  }

  toString() {
    return ("classnumber: " + this.classnumber + '\n' +
      "classtype: " + this.classtype + '\n' +
      "location: " + this.location + '\n' +
      "id: " + this.id + '\n' +
      "startTime: " + this.startTime + '\n' +
      "endTime: " + this.endTime + '\n' +
      "weekday: " + this.weekday + '\n' +
      "nextClassInd: " + this.nextClassInd + '\n' +
      "gapTime: " + this.gapTime + '\n' +
      "walkTime: " + this.walkTime + '\n' +
      "walkTistance: " + this.walkTistance + '\n' +
      "hurry: " + this.hurry + '\n');
  }

  printClassInfo() {
    console.log(this.toString);
  }
}

/** Extract the class infos from timebox */
let extractBoxClasses = function () {
  // The classes in box
  // [classnumber, classtype, location]
  // [          0,         1,        2]
  let boxClasses = [];

  $('div.planneritembox').each(
    function () {
      //Test
      //console.log(this.innerHTML);

      // Replace <br to \n, and delete <> tags
      let boxStrsArr = this.innerHTML.replace(/<br/gi, '\n<').replace(/<(.|\n)*?>/gi, '').replace('amp;', '').split('\n');
      let trimedBoxStrsArr = boxStrsArr.map(str => str.trim());
      trimedBoxStrsArr[0] = trimedBoxStrsArr[0].toUpperCase();

      //Test
      //console.log(trimedBoxStrsArr);
      //console.log(trimedBoxStrsArr.length);

      if (trimedBoxStrsArr.length === 3) {
        boxClasses.push(trimedBoxStrsArr);
      } else {
        let errInfo = "Invalid: " + trimedBoxStrsArr.toString();
        chrome.runtime.sendMessage({ 'exceptionOfc': errInfo + "Len: " + trimedBoxStrsArr.length });
        boxClasses.push(['invalid', 'invalid', 'invalid', 'invalid', 'invalid', 'invalid']);
      }

    }
  );

  return boxClasses;
}

/** Extract the class infos from plan */
let extractPlanClasses = function () {
  // The classes in plan with ID and time
  // [classnumber, classtype, id, startTime, endTime]
  // [          0,         1,  2,         3,       4]
  let planClasses = [];

  $('td.section-header a').each(
    function () {
      let planClassEntry = [];

      // Extract 1st part of the class number
      let startInd1 = $(this).attr('href').indexOf('='); // 67
      let endInd1 = $(this).attr('href').indexOf('&'); // 75
      let numPart1 = decodeURIComponent($(this).attr('href').slice(startInd1 + 1, endInd1).replace(/\+/g, ' ').trim());

      // Extract 2nd part of the class number
      let startInd2 = $(this).attr('href').indexOf('=', endInd1); // 88
      let endInd2 = $(this).attr('href').indexOf('&', startInd2); // 97

      // Process the class number with 'M' or 'C'
      let helpStr = function (str) {
        if (str[str.length - 1] === 'M' || str[str.length - 1] === 'C') {
          // replace mutiple spaces to one space
          str = str.replace(/\s\s+/g, ' ');
          str = str.split(' ');

          // exchange the order of number and special letters
          if (str.length === 1) {
            str = str[0].replace(/^0+/, '');
            if (str[str.length - 1] === 'M') {
              str = 'M' + str.slice(0, -1);
            } else { }
          } else {
            str = str[1] + str[0].replace(/^0+/, '');
          }

        } else {
          str = str.replace(/^0+/, '');
        }
        return str;
      }

      let numPart2 = $(this).attr('href').slice(startInd2 + 1, endInd2).replace(/\+/g, ' ').trim().slice(1);
      numPart2 = helpStr(numPart2);

      // push classnumber
      planClassEntry.push((numPart1 + ' ' + numPart2).toUpperCase());
      // push classtype
      planClassEntry.push(this.innerText);
      // push id
      planClassEntry.push($(this).attr('title').split(' ').pop());

      let classTime = $(this).parent().nextAll("td[class='centerColumn']").next().text();

      if (classTime !== '' && classTime !== undefined && classTime !== null) {
        classTime = classTime.split('-');
        // push startTime
        planClassEntry.push(classTime[0].slice(0, classTime[0].indexOf('m') + 1));
        // push endTime
        planClassEntry.push(classTime[1].slice(0, classTime[1].indexOf('m') + 1));
      }

      //Test
      //console.log(planClassEntry);
      //console.log(planClassEntry.length);

      if (planClassEntry.length === 5) {
        planClasses.push(planClassEntry);
      } else {
        let errInfo = "Invalid: " + planClassEntry.toString();
        chrome.runtime.sendMessage({ 'exceptionOfc': errInfo + "Len: " + planClassEntry.length });
      }

    }
  );

  return planClasses;
}

/** Map the IDs and Times to `BoxClasses` */
let mapIDTime2BoxClasses = function (boxClasses, planClasses) {
  for (let boxEntry of boxClasses) {
    if (boxEntry.length === 0) {
      continue;
    }

    // search a `planEntry` to match current `boxEntry`
    for (let planEntry of planClasses) {
      if (boxEntry[1].split(' ')[0].toUpperCase() === 'QUI') {
        boxEntry[1] = boxEntry[1].replace(/qui/i, 'Qiz');
      }
      if (boxEntry[1].split(' ')[0].toUpperCase() === 'FIE') {
        boxEntry[1] = boxEntry[1].replace(/fie/i, 'Fld');
      }

      if (
        boxEntry[0] === planEntry[0] &&
        boxEntry[1].toUpperCase() === planEntry[1].toUpperCase()
      ) {
        // push id, startTime, endTime to `boxEntry`
        boxEntry.push(planEntry[2], planEntry[3], planEntry[4]);

        //Test
        //console.log(boxEntry);
        //console.log(boxEntry.length);

        break;
      }
    }

    if (boxEntry.length !== 6) {
      console.log('****** mapID2BoxClasses(): cl !== 6 ERROR ******');
      chrome.runtime.sendMessage({ 'exceptionOfc': 'mapID2BoxClasses(): cl !== 6 ERROR' + boxEntry.length });
    }
  }

  return boxClasses;
}

/**
  * Convert time string to minutes.
  * @param {string} timeStr A time string 
  * @return The minutes from day start
  */
let time2Min = function (timeStr) {
  if (timeStr === 'invalid') {
    return 0;
  }

  if (timeStr === undefined) {
    console.log('****** `timeStr` is undefined ERROR ******');
    chrome.runtime.sendMessage({ 'exceptionOfc': '`timeStr` is undefined ERROR' });
  }

  // TimeStrArr [HH, MM]
  let timeStrArr = timeStr.slice(0, -2).split(':');

  // Test if valid time string input
  if (timeStrArr[1] === undefined) {
    timeStrArr.push('00');
  }
  if (parseInt(timeStrArr[0]) > 12 || parseInt(timeStrArr[0]) < 0 ||
    parseInt(timeStrArr[1]) > 60 || parseInt(timeStrArr[1]) < 0) {
    console.log('****** Time String Format ERROR ******');
    return;
  }

  // Minutes from day start
  let mins = 0;

  // pm
  if (timeStr.slice(-2) === 'pm') {
    mins = 12 * 60 + 60 * parseInt(timeStrArr[0]) +
      parseInt(timeStrArr[1]);
    if (timeStrArr[0] === '12') {
      mins = 12 * 60 + parseInt(timeStrArr[1]);
    }
    // am
  } else if (timeStr.slice(-2) === 'am') {
    mins = 60 * parseInt(timeStrArr[0]) +
      parseInt(timeStrArr[1]);
    if (timeStrArr[0] === '12') {
      mins = parseInt(timeStrArr[1]);
    }
    // error
  } else {
    console.log('****** Time String Format ERROR ******');
    return;
  }

  return mins;
}

/**
  * Return a week day char by a index.
  * @param number The index of class in `$('div.planneritembox')`
  * @return The char represented a week day.
  */
let assignWeekday = function (dayNumber) {
  switch (dayNumber) {
    case 0: return 'M';
    case 1: return 'T';
    case 2: return 'W';
    case 3: return 'R';
    case 4: return 'F';
    default: return 'none';
  }
}

/**
  * Calculate the time difference between startTime and endTime
  * @param {string} startTime The strat time.
  * @param {string} endTime The end time.
  * @return The minute difference between `startTime` and `endTime`
*/
let minDiff = function (startTime, endTime) {
  let result = time2Min(endTime) - time2Min(startTime);
  if (result > 1440) {
    console.log('****** Time Diff ERROR ******');
    return;
  }
  return result;
}

/**
  * Core function and algorithm to
  * Calculate the time difference of current class and next class
  * and push the `weekday` to boxClasses
  * and push the `nextClassInd` to `boxClasses`
  * and push the `gapTime` to `boxClasses`
  */
let getMinDiffAndAddrPairs = function (boxClasses) {
  // The array of address pairs passed as message to background.js
  let addressPairsArr = [];

  // count the duplicated class entry by (next) tier class
  let dupCount = 0;
  // duplicated address pairs array (temp, merge to `addressPairArr` finally)
  let dupAddressPairsArr = [];

  //-------------------- Iteration of boxClasses ----------------------
  // The index of the classes in the box
  let boxEntryInd = 0;

  // The weekdays
  let colNum = $('div.timebox').length;

  // iterate Days of a week
  for (let i = 0; i < colNum; i++) {
    // The number of classes of the day
    let rowNum = $($('div.timebox')[i]).children().length;

    // The index of the last class of the day
    let lastclassInd = rowNum + boxEntryInd - 1;

    // iterate Classes of a day
    for (let j = 0; j < rowNum; j++) {
      let nextclassInd = boxEntryInd + 1;

      // If last class of the day
      if (j === rowNum - 1) {

        // push default value
        boxClasses[boxEntryInd].push(assignWeekday(i), 'none', 1000);
        addressPairsArr.push([boxClasses[boxEntryInd][2], 'none']);
      } else {
        // Flag if `nextclassInd` move to end
        let finishedDay = 0;

        // If there is tier class, move the number `nextclassInd` to find correct C0-C3 matching
        //
        //      C0* -> C1 -> C2
        //          \
        //             C3*
        //


        // move `nextclassInd` to correct class based on the algorithm above
        while (minDiff(boxClasses[boxEntryInd][5], boxClasses[nextclassInd][4]) < 0) {
          // Check if `nextclassInd` move to the end of the day
          // That is, the last class of the day is still tier class, not next classs
          // Last class of the day
          if (nextclassInd >= lastclassInd) {
            // push default value
            boxClasses[boxEntryInd].push(assignWeekday(i), 'none', 1000);
            addressPairsArr.push([boxClasses[boxEntryInd][2], 'none']);
            finishedDay = 1;
            break;
          }
          nextclassInd++;
        }

        // If not reach the last day
        if (!finishedDay) {
          let diff = minDiff(boxClasses[boxEntryInd][5], boxClasses[nextclassInd][4]);

          //Test
          //console.log(diff);

          // push normal value
          boxClasses[boxEntryInd].push(assignWeekday(i), nextclassInd, diff);

          // construct and push a addressPairArr
          addressPairsArr.push([boxClasses[boxEntryInd][2], boxClasses[nextclassInd][2]]);

          // If next classes have tier class, C0-C1 was matched before↑
          // move the number `nextclassInd` to find the C0-C2, C0-C3 match below
          //
          //            C0*
          //         /   |   \
          //      C1 -> C2* -> C3*
          //


          // move `nextclassInd` to find more matches based on the algorithm above
          while (
            nextclassInd + 1 <= lastclassInd &&
            minDiff(boxClasses[nextclassInd][5], boxClasses[nextclassInd + 1][4]) < 0
          ) {
            nextclassInd = nextclassInd + 1;

            // Current class is `boxClasses[-1]` (deepcopy)
            boxClasses.push(JSON.parse(JSON.stringify(boxClasses[boxEntryInd])));

            // Modify `nextclassInd`, that is, `boxClasses[-1][-2]`
            boxClasses[boxClasses.length - 1][7] = nextclassInd;
            // Modify `diff`, that is, `boxClasses[-1][-1]`
            boxClasses[boxClasses.length - 1][8] =
              minDiff(boxClasses[boxClasses.length - 1][5], boxClasses[nextclassInd][4]);
            // push tier class to `addressPairArr`
            dupAddressPairsArr.push([boxClasses[boxClasses.length - 1][2], boxClasses[nextclassInd][2]]);

            dupCount++;

            //Test
            //console.log('dupCount: ' + dupCount);
            //console.log(boxClasses);
          }
        }

      }

      // move to next proper boxClass
      boxEntryInd++;

    }
  }

  // Add (deep copy) `dupAddressPairArr` to `addressPairArr`
  for (let k = 0; k < dupAddressPairsArr.length; k++) {
    addressPairsArr.push(JSON.parse(JSON.stringify(dupAddressPairsArr[k])));
  }

  // Check if all information is inserted to `boxClasses` correctly
  if (boxEntryInd + dupCount !== boxClasses.length) {
    console.log('****** ERROR: boxClasses InfoInserted !== boxClasses.length ******');
    return [];
  }

  return addressPairsArr;
}

/** Send addressPairsArr to `background.js` */
let requestDistance = function (mappedBoxClasses, planClasses) {
  // Finish preprocess `BoxClasses` #2
  // [number, classtype, location, id, startTime, endTime, weekday, nextClassInd, gapTime]
  // [     0,         1,        2,  3,         4,       5        6,            7,       8]
  let addressPairsArr = getMinDiffAndAddrPairs(mappedBoxClasses);
  //Test
  //console.log("PAIR");
  //console.log(addressPairsArr);

  // Test if the address pairs are extract correctly
  if (addressPairsArr.length !== mappedBoxClasses.length) {
    console.log('****** ERROR: addressPairArr.length !== mappedBoxClasses.length ******');
    return;
  }

  let saveContext = [mappedBoxClasses, planClasses];
  chrome.storage.local.set({
    'curContext': saveContext
  });

  // Send `addressPairArr` to background.js
  chrome.runtime.sendMessage({
    'addressPair': addressPairsArr
  }, function (response) {
    //console.log('Response: `' + response.resp4c + '` for `addressPair`' + ' has got!!!');
  });

}

/** Timer for `contentScript()` */
let timeContentStart;

/** Execute the main script */
let contentScript = function (isFirstTime) {
  timeContentStart = window.performance.now();

  let boxClasses = extractBoxClasses();
  let planClasses = extractPlanClasses();
  //Test
  console.log(boxClasses);
  console.log(planClasses);

  // Finish preprocess `BoxClasses` #1
  // [number, classtype, location, id, startTime, endTime]
  // [     0,         1,        2,  3,         4,       5]
  let mappedBoxClasses = mapIDTime2BoxClasses(boxClasses, planClasses);
  //Test
  console.log(mappedBoxClasses);

  // Google Analytics
  chrome.runtime.sendMessage({ 'pageViewContent': 1 });

  // Report exception to GA
  try {
    requestDistance(mappedBoxClasses, planClasses);
  } catch (e) {
    console.log('****** FATAL: ' + e.stack + ' ******');
    let astr = [];
    let debug = function () {
      $('td.section-header a').each(
        function () { astr.push($(this).attr('href')); }
      )
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

}

// ******************* Before Get Request Result Preprocessing End ***************

// ******************* After Request Result Preprocessing Start ******************

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

let m2mile = function (meter) { return (meter / 1609.344).toFixed(2); }
let s2min = function (s) { return (s / 60).toFixed(2); }
let min2s = function (min) { return Math.round(min * 60); }

/**
  * Construct a ButtonPopup node.
  * @param {array} classArr current class info array
  * @param {array} nextclassArr next class info array
  * @param {string} str which string need to display
  * @return a node of info string
  */
let getButtonPopupNode = function (classArr, nextclassArr, str) {
  // The Class Title
  let titlelineStr = '<b>' + str + nextclassArr[0] + ' ' + nextclassArr[1] + ' ' + nextclassArr[6] + '</b>';
  let classStr = $('<li></li>').html(titlelineStr).attr({ class: 'classline' });

  // The Class Info
  let bT = classArr[8];
  let wT = s2min(classArr[9]);
  let rTmin = s2min(min2s(classArr[8]) - classArr[9]);
  let rTs = min2s(classArr[8]) - classArr[9];
  let dmile = m2mile(classArr[10]);
  let dm = classArr[10];

  let infoStr =
    '<table>' +
    '<tr><td><b>BreakTime:</b></td>' + '<td class=infodata>' + bT + ' min</td></tr>' +
    '<tr><td><b>WalkTime:</b></td>' + '<td class=infodata>' + wT + ' min</td></tr>' +
    '<tr><td><b>ResTime:</b></td>' + '<td class=infodata>' + rTmin + ' min (' + rTs + ' s)</td></tr>' +
    '<tr><td><b>Distance:</b></td>' + '<td class=infodata>' + dmile + ' miles (' + dm + ' m)</td></tr>' +
    '</table>';
  let infoList = $('<li></li>').html(infoStr).attr({ class: 'infoline' });

  // Append `classstr` and `infolist` to `infonode` to control `tabinfo` style
  let infoNode = $('<ul></ul>').attr({ class: 'tabinfo' })
  infoNode.append(classStr).append(infoList);

  return infoNode;
}

/** Add button and info to the web page of Class Planner */
let showInfoButton = function (ind, oriSwitch, destSwitch, boxClasses, planClasses) {
  // no show invalid boxClass
  if (boxClasses[ind][0] === 'invalid' || boxClasses[boxClasses[ind][7]][0] === 'invalid') {
    return;
  }

  // Search corresponding hurry class in planClasses
  let oriHurryID = boxClasses[ind][3];
  let nextind = boxClasses[ind][7];
  let desHurryID = boxClasses[nextind][3];

  for (let j = 0; j < planClasses.length; j++) {
    // Origin class is hurry
    if (planClasses[j][2] === oriHurryID && oriSwitch) {
      let oriModifyNodeInd = j;
      let locationBox = $($("td[class='centerColumn']")[oriModifyNodeInd]).next().next();

      // Create the container of ButtonPopup
      let BPNode = $('<div></div>').attr({ class: 'infotab' });
      locationBox.append(BPNode);

      // Insert the color Button INTO a new <div> node (container)
      // to keep the relative position of the other nodes
      let theWeekday = boxClasses[ind][6];
      let button = $('<a></a>').html('Ori ' + theWeekday).attr({ class: 'hurry', href: 'javascript:;' });
      BPNode.append(button);

      // Insert the class info after the Button
      let oriInsertNode = getButtonPopupNode(boxClasses[ind], boxClasses[nextind], 'Next: &nbsp');
      BPNode.append(oriInsertNode);

      continue;
    }

    // Destination class is hurry
    if (planClasses[j][2] === desHurryID && destSwitch) {
      let desModifyNodeInd = j;
      let locationBox = $($("td[class='centerColumn']")[desModifyNodeInd]).next().next();

      let BPNode = $('<div></div>').attr({ class: 'infotab' });
      locationBox.append(BPNode);

      let theWeekday = boxClasses[ind][6];
      let button = $('<a></a>').html('Dest ' + theWeekday).attr({ class: 'hurry', href: 'javascript:;' });
      BPNode.append(button);

      let desInsertNode = getButtonPopupNode(boxClasses[ind], boxClasses[ind], 'Prev: &nbsp');
      BPNode.append(desInsertNode);

      continue;
    }
  }

}

// Append `hurry` flag to `boxClasses`
let appendHurryFlag = function (ind, oriSwitch, destSwitch, boxClasses, planClasses, threshold) {
  if ((min2s(boxClasses[ind][8]) - boxClasses[ind][9]) <= threshold * 60) {
    boxClasses[ind].push(1);
    // If the class is hurry, show the button
    showInfoButton(ind, oriSwitch, destSwitch, boxClasses, planClasses);
    return 1;
  } else {
    boxClasses[ind].push(0);
    return 0;
  }
}

// Append the result (`walkTime`, `walkTistance`) from background.js to `boxClasses`
let appendResult = function (oriSwitch, destSwitch, boxClasses, planClasses, threshold, returnResult) {
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
}

let processAndShowResult = function (oriSwitch, destSwitch, boxClasses, planClasses, threshold, returnResult) {
  //Test
  //console.log(boxClasses);
  //console.log(planClasses);
  //console.log(threshold);

  let hurryCount = appendResult(oriSwitch, destSwitch, boxClasses, planClasses, threshold, returnResult);

  //Test
  //console.log(boxClasses);
  //console.log(planClasses);

  // Google Analytics
  let timeHoverStart;

  let hurryTabs = document.getElementsByClassName('hurry');
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
}

/** Add a listener to recive message from `background.js` */
let croAddListener = function () {
  chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
    if (req.returnData !== undefined) {
      // Recieve the result of data from background.js
      let returnResult = [];
      returnResult = req.returnData;

      // Recover current context (since the listener will be only added once)
      chrome.storage.local.get(['curContext', 'varThreshold', 'varOriSwi', 'varDestSwi'], function (result) {
        let boxClasses = result.curContext[0];
        let planClasses = result.curContext[1];

        // Residual time (`gapTime` - `walkTime`) of tolerance, Initial `threshold` to 2 min
        let threshold = result.varThreshold === undefined ? 2 : result.varThreshold;

        // If show [ori] button
        let oriSwitch = result.varOriSwi === undefined ? true : result.varOriSwi;
        // If show [Dest] button
        let destSwitch = result.varDestSwi === undefined ? true : result.varDestSwi;

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
}

/** Detect mutation in the page */
let pageMO = function () {
  let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  let obNode = document.getElementById('ctl00_main_wrapper');
  let observer = new MutationObserver(function (mutations) {
    // Call when detect a mutation
    //Test
    //console.log(mutations);
    $('.infotab').remove();
    contentScript(false);
  });
  let config = { childList: true };
  observer.observe(obNode, config);
}

contentScript(true);
