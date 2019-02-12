import { abi } from "./contract/minigames/arena";
import MYWeb3 from "./web-3";
const Config = require("../../../config/config");

const Arena = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.arenaContractAddress,
  CONTRACT: null,
  CONTRACT_WITH_PROVIDER: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  startArenaGame(callback) {
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
  getData({ address }, callback ) {
    this.CONTRACT_WITH_PROVIDER
      .getDataForUI
      .call(
        address,
        {
            "from": MYWeb3.getAccount()
        },
        function (err, result) {

          if ( err ) return ( err, null );
        
          let data = {
            'virusDef': result[0].toNumber(),
            'nextTimeAtk': result[1].toNumber(),
            'endTimeUnequalledDef': result[2].toNumber(),
            'nextTimeArenaBonus': result[3].toNumber(),
            'bonusPoint': result[4].toNumber(),
            'canAtk': result[5],
                // engineer
            'currentVirus': result[6].toNumber(), 
                // mingin war
            'currentCrystals': result[7].toNumber()
          };
          return callback( err, data );
        }
      );
  },
  /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  
  addVirusDef({ virusDef }) {
    this.CONTRACT
      .addVirusDef
      .sendTransaction(
        MYWeb3.getAccount(),
        virusDef, 
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
        },
        function (err, result) {}
      );
  },

  attack({ defAddress, virusAtk, programs }) {
    this.CONTRACT
      .attack
      .sendTransaction(
        defAddress, 
        virusAtk,
        programs,
        {
          "from": MYWeb3.getAccount(),
          "gas": MYWeb3.toHex(400000),
        },
        function (err, result) {}
      );
  }
}
export default Arena