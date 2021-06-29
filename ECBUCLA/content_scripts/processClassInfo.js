// Copyright (c) 2019-2021 Qingpeng Li. All rights reserved.
// Author: qingpeng9802@gmail.com (Qingpeng Li).

'use strict';

// `boxClasses`: The classes in box
// [classnumber, classtype, location, id, startTime, endTime, weekday, nextClassInd, gapTime,  walkTime, walkTistance, hurry]
// [          0,         1,        2,  3,         4,       5,       6,            7,       8,         9,           10,    11]

// used in `getMinDiffAndAddrPairs` &
// `showTips.js/showInfoButton` & `showTips.js/getButtonPopupNode`
const [classnumberIndex, classtypeIndex, locationIndex, idIndex] = [0, 1, 2, 3];
const [startTimeIndex, endTimeIndex, weekdayIndex, nextClassIndIndex] = [4, 5, 6, 7];
const [gapTimeIndex, walkTimeIndex, walkTistanceIndex, hurryIndex] = [8, 9, 10, 11];

// Reserve for understanding `boxClasses` array only, not used
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
}

// -------------------- Help functions ------------------------------

/**
  * Convert time string to minutes from day start.
  * @param {string} timeStr A time string
  * @return The minutes from day start
  */
const time2Min = function (timeStr) {
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
};

/**
  * Return a week day char by a index.
  * @param number The index of class in `$('div.planneritembox')`
  * @return The char represented a week day.
  */
const assignWeekday = function (dayNumber) {
  switch (dayNumber) {
    case 0: return 'M';
    case 1: return 'T';
    case 2: return 'W';
    case 3: return 'R';
    case 4: return 'F';
    default: return 'none';
  }
};

/**
  * Calculate the time difference between startTime and endTime
  * @param {string} startTime The strat time.
  * @param {string} endTime The end time.
  * @return The minute difference between `startTime` and `endTime`
*/
const minDiff = function (startTime, endTime) {
  const result = time2Min(endTime) - time2Min(startTime);
  if (result > 1440) {
    console.log('****** Time Diff ERROR ******');
    return;
  }
  return result;
};

// ---- Calculate the time difference of current class and next class ----

/**
  * Core function and algorithm to
  * calculate the time difference of current class and next class.
  * Push the `weekday` to boxClasses,
  * push the `nextClassInd` to `boxClasses`,
  * and push the `gapTime` to `boxClasses`.
  * O(n) where n=boxClasses.length
  */
const getMinDiffAndAddrPairs = function (boxClasses) {
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
  const colNum = $('div.timebox').length;

  // iterate Days of a week
  for (let i = 0; i < colNum; i++) {
    // The number of classes of the day
    const rowNum = $($('div.timebox')[i]).children().length;

    // The index of the last class of the day
    const lastclassInd = rowNum + boxEntryInd - 1;

    // iterate Classes of a day
    for (let j = 0; j < rowNum; j++) {
      let nextclassInd = boxEntryInd + 1;

      // If last class of the day
      if (j === rowNum - 1) {
        // push default value
        boxClasses[boxEntryInd].push(assignWeekday(i), 'none', 1000);
        addressPairsArr.push([boxClasses[boxEntryInd][locationIndex], 'none']);

      } else {
        // Flag if `nextclassInd` move to end
        let finishedDayFlag = false;

        // If there is tier class, move the number `nextclassInd` in [C1, C2, C3]
        // to find correct C0-C3 matching, that is `nextclassInd`=C3
        //
        //      C0* -> C1 -> C2
        //          \
        //             C3*
        //


        // move `nextclassInd` to correct class based on the algorithm above
        while (minDiff(boxClasses[boxEntryInd][endTimeIndex],
                       boxClasses[nextclassInd][startTimeIndex]) < 0) {
          // Check if `nextclassInd` move to the last class of the day
          // in this case, the last class of the day is still tier class, not next classs
          if (nextclassInd >= lastclassInd) {
            // push default value
            boxClasses[boxEntryInd].push(assignWeekday(i), 'none', 1000);
            addressPairsArr.push([boxClasses[boxEntryInd][locationIndex], 'none']);
            finishedDayFlag = true;
            break;
          }
          nextclassInd++;
        }

        // If not reach the last class of the day
        if (!finishedDayFlag) {
          const diff = minDiff(boxClasses[boxEntryInd][5], boxClasses[nextclassInd][4]);

          //Test
          //console.log(diff);

          // push normal value
          boxClasses[boxEntryInd].push(assignWeekday(i), nextclassInd, diff);

          // construct and push a addressPairArr
          addressPairsArr.push([boxClasses[boxEntryInd][2], boxClasses[nextclassInd][2]]);

          // If next classes have tier class, C0-C1 has been matched in before algorithm↑
          // move the number `nextclassInd` in [C2, C3] to find the C0-C2, C0-C3 match below
          //
          //            C0*
          //         /   |   \
          //      C1 -> C2* -> C3*
          //


          // move `nextclassInd` to find more matches based on the algorithm above
          while (
            nextclassInd + 1 <= lastclassInd &&
            minDiff(boxClasses[nextclassInd][endTimeIndex],
                    boxClasses[nextclassInd + 1][startTimeIndex]) < 0
          ) {
            nextclassInd = nextclassInd + 1;

            // Current class is `boxClasses[-1]` (deepcopy)
            const currClass = JSON.parse(JSON.stringify(boxClasses[boxEntryInd]));
            boxClasses.push(currClass);

            // Modify `nextclassInd` (`boxClasses[-1][-2]`)
            boxClasses[boxClasses.length - 1][nextClassIndIndex] = nextclassInd;
            // Modify `diff` (`boxClasses[-1][-1]`)
            boxClasses[boxClasses.length - 1][gapTimeIndex] =
              minDiff(boxClasses[boxClasses.length - 1][endTimeIndex],
                      boxClasses[nextclassInd][startTimeIndex]);
            // push tier class to `addressPairArr`
            dupAddressPairsArr.push([boxClasses[boxClasses.length - 1][locationIndex],
                                     boxClasses[nextclassInd][locationIndex]]);

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

  //Test
  //console.log(addressPairsArr)

  return addressPairsArr;
};
