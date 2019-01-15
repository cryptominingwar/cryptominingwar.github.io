import { abi } from "./contract/minigames/wallet";
import MYWeb3 from "./web-3";
const Config = require("../../../config/config");

const Wallet = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.walletContractAddress,
  CONTRACT: null,
  CONTRACT_WITH_PROVIDER: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  startWallet(callback) {
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
  getCurrentReward({ address }, callback ) {
    this.CONTRACT_WITH_PROVIDER
      .getCurrentReward
      .call(
        address,
        {
          "from": MYWeb3.getAccount(),
        },
        function (err, result) {
          if ( err ) return ( err, null );
          return callback(err, MYWeb3.toETH(result.toNumber()));
        }
      );
  },
  /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  withdrawReward() {
    this.CONTRACT
      .withdrawReward
      .sendTransaction(
        {
          "from": MYWeb3.getAccount(),
        },
        function (err, result) {}
      );
  }
}
export default Wallet