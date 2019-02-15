import MYTronWeb from "./tron-web";
const Config = require("../../../config/config");

const BossWannaCry = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.bossWannaCryContractAddress,
  CONTRACT: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  // startBossWannaCry(callback) {
  //   if (typeof web3 == 'undefined') return this(false);
  //   return this.init(callback);
  // },
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
  /** ---------------------------------------------------------------------------------------------------------
  *   Call To Contract 
  *  ----------------------------------------------------------------------------------------------------------
  */
  getCurrentReward(callback ) {
    this.CONTRACT
      .getCurrentReward(MYTronWeb.getAccount())
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      return callback(null, MYTronWeb.toTrx(parseInt(result._currentReward)));
    } 
    function error(e) { return callback(e, null); } 
  },
  getCurrentBossRoundNumber(callback ) {
    this.CONTRACT
      .bossRoundNumber()
      .call()
      .then(response)
      .catch(error);
    function response(result) { return callback(null, parseInt(result)); }
    function error(e) { return callback(e, null); }  
  },
  calculateShareETH({ address, bossRoundNumber }, callback) {
     this.CONTRACT
      .calculateShareETH(address, bossRoundNumber)
      .call()
      .then(response)
      .catch(error);
    function response(result) { return callback(null, parseInt(result)); }
    function error(e) { return callback(e, null); }    
  },
  getBossData({ bossRoundNumber }, callback) {
    this.CONTRACT
      .bossData(bossRoundNumber)
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      let currentBoss = {
             "bossRoundNumber": parseInt(result.bossRoundNumber),
             "bossHp": parseInt(result.bossHp),
             "def": parseInt(result.def),
             "prizePool": MYTronWeb.toTrx(parseInt(result.prizePool)),
             "playerLastAtk": MYTronWeb.toAddress(result.playerLastAtk),
             "totalDame": parseInt(result.totalDame),
             "ended": result.ended
      };
      return callback(null, currentBoss);
    } 
    function error(e) { return callback(e, null); } 
  },
  getPlayerData({ address }, callback) {
    this.CONTRACT
      .players(address)
      .call()
      .then(response)
      .catch(error);
    function response(result) {
       let bossWannaCryPlayer = {
              "currentBossRoundNumber": parseInt(result.currentBossRoundNumber),
              "lastBossRoundNumber"   : parseInt(result.lastBossRoundNumber),
              "win"                   : parseInt(result.win),
              "share"                 : parseInt(result.share),
              "dame"                  : parseInt(result.dame),
              "nextTimeAtk"           : parseInt(result.nextTimeAtk)
          };

          return callback(null, bossWannaCryPlayer);
    } 
    function error(e) { return callback(e, null); } 
  },
   /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  attackBoss({ virusAttack }) {
    this.CONTRACT.atkBoss(virusAttack).send();
  },
  withdrawReward() {
    this.CONTRACT.withdrawReward().send();
  },
}
export default BossWannaCry