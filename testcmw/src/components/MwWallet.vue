<template>
    <b-modal ref="wallet" id="modallg" size="lg">
      <!-- <b-row>&nbsp;</b-row> background-color: #c68632-->
        <div slot="modal-header" style="width:100%;">
          <b-row align-h="between">
            <b-col cols='9' >
              <h2 class="title">Your Wallet</h2>
            </b-col>   
            <b-col cols='3'>
               <button type="button" aria-label="Close" class="close" @click="hiddenModal()">×</button>
            </b-col> 
          </b-row>
         
        </div>
        <p>Game League Reward: {{ formatBalence(gameLeagueReward) }} ETH</p> 
        <p>Boss WannaCry Reward: {{ formatBalence(bossWannaCryReward) }} ETH</p> 
        <p>Deposit Reward: {{ formatBalence(depositReward) }} ETH</p> 
        <p>Total: {{ formatBalence(balance) }} ETH</span>
        <b-button @click="withdrawReward()" class="btn-mini-game" :disabled="balance == 0">Withdraw</b-button>
        <div slot="modal-footer" style="display: none;">
        </div>
    </b-modal>
</template>
<script>

// import MwHistory from './wars/MwHistory';
// import MwHistory from './wars/MwHistory';
// import MwHistory from './wars/MwHi
import { EthMagic } from '../js/eth-magic'
import Wallet  from '../js/wallet'
import BossWannaCry  from '../js/boss-wannacry'
import CrystalsDeposit  from '../js/crystals-deposit'
import MYWeb3  from '../js/web-3'

export default {
  data() {
    return {
      "balance": 0,
      "gameLeagueReward": 0,
      "bossWannaCryReward": 0,
      "depositReward": 0
    }
  },
  mounted () {
  
  },
  methods: {
    loadData() {
      // this.$refs['engineer-booster'].getBoosterData();
      // this.$refs['booster'].getBoosterData(); 
      this.loadGameLeagueReward();
      this.loadBossWannaCryReward();
      this.loadDepositReward();
      this.balance = game.balance;
      // this.loadGameLeagueReward();
    },
    loadGameLeagueReward() {
      let self = this;
        EthMagic.getCurrentReward((err, reward) => {
          if (err) return false;
          self.gameLeagueReward = reward;
        });
    },
    loadBossWannaCryReward() {
      let self = this;
        BossWannaCry.getCurrentReward((err, reward) => {
          if (err) return false;
          self.bossWannaCryReward = reward;
        });
    },
    loadDepositReward() {
      let self = this;
        CrystalsDeposit.getCurrentReward((err, reward) => {
          if (err) return false;
          self.depositReward = reward;
        });
    },
    hiddenModal() { this.$refs['wallet'].hide(); },
    showModal() {  
      let self = this;
      self.$refs['wallet'].show();
      setInterval(() => {
        self.loadData();
      }, 1000 * 5);
    },
    withdrawReward() {
      Wallet.withdrawReward();
    },
    formatBalence (balance) {
      return parseFloat(parseFloat(balance).toFixed(5));
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-mini-game{
    border-radius: 0;
    font-size: 16px;
    font-weight: 700;
    color:#fff;
    border: 1px solid #d69848;
    border: 1px solid #7c4a13;
    background-color: #c68632;
}
.btn-mini-game:hover{
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
}
.btn-mini-game:disabled {
  border: 1px solid #b4b4b4 !important;
  background-color: #dfdfdf !important;
}
</style>
