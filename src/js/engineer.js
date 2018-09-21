import { abi } from "./contract/minigames/engineer";
import Web3 from "./web-3";
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
  calCurrentCrystals({ address }, callback ) {
    this.CONTRACT_WITH_PROVIDER
      .calCurrentCrystals
      .call(
        address,
        {
          "from": Web3.getAccount(),
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
          "from": Web3.getAccount(),
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
              "from": Web3.getAccount()
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
          "from": Web3.getAccount()
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
          "from": Web3.getAccount()
        },
        function (err, result) {
          if ( err ) return callback( err, null );
          return callback( null, Web3.toETH(result.toNumber()));
        }
      );
  },
  getPrizePool(callback) {
    this.CONTRACT_WITH_PROVIDER
      .prizePool
      .call( 
        {
          "from": Web3.getAccount()
        },
        function (err, result) {
          if ( err ) return callback( err, null );
          return callback( null, Web3.toETH(result.toNumber()));
        }
      );
  },
  getBoosterData({ boosterId }, callback) {
     this.CONTRACT_WITH_PROVIDER
      .getBoosterData
      .call(
        boosterId, 
        {
          "from": Web3.getAccount()
        },
        function (err, result) {
          callback(boosterId, result[0], Web3.toETH(parseInt(result[2])))
        }
      );
  },
  getEngineer({ engineerId }, callback ) {
    this.CONTRACT_WITH_PROVIDER
      .engineers
      .call(
        engineerId,
        {
          "from": Web3.getAccount()
        },
        function (err, result) {
          return callback( err, result );
        }
      );
  },
  getEngineerRoundNumber( callback ) {
    this.CONTRACT_WITH_PROVIDER
      .engineerRoundNumber
      .call(
        {
            "from": Web3.getAccount()
        },
        function (err, result) {
            return callback( err, result );
        }
      );
  },
  getPlayerData({ playerAddess }, callback ) {
    this.CONTRACT_WITH_PROVIDER
      .getPlayerData
      .call(
        playerAddess,
        {
            "from": Web3.getAccount()
        },
        function (err, result) {
          if ( err ) return ( err, null );
          let engineers = [];
          for ( let i = 0; i < 8; i++ ) {
            engineers[i] = result[6][i].toNumber();
          }
          let playerData = {
            "engineerRoundNumber": result[0].toNumber(),
            "virusNumber": result[1].toNumber(),
            "virusDefence": result[2].toNumber(),
            "research": result[3].toNumber(),
            "researchPerDay": result[4].toNumber(),
            "lastUpdateTime": result[5].toNumber(),
            "engineers": engineers,
            "hasBooster": false,
            "nextTimeAtk": result[7].toNumber(),
            "endTimeUnequalledDef": result[8].toNumber()
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
          "from": Web3.getAccount(),
          "gas": Web3.toHex(400000),
          "value": Web3.toWei(gameSponsorFee),
          "gasPrice": game.default_gas_price
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
          "from": Web3.getAccount(),
          "gas": Web3.toHex(400000),
          "gasPrice": game.default_gas_price
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
          "from": Web3.getAccount(),
          "gas": Web3.toHex(400000),
          "gasPrice": game.default_gas_price
        },
        function (err, result) {}
      );
  },
  buyBooster({ boosterId, price }, callback) {
    this.CONTRACT
      .buyBooster
      .sendTransaction(
        boosterId, {
          "from": Web3.getAccount(),
          "value": Web3.toWei(price),
          "gasPrice": game.default_gas_price
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
          "from": Web3.getAccount(),
          "gas": Web3.toHex(400000),
          "value": Web3.toWei(eth),
          "gasPrice": game.default_gas_price
        },
        function (err, result) {}
      );
  },
  
  claimReward() {
    this.CONTRACT
      .claimReward
      .sendTransaction(
        {
          "from": Web3.getAccount(),
          "gas": Web3.toHex(400000),
          "gasPrice": game.default_gas_price
        },
        function (err, result) {}
      );
  },
  withdrawPayments(callback) {
    this.CONTRACT
      .withdrawPayments
      .sendTransaction(
        {
          "from": Web3.getAccount(),
          "gas": Web3.toHex(100000),
          "gasPrice": game.default_gas_price
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