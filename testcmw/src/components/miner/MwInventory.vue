<template>
  <div class="player">
	<img src="../../assets/serverroom-1.gif" style="display: none"/> 
	<img src="../../assets/serverroom-2.gif" style="display: none"/> 
	<img src="../../assets/serverroom-3.gif" style="display: none"/> 
	<img src="../../assets/serverroom-4.gif" style="display: none"/> 
	<img src="../../assets/serverroom-5.gif" style="display: none"/> 
	<img src="../../assets/serverroom-6.gif" style="display: none"/> 
	<img src="../../assets/serverroom-7.gif" style="display: none"/> 
  <img src="../../assets/serverroom-8.gif" style="display: none"/> 

  <img src="../../assets/miner1-inactive.png" style="display: none"/> 
  <img src="../../assets/miner2-inactive.png" style="display: none"/> 
  <img src="../../assets/miner3-inactive.png" style="display: none"/> 
  <img src="../../assets/miner4-inactive.png" style="display: none"/> 
  <img src="../../assets/miner5-inactive.png" style="display: none"/> 
  <img src="../../assets/miner6-inactive.png" style="display: none"/> 
  <img src="../../assets/miner7-inactive.png" style="display: none"/> 
  <img src="../../assets/miner8-inactive.png" style="display: none"/> 
  <b-container>
    <b-row>
      <div class="miner-player">
        <b-row align-h="between" class="title-miner-player">
            <b-col sm='4'>
              <span class="icon-eth"></span>
              <span class="text">My Contract Balance:</span><br>
              <span class="eth" >{{ formatBalence }} ETH</span>
            </b-col>
            <b-col sm='4'>
             <!--  <span class="icon-crystal"></span>
               <span class="text">Crystals:</span><br>
               <span class="eth" >{{ formateToken( current_crystals ) }} </span> -->
            </b-col>
            <b-col sm='4'>
              <b-btn v-if="player_balance > 0" @click="withdraw" variant="success" class="float-right">Withdraw</b-btn>
              <b-btn v-else disabled class="float-right btn-mine-withdraw">Withdraw</b-btn>
           </b-col>
        </b-row>
        <!-- <b-col sm="4">
          <img width="100%" src="../assets/mining-animation.gif" />
        </b-col> -->
        <!-- <b-col sm="12"> -->
          <!-- <b-container> -->
        <b-row class="row-mine-player align-items-stretch">


          <b-col lg="12" sm="12" class="col-mine-row col-inline">
            <div class="mine-row miner-machine" v-for="(number,idx) in miners" :key="idx">
                <div v-if="number > 0" class="miner-active">
                  <span class="number"><div class="number-miner">{{number}}</div></span>
                 <b-card :title="'Miner Lv' + (idx + 1)" :img-src="createImageSrc(idx+1, number)" img-alt="SCV" img-top tag="article" style="border-radius: 0;">
                </b-card>

               </div>
               <div v-if="number == 0" class="miner-inactive clearfix">
                  <span class="number"><div class="number-miner">{{number}}</div></span>
                  <b-card :title="'Miner Lv' + (idx + 1)" :img-src="createImageSrc(idx+1, number)" img-alt="SCV" img-top tag="article" style="border-radius: 0;">
                  </b-card>
                  <!-- <span class="lever">Lv{{idx + 1}}</span>
                  <img :src="createImageSrc(idx + 1)" />
                  <span class="miner"><span class="icon-miner"></span> {{$t('message.miner')}}</span> <span class="number"><div class="number-miner">{{number}}</div></span> -->
               </div>
            </div>
          </b-col>

         <!--  <b-col lg="4" sm="12" class="col-inline">
            <div style="padding-bottom: 17px;height: 100%;overflow: hidden;">
              <div class="stat clearfix">
                <div class="mine-row">{{$t('message.cur1')}}{{$t('message.hashrate_perday').replace('{$}', formateToken(hashratePerDay))}}</div>
                <div class="mine-row" style="color:red" v-if="hasBoost != 999">{{$t('message.res')}} {{$t('message.hashrate_perday').replace('{$}', formateToken(overclockHashrate))}}</div>
                <div class="mine-row" style="width:51%">{{$t('message.cur2').replace('{$}', formateToken(current_crystals))}}</div>
                <div class="mine-row" style="width:49%;margin-left: -7px;">{{$t('message.referral_count')}}{{referral_count}}</div>
              </div>
              <img src="../../assets/images/mine-image.gif" class="mine-image">
            </div>
          </b-col> -->
        </b-row>
        <b-row>
          <b-col sm='12'>
            <div class="list-item-mine">
              <div class="item-mine">
                Current Hashrate<br>
                <span >{{$t('message.hashrate_perday').replace('{$}', formateToken(hashratePerDay))}} crystals</span>/day
              </div>
              <div v-if="hasBoost != 999" class="item-mine ">
                Overlock<br>
                <span class="overlock">
                <span>{{$t('message.hashrate_perday').replace('{$}', formateToken(overclockHashrate))}} crystals</span>/day</span>
              </div>
              <!-- <div class="item-mine">
                Your Crystals<br>
                <span>{{$t('message.cur2').replace('{$}', formateToken(current_crystals))}}</span>
              </div> -->
              <div class="item-mine">
                Referranl count<br>
                <span>{{ referral_count }}</span>
              </div>
            </div>
          </b-col>

        </b-row>
        <b-row>&nbsp;</b-row>
        <b-row align-h="between">
		</b-row>
          <!-- </b-container> -->
        <!-- </b-col> -->
    </div>
    </b-row>
	<b-row>&nbsp;</b-row>

    <b-modal id="do-quest" size="lg" @ok="doQuest" :title="$t('message.sell_demand')">
      <span slot="modal-title">Choose Your Number</span>
      <b-form>
        <label>Your number should be in 0 - 2</label>
        <b-form-input v-model="num_do_quest"></b-form-input>
      </b-form>
    </b-modal>
  </b-container>
  </div>
</template>
<script>
import { EthMagic } from '../../js/eth-magic'

export default {
  data () {
    return {
      address: '',
	    player_balance: 0,
      initialized: false,
      crystals: 0,
      current_crystals: 0,
      lastupdate: 0,
      hashratePerDay: 0,
      miners: [0, 0, 0, 0, 0, 0, 0, 0],
      hasBoost: 999,
      referral_count: 0,
      yourQuest: 0,
      num_do_quest: 0,
      unconfirmedCrystals: 0,
    }
  },
  mounted () {
    this.updateCrystals();
    this.getPlayerData();
  },
  computed: {
    overclockHashrate () {
      if (this.hasBoost == 999) {
        return this.hashratePerDay;
      }
      return game.boostData[this.hasBoost].boostRate * this.hashratePerDay / 100;
    },
	showQuest () {
		if(this.referral_count >= 10) {
			return false;
		}
		if(this.hashratePerDay != 0 && this.initialized) {
			return true;
		}
		return false;
	},
    showNotStart () {
      return !this.initialized;
    },
    formatBalence () {
      return parseFloat(parseFloat(this.player_balance).toFixed(5));
    }
  },
  methods: {
    createImageSrc (index, number) {
      if (number != 0) return "/dist/serverroom-"+index+".gif";
      // miner1-inactive
      return "/dist/miner"+index+"-inactive.png";
    },
    getInitialized () {
      let self = this
      EthMagic.get_initialized(function (result) {
        self.initialized = result;
      });
    },
    getFree () {
      let self = this
      EthMagic.get_free(function (result) {});
    },
    
	withdraw () {
      let self = this;
	  EthMagic.withdraw_payments(function (result) {
      
      })
    },
    getPlayerData () {
      let self = this
      setInterval(() => {
        self.address = game.user.address;
        self.crystals = game.user.crystals;
        self.lastupdate = game.user.lastupdate;
        self.hashratePerDay = game.user.hashratePerDay;
        self.miners = game.user.miners;
        self.hasBoost = game.user.hasBoost;
        self.referral_count = game.user.referral_count;
        self.player_balance = game.user.player_balance;
        self.yourQuest      = game.user.yourQuest;
      },1000);
    },
    updateCrystals () {
      let self = this;
      setInterval(() => {
        var currentTime = new Date().getTime()
        var difference = (currentTime / 1000 - self.lastupdate)
        var additional = difference * self.overclockHashrate / game.CRTSTAL_MINING_PERIOD
        if (self.overclockHashrate > game.CRTSTAL_MINING_PERIOD) {
          self.current_crystals = (self.crystals + additional).toFixed(0);
        } else {
          self.current_crystals = (self.crystals + additional).toFixed(8);
        }
        game.currentCrystals = self.current_crystals;
        game.user.unconfirmedCrystals = Math.floor(additional);
      }, 100);
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
    doQuest () {
       EthMagic.doQuest( this.num_do_quest );
    },
  }
}
</script>

<style lang="scss" scoped>
@import './src/assets/sprite.scss';
.icon-crystal {
  @include sprite($icon-crystal);
  display: inline-block;
  float: left;
      margin-top: 10px;
    margin-right: 17px;
}
.list-item-mine{
  display: flex;
  justify-content: space-between;
  max-width: 835px;
}
.item-mine{
  color: #333333;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
}.item-mine span{
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
}
span.overlock {
  color:red;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
}
/*.player {
  margin-top: 70px;
}*/
.player h2.title {
  color: #333333;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 19px;
}
.player span.icon-eth {
  @include sprite($icon-eth);
  display: block;
  float: left;
  margin-top: 5px;
  margin-right: 27px;
}
.player span.text {
  font-size: 13px;
  font-weight: 400;
}
.player span.eth {
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  color :#000;
}
.miner-player {
  /*box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21);*/
  padding:21px 21px 21px 21px;
}

.miner-player .miner-machine {
/*    border: 1px solid #e9e9e9;*/
    width: 47%;
    margin-right: 17px;
    margin-bottom: 17px;
}
.miner-active {
  height: 185px;
  position: relative;
  border: 1px solid #e9e9e9;
}
.miner-machine span.lever {
  width:20%;
  height: 100%;
  float: left;
  padding:17px;
  border-right:1px solid #e9e9e9;
  background-color: #f4f4f4;
}
.miner-machine span.miner {
    width: 60%;
    float: left;
    padding: 14px;
}
.miner-machine span.icon-miner {
  @include sprite($icon-miner);
  display: block;
  float: left;
  margin-right: 14px;
}
.miner-inactive {
  height: 185px;
  position: relative;
  border: 1px solid #e9e9e9;
}
.miner-inactive span.number .number-miner {
  background: #b4b4b4;
}
.btn-primary{
    border: 2px solid #7c4a13;
    background-color: #c68632;
    border-radius: 0;
    font-weight: 700;
    padding: 10px 30px;
}
.mine-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.miner-machine span.number {
  width:25%;
  float: left;
  padding:17px;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
}
span.number .number-miner {
  background: red;
  color:#fff;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
}
.stat {
  background-color: #eaeaea;
  border:1px solid #eaeaea;
  height: 100%;
  padding:17px;
}
.mine-row {
    float: left;
    line-height: 36px;
}
article.card {
  display: flex;
  justify-content: center;
  align-items: center;
  padding:16px;
  border:0;
  position: unset;
}
article.card img {
  width: auto;
}
article.card .card-body {
  padding:0;
  position: absolute;
  bottom: 15px;
}
.card-body h4.card-title {
    font-size: 16px;
    font-weight: 600;
    margin-top: 20px;
}
.col-mine-row{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.col-mine-row .mine-row{
  float: none;
  margin-right: 0;
  width: 24%;
}
.title-miner-player{
  margin-bottom: 20px;
}
.row-mine-player{
  margin: 0 -8px;
}
.col-inline{
  padding: 0 8px;
}
button.btn-success {
  border: 4px solid #d69848;
  border: 2px solid #7c4a13;
  background-color: #c68632;
  font-weight: 700;
  border-radius: 0;
  margin-left: 15px;
}
button.btn-success:hover{
  color: #fff!important;
    background-color: #0069d9!important;
    border-color: #0062cc!important;
}
.btn-mine-withdraw{
  border: 4px solid #eeeeee!important;
  border: 2px solid #b4b4b4!important;
  background-color: #dfdfdf!important;
}
.btn-mine-withdraw:hover{
      border: 4px solid #eeeeee !important;
    border: 2px solid #b4b4b4 !important;
    background-color: #dfdfdf !important;
}
.btn-quest{
  border: 4px solid #d69848;
    border: 2px solid #7c4a13;
    background-color: #c68632;
    border-radius: 0;
    font-weight: 700;
    padding: 10px 30px;
}
.modal-footer .btn-primary{
  border-radius: 0;
  font-size: 16px;
  font-weight: 700;
  border: 4px solid #d69848;
  border: 2px solid #7c4a13;
  background-color: #c68632;
}
@media (max-width:560px) {
  .miner-player {
    box-shadow:none!important;
    padding:0!important;
  }
  .miner-machine span.lever {
    width:auto!important;
  }
  .miner-machine span.number {
    width:18%!important;
  }
  .list-item-mine {
    display: block!important;
  }
  .list-item-mine .item-mine {
    margin-bottom: 20px;
  }
  .col-mine-row .mine-row {
    width:100%!important;
  }
}
@media (max-width:812px) {
  .player span.eth {
    font-size: 20px;
  }
  .player span.text {
    font-size: 10px;
  }
  .col-mine-row .mine-row {
    width: 49%;
  }
  .miner-machine span.number {
    width:23%!important;
  }
}
</style>
