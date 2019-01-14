<template>
  <div class="player">
    <b-container>
      <!-- <b-row>&nbsp;</b-row> -->
      <b-row class="deposit-top">
        <b-col sm='7' style="padding:0">
          <h2 class="title">Crystal Deposit</h2>
        </b-col>
       <!--  <b-col sm="3" style="margin-top: 10px;">
        </b-col> -->
        <!-- <b-col lg="4" sm="3" cols="9" style="padding-right: 0;">
          <div class="crystal-bonus">Your Reward: {{ formatBalence(depositData.reward) }} ETH</div>
        </b-col>
        <b-col lg="1" sm="2" cols="3" style="padding-right: 0">
          <div class="button">
              <b-btn variant="primary" @click="withdrawReward()" class="btn-mini-game float-right" >Claim</b-btn>
          </div> 
        </b-col> -->   
      </b-row>
      <b-row >
      <div class="deposit-content">
          <!-- <span class="icon-eth"></span>
          <span class="text">ETH: </span>
          <span class="price-pool">{{ prizePool }}</span> -->

          <b-row>
            <b-col sm="6">
              <div class="des-depsoit">Crystal Deposit Pot ETH</div>
              <div class="eth-depsit d-flex align-items-center mb-1"><span class="icon-prize-small mr-2"></span>{{ formatBalence(depositData.prizePool) }} ETH</div>
              <div v-if="!isHalfTime()" class="time mb-1">
                <span v-if="hasDepositStart()">
                  <!-- {{cd_mini_game_start}} -->
                  <!-- <span class="time-coudown">{{cd_airdrop_game_start.day}}</span> : -->
                  <span class="time-coudown">{{cd_start.day}}</span> :
                  <span class="time-coudown">{{cd_start.hour}}</span> :
                  <span class="time-coudown">{{cd_start.min}}</span> :
                  <span class="time-coudown">{{cd_start.sec}}</span>
                </span>



                <span v-if="!hasDepositStart()">
                  <!-- {{cd_mini_game_start}} -->
                  <!-- <span class="time-coudown">{{cd_airdrop_game_start.day}}</span> : -->
                  <span class="time-coudown">{{cd_end.day}}</span> :
                  <span class="time-coudown">{{cd_end.hour}}</span> :
                  <span class="time-coudown">{{cd_end.min}}</span> :
                  <span class="time-coudown">{{cd_end.sec}}</span>
                </span>
                left
              </div>
              <div class="des-depsoit">ETH Split Between: {{ formateToken(depositData.crystals) }} Crystals</div>
              <div class="des-depsoit">Your Crystals: {{ formateToken(depositData.share) }}</div>
             <div>
                <div class="d-flex mt-1">
                    <b-form-input v-model="crystalsAmount" placeholder="Number of Crystals" class="input-sell" type="number" :class="{error: ( isLackCrystals() || parseFloat(crystalsAmount) < minShare)}"></b-form-input>
                    <b-btn class="btn-sell-deposit" @click="share()">Deposit</b-btn>
                </div>
              </div>
            </b-col>
            <b-col sm="6">
              <span class="img-deposit"></span>
            </b-col>
          </b-row>
      </div>
      </b-row>
    <b-row>&nbsp;</b-row>
    </b-container>
  </div>
</template>
<script>

import CrystalsDeposit from '../js/crystals-deposit';

export default { 
  data() {
    return {
      "minShare": game.minShare,
      "crystalsAmount": "",
      "depositData": game.depositData,
      "currentCrystals": 0,
      "cd_end": {
        "day": '00',
        "hour": '00',
        "min": '00',
        "sec": '00'
      },
      "cd_start": {
        "day": '00',
        "hour": '00',
        "min": '00',
        "sec": '00'
      }
    }
  },
  mounted () {
    this.loadData();
    this.countDownStart();
    this.countDownEnd();
  },
  methods: {
    loadData() {
      let self = this;
      setInterval(() => {
        self.depositData     = game.depositData;
        self.currentCrystals = game.currentCrystals;

      }, 1000);
    },
    getTimeCountDown( time ) {
      return {
        "day": this.dealNum(time / (24 * 60 * 60)),
        "hour": this.dealNum((time % (24 * 60 * 60)) / (60 * 60)),
        "min": this.dealNum((time % (60 * 60)) / 60),
        "sec": this.dealNum(time % 60)
      };
    },
    hasDepositStart() {
      let startTime = parseFloat( game.depositData.startTime );
      let now = ( new Date() ).getTime() / 1000;
      if (startTime > now) return true;
      return false;
    },
    isHalfTime() {
      let endTime = parseFloat( game.depositData.endTime );
      let now = ( new Date() ).getTime() / 1000;
      if (endTime > now) return false;
      return true;
    },
    isLackCrystals() {
      if (parseFloat(this.crystalsAmount) > this.currentCrystals) return true;
      return false;
    }, 
    dealNum (val) {
      let str = Math.floor(val)
      return (str < 10 ? '0' : '') + str
    },
    countDownStart () {
      let self = this;
      setInterval(() => {
          let startTime = parseFloat( game.depositData.startTime );
          let now = ( new Date() ).getTime() / 1000;
          let cd = startTime - now;
          if ( cd > 0 ) {
            self.cd_start = self.getTimeCountDown( cd );
          }
      }, 1000);
    },
    countDownEnd () {
      let self = this;
      setInterval(() => {
          let endTime = parseFloat( game.depositData.endTime );
          let now = ( new Date() ).getTime() / 1000;
          let cd = endTime - now;
          if ( cd > 0 ) {
            self.cd_end = self.getTimeCountDown( cd );
          }
      }, 1000);
    },
    share() {
      CrystalsDeposit.share({ crystals: this.crystalsAmount });
      this.crystalsAmount = "";
    },
    withdrawReward() {
      CrystalsDeposit.withdrawReward();
    },
    formatBalence (_value) {
      return parseFloat(parseFloat(_value).toFixed(5));
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import './src/assets/sprite.scss';
.error { color: red; }
.deposit-content .input-sell{border-radius: 0;width: 257px;height: 48px;border: 2px solid #e9e9e9;background-color: #ffffff;border-right: 0;padding:10px;}
.eth-depsit{color: #333333;font-size: 24px;font-weight: 700;text-transform: uppercase;}
.time{color: #333333;font-size: 18px;font-weight: 500;}
.des-depsoit{color: #333333;font-size: 12px;font-weight: 400;line-height: 24px;}
.btn-sell-deposit{border: 2px solid #7c4a13 !important;background-color: #c68632 !important;color: #fff !important;border-radius: 0;;display: flex;align-items: center;justify-content: center;border: 0;outline: none;color: #ffffff;font-size: 16px;font-weight: 700;cursor: pointer;}
.icon-prize-small{@include sprite($icon-prize-small);display: inline-block;}
.deposit-content{box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21);background-color: #ffffff;padding: 30px 70px;width: 100%;}
.img-deposit{@include sprite($deposit);display: inline-block;}
.outline-engineer { box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21); }
.engineer-header{display: flex;justify-content: center;padding: 20px 0 0; border-bottom: 1px solid #e9e9e9; height: 88px;}
.engineer-header .button-engineer-header{display: inline-block;outline: none;margin: 0;}
.engineer-header .button-engineer-header:focus{box-shadow: none;outline: none;}
.engineer-header .button-engineer-header.active:focus{box-shadow: none;outline: none;}
.engineer-header .button-engineer-header.active:active{box-shadow: none;outline: none;}
.button-engineer-header:not(:disabled):not(.disabled).active:focus, .button-engineer-header:not(:disabled):not(.disabled):active:focus{box-shadow: none;outline: none;}
.engineer-header .button-engineer-header.active{width: 184px;height: 48px;border: 2px solid #e9e9e9;background-color: #ffffff;color: #333333;font-size: 18px;font-weight: 700;}
.engineer-header .button-engineer-header:hover{color: #fff;background-color: #545b62;border-color: #4e555b;}
.engineer-header .button-engineer-header.active:hover{border-color: #e9e9e9;background-color: #ffffff;color: #333333;}
.engineer-header .button-engineer-header:first-child.active{border-right: 0;}
.engineer-header .button-engineer-header:last-child.active{border-left: 0;}
.engineer-header .button-engineer-header{width: 184px;height: 48px;border: 2px solid #e9e9e9;background-color: #f0f0f0;color: #888888;font-size: 18px;font-weight: 500;}
.player { margin-top: 35px; }
.player h2.title { color: #333333; font-size: 36px; font-weight: 700; margin-bottom: 19px; }
.deposit-top .crystal-bonus {
    font-size: 14px;
    float: right;
    margin-top: 10px;
}
.deposit-top .button button.btn-mini-game {
    border: 2px solid #7c4a13 !important;
    background-color: #c68632 !important;
    color: #fff !important;
    border-radius: 0;
}
.red {
  color:red;
  font-style: italic;
  font-weight: 700;
}
@media (max-width:812px) {
  .player h2.title {
    font-size: 24px;
  }
  .deposit-content {
    padding: 30px 25px;
    overflow: hidden;
  }
  .player {
    padding: 10px;
  }
}
</style>
