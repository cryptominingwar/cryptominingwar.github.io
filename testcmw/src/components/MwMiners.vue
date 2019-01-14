<template>
   <div class="player-miner" style="margin-top: 35px;">
    <b-container>
      <!-- <b-row>&nbsp;</b-row> -->
      <b-row align-h="between">
        <b-col sm='9' style="padding:0">
          <h2 class="title">My Miner</h2>
        </b-col>
        <b-col sm="3">
         <!--  <b-btn v-if="showFree" @click="getFree" variant="success" class="float-right" style="margin-right: -15px;">{{$t('message.get_free')}}</b-btn> -->
        </b-col>    
      </b-row>
      <b-row>  
        <div class="outline-miner">
          <div class="miner-header clearfix">
            <b-button @click="changeStatus('inventory')" class="button-miner-header" :class="{ active: (status == 'inventory')}">Inventory</b-button>
            <b-button @click="changeStatus('exchange')" class="button-miner-header" :class="{ active: (status == 'exchange')}">Buy Miner</b-button>
          </div>
          <div class="miner-body">
            <mw-inventory v-if="status == 'inventory'" ref='inventory'></mw-inventory>
            <mw-exchange v-if="status == 'exchange'" ref='exchange'></mw-exchange>
          </div>
        </div>
      </b-row>
    <b-row>&nbsp;</b-row>
    </b-container>
  </div>
</template>
<script>
import { EthMagic } from '../js/eth-magic'
import MwInventory from './miner/MwInventory';
import MwExchange from './miner/MwExchange';

export default {
  components: {
    MwInventory,
    MwExchange
  },
  data () {
    return {
      "status": 'inventory',
    }
  },
  computed: {
    showFree () {
      if(this.miners[0] == 0) return true; 
      return this.hashratePerDay == 0 && this.initialized;
    },
  },
  methods: {
    getPlayerMainGameData() {
      EthMagic.get_current_player_data(function (result) {});
    },
    getInitialized() {
      this.$refs.inventory.getInitialized();
    },
    changeStatus( _status ) {
      this.status = _status;
    }
  }
}
</script>

<style lang="scss" scoped>
.outline-miner { box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21);}
.miner-header{display: flex;justify-content: center;padding: 20px 0 0; border-bottom: 1px solid #e9e9e9; height: 88px;}
.miner-header .button-miner-header{display: inline-block;outline: none;margin: 0;}
.miner-header .button-miner-header:focus{box-shadow: none;outline: none;}
.miner-header .button-miner-header.active:focus{box-shadow: none;outline: none;}
.miner-header .button-miner-header.active:active{box-shadow: none;outline: none;}
.button-miner-header:not(:disabled):not(.disabled).active:focus, .button-miner-header:not(:disabled):not(.disabled):active:focus{box-shadow: none;outline: none;}
.miner-header .button-miner-header.active{width: 184px;height: 48px;border: 2px solid #e9e9e9;background-color: #ffffff;color: #333333;font-size: 18px;font-weight: 700;}
.miner-header .button-miner-header:hover{color: #fff;background-color: #545b62;border-color: #4e555b;}
.miner-header .button-miner-header.active:hover{border-color: #e9e9e9;background-color: #ffffff;color: #333333;}
.miner-header .button-miner-header:first-child.active{border-right: 0;}
.miner-header .button-miner-header:last-child.active{border-left: 0;}
.miner-header .button-miner-header{width: 184px;height: 48px;border: 2px solid #e9e9e9;background-color: #f0f0f0;color: #888888;font-size: 18px;font-weight: 500; }
button.btn-success { border: 4px solid #d69848; border: 2px solid #7c4a13; background-color: #c68632; font-weight: 700; border-radius: 0; margin-left: 15px; }
button.btn-success:hover { color: #fff!important; background-color: #0069d9!important; border-color: #0062cc!important; }
.player-miner { position: relative; z-index: 99; }
.player-miner h2.title { color: #333333; font-size: 36px; font-weight: 700; margin-bottom: 19px; }
@media (max-width: 560px) {
  .player-miner {
    padding:30px;
  }
  .miner-header .button-miner-header.active {
    width:44%!important;
  }
  .miner-header .button-miner-header {
     width:44%!important;
  }
  .outline-miner {
    box-shadow: none!important;
  }
}
@media (max-width: 812px) {
  .player-miner h2.title {
    font-size: 24px;
  }
  .player-miner {
    padding: 10px;
  }
}
</style>
