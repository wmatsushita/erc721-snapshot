"use strict";

module.exports.createBalances = (data) => {
  const balances = new Map();
  const closingBalances = [];

  for (const event of data.events) {
    if (!event.tokenId) {
      throw new TypeError("invalid tokenId value");
    }
    balances.set(event.tokenId, event.to);
  }

  const walletBalances = new Map();
  for (const [tokenId, wallet] of balances.entries()) {
    let tokenIds = walletBalances.get(wallet) || [];
    tokenIds = [...tokenIds, tokenId];
    walletBalances.set(wallet, tokenIds);
  }

  for (const [wallet, tokenIds] of walletBalances.entries()) {
    closingBalances.push({
      wallet: wallet,
      tokenIds: tokenIds
    });
  }

  return closingBalances.filter((b) => b.tokenIds.length > 0);
};
