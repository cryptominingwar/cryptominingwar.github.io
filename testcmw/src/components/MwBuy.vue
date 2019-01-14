<template>
  <div class="buy-sell">
  <b-container style="padding:0">
<!--     <b-row>&nbsp;</b-row> -->
    <b-row align-h="between">
      <b-col sm="6">
        <h2 class="title">{{$t('message.tran1')}}
        </h2>
      </b-col>
      <b-col sm="6">
        <b-form>
          <b-button v-b-modal.buy variant="primary">{{$t('message.tran8')}}</b-button>
        </b-form>
      </b-col>
    </b-row>
    <div class="trade-list">
     <span class="small-text">{{$t('message.tran2')}}</span>
     <b-row class="row-trade">
        <b-col sm="6" v-for="(order, idx) in orderData" :key="idx" class=" col-trade">
          <div class="trade-row">
         <b-row class="align-items-center">
            <b-col sm="2">
                <span class="icon-buy-request"></span>
            </b-col>
            <b-col sm="7">
              <div class="info-buy-sell">
                <h4>{{order.title}}</h4>
                <!-- <p>{{order.description}}</p> -->
                <p>{{$t('message.tran5')}} {{order.unitPrice}} ETH</p>
                <p>{{$t('message.tran6')}} {{order.amount}}</p>
              </div>
            </b-col>
            <!-- <div class="button"> -->
              <b-col sm="3" class="button button-trade-list">
                  <b-button v-if="is_self(idx)" @click="withdrow(idx)" variant="outline-success" class="float-right">{{$t('message.withdrow')}}</b-button>
                  <b-button v-else :disabled="is_empty(idx)" @click="showSell(idx)" variant="primary" class="float-right">{{$t('message.sell')}}</b-button>
              </b-col>
             <!-- </div> -->
          </b-row>
          </div>
        </b-col>
      </b-row>  
        <b-modal ref="sell" size="lg" @ok="sellCrystal" :title="$t('message.sell_demand')">
          <b-form-input v-model="sell_amount" :placeholder="$t('message.integer')" type="number"></b-form-input>
          <p>{{$t('message.tran10').replace('{$}',actual)}}</p>
          <p v-if="insufficient">{{$t('message.tran11')}}</p>
        </b-modal>
        <b-modal id="buy" size="lg" @ok="buyCrystal">
          <span slot="modal-title">Your Buy Crystal Request</span>
          <b-form class="input-form">
            <label>{{$t('message.t1')}}</label>
            <b-form-input v-model="title"></b-form-input>
          </b-form>
          <b-form class="input-form">
            <label>{{$t('message.t2')}}</label>
            <b-form-input v-model="description"></b-form-input>
          </b-form>
          <b-form class="input-form">
            <label>{{$t('message.t3')}} ETH</label>
            <span v-if="(unitPrice < 0.0000001 || uinitPrice < lowest_unitPrice)  && unitPrice != ''" style="color:red;font-size:14px">{{$t('message.buy_warning')}}</span>
            <b-form-input v-model="unitPrice" min="0.0000001" type="number" :placeholder="'At least 0.0000001'"></b-form-input>
          </b-form>
          <b-form class="input-form">
            <label>{{$t('message.t4')}}</label>
    		    <span v-if="amount < 1000 && amount != ''" style="color:red;font-size:14px">{{$t('At least 1000')}}</span>
            <b-form-input v-model="amount" min=1000 type="number" :placeholder="$t('message.at_least')"></b-form-input>
          </b-form>
          <b-form  class="input-form">
            <span>{{$t('message.trade13')}}:</span>
            <span>{{buy_total}} ETH</span>
          </b-form>

        </b-modal>
    </div>
  </b-container>
  </div>
</template>

<script>
import { EthMagic } from '../js/eth-magic'

export default {
  data () {
    return {
      orderData: [],
      title: '',
      description: '',
      amount: '',
      unitPrice: '',
      lowest_unitPrice: 9999,
      vacant: false,
      crystals: 0,
      sell_amount: '',
      sell_idx: 999,
    };
  },
  computed: {
    insufficient () {
      if (this.sell_amount > this.crystals) {
        return true;
      }
      return false;
    },
    buy_total () {
      return this.amount * this.unitPrice;
    },
    actual () {
      if (this.sell_idx == 999) {
        return 0;
      }
      var demand_order = this.orderData[this.sell_idx]
      return this.sell_amount * demand_order.unitPrice * 0.5;
    },
    unitPrice_warning () {
      if (this.vacant) {
        return false;
      } 
	  else if (this.unitPrice != 0 && EthMagic.toWei(this.unitPrice) <= EthMagic.toWei(this.lowest_unitPrice)) {
        return true;
      }
	  else if (this.unitPrice < 0.0000001) {
        return true;
      }
	  else {
        return false;
      }
    },
  },
  mounted () {
    this.orderData = game.buyOrderData;
  },
  methods: {
    getOrderData () {
      let self = this
      for (let index = 0; index < this.orderData.length; index++) {
        EthMagic.get_buy_demand(index, function (idx, result) {
          self.orderData[idx].owner = result.owner;
          self.orderData[idx].title = result.title
          self.orderData[idx].description = result.description
          self.orderData[idx].amount = result.amount
          self.orderData[idx].unitPrice = result.unitPrice
          if (result.unitPrice == 0 || result.amount == 0) {
            result.unitPrice = 0;
          }
          if (result.unitPrice < self.lowest_unitPrice) {
            self.lowest_unitPrice = result.unitPrice;
          }
        })
      }
    },
    is_self (idx) {
      var demand_order = this.orderData[idx]
      if (demand_order && demand_order.owner == game.user.address) {
        return true;
      } else {
        return false;
      }
    },
    is_empty (idx) {
      var demand_order = this.orderData[idx]
      if (demand_order && demand_order.demand_order != 0 && demand_order.amount != 0) {
        return false;
      } else {
        return true;
      }
    },
    buyCrystal () {
      let self = this
      EthMagic.buy_crystal_demand(this.amount, this.unitPrice, this.title, this.description, function (result) {

      })
    },
    withdrow (idx) {
      let self = this
      EthMagic.withdraw_buy_demand(idx, function (result) {

      })
    },
    showSell (idx) {
      this.sell_idx = idx;
      this.crystals = game.user.crystals + parseInt(game.user.unconfirmedCrystals)
      this.$refs.sell.show()
    },
    sellCrystal () {
      let self = this
      EthMagic.sell_crystal(this.sell_amount, this.sell_idx, function (result) {

      })
    },
  }
}
</script>


<style lang="scss">
@import './src/assets/sprite.scss';


.buy-sell {
  margin-top: 64px;
}
.buy-sell h2.title {
  color: #333333;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 19px;
}
.buy-sell form {
  float: right;
}
.buy-sell form button {
  border-radius: 0;
  font-size: 16px;
  font-weight: 700;
  border: 4px solid #d69848;
  border: 2px solid #7c4a13;
  background-color: #c68632;
}
span.icon-buy-request {
  @include sprite($icon-buy-request);
  display: block;
  float: left;
}
.trade-list {
  box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21);
  padding:21px;
}
.trade-list .small-text {
    color: #333333;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    margin-left: 0;
}
.trade-row {
    border: 2px solid #e9e9e9;
    padding:16px;
    margin-top: 16px;
    /*max-width: 47%!important;*/
}
.row-trade{
  margin: 0 -8px;
}
.col-trade{
  padding: 0 8px;
}

.trade-row .info-buy-sell h4 , .trade-row .info-buy-sell p {
  margin:0;
  font-size: 15px;
  font-weight: 400;
}
.trade-row .info-buy-sell h4 {
  width: 40px;
  height: 26px;
  color: #333333;
  font-size: 15px;
  font-weight: 600;
  line-height: 24px;
  text-transform: capitalize;
}
.trade-row .button {
  display: flex;
  align-items: center;
}
.button button {
    border: 2px solid #d69848;
    background-color: #ffffff;
    color: #d69848;
    font-size: 14px;
    font-weight: 700;
    float: right;
}
.button button.btn-primary:disabled {
    background-color: #d69848!important;
    border-color: #d69848!important;
}
.button-trade-list{
  display: block!important;
}
.input-form{
  width: 100%;
  float: none;
  margin-bottom: 10px;
}
.input-form input{
  border-radius: 0;
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
  .buy-sell {
    padding:30px;
  }
  .trade-list {
    box-shadow: none!important; 
    padding:0px!important;
  }
}
</style>