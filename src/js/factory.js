import { abi } from "./contract/minigames/factory";
import MYWeb3 from "./web-3";
const Config = require("../../../config/config");

const Factory = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.factoryContractAddress,
  CONTRACT: null,
  CONTRACT_WITH_PROVIDER: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  startFactoryGame(callback) {
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
  /** ---------------------------------------------------------------------------------------------------------
  *   Call To Contract 
  *  ----------------------------------------------------------------------------------------------------------
  */
  getData(callback ) {
    this.CONTRACT_WITH_PROVIDER
      .getData
      .call(
        MYWeb3.getAccount(),
        {
          "from": MYWeb3.getAccount(),
        },
        function (err, result) {
          if ( err ) return ( err, null );
          let programs = [];
          for (let idx = 0; idx < result[3].length; idx++) {
            programs[idx] = result[3][idx].toNumber();
          }
          let data = {
            'factoryTotal': result[0].toNumber(),
            'factoryLevel': result[1].toNumber(),
            'factoryTime': result[2].toNumber(),
            'programs': programs
          };
          return callback(err, data);
        }
      );
  },
  /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  updateFactory({ eth }) {
    this.CONTRACT
      .updateFactory
      .sendTransaction(
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
          "value": MYWeb3.toWei(eth),
        },
        function (err, result) {}
      );
  },
  buyProgarams({ programs }) {
    this.CONTRACT
      .buyProgarams
      .sendTransaction(
        programs, 
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
        },
        function (err, result) {}
      );
  }
}
export default Factory