"use strict";

const fs = require("fs");
const path = require("path");

const { promisify } = require("util");

const Parameters = require("../parameters").get();

const getMinimal = (pastEvents) => {
  return pastEvents.map((tx) => {
    return {
      transactionHash: tx.transactionHash,
      from: tx.returnValues["0"],
      to: tx.returnValues["1"],
      tokenId: tx.returnValues["2"]
    };
  });
};

module.exports.getEvents = (symbol, toBlock) => {
  const directory = Parameters.eventsDownloadFolder.replace(/{token}/g, symbol);
  var files = fs.readdirSync(directory);
  files.sort((a, b) => {
    return parseInt(a.split(".")[0]) - parseInt(b.split(".")[0]);
  });
  let events = [];

  console.log("Parsing files.");

  for (const file of files) {
    if (parseInt(file.split(".")[0]) > toBlock) {
      break;
    }
    console.log("Parsing ", file);

    const contents = fs.readFileSync(path.join(directory, file));
    const parsed = JSON.parse(contents.toString());
    events = events.concat(getMinimal(parsed));
  }

  return events;
};
