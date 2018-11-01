import { abi } from "./contract/minigames/crystals-deposit";
import MYWeb3 from "./web-3";
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
  startCrystalsDeposit(callback) {
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
          let depositData = {
             "prizePool": MYWeb3.toETH(result[0].toNumber()),
             "crystals": result[1].toNumber() / 86400,
             "endTime": result[2].toNumber(),
            // player info
             "reward": MYWeb3.toETH(result[3].toNumber()),
             "share": result[4].toNumber() / 86400,
             "questSequence": result[5].toNumber(),
                // current quest of player
             "deposit": result[6].toNumber() / 86400,
             "resetFreeTime": result[7].toNumber(),
             "typeQuest": result[8].toNumber(),
             "numberOfTimes": result[9].toNumber(), 
             "number": result[10].toNumber(),
             "isFinish": result[11],
             "haveQuest": result[12]
          };
          return callback(null, depositData);
        }
      );
  },
  /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  share({ crystals }) {
    this.CONTRACT
      .share
      .sendTransaction(
        crystals,
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000)
        },
        function (err, result) {}
      );
  },
  confirmQuest() {
    this.CONTRACT
      .confirmQuest
      .sendTransaction(
        MYWeb3.getAccount(),
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000)
        },
        function (err, result) {}
      );
  },
  freeResetQuest() {
    this.CONTRACT
      .freeResetQuest
      .sendTransaction(
        MYWeb3.getAccount(),
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
        },
        function (err, result) {}
      );
  },
  instantResetQuest() {
    this.CONTRACT
      .instantResetQuest
      .sendTransaction(
        MYWeb3.getAccount(),
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
          "value": MYWeb3.toWei(0.005)
        },
        function (err, result) {}
      );
  },
  withdrawReward() {
    this.CONTRACT
      .withdrawReward
      .sendTransaction(
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
        },
        function (err, result) {}
      );
  }
}
export default CrystalsDeposit