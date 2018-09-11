import {
  abi
} from "./contract/minigames/airdrop-game"


export const AirdropGame = {
  contract_address: '0x5b813a2f4b58183d270975ab60700740af00a3c9',
  //contract_address: '0xe06a2ae710004780026aab950f2d4290bc7b43bc',
  miniGameContract: null,
  miniGameContract_with_provider: null,
  startAirdropGame(callback) {
    if (typeof web3 != 'undefined') {
      AirdropGame.contract_init(callback)
    } else {
      AirdropGame(false)
    }
  },
  contract_init(callback) {
    if (typeof web3.eth.accounts[0] != 'undefined') {
      AirdropGame.miniGameContract = web3.eth
        .contract(abi)
        .at(AirdropGame.contract_address)
      AirdropGame.miniGameContract_with_provider = game.web3.eth
        .contract(abi)
        .at(AirdropGame.contract_address)
      callback(true)
    } else {
      callback(false)
    }
  },
  claimCrystal ( callback ) {
    AirdropGame.miniGameContract.claimCrystal.sendTransaction(
      {
        from: web3.eth.accounts[0],
        gas: web3.toHex(400000),
        gasPrice: game.default_gas_price
      },
      function (err, result) {
        if (!err) {
          callback()
        }
      }
    );
  },
  getCurrentMiniGameId( callback ) {
    AirdropGame.miniGameContract_with_provider.miniGameId.call({
        from: web3.eth.accounts[0]
    },
    function (err, result) {
        return callback( err, result );
      }
    );
  },
  getMiniGame ({ miniGameId }, callback ) {
     AirdropGame.miniGameContract_with_provider.minigames.call(
      miniGameId,
      {
          from: web3.eth.accounts[0]
      },
      function (err, result) {
          return callback(err, result);
        }
    );
  },
  getPlayerAirdropGameData ( callback ) {
    AirdropGame.miniGameContract_with_provider.players.call(
      web3.eth.accounts[0],
      {
          from: web3.eth.accounts[0]
      },
      function (err, result) {
          return callback(err, result);
        }
    );
  },
  getShareCrystalByMiniGameId ( { miniGameId }, callback ) {
    AirdropGame.miniGameContract_with_provider.calculateShareCrystal.call(
      miniGameId,
      {
          from: web3.eth.accounts[0]
      },
      function (err, result) {
          return callback(err, result);
        }
    );
  },
  joinAirdropGame ( callback ) {
    AirdropGame.miniGameContract.joinMiniGame.sendTransaction(
      {
        from: web3.eth.accounts[0],
        gas: web3.toHex(400000),
        gasPrice: game.default_gas_price
      },
      function (err, result) {
        if (!err) {
          callback()
        }
      }
    );
  },
  toETH: number => {
    return web3.fromWei(number, 'ether')
  },
  toWei: number => {
    return web3.toWei(number, 'ether')
  }
}