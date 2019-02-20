const Config = require("../../../config/config");
import MYTronWeb from "./tron-web";

export const EthMagic = {
  //v1
  //contract_address: '0x0de197dc289d680e734ccab866d529505b2638db',
  //v2
  // contract_address: '0xf84c61bb982041c030b8580d1634f00fffb89059',
  contract_address: Config.miningWarContractAddress,
  CONTRACT: null,
  // startApp(callback) {
  //   if (typeof web3 != 'undefined') {
  //     //game.web3 = new Web3(new Web3.providers.HttpProvider('https://o70075sme1.execute-api.us-east-1.amazonaws.com/latest/eth'));
  //     game.web3 = web3;
  //     // EthMagic.contract_init(callback)
  //     return callback(true);
  //   } else {
  //     callback(false)
  //   }
  // },
  init(callback) {
    if (typeof(window.tronWeb) === 'undefined') {
        setTimeout(EthMagic.init, 1000);
    } else {
      tronWeb
        .contract()
        .at(EthMagic.contract_address)
        .then(tronContract => {
          EthMagic.CONTRACT = tronContract;
          return callback(true);
        })
        .catch(e => { callback(false); });
    }
  },
  // contract_init(callback) {
  //   if (typeof web3.eth.accounts[0] != 'undefined') {
  //     game.user.address = web3.eth.accounts[0]
  //     EthMagic.account = web3.eth.accounts[0]
  //     game.default_gas_price = web3.toHex(8000000000)
  //     EthMagic.mine_war_contract = web3.eth
  //       .contract(abi)
  //       .at(EthMagic.contractETH)
  //     EthMagic.mine_war_contract_with_provider = game.web3.eth
  //       .contract(abi)
  //       .at(EthMagic.contractETH)
  //     callback(true)
  //   } else {
  //     callback(false)
  //   }
  // },
  get_current_player_data(callback) {

    EthMagic.get_player_data(MYTronWeb.getAccount(), function (err, playerData) {

      if (err) return false;

      game.user.crystals = parseInt(playerData.crystals);
      game.user.lastupdate = parseInt(playerData.lastupdate);
      game.user.hashratePerDay = parseInt(playerData.hashratePerDay);
      game.user.miners = playerData.miners;
  	  if(game.user.miners[0] == 0) {
  		  game.user.crystals = 0;
  		  game.user.hashratePerDay = 0;
  	  }
      game.user.hasBoost       = parseInt(playerData.hasBoost);
      game.user.player_balance = parseFloat(playerData.player_balance);

      callback(game.user);
    })
  },
  getCurrentReward(callback ) {
    EthMagic.CONTRACT
      .getCurrentReward(MYTronWeb.getAccount())
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      return callback(null, MYTronWeb.toTrx(parseInt(result)));
    } 
    function error(e) { return callback(e, null); } 
  },
  getBoosterReward(callback) {
    EthMagic.CONTRACT
      .boosterReward(MYTronWeb.getAccount())
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      return callback(null, MYTronWeb.toTrx(parseInt(result)));
    } 
    function error(e) { return callback(e, null); } 
  },
  getPlayerMiners(address, callback) {
    EthMagic.CONTRACT
      .getPlayerMiner(address)
      .call()
      .then(response)
      .catch(error);
    function response(playerMiners) {
      let miners = [];
      miners[0] = parseInt(playerMiners.lv1);
      miners[1] = parseInt(playerMiners.lv2);
      miners[2] = parseInt(playerMiners.lv3);
      miners[3] = parseInt(playerMiners.lv4);
      miners[4] = parseInt(playerMiners.lv5);
      miners[5] = parseInt(playerMiners.lv6);
      miners[6] = parseInt(playerMiners.lv7);
      miners[7] = parseInt(playerMiners.lv8);
      return callback(null, miners);
    } 
    function error(e) { 
      return callback(e, null); } 
  },
  get_player_data(address, callback) {
    EthMagic.CONTRACT
      .getPlayerData(address)
      .call()
      .then(getMiningWarRound)
      .catch(error);
    function getMiningWarRound(playerData) {
       EthMagic.getMiningWarRound((err, miningWarRound) => {
        if (err) return error(err);
        return getPlayerRound(playerData, miningWarRound)
      });
    }  
    function getPlayerRound(playerData, miningWarRound) {
      EthMagic.getPlayerRound({ address }, (err, playerRound) => {
        if (err) return error(err);
        return getMiners(playerData, playerRound, miningWarRound)
      });
    } 
    function getMiners(playerData, playerRound, miningWarRound) {

      EthMagic.getPlayerMiners(address, (err, miners) => {
        if (err) return error(err);
        response(playerData, playerRound, miningWarRound, miners);
      });
    } 
    function response(playerData, playerRound, miningWarRound, miners) {
      
      if (miningWarRound != 0 && miningWarRound != playerRound) miners = [0,0,0,0,0,0,0,0];
      let data = {
        "crystals"      : parseInt(playerData.crystals),
        "lastupdate"    : parseInt(playerData.lastupdate),
        "hashratePerDay": parseInt(playerData.hashratePerDay),
        "hasBoost"      : parseInt(playerData.hasBoost),
        "playerBalance" : parseInt(playerData.playerBalance),
        "miners" : miners
              // "crystals": playerData.crystals,
      };
      return callback(null, data);
    }
    function error(e) { return callback(e, null); } 
  },
  getData({ address }, callback) {
     EthMagic.CONTRACT
      .getData(address)
      .call()
      .then(getMiners)
      .catch(error);
     function getPlayerRound(playerData) {
      EthMagic.getPlayerRound({ address }, (err, playerRound) => {
        if (err) return error(err);
        return getMiners(playerData, playerRound)
      });
     } 
     function getMiners(playerData, playerRound) {

      EthMagic.getPlayerMiners(address, (err, miners) => {
        if (err) return error(err);
        response(playerData, playerRound, miners);
      });
    } 
    function response(playerData, playerRound, miners) {


      let data = {
        "crystals"      : parseInt(playerData.crystals),
        "lastupdate"    : parseInt(playerData.lastupdate),
        "hashratePerDay": parseInt(playerData.hashratePerDay),
        "hasBoost"      : parseInt(playerData.hasBoost),
        "playerBalance" : parseInt(playerData.playerBalance),
        "miningWarRound": parseInt(playerData._miningWarRound),
        "miners" : miners
              // "crystals": playerData.crystals,
      };
      return callback(null, data);
    }
    function error(e) { return callback(e, null); }   
  },
  get_player_round_number(address, callback) {
    EthMagic.CONTRACT
      .players(address)
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      return callback(null, parseInt(result));
    } 
    function error(e) { return callback(e, null); }   
  },
  get_free(callback) {
    EthMagic.CONTRACT
      .getFreeMiner(MYTronWeb.getAccount())
      .send()
      .then(response)
      .catch(error);
    function response(result) {
      return callback();
    }  
    function error(e) { console.log(e); }  
  },
  get_prize_pool(callback) {
	  EthMagic.CONTRACT
      .prizePool()
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      game.ethbalance = MYTronWeb.toTrx(parseInt(result));
      callback(game.ethbalance)
    } 
    function error(e) { console.log(e); } 
  },
  get_contract_balance(callback) {
    tronWeb.trx
      .getBalance(address)
      .then(response)
      .catch(error);
    function response(result) {
      return callback(null, MYTronWeb.toTrx(result));
    } 
    function error(e) { return callback(e, null); } 
  },
  getHashratePerDay(address, callback) {
    EthMagic.CONTRACT
      .getHashratePerDay(address)
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      return callback(null, result);
    } 
    function error(e) { return callback(e, null); } 
  },
  withdraw_payments(callback) {
    EthMagic.CONTRACT
      .withdrawPayments()
      .send()
      .then(response)
      .catch(error);
    function response(result) {
      return callback();
    } 
    function error(e) { return callback(e, null); }   
  },
  get_deadline(callback) {
    EthMagic.CONTRACT
      .deadline()
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      game.deadline = parseInt(result)
      callback(game.deadline)
    } 
    function error(e) { console.log(e); } 
  },
  getMiningWarRound(callback) {
    EthMagic.CONTRACT
      .roundNumber()
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      return callback(null, parseInt(result));
    } 
    function error(e) { return callback(e, null); } 
  },
  getPlayerRound({ address }, callback) {
    EthMagic.CONTRACT
      .players(address)
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      return callback(null, parseInt(result.roundNumber));
    } 
    function error(e) { return callback(e, null); } 
  },
  get_rank_list(callback) {
    
    EthMagic.CONTRACT
      .getRankListTop10()
      .call()
      .then(response)
      .catch(error);
    function response(result) {
        game.rank_list = [];

        for (var idx = 0; idx < 10; idx++) {
          let ranking = idx + 1;
          let key = 'top' + ranking;
            game.rank_list.push({
              "ranking": ranking,
              "address": MYTronWeb.toAddress(result[key]),
              "hashrate": 0
            })
        }
        callback(game.rank_list)
    } 
    function error(e) { console.log(e); } 
  },
  get_rank_list_hashrate(idx, callback) {
    let rank_detail = game.rank_list[idx]
    let address = MYTronWeb.isAddress(rank_detail.address) ? rank_detail.address : game.addressDefault; 
    EthMagic.get_player_data(address, function (err, playerData) {
      if (err) return false

      rank_detail = game.rank_list[idx]
      rank_detail.hashrate = parseInt(playerData.hashratePerDay);
      
      if (game.addressDefault == rank_detail.address) rank_detail.address = '0000000000000000000000000000000000000'

      callback(rank_detail)
    })
  },
  start_game(callback) {
    
  },
  upgrade(callback) {
    
  },
  lottery(callback) {
    EthMagic.CONTRACT
      .lottery()
      .send()
      .then(response)
      .catch(error);
    function response(result) {
      return callback(null, result);
    } 
    function error(e) { return callback(e, null); }   
  },
  // become_sponsor(sponsor_fee, callback) {
  //   EthMagic.mine_war_contract.becomeSponsor.sendTransaction({
  //       from: web3.eth.accounts[0],
  //       value: EthMagic.toWei(sponsor_fee),
  //     },
  //     function (err, result) {
  //       if (!err) {
  //         callback()
  //       }
  //     }
  //   )
  // },
  getCurrentMiningWarGameRoundId ( callback ) {
    EthMagic.CONTRACT
      .roundNumber()
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      return callback(parseInt(result));
    } 
    function error(e) { console.log(e); } 
  },
  get_initialized(callback) {
    EthMagic.CONTRACT
      .initialized()
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      callback(result)
    } 
    function error(e) { console.log(e); } 
  },
  get_sponsor_fee(callback) {
    EthMagic.CONTRACT
      .getSponsorFee()
      .call()
      .then()
      .catch(error);
    function response(result) {
      callback(parseFloat(MYTronWeb.toTrx(result)));
    } 
    function error(e) { console.log(e); }   
  },
  get_sponsor(callback) {
    EthMagic.CONTRACT
      .sponsor()
      .call()
      .then(response)
      .catch(error);
    function response(result) {
        game.sponsor = MYTronWeb.toAddress(result);
        callback(game.sponsor);
    } 
    function error(e) { console.log(e); } 
  },
  buy_miners(miners, callback) {
    EthMagic.CONTRACT
      .buyMiner(miners)
      .send()
      .then(response)
      .catch(error);
    function response(result) {
        callback();
    } 
    function error(e) { console.log(e); }   
  },
  get_booster_data(idx, callback) {
    EthMagic.CONTRACT
      .getBoosterData(idx)
      .call()
      .then(response)
      .catch(error);
    function response(result) {
      callback(idx, MYTronWeb.toAddress(result.owner), MYTronWeb.toTrx(parseInt(result.currentPrice)))
    }  
    function error(e) { console.log(e); }  
  },
  buy_booster(idx, price, callback) {
    EthMagic.CONTRACT
      .buyBooster(idx)
      .send({ callValue: MYTronWeb.toSun(price) })
      .then(response)
      .catch(error);
    function response(result) {
        callback();
    } 
    function error(e) { console.log(e); }     
  },
  // get_buy_demand(idx, callback) {
  //   EthMagic.mine_war_contract_with_provider.getBuyDemand.call(
  //     idx, {
  //       from: web3.eth.accounts[0]
  //     },
  //     function (err, result) {
  //       if (!err) {
  //         game.buyOrderData[idx].owner = result[0]
  //         game.buyOrderData[idx].title = result[1]
  //         game.buyOrderData[idx].description = result[2]
  //         game.buyOrderData[idx].amount = parseInt(
  //           result[3]
  //         )
  //         game.buyOrderData[
  //           idx
  //         ].unitPrice = EthMagic.toETH(
  //           parseInt(result[4])
  //         )
  //         callback(idx, game.buyOrderData[idx])
  //       }
  //     }
  //   )
  // },
  // withdraw_buy_demand(idx, callback) {
  //   EthMagic.mine_war_contract.withdrawBuyDemand.sendTransaction(
  //     idx, {
  //       from: web3.eth.accounts[0],
  //       gas: web3.toHex(100000),
  //     },
  //     function (err, ress) {
  //       if (!err) {
  //         callback()
  //       }
  //     }
  //   )
  // },
  // buy_crystal_demand(amount, unitPrice, title, description) {
  //   let value = amount * EthMagic.toWei(unitPrice)
  //   EthMagic.mine_war_contract.buyCrystalDemand.sendTransaction(
  //     amount,
  //     EthMagic.toWei(unitPrice),
  //     title,
  //     description, {
  //       from: web3.eth.accounts[0],
  //       value: value,
  //     },
  //     function (err, ress) {}
  //   )
  // },
  // doQuest( num_do_quest ) {
  //   EthMagic.mine_war_contract.doQuest.sendTransaction(
  //     num_do_quest,
  //     {
  //       from: web3.eth.accounts[0],
		// gas: web3.toHex(100000),
  //     },
  //     function (err, ress) {}
  //   )
  // },
  // sell_crystal(amount, idx) {
  //   EthMagic.mine_war_contract.sellCrystal.sendTransaction(
  //     amount,
  //     idx, {
  //       from: web3.eth.accounts[0],
  //     },
  //     function (err, ress) {}
  //   )
  // },
  // get_sell_demand(idx, callback) {
  //   EthMagic.mine_war_contract_with_provider.getSellDemand.call(
  //     idx, {
  //       from: web3.eth.accounts[0]
  //     },
  //     function (err, result) {
  //       if (!err) {
  //         game.sellOrderData[idx].owner = result[0]
  //         game.sellOrderData[idx].title = result[1]
  //         game.sellOrderData[idx].description = result[2]
  //         game.sellOrderData[idx].amount = parseInt(
  //           result[3]
  //         )
  //         game.sellOrderData[
  //           idx
  //         ].unitPrice = EthMagic.toETH(
  //           parseInt(result[4])
  //         )
  //         callback(idx, game.sellOrderData[idx])
  //       }
  //     }
  //   )
  // },
  // withdraw_sell_demand(idx, callback) {
  //   EthMagic.mine_war_contract.withdrawSellDemand.sendTransaction(
  //     idx, {
  //       from: web3.eth.accounts[0],
  //       gas: web3.toHex(100000),
  //     },
  //     function (err, ress) {
  //       if (!err) {
  //         callback()
  //       }
  //     }
  //   )
  // },
  // sell_crystal_demand(amount, unitPrice, title, description) {
  //   EthMagic.mine_war_contract.sellCrystalDemand.sendTransaction(
  //     amount,
  //     EthMagic.toWei(unitPrice),
  //     title,
  //     description, {
  //       from: web3.eth.accounts[0],
  //     },
  //     function (err, ress) {}
  //   )
  // },
  // buy_crystal(amount, unitPrice, idx) {
  //   let value = amount * EthMagic.toWei(unitPrice)
  //   EthMagic.mine_war_contract.buyCrystal.sendTransaction(
  //     amount,
  //     idx, {
  //       from: web3.eth.accounts[0],
  //       value: value,
  //     },
  //     function (err, ress) {}
  //   )
  // },
  toETH: number => {
    return web3.fromWei(number, 'ether')
  },
  toWei: number => {
    return web3.toWei(number, 'ether')
  },
  isAddress( address ) {
    return web3.isAddress( address );
  }
}