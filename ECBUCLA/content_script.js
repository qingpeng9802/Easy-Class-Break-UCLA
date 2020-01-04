// Copyright (c) 2019 Qingpeng Li. All rights reserved.
// Author: qingpeng9802@gmail.com (Qingpeng Li).

'use strict'

// Reserve for understanding `boxClasses` array only
// The Class that stores the infomation of a class.
class ClassInfo {
  constructor(number, classtype, location, id, startTime, endTime, weekday, nextClassInd,
    gapTime, walkTime, walkTistance, hurry) {
    /**
    * @param {string} number The class number. eg. COM SCI 188
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
    this.number = '';
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
    return ("number: " + this.number + '\n' +
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

// Timer for `contentScript()`
let timeContentStart;

let contentScript = function (isFirstTime) {
  timeContentStart = window.performance.now();

  // Google Analytics
  chrome.runtime.sendMessage({ 'pageViewContent': 1 });

  // The classes in box
  // [number, classtype, location, id, startTime, endTime, weekday, nextClassInd, gapTime,  walkTime, walkTistance, hurry]
  // [     0,         1,        2,  3,         4,       5,       6,            7,       8,         9,           10,    11]
  let boxClasses = [];

  // Extract the class info from timebox
  let extractBoxClasses = function () {
    $('div.planneritembox').each(
      function () {
        //Test
        //console.log(this.innerHTML);
        // Replace <br to \n, and delete <> tags
        let arrclass = this.innerHTML.replace(/<br/gi, '\n<').replace(/<(.|\n)*?>/gi, '').split('\n');
        let trimedArr = arrclass.map(str => str.trim());
        trimedArr[0] = trimedArr[0].toUpperCase();
        //Test
        //console.log(trimedArr);
        boxClasses.push(trimedArr);
      }
    );
  }

  // The classes in plan with ID and time
  // [number, classtype, id, startTime, endTime]
  // [     0,         1,  2,         3,       4]
  let planClasses = [];

  // Extract the class info from plan
  let extractPlanClasses = function () {
    $('td.section-header a').each(
      function () {
        let aClassInfoArr = []

        // temp debug trace
        if ($(this).attr('href') === undefined) {
          console.log('****** `$(this).attr` is undefined ERROR ******');
          chrome.runtime.sendMessage({ 'exceptionOfc': '`$(this).attr` is undefined ERROR' });
          return;
        }

        // Extract 1st part of the class number
        let startInd1 = $(this).attr('href').indexOf('='); // 67
        let endInd1 = $(this).attr('href').indexOf('&'); // 75
        let numPart1 = $(this).attr('href').slice(startInd1 + 1, endInd1).replace(/\+/g, ' ').trim();

        // Extract 2nd part of the class number
        let startInd2 = $(this).attr('href').indexOf('=', endInd1); // 88
        let endInd2 = $(this).attr('href').indexOf('&', startInd2); // 97

        // Process the class number with 'M'
        let helpStr = function (str) {
          if (str[str.length - 1] === 'M') {
            // replace mutiple spaces to one space
            str = str.replace(/\s\s+/g, ' ');
            str = str.split(' ');
            // exchange the order of number and special letters
            str = str[1] + str[0].replace(/^0+/, '');
          } else {
            str = str.replace(/^0+/, '');
          }
          return str;
        }

        // temp debug trace
        if ($(this).attr('href').slice(startInd2 + 1, endInd2).replace(/\+/g, ' ').trim() === undefined) {
          console.log('****** `slice(1)` is undefined ERROR ******');
          chrome.runtime.sendMessage({ 'exceptionOfc': '`slice(1)` is undefined ERROR' });
          return;
        }

        let numPart2 = $(this).attr('href').slice(startInd2 + 1, endInd2).replace(/\+/g, ' ').trim().slice(1);
        numPart2 = helpStr(numPart2);
        // push number
        aClassInfoArr.push((numPart1 + ' ' + numPart2).toUpperCase());
        // push classtype
        aClassInfoArr.push(this.innerText);
        // push id
        aClassInfoArr.push($(this).attr('title').split(' ').pop());

        let classTime = $(this).parent().nextAll("td[class='centerColumn']").next().text().split('-');
        // push startTime
        aClassInfoArr.push(classTime[0]);
        // push endTime
        aClassInfoArr.push(classTime[1]);
        //Test
        //console.log(tempArr);
        planClasses.push(aClassInfoArr);
      }
    );
  }

  // Map the IDs to `BoxClasses`
  let mapID2BoxClasses = function () {
    extractBoxClasses();
    extractPlanClasses();
    for (let cl of boxClasses) {
      for (let ci of planClasses) {
        if (cl[0] === ci[0] && cl[1].toUpperCase() === ci[1].toUpperCase()) {
          // push id, startTime, endTime to classesPlan
          cl.push(ci[2], ci[3], ci[4]);
          //Test
          //console.log(cl);
          break;
        }
      }
    }
  }

  /**
   * Convert time string to minutes.
   * @param {string} timeStr A time string 
   * @return The minutes from day start
   */
  let time2Min = function (timeStr) {
    if (timeStr === undefined) {
      console.log('****** `timeStr` is undefined ERROR ******');
      chrome.runtime.sendMessage({ 'exceptionOfc': '`timeStr` is undefined ERROR' });
      return;
    }

    // TimeStrArr [HH, MM]
    let timeStrArr = timeStr.slice(0, -2).split(':');

    // Test valid time string input
    if (timeStrArr[1] === undefined) {
      timeStrArr.push('00');
    }
    if (parseInt(timeStrArr[0]) > 12 || parseInt(timeStrArr[0]) < 0 ||
      parseInt(timeStrArr[1]) > 60 || parseInt(timeStrArr[1]) < 0) {
      console.log('****** Time String Format ERROR ******');
      return;
    }

    // Minutes from day start
    let min = 0;

    // pm
    if (timeStr.slice(-2) === 'pm') {
      min = 12 * 60 + 60 * parseInt(timeStrArr[0]) +
        parseInt(timeStrArr[1]);
      if (timeStrArr[0] === '12') {
        min = 12 * 60 + parseInt(timeStrArr[1]);
      }
      // am
    } else if (timeStr.slice(-2) === 'am') {
      min = 60 * parseInt(timeStrArr[0]) +
        parseInt(timeStrArr[1]);
      if (timeStrArr[0] === '12') {
        min = parseInt(timeStrArr[1]);
      }
      // error
    } else {
      console.log('****** Time String Format ERROR ******');
      return;
    }
    return min;
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
   * Return a week day char by a index.
   * @param number The index of class in `$('div.planneritembox')`
   * @return The char represented a week day.
   */
  let assignWeekday = function (number) {
    switch (number) {
      case 0: return 'M';
      case 1: return 'T';
      case 2: return 'W';
      case 3: return 'R';
      case 4: return 'F';
      default: return 'none';
    }
  }

  // The array of address pairs passed as message to background.js
  let addressPairArr = [];

  /**
  * Calculate the time difference of current class and next class
  * and push the `weekday` to boxClasses
  * and push the `nextClassInd` to `boxClasses`
  * and push the `gapTime` to `boxClasses`
  */
  let calMinDiffOfBoxClasses = function () {
    // The index of the classes in the box
    let index = 0;

    // The weekdays
    let colnum = $('div.timebox').length;

    // count the duplicated class entry by (next) tier class
    let dupCount = 0;
    // duplicated address pairs array (temp, merge to `addressPairArr` finally)
    let dupAddressPairArr = [];

    for (let i = 0; i < colnum; i++) {
      // The number of classes of a day
      let rownum = $($('div.timebox')[i]).children().length;
      // The index of the last class of the day
      let lastclassInd = rownum + index - 1;

      for (let j = 0; j < rownum; j++) {
        let nextclassInd = index + 1;

        if (j === rownum - 1) {
          // Last class of the day
          boxClasses[index].push(assignWeekday(i));
          boxClasses[index].push('none');

          // push default value
          boxClasses[index].push(1000);
          addressPairArr.push([boxClasses[index][2], 'none']);
        } else {
          // Check if `nextclassInd` move to end
          let finishedDay = 0;

          // If there is tier class, move the number `nextclassInd` to find correct C0-C3 matching
          //
          //      C0* -> C1 -> C2
          //          \
          //             C3*
          //
          while (minDiff(boxClasses[index][5], boxClasses[nextclassInd][4]) <= 0) {
            // Check if `nextclassInd` move to the end of the day
            // That is, the last class of the day is still tier class, not next classs
            if (nextclassInd >= lastclassInd) {
              // Last class of the day
              boxClasses[index].push(assignWeekday(i));
              boxClasses[index].push('none');

              // push default value
              boxClasses[index].push(1000);
              addressPairArr.push([boxClasses[index][2], 'none']);
              finishedDay = 1;
              break;
            }
            nextclassInd++;
          }

          if (!finishedDay) {
            let diff = minDiff(boxClasses[index][5], boxClasses[nextclassInd][4]);

            //Test
            //console.log(diff);
            boxClasses[index].push(assignWeekday(i));
            boxClasses[index].push(nextclassInd);
            boxClasses[index].push(diff);

            // Construct a addressPairArr
            addressPairArr.push([boxClasses[index][2], boxClasses[nextclassInd][2]]);

            // If next classes have tier class, C0-C1 was matched before↑
            // move the number `nextclassInd` to find the C0-C2, C0-C3 match below
            //
            //            C0*
            //         /   |    \
            //      C1 -> C2* -> C3*
            //
            while (nextclassInd + 1 <= lastclassInd &&
              minDiff(boxClasses[nextclassInd][5], boxClasses[nextclassInd + 1][4]) <= 0) {
              nextclassInd = nextclassInd + 1;
              // Current class is `boxClasses[-1]` (deepcopy)
              boxClasses.push(JSON.parse(JSON.stringify(boxClasses[index])));
              // Modify `nextclassInd`, that is, `boxClasses[-1][-2]`

              boxClasses[boxClasses.length - 1][7] = nextclassInd;
              // Modify `diff`, that is, `boxClasses[-1][-1]`
              boxClasses[boxClasses.length - 1][8] =
                minDiff(boxClasses[boxClasses.length - 1][5], boxClasses[nextclassInd][4]);
              // push tier class to `addressPairArr`
              dupAddressPairArr.push([boxClasses[boxClasses.length - 1][2], boxClasses[nextclassInd][2]]);
              dupCount++;
              //Test
              //console.log('dupCount: ' + dupCount);
              //console.log(boxClasses);
            }
          }
          //-------- Non-Last class of the day ---------
        }
        index++;

      }
    }
    // Deep copy `dupAddressPairArr` to `addressPairArr`
    for (let k = 0; k < dupAddressPairArr.length; k++) {
      addressPairArr.push(JSON.parse(JSON.stringify(dupAddressPairArr[k])));
    }

    // Check if all information is inserted to `boxClasses` correctly
    if (index + dupCount !== boxClasses.length) {
      console.log('****** ERROR: boxClasses InfoInserted !== boxClasses.length ******');
      return;
    }
  }

  // Send addressPairArr to background.js
  let requestDistance = function () {
    boxClasses = [];
    planClasses = [];
    // Finish preprocess `BoxClasses` #1
    // [number, classtype, location, id, startTime, endTime]
    // [     0,         1,        2,  3,         4,       5]
    mapID2BoxClasses();

    addressPairArr = [];
    // Finish preprocess `BoxClasses` #2
    // [number, classtype, location, id, startTime, endTime, weekday, nextClassInd, gapTime]
    // [     0,         1,        2,  3,         4,       5        6,            7,       8]

    //Test
    //console.log(boxClasses);
    //console.log(planClasses);
    calMinDiffOfBoxClasses();
    //Test
    //console.log(boxClasses);
    //console.log(planClasses);
    //console.log("PAIR");
    //console.log(addressPairArr);
    // Test if the address pairs are extract correctly
    if (addressPairArr.length !== boxClasses.length) {
      console.log('****** ERROR: addressPairArr.length !== boxClasses.length ******');
      return;
    }

    let saveContext = [boxClasses, planClasses];
    chrome.storage.local.set({
      'curContext': saveContext
    });

    // Send `addressPairArr` to background.js
    chrome.runtime.sendMessage({
      'addressPair': addressPairArr
    }, function (response) {
      //console.log('Response: `' + response.resp4c + '` for `addressPair`' + ' has got!!!');
    });

  }

  // Report exception to GA
  try {
    requestDistance();
  } catch (e) {
    console.log('****** FATAL: ' + e.message + ' ******');
    chrome.runtime.sendMessage({ 'exceptionOfc': e.message });
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
  let constructButtonPopupNode = function (classArr, nextclassArr, str) {
    // The Class Title
    let strTitleline = '<b>' + str + nextclassArr[0] + ' ' + nextclassArr[1] + ' ' + nextclassArr[6] + '</b>';
    let classstr = $('<li></li>').html(strTitleline).attr({ class: 'classline' });

    // The Class Info
    let bT = classArr[8];
    let wT = s2min(classArr[9]);
    let rTmin = s2min(min2s(classArr[8]) - classArr[9]);
    let rTs = min2s(classArr[8]) - classArr[9];
    let dmile = m2mile(classArr[10]);
    let dm = classArr[10];

    let infostr =
      '<table>' +
      '<tr><td><b>BreakTime:</b></td>' + '<td class=infodata>' + bT + ' min</td></tr>' +
      '<tr><td><b>WalkTime:</b></td>' + '<td class=infodata>' + wT + ' min</td></tr>' +
      '<tr><td><b>ResTime:</b></td>' + '<td class=infodata>' + rTmin + ' min (' + rTs + ' s)</td></tr>' +
      '<tr><td><b>Distance:</b></td>' + '<td class=infodata>' + dmile + ' miles (' + dm + ' m)</td></tr>' +
      '</table>';
    let infolist = $('<li></li>').html(infostr).attr({ class: 'infoline' });

    // Append `classstr` and `infolist` to `infonode` to control `tabinfo` style
    let infonode = $('<ul></ul>').attr({ class: 'tabinfo' })
    infonode.append(classstr).append(infolist);

    return infonode;
  }


  // If show [ori] button
  let oriSwitch = true;
  // If show [Dest] button
  let destSwitch = true;

  // Add button and info to web page of Class Planner
  let showInfoButton = function (i) {
    // Search corresponding hurry class in planClasses
    let oriHurryID = boxClasses[i][3];
    let nextind = boxClasses[i][7];
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
        let theWeekday = boxClasses[i][6];
        let button = $('<a></a>').html('Ori ' + theWeekday).attr({ class: 'hurry', href: 'javascript:;' });
        BPNode.append(button);

        // Insert the class info after the Button
        let oriInsertNode = constructButtonPopupNode(boxClasses[i], boxClasses[nextind], 'Next: &nbsp');
        BPNode.append(oriInsertNode);

        continue;
      }
      // Destination class is hurry
      if (planClasses[j][2] === desHurryID && destSwitch) {
        let desModifyNodeInd = j;
        let locationBox = $($("td[class='centerColumn']")[desModifyNodeInd]).next().next();

        let BPNode = $('<div></div>').attr({ class: 'infotab' });
        locationBox.append(BPNode);

        let theWeekday = boxClasses[i][6];
        let button = $('<a></a>').html('Dest ' + theWeekday).attr({ class: 'hurry', href: 'javascript:;' });
        BPNode.append(button);

        let desInsertNode = constructButtonPopupNode(boxClasses[i], boxClasses[i], 'Prev: &nbsp');
        BPNode.append(desInsertNode);

        continue;
      }
    }

  }


  // Residual time (`gapTime` - `walkTime`) of tolerance
  // Initial `threshold` to 2 min
  let threshold = 2; // unit: min

  // Count the number of hurry classes
  let hurryCount = 0;

  // Append `hurry` flag to `boxClasses`
  let appendHurryFlag = function (i) {
    if ((min2s(boxClasses[i][8]) - boxClasses[i][9]) <= threshold * 60) {
      boxClasses[i].push(1);
      hurryCount++;
      // If the class is hurry, show the button
      showInfoButton(i);
    } else {
      boxClasses[i].push(0);
    }
  }

  // Append the result (`walkTime`, `walkTistance`) from background.js to `boxClasses`
  let appendResult = function () {
    // When a class is deleted from `boxClasses` but `returnResult` is not updated yet
    if (boxClasses.length !== returnResult.length) {
      console.log('****** ERROR: boxClasses.length !== returnResult.length ******');
      return;
    }

    for (let i = 0; i < boxClasses.length; i++) {
      boxClasses[i].push(returnResult[i][0], returnResult[i][1]);
      // Check if the class is hurry and append `hurry` flag
      appendHurryFlag(i);
    }
  }

  let processAndShowResult = function () {
    //Test
    //console.log(boxClasses);
    //console.log(planClasses);
    //console.log(threshold);
    appendResult();

    // Google Analytics
    let timeHoverStart;
    let hurrytabs = document.getElementsByClassName('hurry');
    for (let i = 0; i < hurrytabs.length; i++) {
      hurrytabs[i].addEventListener("mouseover", function () {
        timeHoverStart = window.performance.now();
        chrome.runtime.sendMessage({ 'mouseoverHurry': 1 });
      });

      hurrytabs[i].addEventListener("mouseout", function () {
        chrome.runtime.sendMessage({ 'mouseoutHurry': window.performance.now() - timeHoverStart });
      });
    }
    chrome.runtime.sendMessage({ 'hurryCount': hurryCount }, function (response) {
      hurryCount = 0;
    });

    // store `boxClasses` for `popup.js`
    chrome.storage.local.set({ 'finalboxClasses': boxClasses });
  }

  //Test calling short#2
  //processandshowResult();

  // Recieve the result of data from background.js
  let returnResult = [];

  // Add a listener to recive message from `background.js`
  let croAddListener = function () {
    chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
      if (req.returnData !== undefined) {
        returnResult = [];
        returnResult = req.returnData;

        // Recover current context (since the listener will be only added once)
        chrome.storage.local.get(['curContext', 'varThreshold', 'varOriSwi', 'varDestSwi'], function (result) {
          boxClasses = result.curContext[0];
          planClasses = result.curContext[1];
          // Update threshold if `varThreshold` is not `undefined`
          threshold = result.varThreshold === undefined ? threshold : result.varThreshold;
          oriSwitch = result.varOriSwi === undefined ? oriSwitch : result.varOriSwi;
          destSwitch = result.varDestSwi === undefined ? destSwitch : result.varDestSwi;

          //Test
          //console.log("Return: " + returnResult);

          // Report exception to GA
          try {
            processAndShowResult();
          } catch (e) {
            console.log('****** FATAL: ' + e.message + ' ******');
            chrome.runtime.sendMessage({ 'exceptionOfc': e.message });
          }

        });
        sendResponse({ 'resp4b': 'returnData' });
      }

      // Google Analytics
      chrome.runtime.sendMessage({ 'timeContent': window.performance.now() - timeContentStart });

    });
  }

  // Detect mutation in the page
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

  // Only execute above functions when first time call `contentScript()`
  if (isFirstTime) {
    croAddListener();
    pageMO();
  }

}


contentScript(true);
