import { abi } from "./contract/minigames/airdrop-game";
const Config = require("../../../config/config");

export const AirdropGame = {
  contract_address: Config.airdropGameContractAddress,
  miniGameContract: null,
  miniGameContract_with_provider: null,
  startAirdropGame(callback) {
    if (typeof web3 != 'undefined') {
      this.contract_init(callback)
    } else {
      this(false)
    }
  },
  contract_init(callback) {
    if (typeof web3.eth.accounts[0] != 'undefined') {
      this.miniGameContract = web3.eth
        .contract(abi)
        .at(this.contract_address)
      this.miniGameContract_with_provider = game.web3.eth
        .contract(abi)
        .at(this.contract_address)
      callback(true)
    } else {
      callback(false)
    }
  },
  claimCrystal ( callback ) {
    this.miniGameContract
      .claimCrystal
      .sendTransaction(
        {
          from: web3.eth.accounts[0],
          gas: web3.toHex(400000),
        },
        function (err, result) {
          if (!err) {
            callback()
          }
        }
      );
  },
  getCurrentMiniGameId( callback ) {
    this.miniGameContract_with_provider
      .miniGameId
      .call({
          from: web3.eth.accounts[0]
      },
      function (err, result) {
          return callback( err, result );
        }
      );
  },
  getMiniGame ({ miniGameId }, callback ) {
     this.miniGameContract_with_provider
       .minigames
       .call(
        miniGameId,
        {
            from: web3.eth.accounts[0]
        },
        function (err, result) {
            return callback(err, result);
          }
      );
  },
  getData( callback ) {
    this.miniGameContract_with_provider
      .getData
      .call(
        web3.eth.accounts[0],
        {
            from: web3.eth.accounts[0]
        },
        function (err, result) {
          if (err) return callback(err, null);
          // if (result[0].toNumber() == 0) return callback(true, null);
          let data = {
              'miningWarRound'     : result[0].toNumber(),
              'noJoinAirdrop'      : result[1].toNumber(), 
              'lastDayJoin'        : result[2].toNumber(),
              'nextTimeAirdropJoin': result[3].toNumber()
          };
          return callback(null, data);
      });
  },
  getNextCrystalReward( callback ) {
    this.miniGameContract_with_provider
      .getNextCrystalReward
      .call(
        web3.eth.accounts[0],
        {
            from: web3.eth.accounts[0]
        },
        function (err, result) {
          if (err) return callback(err, null);
          return callback(null, result.toNumber());
      });
  },
  getPlayerAirdropGameData ( callback ) {
    this.miniGameContract_with_provider
      .players
      .call(
        web3.eth.accounts[0],
        {
            from: web3.eth.accounts[0]
        },
        function (err, result) {
            return callback(err, result);
          }
      );
  },
  getShareCrystalByMiniGameId ( { miniGameId }, callback ) {
    this.miniGameContract_with_provider
      .calculateShareCrystal
      .call(
        miniGameId,
        {
            from: web3.eth.accounts[0]
        },
        function (err, result) {
            return callback(err, result);
          }
      );
  },
  joinAirdropGame ( callback ) {
    this.miniGameContract
      .joinAirdrop
      .sendTransaction(
        {
          from: web3.eth.accounts[0],
          gas: web3.toHex(400000),
        },
        function (err, result) {
          if (!err) {
            callback()
          }
        }
      );
  },
  toETH: number => {
    return web3.fromWei(number, 'ether')
  },
  toWei: number => {
    return web3.toWei(number, 'ether')
  }
}
