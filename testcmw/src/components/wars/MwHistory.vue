<template>
  <div class="history" style="margin-top: 35px;">
    <b-container>
      <b-table striped hover :items="historyWars" :fields=fields>
          <template slot="address" slot-scope="row">
            <span>{{row.item.address}} </span>
          </template>
          <template slot="dame" slot-scope="row">
            <span>{{row.item.dame}} </span>
          </template>
          <template slot="def" slot-scope="row">
            <span>{{row.item.def}} </span>
          </template>
          <template slot="reward" slot-scope="row">
            <span v-if="row.item.isAtk ==false" class="is-def">-</span>
            <span v-if="row.item.isAtk ==true" class="is-def">+</span>
            <span>{{formateToken(row.item.reward)}} </span>
          </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
const Config = require("../../../../config/config");
import MYWeb3 from '../../js/web-3';
export default {
  data () {
    return {
      "ETHERSCAN_URL": Config.ETHERSCAN_URL,
      "fields": [],
      "historyWars": [],
    }
  },
  components: {

  },
  created: function () {
    // this.setSocket( io("http://localhost:2904") );
  },
  mounted () {
    // this.loadHistoryWars();
    this.setFileds();
  },
  methods: {
     setFileds () {
      this.fields = [
        {
          key: 'address',
          label: 'Address'
        },
        {
          key: 'dame',
          label: 'Dame',
        },
        {
          key: 'def',
          label: 'Defence',
        },
        {
          key: 'reward',
          label: 'Reward',
        }
      ]
    },
    loadHistoryWars () {
      let self = this;
      setInterval(() => {
        self.historyWars = self.formatHistoryWar();
      }, 1000);
    },
    formatHistoryWar() {
      let result = [];
      game.historyWars.forEach(function(_war) {
        let isAtk = (_war.atk_address == MYWeb3.getAccount()) 
          ? true
          : false;
        let address = (_war.atk_address == MYWeb3.getAccount()) 
          ? _war.def_address
          : _war.atk_address;
        let reward = _war.reward_crystals;    
        result.push({ address, reward, isAtk, dame: _war.atk, def: _war.def });
      });
      return result;
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
  
</style>
