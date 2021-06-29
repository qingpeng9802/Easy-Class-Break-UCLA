// Copyright (c) 2019-2021 Qingpeng Li. All rights reserved.
// Author: qingpeng9802@gmail.com (Qingpeng Li).

'use strict';

// ---------------------- Extract info --------------------------

/** Extract the class infos from timebox */
const extractBoxClasses = function () {
  // The classes in box
  // [classnumber, classtype, location]
  // [          0,         1,        2]
  let boxClasses = [];

  $('div.planneritembox').each(
    function () {
      //Test
      //console.log(this.innerHTML);

      // Replace <br to \n, and delete <> tags
      const boxStrsArr = this.innerHTML.replace(/<br/gi, '\n<').replace(/<(.|\n)*?>/gi, '')
                           .replace('amp;', '').split('\n');
      let trimedBoxStrsArr = boxStrsArr.map(str => str.trim());
      trimedBoxStrsArr[0] = trimedBoxStrsArr[0].toUpperCase();

      //Test
      //console.log(trimedBoxStrsArr);
      //console.log(trimedBoxStrsArr.length);

      if (trimedBoxStrsArr.length === 3 &&
          trimedBoxStrsArr[2] !== undefined &&
          trimedBoxStrsArr[2] !== null &&
          !trimedBoxStrsArr[2].includes('Online')) {
        boxClasses.push(trimedBoxStrsArr);
      } else {
        const errInfo = "Invalid: " + trimedBoxStrsArr.toString();
        chrome.runtime.sendMessage({ 'exceptionOfc': errInfo + "Len: " + trimedBoxStrsArr.length });
        boxClasses.push(['invalid', 'invalid', 'invalid', 'invalid', 'invalid', 'invalid']);
      }

    }
  );

  return boxClasses;
};

/** Extract the class infos from plan */
const extractPlanClasses = function () {
  // The classes in plan with ID and time
  // [classnumber, classtype, id, startTime, endTime]
  // [          0,         1,  2,         3,       4]
  let planClasses = [];

  $('td.section-header a').each(
    function () {
      let planClassEntry = [];

      // Extract 1st part of the class number
      const startInd1 = $(this).attr('href').indexOf('='); // 67
      const endInd1 = $(this).attr('href').indexOf('&'); // 75
      let numPart1 = decodeURIComponent($(this).attr('href').slice(startInd1 + 1, endInd1)
                       .replace(/\+/g, ' ').trim());

      // Extract 2nd part of the class number
      const startInd2 = $(this).attr('href').indexOf('=', endInd1); // 88
      const endInd2 = $(this).attr('href').indexOf('&', startInd2); // 97

      // Process the class number with 'M' or 'C'
      const helpStr = function (str) {
        if (str.includes('XPM')){
          str = 'M' + str.slice(0, -1);
        }
        if (str[str.length - 1] === 'M' || str[str.length - 1] === 'C') {
          // replace mutiple spaces to one space
          str = str.replace(/\s\s+/g, ' ');
          // if has space
          if (str.includes(' ')){
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
            // if no space
          } else {
            str = str.replace(/^0+/, '');
          }

        } else {
          str = str.replace(/^0+/, '');
        }
        return str;
      };

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
        const errInfo = "Invalid: " + planClassEntry.toString();
        chrome.runtime.sendMessage({ 'exceptionOfc': errInfo + "Len: " + planClassEntry.length });
      }

    }
  );

  return planClasses;
};

/** Map the IDs and Times to `BoxClasses` */
const mapIDTime2BoxClasses = function (boxClasses, planClasses) {
  //Test
  //console.log(boxClasses)
  //console.log(planClasses)
  for (let boxEntry of boxClasses) {
    if (boxEntry.length === 0) {
      continue;
    }

    // search a `planEntry` to match current `boxEntry`
    for (const planEntry of planClasses) {
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
};
