<template>
  <div class="box">
    <!-- <b-container> -->
      <!-- <b-row>&nbsp;</b-row> -->
       
      <div class="outline-boxs">
       
        <b-row>
           <div class="boxs-header clearfix">
              <div class="withdraw-reward">
                <b-button @click="showWallet()" class="button-wallet"><span class="img-wallet"></span>Wallet</b-button>
              </div>
             <!--  <b-button @click="showWallet()" class="button-wallet"></span>Wallet</b-button> -->
              <div class="inbox-button">
                <span v-if="totalInbox > 0" class="number-misson">{{ totalInbox }}</span>
                <b-button @click="showInbox()" class="button-inbox-box" :class="{ active: (status == 'system')}"><span class="img-inbox"></span>Inbox</b-button>
              </div>
          </div>
          <div class="boxs-header-left clearfix">
            <div class="attack-button">
                <span v-if="canAirdrop()" class="number-airdrop">1</span>
                <b-button class="button-shop-box" @click="showAidropGame()"><span class="img-airdrop"></span>Airdrop</b-button>
            </div>
            <div class="shop-button">
                <b-button class="button-shop-box" @click="showShop()"><span class="img-shop"></span>Shop</b-button>
            </div>
            <div class="attack-button">
                <b-button class="button-shop-box" @click="showArena()"><span class="img-attack"></span>Attack</b-button>
            </div>
          </div>
          <b-col sm="5" class="sytem-chat">
            <div class="boxs-body">
              <mw-system v-if="status == 'system'" ref='system'></mw-system>
            </div>
          </b-col>
          <b-col sm="7" class="box-info">
            <b-row>
              <b-col cols='3' style="padding-left: 5px;padding-right: 5px">
                <div class="section">
                     <span class="icon-crystal"></span>
                     <span class="text">Your Crystals</span><br>
                     <span class="eth" >{{ formateToken( currentCrystals ) }} </span>
                </div>
              </b-col>
              <b-col cols='3' style="padding-left: 5px;padding-right: 5px">
                  <div class="section">
                    <div class=" booster-info col-booster d-flex align-items-center">
                      <span class="img-total-virus"></span>
                       <div class="info-total-redbull " style="width: 90px;">
                          <span class="text">Your Virus</span>
                          <div class="total-virus-count">{{$t('message.cur2').replace('{$}', formateToken(currentVirus))}}</div>
                      </div>
                    </div>
                  </div>
              </b-col>
              <b-col cols='3' style="padding-left: 5px;padding-right: 5px">
                <div class="section">
                  <div class=" booster-info col-booster d-flex align-items-center">
                      <!-- <img :src="createImageSrc(yourBoost.index)" style="width:50%;margin:35px auto 50px;" /> -->
                      <!-- <h4 >{{yourBoost.price}} ETH</h4> -->
                      <span class="img-total-redbull"></span>
                      <div class="info-total-redbull " style="width: 90px;">
                        <span class="text"> Redbull</span>
                        <div class="total-redbull-count">{{ increase_hashrate(yourEngineerBoost.boostRate) }} %</div>
                      </div>
                  </div>
                </div>
              </b-col>
              <b-col cols='3' style="padding-left: 5px;padding-right: 5px">
                <div class="section">
                  <div class=" booster-info col-booster d-flex align-items-center">
                      <!-- <img :src="createImageSrc(yourEngineerBoost.index)" style="width:50%;margin:35px auto 50px;" /> -->
  <!--                     <h4 >{{yourEngineerBoost.price}} ETH</h4>
   -->
                    <span class="img-total-enigeer"></span>
                    <div class="info-total-redbull " style="width: 70px;">
                      <span class="text"> Overclock</span></br> 
                      <div class="total-redbull-count">{{ increase_hashrate(yourBoost.boostRate) }} %</div>
                    </div>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
      </b-row>
    <!-- <b-row>&nbsp;</b-row> -->
    <!-- </b-container> -->
    <mw-inbox ref='inbox'></mw-inbox>
    <mw-arena ref='arena'></mw-arena>
    <mw-shop ref='shop'></mw-shop>
    <mw-wallet ref='my-wallet'></mw-wallet>
    <mw-airdrop-game ref='airdrop-game'></mw-airdrop-game>
  </div>
</template>
<script>

const Config = require("../../../config/config");
import axios from 'axios';

import MwSystem from './boxs/MwSystem';
import MwInbox from './MwInbox';
import MwArena from './MwArena';
import MwShop from './MwShop';
import MwAirdropGame from './MwAirdropGame';
import MwWallet from './MwWallet';
import Wallet from '../js/wallet';
import MYWeb3 from '../js/web-3';

export default {
  components: {
    MwSystem,
    MwArena,
    MwShop,
    MwAirdropGame,
    MwWallet,
    MwInbox
  }, 
  data() {
    return {
      "status": 'system',
      "balance": 0,
      "yourBoost": {
        "owner": MYWeb3.getAccount(), 
        "boostRate": 100, 
        "price": 0,
        "index": 0,
      },
      "yourEngineerBoost": {
        "owner": MYWeb3.getAccount(), 
        "boostRate": 100, 
        "price": 0,
        "index": 0
      },
      "currentCrystals": 0,
      "currentVirus": 0,
      "countDefence": 0,
      "countAtk": 0,
      "countInbox": 0,
      "totalInbox": 0,
    }
  },
  mounted () {
    this.loadData();
  },
  methods: {
    createImageSrc (index) {
      return "./dist/overclock-"+index+".png";
    },
    loadData() {
      let self = this;
      setInterval(() => {
        self.currentCrystals   = game.currentCrystals;
        self.currentVirus      = game.currentVirus;
        self.balance           = game.balance;
        self.loadYourBoost();
        self.loadYourEngineerBoost();
        self.loadNotification();
      }, 1000);
    },
    canAirdrop() {
      // console.log(this.$refs['airdrop-game'].hasNextTimeAirdropJoin());\
      let nextTimeAirdropJoin = parseFloat( game.airdropData.nextTimeAirdropJoin );
      let now = ( new Date() ).getTime() / 1000;
      if ( now < nextTimeAirdropJoin ) return false;
      return true;
    },
    loadNotification() {
      let self = this;
      let opts = {
          method: 'get',
          params: { address: MYWeb3.getAccount() },
          url: Config.ETHERMINEWAR_BACKEND + '/api/notification'
      };
      if (!opts.params.address) return false;
      axios( opts )
        .then(response)
        .catch(err => { console.log('[ERROR_REQUEST]: ', err); });
      function response( res ) {
          if ( res.data.code == "SUCCESS" ) setData(res.data.data);
      }
      function setData(data) {
        let { countDefence, countAtk, countInbox } = data;
        self.countDefence = countDefence;
        self.countAtk     = countAtk;
        self.countInbox   = countInbox;
        self.totalInbox   = countDefence + countAtk + countInbox;
      }
    },
    loadYourBoost() {
      let { boostData } = game;
      let user = MYWeb3.getAccount();
      let yourBoost = this.yourBoost;
      for (let idx = 0; idx < boostData.length; idx++) {
        if (
          boostData[idx].owner == user &&
          boostData[idx].boostRate > yourBoost.boostRate
          ) {
          yourBoost = boostData[idx];
        }
      }
      this.yourBoost = yourBoost;
    },
    loadYourEngineerBoost() {
      let boostData = game.EngineerboostData;
      let user = MYWeb3.getAccount();
      let yourBoost = this.yourEngineerBoost;
      for (let idx = 0; idx < boostData.length; idx++) {
        if (
          boostData[idx].owner == user &&
          boostData[idx].boostRate > yourBoost.boostRate
          ) {
          yourBoost = boostData[idx];
        }
      }
      this.yourEngineerBoost = yourBoost;
    },
    showInbox() {
      this.$refs.inbox.showModal(this.countDefence, this.countAtk, this.countInbox);
      this.$refs.inbox.updateNotification();
    },
    showShop() {
      this.$refs.shop.loadData();
      this.$refs.shop.showModal();
    },
    showArena() {
      this.$refs.arena.loadData();
      this.$refs.arena.showModal();
    },
    showWallet() {
      this.$refs['my-wallet'].loadData();
      this.$refs['my-wallet'].showModal();
    },
    showAidropGame() {
      // this.$refs['airdrop-game'].loadData();
      this.$refs['airdrop-game'].showModal();
    },
    hideInbox() {
      this.$refs.inbox.hiddenModal();
    },
    changeStatus( _status ) {
      this.status = _status;
    },
    formatBalence () {
      return parseFloat(parseFloat(this.balance).toFixed(5));
    },
    formateToken (labelValue) {
      return Math.abs(Number(labelValue)) >= 1.0e+12
        ? Math.round(Math.abs(Number(labelValue) / 1.0e+12) * 10000) / 10000 + " T"
        : Math.abs(Number(labelValue)) >= 1.0e+9
          ? Math.round(Math.abs(Number(labelValue) / 1.0e+9) * 10000) / 10000 + " G"
          : Math.abs(Number(labelValue)) >= 1.0e+6
            ? Math.round(Math.abs(Number(labelValue) / 1.0e+6) * 10000) / 10000 + " M"
            : Math.abs(Number(labelValue)) >= 1.0e+3
              ? Math.round(Math.abs(Number(labelValue) / 1.0e+3) * 10000) / 10000 + " k"
              : String(Math.abs(Number(labelValue)));
    },
    increase_hashrate (data) {
      return data - 100;
    }
  }
}
</script>


<style lang="scss" scoped>
@import './src/assets/sprite.scss';
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

  .box {
    background: #f6f6f6;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .outline-boxs .section {
    padding: 9px 17px;
    background: #fff;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);
    height: 78px;
    text-align: left;
  }
  .sytem-chat {
      padding: 9px 15px;
      border-right: 1px solid #e7e7e7;
  }
  .boxs-header span.number-misson {
    width: 24px;
    height: 24px;
    background: red;
    color: #fff;
    position: absolute;
    top: -12px;
    left: -12px;
    text-align: center;
    border-radius: 50%;
    font-size: 13px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
    border: 2px solid #ffffff;
  }
  .boxs-header .withdraw-reward-button {
    float: left;
  }
  .boxs-header .inbox-button {
    position: relative;
  }
  .img-airdrop {
    @include sprite($icon-airdrop);
    display: inline-block;
    margin: 0 auto;
  }
  .img-wallet {
    @include sprite($icon-wallet);
    display: inline-block;
    float: left;
    margin-top: 3px;
    /*margin-right: 17px;*/
  }
  .img-inbox {
    @include sprite($icon-inbox);
    display: inline-block;
    float: left;
    margin-top: 3px;
    /*margin-right: 17px;*/
  }
  .img-shop {
    @include sprite($icon-shop);
    display: inline-block;
    margin: 0 auto;
  }
  .img-attack {
    @include sprite($icon-attack-box);
    display: inline-block;
     margin: 0 auto;
  }
  .img-total-enigeer {
    @include sprite($icon-enigeer);
    display: inline-block;
    float: left;
    margin-top: 10px;
    margin-right: 17px;
  }
  .icon-crystal {
    @include sprite($icon-crystal);
    display: inline-block;
    float: left;
        margin-top: 10px;
      margin-right: 17px;
  }
  .img-total-redbull {
    @include sprite($icon-redbull);
    display: inline-block;
    float: left;
        margin-top: 10px;
      margin-right: 17px;
  }
  .total-virus-count, {
    font-size:16px;
  }
  .title-virus {
    font-size:11px;
  }
  .section span.eth {
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color :#000;
  }
  .section span.text {
    font-size: 11px;
    font-weight: 400;
  }
  .section .title-virus {
    margin-bottom: 10px;
  }
  .section .total-redbull-count {
    color: #333333;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }
  .img-total-virus {
    margin-right: 10px;
  }
  .boxs-body {
    overflow: scroll;
    height: 80px;
    overflow-x: hidden;
  }
  .boxs-header {
    position: fixed;
    right: 0;
    bottom: 118px;
  }
  .boxs-header-left {
    position: fixed;
    left: 5px;
    bottom: 118px;
  }
  .boxs-header-left button.button-shop-box {
    border-radius: 4px;
    display: grid;
    color: #fff;
    width: 101px;
    padding: 9px 24px;
    border: 2px solid rgba(0, 0, 0, 0.08);
    background-image: linear-gradient(180deg, #b3812b 0%, #7c4a13 100%);
    margin-top: 10px;
    font-size: 13px;
    font-weight: 700;
  }
  .boxs-header button.button-wallet {
    background: #0d8055!important;
    border-radius: 4px;
    color: #fff;
    border-color: #23c78a!important;
    width: 101px;
    margin-bottom: 8px;
  }
  .boxs-header button.button-inbox-box {
    border-radius: 4px;
    background: #23c78a!important;
    color: #fff;
    border-color: #23c78a!important;
    width: 101px;
  }
  
  .box-info {
    padding: 20px 15px
  }
  span.number-airdrop {
    width: 24px;
    height: 24px;
    background: red;
    color: #fff;
    position: absolute;
    top: -2px;
    right: -12px;
    text-align: center;
    border-radius: 50%;
    font-size: 13px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
    border: 2px solid #ffffff;
  }
  @media (max-width: 560px) {
    .sytem-chat {
      display: none!important;
    }
  }
  @media (max-width: 1024px) {
    .box {
      /*display: none;*/
    }
    .boxs-header {
      bottom: 95px!important;
    }
    .sytem-chat {
      display: block;
      padding:0 15px!important;
    }
    .img-total-enigeer, .icon-crystal, .img-total-redbull, .img-total-virus {
      display: none;
    }
    .outline-boxs .section {
      padding: 9px 11px!important;
      text-align: center!important;
    }
    .section span.text {
      font-size: 9px;
    }
    .section span.eth, .total-virus-count, .total-redbull-count {
      font-size: 13px!important;
    }
    .box-info {
      padding: 9px 30px!important;
    }
  }
</style>
