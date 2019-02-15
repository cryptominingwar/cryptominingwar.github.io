import MYTronWeb from "./tron-web";
const Config = require("../../../config/config");

const EngineerGame = {
  /** ---------------------------------------------------------------------------------------------------------
  *   Engineer Contract Information
  *  ----------------------------------------------------------------------------------------------------------
  */
  CONTRACT_ADDRESS: Config.engineerContractAddress,
  CONTRACT: null,
  /** ---------------------------------------------------------------------------------------------------------
  *   Init Engineer Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  // startEngineerGame(callback) {
  //   if (typeof web3 == 'undefined') return this(false);
  //   return this.init(callback);
  // },
  init(callback) {
    let self = this;
    if (typeof(window.tronWeb) === 'undefined') {
        setTimeout(self.init, 1000);
    } else {
      tronWeb
        .contract()
        .at(self.CONTRACT_ADDRESS)
        .then(response)
        .catch(error);
      function response(tronContract) {
        self.CONTRACT = tronContract;
        return callback(true);
      } 
      function error(e) { 
        return callback(false); 
      }
    }
  },
  /** ---------------------------------------------------------------------------------------------------------
  *   Call To Contract 
  *  ----------------------------------------------------------------------------------------------------------
  */
  calCurrentCrystals({ address }, callback ) {
    this.CONTRACT
      .calCurrentCrystals(address)
      .call()
      .then(response)
      .catch(error);
    function response(result) { 
      return callback(null, parseInt(result._currentCrystals)); 
    }  
    function error(e) { return call(e, null); }  
  },
  canAttack({ atkAddress, defAddress }, callback) {
    this.CONTRACT
      .canAttack(atkAddress, defAddress)
      .call()
      .then(response)
      .catch(error);
    function response(result) { 
      return callback(null, parseInt(result)); 
    }  
    function error(e) { return call(e, null); }    
  },
  hasBooster({ playerAddess }, callback ) {
     this.CONTRACT
       .hasBooster(playerAddess)
       .call()
       .then(response)
       .catch(error);
    function response(result) { 
      let _hasBooster = ( parseInt(result) != 999 )
              ? true
              : false;
      return callback( null, _hasBooster );
    }  
    function error(e) { return call(e, null); }    
  },
  getGameSponsor(callback) {
    this.CONTRACT
      .gameSponsor()
      .call()
      .then(response)
      .catch(error);
    function response(result) { 
      return callback(null, MYTronWeb.toAddress(result)); 
    }  
    function error(e) { return call(e, null); }       
  },
  getGameSponsorPrice(callback) {
    this.CONTRACT
      .gameSponsorPrice()
      .call()
      .then(response)
      .catch(error);
    function response(result) { 
      return callback(null, MYTronWeb.toTrx(parseInt(result))); 
    }  
    function error(e) { return call(e, null); }      
  },
  getPrizePool(callback) {
    this.CONTRACT
      .prizePool()
      .call()
      .then(response)
      .catch(error);
    function response(result) { 
      return callback(null, MYTronWeb.toTrx(parseInt(result))); 
    }  
    function error(e) { return call(e, null); }     
  },
  getBoosterData({ boosterId }, callback) {
     this.CONTRACT
      .getBoosterData(boosterId)
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      return callback(boosterId, MYTronWeb.toAddress(result._owner), MYTronWeb.toTrx(parseInt(result._basePrice)));
    } 
    function error(e) { console.log(e) } 
  },
  getEngineer({ engineerId }, callback ) {
    this.CONTRACT
      .engineers(engineerId)
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      return callback(null, result);
    } 
    function error(e) { return callback(e, null); } 
  },
  getPlayerDataForDef({ playerAddess }, callback ) {
    let self = this;
    this.CONTRACT
      .getPlayerData(playerAddess)
      .call()
      .then(getPlayerEngineer)
      .catch(error);
    function getPlayerEngineer(playerData) {
      self.getPlayerEngineer({ playerAddess }, (err, engineers) => {
        if (err) return error(err);
        response(playerData, engineers);
      });
    } 
    function response(playerData, engineers) {
       let data = {
            "virusNumber"   : parseInt(playerData._virusNumber),
            "currentVirus"  : parseInt(playerData._currentVirus),
            "research"      : parseInt(playerData._research),
            "researchPerDay": parseInt(playerData._researchPerDay),
            "lastUpdateTime": parseInt(playerData._lastUpdateTime),
            "engineers": engineers,
            "hasBooster": false,
       };
       return callback( err, data );

    } 
    function error(e) { return callback(e, null); }
  },
  getPlayerEngineer({ playerAddess }, callback) {
    this.CONTRACT
      .getPlayerEngineer(playerAddess)
      .call()
      .then(response)
      .catch(error);
    function response(playerEngineers) {
      let engineers = [];
      engineers[0] = parseInt(playerEngineers._link);
      engineers[1] = parseInt(playerEngineers._mouse);
      engineers[2] = parseInt(playerEngineers._switch);
      engineers[3] = parseInt(playerEngineers._dozer);
      engineers[4] = parseInt(playerEngineers._tank);
      engineers[5] = parseInt(playerEngineers._apoc);
      engineers[6] = parseInt(playerEngineers._trinity);
      engineers[7] = parseInt(playerEngineers._morpheus);
      return callback(null, engineers);
    } 
    function error(e) { return callback(e, null); } 
  },
  getPlayerData({ playerAddess }, callback ) {
    let self = this;
    this.CONTRACT
      .getPlayerData(playerAddess)
      .call()
      .then(getPlayerEngineer)
      .catch(error);
    function getPlayerEngineer(playerData) {
      self.getPlayerEngineer({ playerAddess }, (err, engineers) => {
        if (err) return error(err);
        response(playerData, engineers);
      });
    } 
    function response(playerData, engineers) {
       let hasEngineers = false;
       for ( let i = 0; i < 8; i++ ) {
            if (engineers[i] != 0) hasEngineers = true;
       }
       if (hasEngineers == false) return error(true);
       let data = {
            "virusNumber"   : parseInt(playerData._virusNumber),
            "currentVirus"  : parseInt(playerData._currentVirus),
            "research"      : parseInt(playerData._research),
            "researchPerDay": parseInt(playerData._researchPerDay),
            "lastUpdateTime": parseInt(playerData._lastUpdateTime),
            "engineers": engineers,
            "hasBooster": false,
       };
       return callback( null, data );

    } 
    function error(e) { return callback(e, null); }
  },
  /** ---------------------------------------------------------------------------------------------------------
  *   Send Transaction To Contract
  *  ----------------------------------------------------------------------------------------------------------
  */
  becomeGameSponsor({ gameSponsorFee }) {
    this.CONTRACT
      .becomeGameSponsor()
      .send({ callValue: MYTronWeb.toSun(gameSponsorFee) })
      .then(response)
      .catch(error);
    function response() {}
    function error() {}  
  },
  // attack({ pAtkAddress, virusAttack }) {
  //   this.CONTRACT
  //     .attack
  //     .sendTransaction(
  //       pAtkAddress, 
  //       virusAttack,
  //       {
  //         "from": MYWeb3.getAccount(),
  //         "gas": MYWeb3.toHex(400000),
  //       },
  //       function (err, result) {}
  //     );
  // },
  // addVirusDefence({ virusDefence }) {
  //   this.CONTRACT
  //     .addVirusDefence
  //     .sendTransaction(
  //       virusDefence, 
  //       {
  //         "from": MYWeb3.getAccount(),
  //         "gas": MYWeb3.toHex(400000),
  //       },
  //       function (err, result) {}
  //     );
  // },
  buyBooster({ boosterId, price }, callback) {
    this.CONTRACT
      .buyBooster(boosterId)
      .send({ callValue: MYTronWeb.toSun(price) })
      .then(response)
      .catch(error);
    function response(result) { return callback(null, result); }  
    function error(e) { return callback(e, null); }  
  },
  buyEngineers({ engineerCount, trx }) {
    this.CONTRACT
      .buyEngineer(engineerCount)
      .send({ callValue: MYTronWeb.toSun(trx) })
      .then(response)
      .catch(error);
    function response() {}
    function error() {}  
  },
  
  // claimReward() {
  //   this.CONTRACT
  //     .claimReward
  //     .sendTransaction(
  //       {
  //         "from": MYWeb3.getAccount(),
  //         "gas": MYWeb3.toHex(400000),
  //       },
  //       function (err, result) {}
  //     );
  // },
  withdrawPayments(callback) {
    this.CONTRACT
      .withdrawPayments()
      .send()
      .then(response)
      .catch(error);
    function response() { return callback(); }  
    function error() { return callback(); }  
  }
}
export default EngineerGame