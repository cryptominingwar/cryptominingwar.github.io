import MYTronWeb from "./tron-web";
const Config = require("../../../config/config");

const BeginnerQuest = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.beginnerQuestContractAddress,
  CONTRACT: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  // startBeginnerQuest(callback) {
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
  getData(callback) {
    this.CONTRACT
      .getData(MYTronWeb.getAccount())
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      let data = {
              "miningWarRound": parseInt(result._miningWarRound),
              "currentQuest"  : parseInt(result._currentQuest),
              "isFinish"      : result._isFinish,
              "endedQuest"    : result._endedQuest
      };
      return callback(null, data);
    } 
    function error(e) { return callback(e, null); } 
  },
  /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  confirmQuest() {
    this.CONTRACT.confirmQuest().send();
  }
}
export default BeginnerQuest