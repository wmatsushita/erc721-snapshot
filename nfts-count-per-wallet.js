const fs = require("fs");

const balances = JSON.parse(fs.readFileSync("./balances/candygirl-balances-at-reveal.json", "utf8"));

//saves the balances to a csv file
const csv = balances.map((balance) => `${balance.wallet},${balance.tokenIds.length}\n`);

csv.forEach((row) => {
  try {
    fs.appendFileSync("candygirl-nft-count-per-wallet-at-reveal.csv", row);
  } catch (e) {
    console.log("Error: ", e);
  }
});
