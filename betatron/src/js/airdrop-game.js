import MYTronWeb from "./tron-web";
const Config = require("../../../config/config");

export const AirdropGame = {
  CONTRACT_ADDRESS: Config.airdropGameContractAddress,
  CONTRACT: null,
  init(callback) {
    let self = this;
    if (typeof(window.tronWeb) === 'undefined') {
        setTimeout(self.init, 1000);
    } else {
      tronWeb
        .contract()
        .at(self.CONTRACT_ADDRESS)
        .then(response)
        .catch(error);
      function response(tronContract) {
        self.CONTRACT = tronContract;
        return callback(true);
      } 
      function error(e) { 
        return callback(false); 
      }
    }
  },
  claimCrystal ( callback ) {
    this.CONTRACT
      .claimCrystal()
      .send()
      .then(response)
      .catch(error);
    function response() {}
    function error() {}  
  },
  getCurrentMiniGameId( callback ) {
    this.CONTRACT
      .miniGameId()
      .call()
      .then(response)
      .catch(error);
    function response(result) { return callback(null, parseInt(result)); }  
    function error(e) { return callback(e, null); } 
  },
  getMiniGame ({ miniGameId }, callback ) {
      this.CONTRACT
        .minigames(miniGameId)
        .call()
        .then(response)
        .catch(error);
      function response(result) { return callback(null, parseInt(result)); }  
      function error(e) { return callback(e, null); }      
  },
  getData( callback ) {
    this.CONTRACT
      .getData(MYTronWeb.getAccount())
      .call()
      .then(response)
      .catch(error);
    function response(result) {
        let data = {
              'miningWarRound'     : parseInt(result.miningWarRound),
              'noJoinAirdrop'      : parseInt(result.noJoinAirdrop), 
              'lastDayJoin'        : parseInt(result.lastDayJoin),
              'nextTimeAirdropJoin': parseInt(result.nextTimeAirdropJoin)
        };
        return callback(null, data);
    } 
    function error(e) { return callback(e, null);} 
  },
  getNextCrystalReward( callback ) {
    this.CONTRACT
      .getNextCrystalReward(MYTronWeb.getAccount())
      .call()
      .then(response)
      .catch(error);
    function response(result) { return callback(null, parseInt(result)); }  
    function error(e) { return callback(e, null); }       
  },
  getPlayerAirdropGameData ( callback ) {
    this.CONTRACT
      .players(MYTronWeb.getAccount())
      .call()
      .then(response)
      .catch(error);
    function response(result) { return callback(null, result); }  
    function error(e) { return callback(e, null); }      
  },
  getShareCrystalByMiniGameId ( { miniGameId }, callback ) {
    this.CONTRACT
      .calculateShareCrystal(miniGameId)
      .call()
      .then(response)
      .catch(error);
    function response(result) { return callback(null, parseInt(result)); }  
    function error(e) { return callback(e, null); }         
  },
  joinAirdropGame ( callback ) {
    this.CONTRACT
      .joinAirdrop()
      .send()
      .then(response)
      .catch(error);
    function response() { return callback(); }
    function error() { return callback(); }  
  },
  toETH: number => {
    return web3.fromWei(number, 'ether')
  },
  toWei: number => {
    return web3.toWei(number, 'ether')
  }
}
