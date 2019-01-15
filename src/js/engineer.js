import { abi } from "./contract/minigames/engineer";
import MYWeb3 from "./web-3";
const Config = require("../../../config/config");

const EngineerGame = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.engineerContractAddress,
  CONTRACT: null,
  CONTRACT_WITH_PROVIDER: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  startEngineerGame(callback) {
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
  calCurrentCrystals({ address }, callback ) {
    this.CONTRACT_WITH_PROVIDER
      .calCurrentCrystals
      .call(
        address,
        {
          "from": MYWeb3.getAccount(),
        },
        function (err, result) {
          if ( err ) return ( err, null );
          return callback(err, result.toNumber());
        }
      );
  },
  canAttack({ atkAddress, defAddress }, callback) {
    this.CONTRACT_WITH_PROVIDER
      .canAttack
      .call(
        atkAddress,
        defAddress,
        {
          "from": MYWeb3.getAccount(),
        },
        function (err, result) {
          return callback(err, result);
        }
      );
  },
  hasBooster({ playerAddess }, callback ) {
     this.CONTRACT_WITH_PROVIDER
       .hasBooster
       .call(
          playerAddess,
          {
              "from": MYWeb3.getAccount()
          },
          function (err, result) {
            if ( err ) return callback( err, false );
            let _hasBooster = ( result.toNumber() != 999 )
                ? true
                : false;
            return callback( null, _hasBooster );
          }
        );
  },
  getGameSponsor(callback) {
    this.CONTRACT_WITH_PROVIDER
      .gameSponsor
      .call( 
        {
          "from": MYWeb3.getAccount()
        },
        function (err, result) {
          if ( err ) return callback( err, null );
          return callback( null, result);
        }
      );
  },
  getGameSponsorPrice(callback) {
    this.CONTRACT_WITH_PROVIDER
      .gameSponsorPrice
      .call( 
        {
          "from": MYWeb3.getAccount()
        },
        function (err, result) {
          if ( err ) return callback( err, null );
          return callback( null, MYWeb3.toETH(result.toNumber()));
        }
      );
  },
  getPrizePool(callback) {
    this.CONTRACT_WITH_PROVIDER
      .prizePool
      .call( 
        {
          "from": MYWeb3.getAccount()
        },
        function (err, result) {
          if ( err ) return callback( err, null );
          return callback( null, MYWeb3.toETH(result.toNumber()));
        }
      );
  },
  getBoosterData({ boosterId }, callback) {
     this.CONTRACT_WITH_PROVIDER
      .getBoosterData
      .call(
        boosterId, 
        {
          "from": MYWeb3.getAccount()
        },
        function (err, result) {
          callback(boosterId, result[0], MYWeb3.toETH(parseInt(result[2])))
        }
      );
  },
  getEngineer({ engineerId }, callback ) {
    this.CONTRACT_WITH_PROVIDER
      .engineers
      .call(
        engineerId,
        {
          "from": MYWeb3.getAccount()
        },
        function (err, result) {
          return callback( err, result );
        }
      );
  },
  getPlayerDataForDef({ playerAddess }, callback ) {
    this.CONTRACT_WITH_PROVIDER
      .getPlayerData
      .call(
        playerAddess,
        {
            "from": MYWeb3.getAccount()
        },
        function (err, result) {	      
          if ( err ) return callback( err, null );
          let engineers = [];
          for ( let i = 0; i < 8; i++ ) {
            engineers[i] = result[5][i].toNumber();
          }
          let playerData = {
            "virusNumber": result[0].toNumber(),
            "currentVirus": result[1].toNumber(),
            "research": result[2].toNumber(),
            "researchPerDay": result[3].toNumber(),
            "lastUpdateTime": result[4].toNumber(),
            "engineers": engineers,
            "hasBooster": false,
          };
          return callback( err, playerData );
        }
      );
  },
  getPlayerData({ playerAddess }, callback ) {
    this.CONTRACT_WITH_PROVIDER
      .getPlayerData
      .call(
        playerAddess,
        {
            "from": MYWeb3.getAccount()
        },
        function (err, result) {
          if ( err ) return callback( err, null );
          let engineers = [];
          let hasEngineers = false;

          for ( let i = 0; i < 8; i++ ) {
            engineers[i] = result[5][i].toNumber();
            if (engineers[i] != 0) hasEngineers = true;
          }
          if (hasEngineers == false) return callback(true, null); 
         
          let playerData = {
            "virusNumber": result[0].toNumber(),
            "currentVirus": result[1].toNumber(),
            "research": result[2].toNumber(),
            "researchPerDay": result[3].toNumber(),
            "lastUpdateTime": result[4].toNumber(),
            "engineers": engineers,
            "hasBooster": false,
          };
          return callback( err, playerData );
        }
      );
  },
  /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  becomeGameSponsor({ gameSponsorFee }) {
    this.CONTRACT
      .becomeGameSponsor
      .sendTransaction(
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
          "value": MYWeb3.toWei(gameSponsorFee),
        },
        function (err, result) {}
      );
  },
  attack({ pAtkAddress, virusAttack }) {
    this.CONTRACT
      .attack
      .sendTransaction(
        pAtkAddress, 
        virusAttack,
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
        },
        function (err, result) {}
      );
  },
  addVirusDefence({ virusDefence }) {
    this.CONTRACT
      .addVirusDefence
      .sendTransaction(
        virusDefence, 
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
        },
        function (err, result) {}
      );
  },
  buyBooster({ boosterId, price }, callback) {
    this.CONTRACT
      .buyBooster
      .sendTransaction(
        boosterId, {
          "from": MYWeb3.getAccount(),
          "value": MYWeb3.toWei(price),
        },
        function (err, result) {
          return callback(err, result);
        }
      );
  },
  buyEngineers({ engineerCount, eth }) {
    this.CONTRACT
      .buyEngineer
      .sendTransaction(
        engineerCount,
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
          "value": MYWeb3.toWei(eth),
        },
        function (err, result) {}
      );
  },
  
  claimReward() {
    this.CONTRACT
      .claimReward
      .sendTransaction(
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
        },
        function (err, result) {}
      );
  },
  withdrawPayments(callback) {
    this.CONTRACT
      .withdrawPayments
      .sendTransaction(
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(100000),
        },
        function (err, result) {
          if (!err) {
            callback();
          }
        }
      );
  }
}
export default EngineerGame