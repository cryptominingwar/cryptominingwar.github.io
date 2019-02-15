import MYTronWeb from "./tron-web";
const Config = require("../../../config/config");

const CrystalsDeposit = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.crystalsDepositContractAddress,
  CONTRACT: null,
  CONTRACT_WITH_PROVIDER: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  // startCrystalsDeposit(callback) {
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
  getData(callback) {
    this.CONTRACT
      .getData(MYTronWeb.getAccount())
      .call()
      .then(response)
      .catch(error);
    function response(result) {
         let data = {
             "prizePool": MYTronWeb.toTrx(parseInt(result._prizePool)),
             "crystals": parseInt(result._crystals) / 86400,
             "startTime": parseInt(result._startTime),
             "endTime": parseInt(result._endTime),
            // player info
             "reward": MYTronWeb.toTrx(parseInt(result._reward)),
             "share": parseInt(result._share) / 86400
          };
          return callback(null, data);
    } 
    function error(e) { return callback(e, null); } 
  },
  /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  share({ crystals }) {
    this.CONTRACT
      .share(crystals)
      .send()
      .then(response)
      .catch(error);
    function response() {}
    function error() {}  
  },
  withdrawReward() {
    this.CONTRACT
      .withdrawReward()
      .send()
      .then(response)
      .catch(error);
    function response() {}
    function error() {}  
  }
}
export default CrystalsDeposit