<template>
  <div class="buy-miner">
  <b-container style="padding: 0;">
  <!--   <b-row>&nbsp;</b-row> -->
    <b-row align-h="between">
      <b-col>
        <img src="../../assets/serverroom-1.png" style="display: none"/> 
        <img src="../../assets/serverroom-2.png" style="display: none"/> 
        <img src="../../assets/serverroom-3.png" style="display: none"/> 
        <img src="../../assets/serverroom-4.png" style="display: none"/> 
        <img src="../../assets/serverroom-5.png" style="display: none"/> 
        <img src="../../assets/serverroom-6.png" style="display: none"/> 
        <img src="../../assets/serverroom-7.png" style="display: none"/> 
        <img src="../../assets/serverroom-8.png" style="display: none"/> 
      </b-col>
    </b-row>
    <div class="list-miner">   
    <b-row>
      <!-- <b-col sm='3'>
        <span class="icon-eth"></span>
        <span class="text">My Contract Balance:</span><br>
        <span class="eth" >{{player_balance}} ETH</span>
      </b-col>
      <b-col sm='5'>
        <span class="icon-crystal"></span>
         <span class="text">Crystals:</span><br>
         <span class="eth" >{{ current_crystals }} </span>
      </b-col> -->
      <b-col sm='8'>
             <!--  <span class="icon-crystal"></span>
               <span class="text">Crystals:</span><br>
               <span class="eth" >{{ formateToken( currentCrystals ) }} </span> -->
            </b-col>
      <b-col sm='4'>
       <b-form inline>
          <div>
            <div>{{$t('message.total').replace('{$}', total)}}</div>
            <div v-if="insufficient" style="color:red">{{$t('message.limit')}}</div>
          </div>
          <b-button variant="primary" @click="buyMiners" style="margin-left:10px;">{{$t('message.now')}}</b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="row-miner">
      <b-col class="col-miner" lg="3" sm="6" v-for="(miner,i) in minerData" :key="i">
        <div class="miner">
          <b-card :title="'Lv' + (i + 1) + $t('message.miner')" :img-src="createImageSrc(i+1)" img-alt="SCV" img-top tag="article" style="padding: 20px;border-radius: 0;border: 2px solid #e9e9e9;" class="">
            <p class="card-text clearfix">{{$t('message.selling_price')}}</p>
            <div class="price">
              <p class="card-text clearfix"><span class="left">Crystals:</span><span class="right">{{$t('message.price').replace('{$}', miner.price)}}</span></p>
              <p class="card-text clearfix"><span class="left">{{$t('message.hashrate')}}:</span> <span class="right">{{miner.hashrate}}</span></p>
              <p class="card-text clearfix"><span class="left">Limit:</span><span class="right">{{$t('message.max').replace('{$}', miner.limit)}}</span></p>
            </div>
            <div style="display:flex;align-items:center;justify-content: space-between;width: 100%;">
              <b-input-group style="width: 100%;;background-color: #d69848;">
                <button class="form-control btn btn-outline-primary" @click="decrease(i)">-</button>
                <div style="display:flex;align-items:center;justify-content: center;padding: 0 10px;">
                <input type="text" required="required" v-model="miners[i].number" class="form-control" style="margin-left:0px;width:30px;background-color: #d69848;color:#fff;text-align: center;;border: 0;padding: 0;padding-right: 10px;">
                <span class="text-unit" style="position: relative;top: -1px">Units</span>
              </div>
                <button class="form-control btn btn-outline-primary" @click="increase(i)">+</button>
              </b-input-group>
             <!--  <div style="margin-left:10px">{{$t('message.a')}}</div> -->
            </div>
          </b-card>
        </div>
      </b-col>
    </b-row>
    </div>
    <b-row>&nbsp;</b-row>
    <b-row align-h="around">
      <b-col sm="4">
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>
<script>
import { EthMagic } from '../../js/eth-magic'

export default {
  data () {
    return {
      minerData: [],
      currentCrystals: 0,
      player_balance: 0,
      miners: [{ number: 0 }, { number: 0 }, { number: 0 }, { number: 0 },
      { number: 0 }, { number: 0 }, { number: 0 }, { number: 0 }],
    }
  },
  mounted () {
    this.minerData = game.minerData;
    this.player_balance = game.user.player_balance;
    this.updateBalance();
    // this.loadCurrentCrystals();
  },
  computed: {
    overclockHashrate () {
      return game.boostData[game.user.hasBoost].boostRate * game.user.hashratePerDay / 100;
    },
    total () {
      let total = 0;
      for (let index = 0; index < this.minerData.length; index++) {
        const element = this.minerData[index];
        total += this.miners[index].number * parseInt(element.price);
      }
      return total;
    },
    insufficient () {
      var user_crystals = game.user.crystals + parseInt(game.user.unconfirmedCrystals);
      if (this.total > user_crystals) {
        return true;
      }
      return false;
    }
  },
  methods: {
    createImageSrc (index) {
      return "/dist/serverroom-"+index+".png";
    },
    loadCurrentCrystals() {
      let self = this;
      setInterval(() => {
        self.currentCrystals = game.currentCrystals;
      }, 1000);
    },
    updateBalance () {
      let self = this;
      setInterval(() => {
        self.player_balance = game.user.player_balance;
      }, 1000);
    },
    decrease (idx) {
      this.miners[idx].number -= 1;
      if (this.miners[idx].number <= 0) {
        this.miners[idx].number = 0;
      }
    },
    increase (idx) {
      const number = game.user.miners[idx];
      var miner = this.minerData[idx]
      this.miners[idx].number = parseInt(this.miners[idx].number) + 1;
      if (this.miners[idx].number > miner.limit - number) {
        this.miners[idx].number = miner.limit - number;
      }
    },
    buyMiners () {
      let self = this
      var miner_count = [];
      for (let index = 0; index < this.miners.length; index++) {
        const element = this.minerData[index];
        const number = game.user.miners[index];
        if (this.miners[index].number > element.limit - number) {
          this.miners[index].number = element.limit - number;
        }
        const miner = this.miners[index];
        miner_count.push(miner.number)
      }

      EthMagic.buy_miners(miner_count, function (result) {
        for (let index = 0; index < self.miners.length; index++) {
          const miner = self.miners[index];
          miner.number = 0;
        }
      })
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
  }
}
</script>

<style lang="scss" scoped>
@import './src/assets/sprite.scss';
.buy-miner h2.title {
  color: #333333;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 19px;
}
.buy-miner span.icon-eth {
  @include sprite($icon-eth);
  display: block;
  float: left;
  margin-top: 5px;
  margin-right: 27px;
}
.buy-miner span.icon-crystal {
  @include sprite($icon-crystal);
  display: block;
  float: left;
  margin-top: 10px;
  margin-right: 17px;
}
.buy-miner span.text {
  font-size: 13px;
  font-weight: 400;
}
.buy-miner span.eth {
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  color :#000;
}
.buy-miner button.btn-primary {
  border: 4px solid #d69848;
  border: 2px solid #7c4a13;
  background-color: #c68632;
  border-radius: 0;
  font-weight: 700;
  padding: 10px 30px;
}
.buy-miner button.btn-primary:hover{
  color: #fff!important;
    background-color: #0069d9!important;
    border-color: #0062cc!important;
}
.buy-miner form.form-inline {
  float: right;
}
.card-text span.left {
    width: 50%;
    float: left;
    text-align: left;
}
.card-text span.right {
    width: 50%;
    float: right;
    text-align: right;
}
.miner {
  margin-top: 16px;
  text-align: center;
}
.miner h4 {
  font-size: 18px;
  font-weight: 700;
}
.miner p.card-text {
  font-size: 15px; 
  font-weight: 500;
  line-height: 24px;
}
.miner .btn-outline-primary {
  color:#fff;
  border-color:#d69848;
}
.miner .btn-outline-primary:focus{
  color: #fff;
  background: #d69848;
  outline: none;
}
.list-miner {
  /*box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21);*/
  padding:21px;
}
.card-img-top {
  width:50%;
  margin:0 auto;
}
.card-text {
    margin-bottom: 10px !important;
}
span.text-unit {
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 14px;
  color: #fff;
  font-weight: 700;
}
.card-body{
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}
.row-miner{
  margin: 0 -8px;
}
.col-miner{
  padding: 0 8px;
}
@media (max-width:560px) {
  .list-miner {
    box-shadow: none!important;
    padding:0!important;
  }
  .offset-8 {
    margin-left: 0!important;
  }
}
</style>
