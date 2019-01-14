import { abi } from "./contract/minigames/boss-wannacry";
import MYWeb3 from "./web-3";
const Config = require("../../../config/config");

const BossWannaCry = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.bossWannaCryContractAddress,
  CONTRACT: null,
  CONTRACT_WITH_PROVIDER: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  startBossWannaCry(callback) {
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
  getCurrentReward(callback ) {
    this.CONTRACT_WITH_PROVIDER
      .getCurrentReward
      .call(
        MYWeb3.getAccount(),
        {
          "from": MYWeb3.getAccount(),
        },
        function (err, result) {
          if ( err ) return callback(err, null);
          return callback(null, MYWeb3.toETH(result.toNumber()));
        }
      );
  },
  getCurrentBossRoundNumber(callback ) {
    this.CONTRACT_WITH_PROVIDER
      .bossRoundNumber
      .call(
        {
          "from": MYWeb3.getAccount(),
        },
        function (err, result) {
          if ( err ) return callback(err, null);
          return callback(null, result.toNumber());
        }
      );
  },
  calculateShareETH({ address, bossRoundNumber }, callback) {
     this.CONTRACT_WITH_PROVIDER
      .calculateShareETH
      .call(
        address,
        bossRoundNumber,
        {
          "from": MYWeb3.getAccount(),
        },
        function (err, result) {
          if ( err ) return callback(err, null);
          return callback(null, result.toNumber());
        }
      );
  },
  getBossData({ bossRoundNumber }, callback) {
    this.CONTRACT_WITH_PROVIDER
      .bossData
      .call(
        bossRoundNumber,
        {
          "from": MYWeb3.getAccount(),
        },
        function (err, result) {
		  if(MYWeb3.toETH(result[3].toNumber()) === 0) {
			  err = true;
		  }
          if (err) return callback(err, null);

          let currentBoss = {
             "bossRoundNumber": result[0].toNumber(),
             "bossHp": result[1].toNumber(),
             "def": result[2].toNumber(),
             "prizePool": MYWeb3.toETH(result[3].toNumber()),
             "playerLastAtk": result[4],
             "totalDame": result[5].toNumber(),
             "ended": result[6]
          };
          return callback(null, currentBoss);
        }
      );
  },
  getPlayerData({ address }, callback) {
    this.CONTRACT_WITH_PROVIDER
      .players
      .call(
        address,
        {
          "from": MYWeb3.getAccount(),
        },
        function (err, result) {
          if (err) return callback(err, null);

          let bossWannaCryPlayer = {
              "currentBossRoundNumber": result[0].toNumber(),
              "lastBossRoundNumber": result[1].toNumber(),
              "win": result[2].toNumber(),
              "share": result[3].toNumber(),
              "dame": result[4].toNumber(),
              "nextTimeAtk": result[5].toNumber()
          };

          return callback(null, bossWannaCryPlayer);
        }
      );
  },
   /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  attackBoss({ virusAttack }) {
    this.CONTRACT
      .atkBoss
      .sendTransaction(
        virusAttack,
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
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
  },
}
export default BossWannaCry