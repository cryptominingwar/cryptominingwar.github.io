import MYTronWeb from "./tron-web";
const Config = require("../../../config/config");

const Arena = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.arenaContractAddress,
  CONTRACT: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  // startArenaGame(callback) {
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
  getData({ address }, callback ) {
    this.CONTRACT
      .getDataForUI(address)
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      let data = formatData(result); 
      return callback( null, data );
    } 
    function error(e) { return callback(e, null); } 
    function formatData(result) {
      return {
        'virusDef': parseInt(result._virusDef),
        'nextTimeAtk': parseInt(result._nextTimeAtk),
        'endTimeUnequalledDef': parseInt(result._endTimeUnequalledDef),
        'nextTimeArenaBonus': parseInt(result._nextTimeArenaBonus),
        'bonusPoint': parseInt(result._bonusPoint),
        'canAtk': result._canAtk,
                // engineer
        'currentVirus': parseInt(result._currentVirus), 
                // mingin war
        'currentCrystals': parseInt(result._currentCrystals)
      }
    }
  },
  /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  
  addVirusDef({ virusDef }) {
    this.CONTRACT.addVirusDef(MYTronWeb.getAccount(), virusDef).send();
  },

  attack({ defAddress, virusAtk, programs }) {
    this.CONTRACT.attack(defAddress, virusAtk, programs).send();
  }
}
export default Arena