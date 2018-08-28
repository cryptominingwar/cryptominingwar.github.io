import {
  abi
} from "./contract/abi"


export const EthMagic = {
  //v1
  contract_address: '0x0de197dc289d680e734ccab866d529505b2638db',
  //v2
  //contract_address: '0xf84c61bb982041c030b8580d1634f00fffb89059',
  account: '',
  mine_war_contract: null,
  startApp(callback) {
    if (typeof web3 != 'undefined') {
      EthMagic.contract_init(callback)
    } else {
      callback(false)
    }
  },
  contract_init(callback) {
    if (typeof web3.eth.accounts[0] != 'undefined') {
      game.user.address = web3.eth.accounts[0]
      EthMagic.account = web3.eth.accounts[0]
      game.default_gas_price = web3.toHex(8000000000)
      EthMagic.mine_war_contract = web3.eth
        .contract(abi)
        .at(EthMagic.contract_address)
      callback(true)
    } else {
      callback(false)
    }
  },
  get_current_player_data(callback) {
    EthMagic.get_player_data(web3.eth.accounts[0], function (
      result
    ) {
      game.user.crystals = parseInt(result[0]);
      game.user.lastupdate = parseInt(result[1]);
      game.user.hashratePerDay = parseInt(result[2]);
      game.user.miners = [];
      for (var idx = 0; idx < 8; idx++) {
        game.user.miners.push(parseInt(result[3][idx]));
      }
	  if(game.user.miners[0] == 0) {
		  game.user.crystals = 0;
		  game.user.hashratePerDay = 0;
	  }
      game.user.hasBoost       = parseInt(result[4]);
      game.user.referral_count = parseInt(result[5]);
      game.user.player_balance = parseFloat(EthMagic.toETH(result[6]));
	  game.user.yourQuest      = parseInt(result[7]);

      callback(game.user);
    })
  },
  get_player_data(address, callback) {
    EthMagic.mine_war_contract.getPlayerData.call(
      address, {
        from: address
      },
      function (error, result) {
        if (!error) {
          callback(result)
        } else {
          console.log(error)
        }
      }
    )
  },
  get_free(callback) {
    EthMagic.mine_war_contract.getFreeMiner.sendTransaction(
      {
        from: web3.eth.accounts[0],
        gas: web3.toHex(200000),
        gasPrice: game.default_gas_price
      },
      function (err, result) {
        if (!err) {
          callback()
        }
      }
    )
  },
  get_prize_pool(callback) {
	  EthMagic.mine_war_contract.prizePool.call({
        from: web3.eth.accounts[0]
      },
      function (err, result) {
        if (!err) {
          game.ethbalance = EthMagic.toETH(parseInt(result))
          callback(game.ethbalance)
        }
      }
    )
  },
  get_contract_balance(callback) {
    web3.eth.getBalance(EthMagic.contract_address, function (
      err,
      result
    ) {
      if (!err) {
        game.ethbalance = EthMagic.toETH(parseInt(result))
        callback(game.ethbalance)
      }
    })
  },
  withdraw_payments(callback) {
    EthMagic.mine_war_contract.withdrawPayments.sendTransaction(
      {
        from: web3.eth.accounts[0],
        gas: web3.toHex(100000),
        gasPrice: game.default_gas_price
      },
      function (err, result) {
        if (!err) {
          callback();
        }
      }
    )
  },
  get_deadline(callback) {
    EthMagic.mine_war_contract.deadline.call({
        from: web3.eth.accounts[0]
      },
      function (err, result) {
        if (!err) {
          game.deadline = parseInt(result)
          callback(game.deadline)
        }
      }
    )
  },
  get_rank_list(callback) {
    EthMagic.mine_war_contract.getRankList.call({
        from: web3.eth.accounts[0]
      },
      function (error, result) {
        if (!error) {
          game.rank_list = []
          for (var idx = 0; idx < 20; idx++) {
            game.rank_list.push({
              ranking: idx + 1,
              address: result[idx],
              hashrate: 0
            })
          }
          callback(game.rank_list)
        } else {
          console.log(error)
        }
      }
    )
  },
  get_rank_list_hashrate(idx, callback) {
    let rank_detail = game.rank_list[idx]
    EthMagic.get_player_data(rank_detail.address, function (
      result
    ) {
      rank_detail = game.rank_list[idx]
      rank_detail.hashrate = parseInt(result[2])
      callback(rank_detail)
    })
  },
  start_game(callback) {
    
  },
  upgrade(callback) {
    
  },
  lottery(callback) {
    EthMagic.mine_war_contract.lottery.sendTransaction({
        from: web3.eth.accounts[0],
        gasPrice: game.default_gas_price
      },
      function (err, ress) {
        callback()
      }
    )
  },
  become_sponsor(sponsor_fee, callback) {
    EthMagic.mine_war_contract.becomeSponsor.sendTransaction({
        from: web3.eth.accounts[0],
        value: EthMagic.toWei(sponsor_fee),
        gasPrice: game.default_gas_price
      },
      function (err, result) {
        if (!err) {
          callback()
        }
      }
    )
  },
  getCurrentMiningWarGameRoundId ( callback ) {
    EthMagic.mine_war_contract.roundNumber.call({
        from: web3.eth.accounts[0]
      },
      function (err, result) {
        if (!err) {
          callback(result)
        }
      }
    )
  },
  get_initialized(callback) {
    EthMagic.mine_war_contract.initialized.call({
        from: web3.eth.accounts[0]
      },
      function (err, result) {
        if (!err) {
          callback(result)
        }
      }
    )
  },
  get_sponsor_fee(callback) {
    EthMagic.mine_war_contract.getSponsorFee.call({
        from: web3.eth.accounts[0]
      },
      function (err, result) {
        if (!err) {
          callback(parseFloat(EthMagic.toETH(result)))
        }
      }
    )
  },
  get_sponsor(callback) {
    EthMagic.mine_war_contract.sponsor.call({
        from: web3.eth.accounts[0]
      },
      function (err, result) {
        if (!err) {
          game.sponsor = result
          callback(result)
        }
      }
    )
  },
  buy_miners(miners, callback) {
    EthMagic.mine_war_contract.buyMiner.sendTransaction(
      miners, {
        from: web3.eth.accounts[0],
        gasPrice: game.default_gas_price
      },
      function (err, result) {
        callback()
      }
    )
  },
  get_booster_data(idx, callback) {
    EthMagic.mine_war_contract.getBoosterData.call(
      idx, {
        from: web3.eth.accounts[0]
      },
      function (err, result) {

        callback(idx, result[0], EthMagic.toETH(parseInt(result[4])))
      }
    )
  },
  buy_booster(idx, price, callback) {
    EthMagic.mine_war_contract.buyBooster.sendTransaction(
      idx, {
        from: web3.eth.accounts[0],
        value: EthMagic.toWei(price),
        gasPrice: game.default_gas_price
      },
      function (err, result) {
        callback()
      }
    )
  },
  get_buy_demand(idx, callback) {
    EthMagic.mine_war_contract.getBuyDemand.call(
      idx, {
        from: web3.eth.accounts[0]
      },
      function (err, result) {
        if (!err) {
          game.buyOrderData[idx].owner = result[0]
          game.buyOrderData[idx].title = result[1]
          game.buyOrderData[idx].description = result[2]
          game.buyOrderData[idx].amount = parseInt(
            result[3]
          )
          game.buyOrderData[
            idx
          ].unitPrice = EthMagic.toETH(
            parseInt(result[4])
          )
          callback(idx, game.buyOrderData[idx])
        }
      }
    )
  },
  withdraw_buy_demand(idx, callback) {
    EthMagic.mine_war_contract.withdrawBuyDemand.sendTransaction(
      idx, {
        from: web3.eth.accounts[0],
        gas: web3.toHex(100000),
        gasPrice: game.default_gas_price
      },
      function (err, ress) {
        if (!err) {
          callback()
        }
      }
    )
  },
  buy_crystal_demand(amount, unitPrice, title, description) {
    let value = amount * EthMagic.toWei(unitPrice)
    EthMagic.mine_war_contract.buyCrystalDemand.sendTransaction(
      amount,
      EthMagic.toWei(unitPrice),
      title,
      description, {
        from: web3.eth.accounts[0],
        value: value,
        gasPrice: game.default_gas_price
      },
      function (err, ress) {}
    )
  },
  doQuest( num_do_quest ) {
    EthMagic.mine_war_contract.doQuest.sendTransaction(
      num_do_quest,
      {
        from: web3.eth.accounts[0],
		gas: web3.toHex(100000),
        gasPrice: game.default_gas_price
      },
      function (err, ress) {}
    )
  },
  sell_crystal(amount, idx) {
    EthMagic.mine_war_contract.sellCrystal.sendTransaction(
      amount,
      idx, {
        from: web3.eth.accounts[0],
        gasPrice: game.default_gas_price
      },
      function (err, ress) {}
    )
  },
  get_sell_demand(idx, callback) {
    EthMagic.mine_war_contract.getSellDemand.call(
      idx, {
        from: web3.eth.accounts[0]
      },
      function (err, result) {
        if (!err) {
          game.sellOrderData[idx].owner = result[0]
          game.sellOrderData[idx].title = result[1]
          game.sellOrderData[idx].description = result[2]
          game.sellOrderData[idx].amount = parseInt(
            result[3]
          )
          game.sellOrderData[
            idx
          ].unitPrice = EthMagic.toETH(
            parseInt(result[4])
          )
          callback(idx, game.sellOrderData[idx])
        }
      }
    )
  },
  withdraw_sell_demand(idx, callback) {
    EthMagic.mine_war_contract.withdrawSellDemand.sendTransaction(
      idx, {
        from: web3.eth.accounts[0],
        gas: web3.toHex(100000),
        gasPrice: game.default_gas_price
      },
      function (err, ress) {
        if (!err) {
          callback()
        }
      }
    )
  },
  sell_crystal_demand(amount, unitPrice, title, description) {
    EthMagic.mine_war_contract.sellCrystalDemand.sendTransaction(
      amount,
      EthMagic.toWei(unitPrice),
      title,
      description, {
        from: web3.eth.accounts[0],
        gasPrice: game.default_gas_price
      },
      function (err, ress) {}
    )
  },
  buy_crystal(amount, unitPrice, idx) {
    let value = amount * EthMagic.toWei(unitPrice)
    EthMagic.mine_war_contract.buyCrystal.sendTransaction(
      amount,
      idx, {
        from: web3.eth.accounts[0],
        value: value,
        gasPrice: game.default_gas_price
      },
      function (err, ress) {}
    )
  },
  toETH: number => {
    return web3.fromWei(number, 'ether')
  },
  toWei: number => {
    return web3.toWei(number, 'ether')
  }
}