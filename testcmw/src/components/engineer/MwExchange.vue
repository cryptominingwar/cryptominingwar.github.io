<template>
  <div class="buy-engineer">
  <b-container style="padding: 0;">
  <!--   <b-row>&nbsp;</b-row> -->
    <b-row align-h="between">
      <b-col>
        <img src="../../assets/exchange-1.png" style="display: none"/> 
        <img src="../../assets/exchange-2.png" style="display: none"/> 
        <img src="../../assets/exchange-3.png" style="display: none"/> 
        <img src="../../assets/exchange-4.png" style="display: none"/> 
        <img src="../../assets/exchange-5.png" style="display: none"/> 
        <img src="../../assets/exchange-6.png" style="display: none"/> 
        <img src="../../assets/exchange-7.png" style="display: none"/> 
        <img src="../../assets/exchange-8.png" style="display: none"/> 
      </b-col>
    </b-row>
    <div class="list-engineer">   
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
      <!-- <b-col sm='4'>
        <span class="icon-crystal"></span>
         <span class="text">Crystals:</span><br>
         <span class="eth" >{{ formateToken( currentCrystals ) }} </span>
      </b-col> -->
      <b-col sm='8'  cols="12" class="offset-sm-4">
       <b-form inline>
          <div style="display:  flex;">
            <div style="margin-right: 15px;">{{ formatEth() }} ETH</div>
            <div>{{$t('message.total').replace('{$}', total)}}</div>
            <div v-if="insufficient" style="color:red;margin-left: 10px;">{{$t('message.limit')}}</div>
          </div>
          <b-button variant="primary" @click="buyEngineers" style="margin-left:10px;">Hire Now</b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="row-engineer">
      <b-col class="col-engineer" lg="3" sm="6" v-for="(engineer,i) in engineerData" :key="i">
        <div class="engineer">
          <b-card :title="engineersName[i]" :img-src="createImageSrc(i+1)" img-alt="SCV" img-top tag="article" style="padding: 20px;border-radius: 0;border: 2px solid #e9e9e9;" class="">
            <p class="card-text clearfix">{{$t('message.selling_price')}}</p>
            <div class="price">
              <p class="card-text clearfix"><span class="left">Crystals:</span><span class="right">{{$t('message.price').replace('{$}', engineer.basePrice)}}</span></p>
              <p class="card-text clearfix"><span class="left">ETH:</span><span class="right">{{ engineer.baseEth }}</span></p>
            </div>
            <p class="card-text clearfix"><span class="left">Brain-speed:</span><span class="right">{{engineer.baseResearch}}</span></p>
            <p class="card-text clearfix"><span class="left">Limit： </span><span class="right">{{$t('message.max').replace('{$}', engineer.limit)}}</span></p>
            <div style="display:flex;align-items:center;justify-content: space-between;width: 100%;">
              <b-input-group style="width: 100%;;background-color: #d69848;">
                <button class="form-control btn btn-outline-primary" @click="decrease(i)">-</button>
                <div style="display:flex;align-items:center;justify-content: center;padding: 0 10px;">
                <input type="text" required="required" v-model="engineers[i].number" class="form-control" style="margin-left:0px;width:30px;background-color: #d69848;color:#fff;text-align: center;;border: 0;padding: 0;padding-right: 10px;">
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
import EngineerGame from '../../js/engineer'

export default {
  data () {
    return {
      "priceEth": 0,
      "currentCrystals": 0,
      "engineersName": [],
      "engineerData": [],
      "player_balance": 0,
      "engineers": [{ number: 0 }, { number: 0 }, { number: 0 }, { number: 0 },
      { number: 0 }, { number: 0 }, { number: 0 }, { number: 0 }],
    }
  },
  mounted () {
    this.engineerData = game.engineerData;
    this.engineersName = game.engineersName;
    // this.loadCurrentCrystals();
  },
  computed: {
    total () {
      let total = 0;
      for (let index = 0; index < this.engineerData.length; index++) {
        const element = this.engineerData[index];
        total += this.engineers[index].number * parseInt(element.basePrice);
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
      return "/dist/exchange-"+index+".png";
    },
    loadCurrentCrystals() {
      let self = this;
      setInterval(() => {
        self.currentCrystals = game.currentCrystals;
      }, 1000);
    },
    decrease (idx) {
      this.engineers[idx].number -= 1;
      if (this.engineers[idx].number <= 0) {
        this.engineers[idx].number = 0;
      }
      this.calculatePriceEth();
    },
    increase (idx) {
      const number = game.engineerPlayer.engineers[idx];
      var engineer = this.engineerData[idx]
      this.engineers[idx].number = parseInt(this.engineers[idx].number) + 1;
      if (this.engineers[idx].number > engineer.limit - number) {
        this.engineers[idx].number = engineer.limit - number;
      }
      this.calculatePriceEth();
    },
    calculatePriceEth() {
      var self = this;
      var totalEth = 0;
      self.engineers.forEach(engineer);
      function engineer(e, idx) {
        totalEth += self.engineerData[idx].baseEth * e.number;
      }
      self.priceEth = totalEth;
    },
    buyEngineers () {
      var self = this;
      var engineerCount = [];
      self.engineers.forEach(engineer);
      function engineer(e, idx) {
        let number = game.engineerPlayer.engineers[idx];
        if (e.number > e.limit - number) {
          self.engineers[idx].number = e.limit - number;
        }
        engineerCount.push(self.engineers[idx].number)
      }  
      EngineerGame.buyEngineers({engineerCount, "eth": self.priceEth});
      self.resetEngineers();
      self.priceEth = 0;
    },
    resetEngineers() {
      for ( let i = 0; i < 8; i++ ) {
        this.engineers[i].number = 0;
      }
    },
    formatEth () {
      return parseFloat(parseFloat(this.priceEth).toFixed(5));
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
.buy-engineer h2.title {
  color: #333333;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 19px;
}
.buy-engineer span.icon-eth {
  @include sprite($icon-eth);
  display: block;
  float: left;
  margin-top: 5px;
  margin-right: 27px;
}
.buy-engineer span.icon-crystal {
  @include sprite($icon-crystal);
  display: block;
  float: left;
  margin-top: 10px;
  margin-right: 17px;
}
.buy-engineer span.text {
  font-size: 13px;
  font-weight: 400;
}
.buy-engineer span.eth {
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  color :#000;
}
.buy-engineer button.btn-primary {
  border: 4px solid #d69848;
  border: 2px solid #7c4a13;
  background-color: #c68632;
  border-radius: 0;
  font-weight: 700;
  padding: 10px 30px;
}
.buy-engineer button.btn-primary:hover{
  color: #fff!important;
    background-color: #0069d9!important;
    border-color: #0062cc!important;
}
.buy-engineer form.form-inline {
  float: right;
}
.engineer {
  margin-top: 16px;
  text-align: center;
}
.engineer h4 {
  font-size: 18px;
  font-weight: 700;
}
.engineer p.card-text {
  font-size: 15px; 
  font-weight: 500;
  line-height: 24px;
}
.engineer .btn-outline-primary {
  color:#fff;
  border-color:#d69848;
}
.engineer .btn-outline-primary:focus{
  color: #fff;
  background: #d69848;
  outline: none;
}
.list-engineer {
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
.row-engineer{
  margin: 0 -8px;
}
.col-engineer{
  padding: 0 8px;
}
@media (max-width:560px) {
  .list-engineer {
    box-shadow: none!important;
    padding:0!important;
  }
  .engineer-header .button-engineer-header:last-child.active {
    width:50%!important;
  }
  .offset-8 {
    margin-left: 0!important;
  }
}
</style>
