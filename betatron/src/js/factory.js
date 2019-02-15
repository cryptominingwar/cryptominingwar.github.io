import MYTronWeb from "./tron-web";
const Config = require("../../../config/config");

const Factory = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.factoryContractAddress,
  CONTRACT: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  // startFactoryGame(callback) {
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
  getData(callback ) {
    this.CONTRACT
      .getData(MYTronWeb.getAccount())
      .call()
      .then(response)
      .catch(error);
    function response(result) {

      let programs = [];
      programs[0] = parseInt(result.cloneValue);
      programs[1] = parseInt(result.rebornValue);
      programs[2] = parseInt(result.dmgValue);
      programs[3] = parseInt(result.poisonValue);
      let data = {
        'factoryTotal': parseInt(result._factoryTotal),
        'factoryLevel': parseInt(result._factoryLevel),
        'factoryTime' : parseInt(result._factoryTime),
        'programs': programs
      };
      return callback(null, data);
    } 
    function error(e) { return callback(e, null); } 
  },
  /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  updateFactory({ trx }) {
    this.CONTRACT.updateFactory().send({ callValue: MYTronWeb.toSun(trx) });
  },
  buyProgarams({ programs }) {
    this.CONTRACT.buyProgarams(programs).send();
  }
}
export default Factory