import { abi } from "./contract/minigames/crystals-share";
import Web3 from "./web-3";
const Config = require("../../../config/config");

const CrystalsShare = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.crystalsShareContractAddress,
  CONTRACT: null,
  CONTRACT_WITH_PROVIDER: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  startCrystalsShare(callback) {
    if (typeof web3 == 'undefined') return this(false);
    return this.init(callback);
  },
  init(callback) {
    if ( typeof Web3.getAccount() == 'undefined' ) return callback(false);
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
  calculateReward({ address, round }, callback) {
    this.CONTRACT_WITH_PROVIDER
      .calculateReward
      .call(
        address,
        round,
        {
          "from": Web3.getAccount(),
        },
        function (err, result) {
          if ( err ) return ( err, null );
          return callback(err, Web3.toETH(result.toNumber()));
        }
      );
  },
  getRound(callback) {
    this.CONTRACT_WITH_PROVIDER
      .round
      .call(
        {
          "from": Web3.getAccount(),
        },
        function (err, result) {
          if ( err ) return ( err, null );
          return callback(err, result.toNumber());
        }
      );
  },
  getGameInfo({ round }, callback) {
    this.CONTRACT_WITH_PROVIDER
      .games
      .call(
        round,
        {
          "from": Web3.getAccount(),
        },
        function (err, result) {
          if (err) return callback(err, null);
          let gameInfo = {
            "round": result[0].toNumber(),
            "crystals": result[1].toNumber() / 86400,
            "prizePool": Web3.toETH(result[2].toNumber()),
            "endTime": result[3].toNumber(),
            "ended": result[4]
          }; 
          return callback(null, gameInfo);
        }
      );
  },
  getPlayerData({ address }, callback ) {
     this.CONTRACT_WITH_PROVIDER
       .players
       .call(
          address,
          {
              "from": Web3.getAccount()
          },
          function (err, result) {
            if ( err ) return callback( err, false );
            let player = {
                "currentRound": result[0].toNumber(),
                "lastRound": result[1].toNumber(),
                "reward": Web3.toETH(result[2].toNumber()),
                "share": result[3].toNumber() / 86400 
            };
            return callback( null, player );
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
          "from": Web3.getAccount(),
          "gas": Web3.toHex(400000)
        },
        function (err, result) {}
      );
  },
  
  withdrawReward() {
    this.CONTRACT
      .withdrawReward
      .sendTransaction(
        {
          "from": Web3.getAccount(),
          "gas": Web3.toHex(400000),
        },
        function (err, result) {}
      );
  }
}
export default CrystalsShare