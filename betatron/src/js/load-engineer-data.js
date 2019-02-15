// import { abi } from "./contract/minigames/load-engineer-data";
import MYWeb3 from "./web-3";
const Config = require("../../../config/config");

const LoadEngineerDataOldVersion = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.loadOldEngineerContractAddress,
  CONTRACT: null,
  CONTRACT_WITH_PROVIDER: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  startLoadEngineerDataOldVersion(callback) {
    if (typeof web3 == 'undefined') return this(false);
    return this.init(callback);
  },
  init(callback) {
    if ( typeof MYWeb3.getAccount() == 'undefined' ) return callback(false);
    // init
    this.CONTRACT = web3.eth
        .contract(abi)
        .at(this.CONTRACT_ADDRESS);
    this.CONTRACT_WITH_PROVIDER = game.web3.eth
        .contract(abi)
        .at(this.CONTRACT_ADDRESS);
    return callback(true);
  },
  checkPlayerLoadOldData(callback) {
    this.CONTRACT_WITH_PROVIDER
      .playersLoadOldData
      .call(
        MYWeb3.getAccount(),
        {
          "from": MYWeb3.getAccount(),
        },
        function (err, result) {
          if ( err ) return ( err, null );
          return callback(err, result);
        }
      );
  },
  loadOldData() {
    this.CONTRACT
      .loadOldData
      .sendTransaction(
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(800000),
        },
        function (err, result) {}
      );
  }
}
export default LoadEngineerDataOldVersion