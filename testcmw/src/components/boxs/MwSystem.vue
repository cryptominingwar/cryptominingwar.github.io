<template>
  <div class="history">
    <b-container>
      <b-row>
        <b-col sm="12" v-for="(item, i) in transactions" :key="i">
          <span class="label-send">[System]</span>
          <span class="text">
            {{ item.text }}
          </span>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const Config = require("../../../../config/config");
import axios from 'axios'
import MYWeb3 from '../../js/web-3';
export default {
  data () {
    return {
      "transactions": [],
    }
  },
  components: {

  },
  created: function () {
    // this.setSocket( io("http://localhost:2904") );
  },
  mounted () {
    this.loadData();
  },
  methods: {
    loadData () {
      let self = this;
      self.loadTransactions();
      setInterval(() => {
        self.loadTransactions();
      }, 1000 * 30);
    },
    loadTransactions() {
        let self = this;
        let opts = {
            method: 'get',
            url: Config.ETHERMINEWAR_BACKEND + '/api/transactions'
        };
        axios( opts )
            .then(response)
            .catch(err => { console.log('[ERROR_REQUEST]: ', err); });
        function response( res ) {
            if ( res.data.code == "SUCCESS" ) {
              self.transactions = res.data.data.transactions;
            }
        }
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

<style lang="scss">
  .history span{
    font-size: 14px;
    font-weight: 400;
    color: #0ca66d;
  } 
  .history span.label-send {
    font-weight: 700;
  }
</style>
