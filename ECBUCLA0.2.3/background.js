// Copyright (c) 2019 Qingpeng Li. All rights reserved.
// Author: qingpeng9802@gmail.com (Qingpeng Li).

'use strict'

// The return result from `requestData`
// [duration_value, distance_value]
// [             0,              1]
let returnResult = [];

// 60 elements of the addresses of the classes
let fullList = [
  "Biomedical Sciences Research Building",
  "Boelter Hall",
  "Botany Building",
  "Boyer Hall",
  "Broad Art Center",
  "Bunche Hall",
  "Campbell Hall",
  "Collins Center for Executive Education",
  "Cornell Hall",
  "Covel Commons",
  "De Neve Plaza Commons Building",
  "Dodd Hall",
  "Engineering IV",
  "Engineering V",
  "Engineering VI",
  "Entrepreneurs Hall",
  "Factor Health Sciences Building",
  "Field",
  "Fowler Museum at UCLA",
  "Franz Hall",
  "Geology Building",
  "Gold Hall",
  "Gonda (Goldschmied) Neuroscience and Genetics Research Center",
  "Graduate School of Education and Information Studies Building",
  "Haines Hall",
  "Hedrick Hall",
  "Hershey Hall",
  "Center for the Health Sciences",
  "Kaplan Hall",
  "Kaufman Hall",
  "Kinsey Science Teaching Pavilion",
  "Knudsen Hall",
  "Korn Convocation Hall",
  "La Kretz Garden Pavilion",
  "La Kretz Hall",
  "Law Building",
  "Life Sciences",
  "Macgowan Hall",
  "Macgowan Hall East",
  "Melnitz Hall",
  "Molecular Sciences Building",
  "Moore Hall",
  "Mathematical Sciences",
  "Northwest Campus Auditorium",
  "Ostin Music Center",
  "Physics and Astronomy Building",
  "Perloff Hall",
  "Powell Library Building",
  "Public Affairs Building",
  "Public Health, School of",
  "Rolfe Hall",
  "Royce Hall",
  "Student Activities Center",
  "Semel Institute for Neuroscience and Human Behavior",
  "Slichter Hall",
  "Schoenberg Music Building",
  "Sproul Hall",
  "Young Hall",
  "Wooden Recreation and Sports Center",
  "Young Research Library"
];


// Request the distance matrix from json file
// and get the duration and distance of each address pair
let requestData = function () {
  // Load `distanceMat.json`
  fetch('./distanceMat.json')
    .then(response => response.json())
    .then((jsonArr) => {
      getDuaDis(jsonArr);
      //Test
      //console.log(returnResult);
    });
}

// Find the index of the address string in the `fullList`
let findIndexofFullList = function (addrStr) {
  let indexofFullList = -1;
  for (let i = 0; i < fullList.length; i++) {
    if (addrStr.includes(fullList[i])) {
      indexofFullList = i;
      return indexofFullList;
    }
  }
  return -1;
}

// Get the duaration value and distance value from `disMat`
// and push it into `returnResult`
// and send them to contentscript.js
let getDuaDis = function (disMat) {
  for (let i = 0; i < addrArr.length; i++) {
    let oriInd = findIndexofFullList(addrArr[i][0]);
    let desInd = findIndexofFullList(addrArr[i][1]);
    if (oriInd === -1 || desInd === -1) {
      returnResult.push([0, 0]);
    } else {
      returnResult.push([disMat[oriInd][desInd][0], disMat[oriInd][desInd][1]]);
    }
  }
  //Test calling short#1
  chrome.tabs.sendMessage(currentTabID, { "returnData": returnResult });
  //Test
  //console.log("Request result has been sent back !!!");
}

//Test calling short#2
/*
let addrArr = [
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

// Store the tab ID of my.ucla.edu/ClassPlanner/*
let currentTabID;
// The address array from contentscript.js
// [origin, destination]
// [     0,           1]
let addrArr = [];

chrome.runtime.onMessage.addListener(function (req, sender) {
  // Get the addresses pairs from contentscipt.js and request data
  if (req.address !== undefined) {
    addrArr = [];
    addrArr = req.address;
    currentTabID = sender.tab.id;
    // Fire the icon when message is recived
    chrome.pageAction.show(currentTabID);
    // Reset the `returnRestult` important to avoid repushing
    returnResult = [];
    requestData();
    return true;
  }
});