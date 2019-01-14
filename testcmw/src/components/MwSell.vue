<template>
  <div class="buy-sell">
  <b-container style="padding:0">
    <!-- <b-row>&nbsp;</b-row> -->
    <b-row align-h="between">
      <b-col sm="6">
        <h2 class="title">{{$t('message.sell1')}}
        </h2>
      </b-col>
      <b-col sm="6">
        <b-form>
          <b-button @click="showSellCrystalDemand" variant="primary">{{$t('message.sell8')}}</b-button>
        </b-form>
      </b-col>
    </b-row>
   <div class="trade-list">
    <span class="small-text">{{$t('message.sell2')}}</span>
    <b-row class="row-trade">
    <b-col sm="6" v-for="(order, idx) in orderData" :key="idx" class="col-trade ">
      <div class="trade-row">
      <b-row class="align-items-center"> 
        <b-col sm="2">
          <span class="icon-buy-request"></span>
        </b-col>
        <b-col sm="7">
          <div class="info-buy-sell">
            <h4>{{order.title}}</h4>
    <!--         <p>{{order.description}}</p> -->
            <p>{{$t('message.tran5')}} {{order.unitPrice}} ETH</p>
            <p>{{$t('message.tran6')}} {{order.amount}}</p>
          </div>
        </b-col>
        <!-- <div class="button"> -->
          <b-col sm="3" class="button button-trade-list">
            <b-button v-if="is_self(idx)" @click="withdrow(idx)" variant="outline-success" class="float-right">{{$t('message.withdrow')}}</b-button>
            <b-button v-else :disabled="is_empty(idx)" @click="showBuy(idx)" variant="primary" class="float-right">{{$t('message.buy')}}</b-button>
          </b-col>
        <!-- </div> -->
    </b-row>
  </div>
  </b-col>
  </b-row>
    <b-row align-h="around">
      <!-- <b-col sm="3">
        <b-form>
          <b-button @click="showSellCrystalDemand" variant="primary">{{$t('message.sell8')}}</b-button>
        </b-form>
      </b-col> -->
    </b-row>
    <b-modal ref="buy" size="lg" @ok="buyCrystal" :title="$t('message.buy_demand')">
      <b-form-input v-model="buy_amount" :placeholder="$t('message.integer')" type="number"></b-form-input>
      <p>{{$t('message.sell10').replace('{$}',payment)}}</p>
      <p v-if="buy_insufficient">{{$t('message.sell11')}}</p>
    </b-modal>
    <b-modal ref='sell_demand' size="lg" @ok="sellCrystalDemand">
      <span slot="modal-title">Your Sell Crystal Request</span>
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
        <span v-if="unitPrice_warning" style="color:red;font-size:14px">{{$t('message.sell_warning')}}</span>
        <b-form-input v-model="unitPrice" type="number"></b-form-input>
      </b-form>
      <b-form class="input-form">
        <label>{{$t('message.t4')}}</label>
        <b-form-input v-model="sell_amount" min=1000 type="number" :placeholder="$t('message.at_least')"></b-form-input>
      </b-form>
      <b-form style="margin-top:1rem" class="input-form">
        <span>{{$t('message.sell_total')}}:</span>
        <span>{{sell_total}} ETH</span>
        <span class="red" v-if="sell_insufficient">{{$t('message.tran11')}}</span>
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
      buy_amount: '',
      unitPrice: '',
      highest_unitPrice: 0,
      vacant: false,
      crystals: 0,
      sell_amount: '',
      sell_idx: 999,
      buy_idx: 999,
    };
  },
  computed: {
    sell_insufficient () {
      if (this.sell_amount > this.crystals) {
        return true;
      }
      return false;
    },
    buy_insufficient () {
      if (this.orderData[this.buy_idx] && this.orderData[this.buy_idx].amount < this.buy_amount) {
        return true;
      }
      return false;
    },
    sell_total () {
      return this.sell_amount * this.unitPrice * 0.5;
    },
    payment () {
      if (this.buy_idx == 999) {
        return 0;
      }
      var demand_order = this.orderData[this.buy_idx]
      return this.buy_amount * demand_order.unitPrice;
    },
    unitPrice_warning () {
      if (this.vacant) {
        return false;
      } else if (this.unitPrice != 0 && parseFloat(this.unitPrice) >= parseFloat(this.highest_unitPrice)) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted () {
    this.orderData = game.sellOrderData;
  },
  methods: {
    getOrderData () {
      let self = this
      for (let index = 0; index < this.orderData.length; index++) {
        EthMagic.get_sell_demand(index, function (idx, result) {
          self.orderData[idx].owner = result.owner;
          self.orderData[idx].title = result.title
          self.orderData[idx].description = result.description
          self.orderData[idx].amount = result.amount
          self.orderData[idx].unitPrice = result.unitPrice
          if (result.unitPrice == 0 || result.amount == 0) {
            self.vacant = true;
            result.unitPrice = 0;
          }
          if (result.unitPrice > self.highest_unitPrice) {
            self.highest_unitPrice = result.unitPrice;
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
    showSellCrystalDemand () {
      this.crystals = game.user.crystals + parseInt(game.user.unconfirmedCrystals)
      this.$refs.sell_demand.show()
    },
    sellCrystalDemand () {
      let self = this
      EthMagic.sell_crystal_demand(this.sell_amount, this.unitPrice, this.title, this.description, function (result) {

      })
    },
    withdrow (idx) {
      let self = this
      EthMagic.withdraw_sell_demand(idx, function (result) {

      })
    },
    showBuy (idx) {
      this.buy_idx = idx;
      this.$refs.buy.show()
    },
    buyCrystal () {
      let self = this
      var demand_order = this.orderData[this.buy_idx]
      EthMagic.buy_crystal(this.buy_amount, demand_order.unitPrice, this.buy_idx, function (result) {
        self.getOrderData()
      })
    },
  }
}
</script>

