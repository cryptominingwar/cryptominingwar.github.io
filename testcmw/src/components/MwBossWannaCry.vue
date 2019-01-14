<template>
  <div class="player-deposit">
    <b-container>
      <!-- <b-row>&nbsp;</b-row> -->
      <b-row align-h="between">
        <b-col sm='4' style="padding:0">
          <h2 class="title">Boss WannaCry</h2>
        </b-col>
        <b-col sm="3">
          <b-row>
<!--             <b-col sm="4">
                <div class="virus-inventory-enginner d-flex">
                  <div class="total-virus d-flex align-items-center">
                    <span class="img-total-virus"></span>
                    <div class="info-total-virus" style="width: 140px;">
                      <div class="title-virus">Your Virus</div>
                      <div class="total-virus-count">{{$t('message.cur2').replace('{$}', formateToken(currentVirus))}}</div>
                    </div>
                  </div>
                </div>
              </b-col> -->
              <b-col sm="12">
                <div class="virus-inventory-enginner d-flex">
                 <div class="total-virus">
                      <div class="title-virus">Power Per Virus</div>
                      <div class="d-flex align-items-center">
                        <span class="img-power-virus"></span> 
                        <div class="mr-2 title-power-virus">ATK <span>1</span></div>
                        <div class="title-power-virus">DEF <span>1</span></div>
                      </div>
                  </div>
                </div>
              </b-col>
          </b-row>
       </b-col>
        <!--  <b-col lg="4" sm='3' cols="8" class="prize">
          <div class="crystal-bonus">Your Reward: {{ formatBalence(yourReward) }} ETH</div>
        </b-col>  
        <b-col lg="1" sm="2" cols="4" style="padding-right: 0;">
           <b-btn @click="withdrawReward" variant="success" class="float-right" :disabled="yourReward <= 0">Withdraw</b-btn>
        </b-col>  -->
      </b-row>
      <b-row >
      <div class="deposit-content">
          <!-- <span class="icon-eth"></span>
          <span class="text">ETH: </span>
          <span class="price-pool">{{ prizePool }}</span> -->

          <b-row>
            <b-col sm="8">
               <div v-if="lastBossWannaCry.playerLastAtk != '0x0000000000000000000000000000000000000000'" class="player-win-last-boss">
                <span >
                  <span class="des-depsoit" style="color:red">{{ lastBossWannaCry.playerLastAtk }}</span>
                  <span class="des-depsoit" style="color:red"> killed the last boss and won: </span> 
                  <span class="des-depsoit" style="color:red">{{ formatBalence(lastBossWannaCry.playerWonReward) }} ETH</span>
                </span>
              </div>
              <div class="des-depsoit">Kill the Boss to get the rewards.</div>
              <div class="eth-depsit d-flex align-items-center mb-1"><span class="icon-prize-small mr-2"></span>{{ formatBalence(currentBossWannaCry.prizePool) }} ETH</div>
              <div class="hp-boss">
                <div class="mb-3 progress">
                  <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" class="progress-bar bg-primary" style="width: 40%;" id="line-hp"><!----></div>
                </div>
              </div>
              <div class="time mb-1">HP: <span class="hp-left">{{ currentBossWannaCry.bossHp - currentBossWannaCry.totalDame }}</span>/{{ currentBossWannaCry.bossHp }}</div>
			  <div class="time mb-1">Level: {{currentBossWannaCry.bossRoundNumber}}</div>
              <div class="des-depsoit">The last-hitter will get a bonus  of:  {{ formatBalence(currentBossWannaCry.prizePool * 5 / 100) }} ETH</div>
              <div class="des-depsoit">Your Dmg: {{ dameCurrentBossWannaCry }} HP</div>
              <b-form> 
                <b-form-input v-model="virusAttack" :class="{error: (virusAttack > currentVirus)}"" style="border-radius:0;margin-top: 15px;margin-bottom: 18px;width: 50%;" placeholder="Number of viruses sent to attack*"></b-form-input>
              </b-form>
              <div class="d-flex mt-1">
                <button class="btn-sell-deposit" @click="attackBoss" :disabled="canAtkBoss == false">Attack</button>
              </div>
              <div class="boss-note">
				Using your virus to attack WannaCry.
				<br>You will get some bonus Crystals for each attack.
				<br>When WannaCry is killed, the reward pool will be distributed among the participants according to their total contribution percentage. 
				<br>After resurrection, WannaCry will gain more HP.
		      </div>
            </b-col>
            <b-col sm="4" style="text-align: center;">
              <img class="images-boss" src="../assets/images/boss.png">
            </b-col>
          </b-row>
      </div>
      </b-row>
    <b-row>&nbsp;</b-row>
    </b-container>
  </div>
</template>
<script>
const Config = require("../../../config/config");

import BossWannaCry from '../js/boss-wannacry';
import MYWeb3 from '../js/web-3';
import axios from 'axios';
export default { 
  data() {
    return {
      "currentBossWannaCry": {
          "bossRoundNumber": 0,
          "bossHp": 0,
          "prizePool": 0,
          "playerLastAtk": 0,
          "totalDame": 0,
          "ended": false
      },
      "lastBossWannaCry": {
          "bossRoundNumber": 0,
          "bossHp": 0,
          "prizePool": 0,
          "playerLastAtk": 0,
          "playerWonReward": 0,
          "totalDame": 0,
          "ended": false
      },
      "bossWannaCryPlayer": {
          "currentBossRoundNumber": 0,
          "lastBossRoundNumber": 0,
          "win": 0,
          "share": 0,
          "dame": 0,
          "nextTimeAtk": 0
      },
      "dameCurrentBossWannaCry": 0,
      "canAtkBoss": false,
      // "yourReward": 0,
      "virusAttack": "",
      "currentVirus": 0,
    }
  },
  mounted () {
    this.loadData();
  },
  methods: {
    loadData() {
      let self = this;

      setInterval(() => {
        self.loadBossGameData();
      }, 1000);
    },
    loadBossGameData() {
      this.currentBossWannaCry = game.currentBossWannaCry;
      // this.lastBossWannaCry = game.lastBossWannaCry;
      this.dameCurrentBossWannaCry = game.dameCurrentBossWannaCry;
      this.currentVirus = game.currentVirus;
      this.bossWannaCryPlayer = game.bossWannaCryPlayer;
      // this.yourReward = game.yourRewardBossWannaCry;
      this.setCanAtkBoss();
      this.setLineHp();
      this.loadLassBossWannaCry();
    },
    loadLassBossWannaCry() {
      let self = this;
      let opts = {
          method: 'get',
          url: Config.ETHERMINEWAR_BACKEND + '/api/lass-boss'
      };
      axios( opts )
          .then(response)
          .catch(err => { console.log('[ERROR_REQUEST]: ', err); });
      function response( res ) {
          if ( res.data.code == "SUCCESS" ) setData(res.data.data.lassBossInfo);
      }
      function setData(lassBossInfo) {
        if (!lassBossInfo) return false;
        let lastBossWannaCry = {
            "bossRoundNumber": lassBossInfo.boss_round_number,
            "bossHp": lassBossInfo.boss_hp,
            "prizePool": lassBossInfo.prize_pool,
            "playerLastAtk": lassBossInfo.player_win_address,
            "playerWonReward": MYWeb3.toETH(lassBossInfo.eth_reward),
            "totalDame": lassBossInfo.boss_hp,
            "ended": true
        };
        self.lastBossWannaCry = lastBossWannaCry;
      }
    },
    setLineHp() {
      let lineHp = document.getElementById("line-hp");
      lineHp.style.width = ( this.currentBossWannaCry.bossHp - this.currentBossWannaCry.totalDame ) / this.currentBossWannaCry.bossHp * 100 + "%";
    },
    setCanAtkBoss() {
      let nextTimeAtk = game.bossWannaCryPlayer.nextTimeAtk;
      let now = ( new Date()).getTime() / 1000;
      let isCanAtk = false;
      if (now >= nextTimeAtk) {
        isCanAtk = true;
      }
      this.canAtkBoss = isCanAtk;
    },
    attackBoss() {
      BossWannaCry.attackBoss({ virusAttack: this.virusAttack });
      this.virusAttack = "";
    },
    withdrawReward() {
      BossWannaCry.withdrawReward();
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
.deposit-content .input-sell{border-radius: 0;width: 257px;height: 48px;border: 2px solid #e9e9e9;background-color: #ffffff;border-right: 0;}
.eth-depsit{color: #fff;font-size: 24px;font-weight: 700;text-transform: uppercase;}
.time{color: #fff;font-size: 15px;font-weight: 500;}
.des-depsoit{color: #fff;font-size: 12px;font-weight: 400;line-height: 24px;}
.btn-sell-deposit{@include sprite($sell);display: flex;align-items: center;justify-content: center;border: 0;outline: none;color: #ffffff;font-size: 16px;font-weight: 700;cursor: pointer;}
.icon-prize-small{@include sprite($icon-prize-small);display: inline-block;}
.deposit-content{box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21);background-color: #ffffff;padding: 30px 70px;width: 100%;}
.img-deposit{@include sprite($boss);display: inline-block;}
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
.player-deposit { margin-top: 35px; }
.player-deposit h2.title { color: #333333; font-size: 36px; font-weight: 700; margin-bottom: 19px; }
.deposit-content {
  background-image: url(../assets/images/boss-background.png);
  background-size: cover;
  background-position: center center;
}
.time span.hp-left {
  color: #fcff41;
}
.boss-note {
  color: #979797; 
  font-size: 12px;
  font-weight: 500;
  margin-top: 14px;
}
.hp-boss {
  margin-top: 15px;
}
.hp-boss .progress {
    width: 50%;
    height: 12px;
    border-radius: 6px;
    background-color: #475c76
}
.progress .bg-primary {
  border-radius: 6px;
  background-color: #fcff41!important;
}
img.images-boss {
  max-width: 100%;
}
button.btn-success {
    border: 2px solid #7c4a13;
    background-color: #c68632;
    font-weight: 700;
    border-radius: 0;
    margin-left: 15px;
}
.prize .crystal-bonus {
  float: right;
  margin-top: 10px;
  font-size: 14px;
}
.btn-success.disabled, .btn-success:disabled {
    border: 2px solid #b4b4b4 !important;
    background-color: #dfdfdf !important;
}
.img-total-virus{
  @include sprite($virut-engineer);
  display: inline-block;
  margin-right: 30px;
}
.img-power-virus{
  @include sprite($power-virut);
  display: inline-block;
  margin-right: 10px;
}
.title-virus {
    color: #333333;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
}
.total-virus-count {
    color: #333333;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
}
.title-power-virus {
    color: #888888;
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
}
.title-power-virus span {
    font-weight: 700;
    color: #333333;
}
.virus-inventory-enginner {
  padding-left: 25px;
}
@media (max-width: 560px) {
  .player-deposit {
    padding:30px;
    margin-top: 35px!important;
  }
  .hp-boss .progress {
    width: 100%!important;
  }
  .deposit-content {
    box-shadow:none!important;
    padding:20px!important;
    margin-top: 10px;
  }
  .virus-inventory-enginner {
    padding-left: 0!important;
  }
}
@media (max-width:812px) {
  .player-deposit {
    margin-top: 350px;
    padding: 10px;
  }
  .virus-inventory-enginner {
    padding: 0!important;
  }
  .player-deposit h2.title {
    font-size: 24px;
  }
}
</style>
