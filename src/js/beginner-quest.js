import { abi } from "./contract/minigames/beginner-quest";
import MYWeb3 from "./web-3";
const Config = require("../../../config/config");

const BeginnerQuest = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.beginnerQuestContractAddress,
  CONTRACT: null,
  CONTRACT_WITH_PROVIDER: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  startBeginnerQuest(callback) {
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
  getData(callback) {
    this.CONTRACT_WITH_PROVIDER
      .getData
      .call(
        MYWeb3.getAccount(),
        {
          "from": MYWeb3.getAccount(),
        },
        function (err, result) {
          if (err) return callback(err, null);
          let beginnerQuestData = {
              "miningWarRound": result[0].toNumber(),
              "currentQuest": result[1].toNumber(),
              "isFinish": result[2],
              "endedQuest": result[3]
          };
          return callback(null, beginnerQuestData);
        }
      );
  },
  /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  confirmQuest() {
    this.CONTRACT
      .confirmQuest
      .sendTransaction(
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000)
        },
        function (err, result) {}
      );
  }
}
export default BeginnerQuest