<template>
  <div id="app" style="overflow: hidden;">
    <mw-nav @changeLang="changeLang"></mw-nav>
    <div>
      <b-alert hide dismissible>
        <p class="my_alert"></p>
      </b-alert>
    </div>

    <mw-rank ref='rank'></mw-rank>
    <mw-boss-wanna-cry ref='wanna-cry' id="wanna-cry"></mw-boss-wanna-cry>
    <mw-deposit ref='deposit' id="deposit"></mw-deposit>
    <mw-miners ref='miners' id="miner"></mw-miners>
    <mw-engineer ref='engineer' id="engineer"></mw-engineer>
    <mw-factory ref='factory' id="factory"></mw-factory>
    <mw-game-sponsor ref='game-sponsor'></mw-game-sponsor>
    <mw-quest ref='p-quest'></mw-quest>
   
    <div class="quest">
      <b-container>
        <b-row align-h="between">
            <b-col cols="6">
              <div class="game-instruction">
                <h3>{{$t('message.Instructions')}}</h3>
                <p>{{$t('message.Instructions1')}}</p>
                <p>{{$t('message.Instructions2')}}</p>
                <p>{{$t('message.Instructions3')}}</p>
				<p>Enhance brain-speed: Buy more Engineers</p>
                <p>
					Get more earnings:
					<br/>1. Become a Game Sponsor.
					<br/>2. Join the top players list.
					<br/>3. Kill the Boss WannaCry.
				</p>
                <p>
          Get more crystals: 
          <br/>1. Buy overclocking to increase crystal production.
          <br/>2. Do Beginner Quests to get your first hashrate.
          <br/>3. Join Crystal Airdrop to get free Crystals.
		  <br/>4. Try to attack WannaCry Boss to get bonus Crystals.
        </p>
                <h3>{{$t('message.Overclocking')}}</h3>
                <p>{{$t('message.Overclocking1')}}</p>
                <p>{{$t('message.Overclocking2')}}</p>
                <p>{{$t('message.Overclocking3')}}</p>
                <p>{{$t('message.Overclocking4')}}</p>
              </div>
            </b-col>
          <b-col cols="6">
            <div class="game-instruction">
        <h3>Crystal Airdrop</h3>
        <p>
        This is a lottery game in which the last person to JOIN at the end of a Airdrop wins the pot.
        <br>During a Airdrop, people can JOIN 1 or more which adds time to the timer and marks them as the current Winner.
        <br>Time is added per-join. 1 join = 15 seconds.
        <br>Airdrop's winner will take 50% of the pot. The remaining 50% is distributed to all players who Join the Airdrop.
        <br>Airdrop pot will be x1.68 each round.
        </p>
			  <h3>Game Sponsor</h3>
              <p>The game sponsor can get 5% of each Redbull and Hire Engineer transactions as the service fee.</p>
			  <p>When your sponsorship is purchased by other players, the system will refund you 110% sponsorship.</p>
			  <p>For each additional sponsor transaction, the sponsorship fee will increase 50% automatically.</p>
              <h3>{{$t('message.Prize')}}</h3>
              <p>{{$t('message.Prize1')}}</p>
              <p>{{$t('message.Prize2')}}</p>
			  <h3>Redbull</h3>
                <p>Each redbull right can only be used by one player at a time. Players can buy redbull right from other players.</p>
                <p>85% of each transaction will enter to the Boss Prize Pool, 5% enter Top Player Prize Pool, 5% belongs to the Admin, 5% belongs to the Game Sponsor.</p>
                <p>Redbull only calculates the highest rate bonus. It cannot be superimposed.</p>
        <h3>{{$t('message.MetaMask')}}</h3>
                <p>{{$t('message.MetaMask1')}}</p>
                <!--<h3>{{$t('message.Transaction')}}</h3>
                <p>{{$t('message.Transaction1')}}</p>
                <p>{{$t('message.Transaction2')}}</p>
                <p>{{$t('message.Transaction3')}}</p>-->
                <p class="red">{{$t('message.Transaction4')}}</p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <mw-footer ref='footer'></mw-footer>
    <mw-box ref='box'></mw-box>
     <b-modal ref="load-engineer-data-old-version" size="lg">
      <!-- <b-row>&nbsp;</b-row> -->
        <div slot="modal-header" style="width:100%;">
          <b-row align-h="between">
            <b-col cols='9' >
              <h2 class="title">Load Miner</h2>
            </b-col>
            <b-col cols='3'>
               <button type="button" aria-label="Close" class="close" @click="hiddenLoadEngineerOldDataModal()">×</button>
            </b-col>
          </b-row>
        </div>
        
        <p>Do you want to load Your Engineers, Virus, Redbull, Overclock, Defence ?Warning: progress in the current game will be lost. </p>
        <button class="btn btn-success float-right" @click="loadEngineerPlayerOldData()">Load</button>    
        <div slot="modal-footer" style="display: none;">
        </div>
    </b-modal>

    <b-modal id="metamask_alert" ref="metamask_alert" size="lg" title="Metamask Alert!" ok-only :ok-title="$t('message.close')">
      <div class="d-block text-center">
        <p>{{$t('message.matemask_alert')}}</p>
      </div>
    </b-modal>
	<b-modal id="metamask_alert2" ref="metamask_alert2" size="lg" title="Maintenance" @ok="handleOkMetamaskAlert" ok-only:ok-title="Ok">
      <div class="d-block text-center">
        <!-- <p>From November 2nd, 2018, Metamask is required an approve to access user accounts. Please approve the Ethereum API Request of CryptoMiningWar in order to play the Game.</p> -->
        <p>The Game is updating to version 3.0. Please come back later or join our Discord group for more information.</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
const Config = require("../../config/config");
// components
import MwNav from './components/MwNav'
import MwFooter from './components/MwFooter'
import MwSponsor from './components/MwSponsor'
import MwGameSponsor from './components/MwGameSponsor'
import MwRank from './components/MwRank'
import MwMiners from './components/MwMiners'
import MwEngineer from './components/MwEngineer'
import MwFactory from './components/MwFactory'
import MwBossWannaCry from './components/MwBossWannaCry'
import MwDeposit from './components/MwDeposit'
import MwBuy from './components/MwBuy'
import MwBox from './components/MwBox'
import MwQuest from './components/MwQuest'
import MwSell from './components/MwSell'
// js
import { EthMagic } from './js/eth-magic'
import { AirdropGame } from './js/airdrop-game'
import EngineerGame  from './js/engineer'
import LoadEngineerDataOldVersion  from './js/load-engineer-data'
import Wallet  from './js/wallet'
import BossWannaCry  from './js/boss-wannacry'
import CrystalsDeposit  from './js/crystals-deposit'
import BeginnerQuest  from './js/beginner-quest'
import Factory  from './js/factory'
import Arena  from './js/arena'
import MYWeb3  from './js/web-3'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    MwNav,
    MwFooter,
    MwSponsor,
    MwRank,
    MwMiners,
    MwBuy,
    MwBox,
    MwQuest,
    MwSell,
    MwEngineer,
    MwFactory,
    MwBossWannaCry,
    MwDeposit,
    MwGameSponsor
  },
  data () {
    return {
      referral: '',
      referral_link: '',
    }
  },
  computed: {},
  mounted () {
    setTimeout(() => {
      this.init()
    }, 1000)
  },
  methods: {
    country () {
      if (localStorage.expire < new Date().getTime()) {
        
      }
    },
	handleOkMetamaskAlert (evt) {
      this.init();
    },
    init () {
		let self = this;
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			// Request account access if needed
			ethereum.enable().then(function() {
				if (typeof web3 !== 'undefined') {
					self.setupMiningWar();
					self.setupAirdropGame();
					self.setupEngineerGame();
					self.setupBossWannaCry();
          self.setupCrystalsDeposit();
          self.setupBeginnerQuest();
          self.setupFactoryGame();
					self.setupArenaGame();
          self.setupWallet();
          self.setupLoadEngineerDataOldVersion();
				} else {
				  self.$refs.metamask_alert.show()
				}
			}).catch(function(error) {
				self.$refs.metamask_alert2.show()
			});
			
		}
		// Legacy dapp browsers...
		else if (window.web3) {
			window.web3 = new Web3(web3.currentProvider);
			if (typeof web3 !== 'undefined') {
				self.setupMiningWar();
				self.setupAirdropGame();
				self.setupEngineerGame();
				self.setupBossWannaCry();
				self.setupCrystalsDeposit();
        self.setupBeginnerQuest();
        self.setupFactoryGame();
        self.setupArenaGame();
        self.setupWallet();
        self.setupLoadEngineerDataOldVersion();
			} else {
			  self.$refs.metamask_alert.show()
			}
		}
    },
    /** ---------------------------------------------------------------------------------------------------------
    * Setup
    *  ----------------------------------------------------------------------------------------------------------
    */
    setupWallet() {
      let self = this;
      Wallet.startWallet(function (is_init) {
          if (!is_init) {
            // self.$refs.metamask_alert.show();
          } else {
            self.loadWalletData(); 
            setInterval(() => {
              self.loadWalletData();
            }, 5000);
          }
        });
    },
    setupMiningWar() {
      let self = this;
      EthMagic.startApp(function (is_init) {
          if (!is_init) {
            self.$refs.metamask_alert.show();
          } else {


            // self.loadMiningWarData(); 
            // setInterval(() => {
            //   self.loadMiningWarData();
            // }, 5000);

            self.scheduleUpdateData1();
            self.scheduleUpdateData2();
            self.getData1();
            self.getData2();
            self.country();
            self.$refs.miners.getInitialized();
          }
        });

        this.referral = this.getQueryVariable('ref');
        if (!this.referral || this.referral == game.user.address) {
          this.referral = 0;
        }
        game.referral = this.referral;
    },
    setupAirdropGame() {
      let self = this;
      AirdropGame.startAirdropGame(function (is_init) {
          if (!is_init) {
            // self.$refs.metamask_alert.show();
          } else {
            self.loadAirdropGameData(); 
            setInterval(() => {
              self.loadAirdropGameData();
            }, 5000);
          }
        });
    },
    setupLoadEngineerDataOldVersion() {
      let self = this;
      LoadEngineerDataOldVersion.startLoadEngineerDataOldVersion(function (is_init) {
          if (!is_init) {
            // self.$refs.metamask_alert.show();
          } else {
            self.loadEngineeOldData(); 
          }
        });
    },
    setupEngineerGame() {
      let self = this;
      EngineerGame.startEngineerGame(function (is_init) {
          if (!is_init) {
            // self.$refs.metamask_alert.show();
          } else {
            self.loadEngineerGameData(); 
            setInterval(() => {
              self.loadEngineerGameData();
            }, 5000);
          }
        });
    },
    setupBossWannaCry() {
      let self = this;
      BossWannaCry.startBossWannaCry(function (is_init) {
          if (!is_init) {
            // self.$refs.metamask_alert.show();
          } else {
            self.loadBossWannaCryData(); 
            setInterval(() => {
              self.loadBossWannaCryData();
            }, 5000);
          }
        });
    },
    setupCrystalsDeposit() {
      let self = this;
      CrystalsDeposit.startCrystalsDeposit(function (is_init) {
          if (!is_init) {
            // self.$refs.metamask_alert.show();
          } else {
            self.loadCrystalsDepositData(); 
            setInterval(() => {
              self.loadCrystalsDepositData();
            }, 5000);
          }
        });
    },
    setupBeginnerQuest() {
      let self = this;
      BeginnerQuest.startBeginnerQuest(function (is_init) {
          if (!is_init) {
            // self.$refs.metamask_alert.show();
          } else {
            self.loadBeginnerQuestData(); 
            setInterval(() => {
              self.loadBeginnerQuestData();
            }, 5000);
          }
        });
    },
    setupFactoryGame() {
      let self = this;
      Factory.startFactoryGame(function (is_init) {
          if (!is_init) {
            // self.$refs.metamask_alert.show();
          } else {
            self.loadfactoryData(); 
            setInterval(() => {
              self.loadfactoryData();
            }, 5000);
          }
        });
    },
    setupArenaGame() {
      let self = this;
      Arena.startArenaGame(function (is_init) {
          if (!is_init) {
            // self.$refs.metamask_alert.show();
          } else {
            self.loadArenaData(); 
            setInterval(() => {
              self.loadArenaData();
            }, 5000);
          }
        });
    },
    /** ---------------------------------------------------------------------------------------------------------
    * Wallet Information
    *  ----------------------------------------------------------------------------------------------------------
    */
    loadWalletData() {
      let self = this;
      Wallet.getCurrentReward({ address: MYWeb3.getAccount() }, function(err, balance) {
        
        console.log(err);
        console.log(balance);
        if (err) return false;


        game.balance = balance;
      });  
    },
    /** ---------------------------------------------------------------------------------------------------------
    * Airdrop Game Information
    *  ----------------------------------------------------------------------------------------------------------
    */
    loadAirdropGameData() {
      let self = this;
      AirdropGame.getData(function(err, data) {
        if (err) return false;
        game.airdropData = data;
      });  
    },
    /** ---------------------------------------------------------------------------------------------------------
    * Load Engineer Old Data
    *  ----------------------------------------------------------------------------------------------------------
    */
    hiddenLoadEngineerOldDataModal() { 
      this.$refs['load-engineer-data-old-version'].hide(); 
    },
    loadEngineeOldData() {
      let self = this;
      LoadEngineerDataOldVersion.checkPlayerLoadOldData(function(err, isLoaded) {
        if (err) return false;
        if (isLoaded == false) self.$refs['load-engineer-data-old-version'].show();
      });
    },
    loadEngineerPlayerOldData() {
      LoadEngineerDataOldVersion.loadOldData();
      this.hiddenLoadEngineerOldDataModal();
    },
    /** ---------------------------------------------------------------------------------------------------------
    * Engineer Information
    *  ----------------------------------------------------------------------------------------------------------
    */
    loadEngineerGameData() {
      this.loadEngineerPrizePool();
      let playerAddess = web3.eth.accounts[0];
      let self = this;
      this.loadGameSponsorInfo();
       EngineerGame.getPlayerData({ playerAddess },function ( err, _playerData ) {
          if ( err ) return false;
          EngineerGame.hasBooster({ playerAddess },function ( err, _boosterId ) {
            if ( err ) return false;
            game.engineerPlayer = _playerData;
            game.engineerPlayer.hasBooster = _boosterId;
          });
      });
    },
    loadEngineerPrizePool() {
      EngineerGame.getPrizePool(function ( err, _prizePool ) {
            if ( err ) return false;
            game.engineerPrizePool = _prizePool;
          });
    },
    loadGameSponsorInfo() {
      EngineerGame.getGameSponsor(function(err, _gameSponsor) {
        if (err) return false;
        game.gameSponsor = _gameSponsor;
      });
      EngineerGame.getGameSponsorPrice(function(err, _gameSponsorPrice) {
        if (err) return false;
        game.gameSponsorPrice = _gameSponsorPrice;
      });  
    },
    /** ---------------------------------------------------------------------------------------------------------
    * Boss WannaCry Information
    *  ----------------------------------------------------------------------------------------------------------
    */
    loadBossWannaCryData() {
      let self = this;
      BossWannaCry.getCurrentBossRoundNumber(function(err, _bosssRoundNumber) {
        if (err) return false;
        BossWannaCry.getBossData({ "bossRoundNumber": _bosssRoundNumber }, function(err, _boss) {
          if (err) return false;
          game.currentBossWannaCry = _boss;
          self.loadLastBossData();
          self.loadBossWannaCryPlayerData(_boss);
        });
      });
    },
    loadLastBossData() {
      let lastBossRoundNumber = game.currentBossWannaCry.bossRoundNumber - 1;
      if ( lastBossRoundNumber < 0 ) return false;
      BossWannaCry.getBossData({ "bossRoundNumber": lastBossRoundNumber }, function(err, _boss) {
          if (err) return false;
          game.lastBossWannaCry = _boss;
      });
    },
    loadBossWannaCryPlayerData(_boss) {
      BossWannaCry.getPlayerData({ 
        "address": MYWeb3.getAccount(),
      }, function(err, _bossWannaCryPlayer) {
        if (err) return false;
        game.bossWannaCryPlayer = _bossWannaCryPlayer;
        if (_bossWannaCryPlayer.currentBossRoundNumber == _boss.bossRoundNumber) {
          game.dameCurrentBossWannaCry = _bossWannaCryPlayer.dame;
        } else {
          game.dameCurrentBossWannaCry = 0;
        }
        // this.loadYourRewardBossWannaCry(_bossWannaCryPlayer);
      }.bind(this));
    },
    // loadYourRewardBossWannaCry(_bossWannaCryPlayer) {
    //   BossWannaCry.calculateShareETH({
    //     "address": MYWeb3.getAccount(),
    //     "bossRoundNumber": _bossWannaCryPlayer.currentBossRoundNumber
    //   },function(err, _share) {
    //     if (err) return false;
    //     let win = _bossWannaCryPlayer.win;
    //     let share = _bossWannaCryPlayer.share;
    //     let yourRewardBossWannaCry;
    //     if (_bossWannaCryPlayer.currentBossRoundNumber == _bossWannaCryPlayer.lastBossRoundNumber) {
    //       yourRewardBossWannaCry = win + share ; 
    //     } else {
    //       yourRewardBossWannaCry = win + share + _share; 
    //     }
    //     game.yourRewardBossWannaCry = MYWeb3.toETH(yourRewardBossWannaCry);
    //   }.bind(this));
    // },
    /** ---------------------------------------------------------------------------------------------------------
    * Crystals Deposit Information
    *  ----------------------------------------------------------------------------------------------------------
    */
    loadCrystalsDepositData() {
        CrystalsDeposit.getData((err, _depositData) => game.depositData = _depositData);
    },
     /** ---------------------------------------------------------------------------------------------------------
    * Beginner Quest Information
    *  ----------------------------------------------------------------------------------------------------------
    */
    loadBeginnerQuestData() {
        BeginnerQuest.getData((err, _beginnerQuestData) => game.beginnerQuestData = _beginnerQuestData);
    },
     /** ---------------------------------------------------------------------------------------------------------
    * Programs Factory Information
    *  ----------------------------------------------------------------------------------------------------------
    */
    loadfactoryData() {
        Factory.getData((err, _factoryData) => {
          if (err) return false;
          if (_factoryData.factoryTotal == 0) return false;
          game.factoryData = _factoryData;
        });
    },
     /** ---------------------------------------------------------------------------------------------------------
    * Arena Information
    *  ----------------------------------------------------------------------------------------------------------
    */
    loadArenaData() {
        Arena.getData({ address:  MYWeb3.getAccount() }, (err, _arenaData) => {
          if (err) return false;
          if (_arenaData.currentCrystals == 0) return false;
          game.arenaData = _arenaData;
        });
    },
    /** ---------------------------------------------------------------------------------------------------------
    * Mining War Information
    *  ----------------------------------------------------------------------------------------------------------
    */
    loadMiningWarData() {
       EthMagic.getData({ address:  MYWeb3.getAccount() }, (err, _data) => {
          if (err) return false;
          game.miningWarData = _data;
        });
    },
    scheduleUpdateData1 () {
      let self = this
      setInterval(() => {
        self.getData1();
      }, 5000)
    },
    scheduleUpdateData2 () {
      let self = this
      setInterval(() => {
        this.getData2()
      }, 15000)
    },
    getData1 () {
      // this.$refs.sponsor.getSponsor()
      // this.$refs.sponsor.getSponsorFee()
      this.$refs.rank.getContractBalance()
      this.$refs.rank.getBoosterData()
      this.$refs.miners.getPlayerMainGameData()
      // this.$refs.booster.getBoosterData()
      // this.$refs.buy.getOrderData()
      // this.$refs.sell.getOrderData()

      this.referral_link = window.location.origin + '?ref=' + game.user.address
    },
    getData2 () {
      this.$refs.rank.getRankList()
    },
    getQueryVariable (variable) {
      var query = window.location.search.substring(1)
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable) {
          return pair[1]
        }
      }
      return false
    },
    changeLang (lang) {
      this.$refs.rank.setFileds()
    },
  },
}
</script>

<style lang="scss">
#app > .container {
    padding-bottom: 20px;
    margin-top: 20px;
    border-bottom: 1px solid #ddd;
    width: 1024px;
    h2 {
        margin-bottom: 30px;
    }
    background: white;
}
body {
    background: #fff;
}
.btn-success {
    border: 2px solid #7c4a13 !important;
    background-color: #c68632 !important;
    color: #fff !important;
    border-radius: 0;
}
.red {
    color: red;
}
.my_alert {
    margin-bottom: 0;
}
.quest {
  margin-top: 49px;
  padding:30px;
}
.quest .row {
  margin-left: -30px; 
}
.quest .game-instruction h3 {
  font-size: 24px;
  font-weight: 700;
}
.quest .game-instruction p {
  font-size: 14px;
  font-weight: 400;
}
@media (max-width:420px) {
  .quest {
    padding: 30px;
  }
}
@media (max-width:812px) {
  .container {
    max-width: 670px;
  }
}
</style>