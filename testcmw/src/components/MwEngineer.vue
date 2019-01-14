<template>
  <div class="player-engineer">
    <b-container>
      <!-- <b-row>&nbsp;</b-row> -->
      <b-row align-h="between">
        <b-col sm='9' style="padding:0">
          <h2 class="title">My Engineer</h2>
        </b-col>    
      </b-row>
      <b-row >
      <div class="outline-engineer">
        <div class="engineer-header clearfix">
          <b-button @click="changeStatus('inventory')" class="button-engineer-header" :class="{ active: (status == 'inventory')}">Inventory</b-button>
          <b-button @click="changeStatus('exchange')" class="button-engineer-header" :class="{ active: (status == 'exchange')}">Hire Engineer</b-button>
        </div>
        <div class="engineer-body">
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

import MwInventory from './engineer/MwInventory';
import MwExchange from './engineer/MwExchange';

export default {
  components: {
    MwInventory,
    MwExchange
  }, 
  data() {
    return {
      "status": 'inventory'
    }
  },
  methods: {
    changeStatus( _status ) {
      this.status = _status;
    }
  }
}
</script>

<style lang="scss" scoped>
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
.player-engineer { margin-top: 35px; }
.player-engineer h2.title { color: #333333; font-size: 36px; font-weight: 700; margin-bottom: 19px; }
@media (max-width: 560px) {
  .player-engineer {
    padding:30px;
  }
  .outline-engineer {
    box-shadow:none!important;
    width: 100%;
  }
  .engineer-header .button-engineer-header {
    width:44%;
  }
  .engineer-header .button-engineer-header:first-child.active {
    width:44%;
  }
}
@media (max-width: 812px) {
  .player-engineer h2.title {
    font-size: 24px;
  }
  .player-engineer {
    padding: 10px;
  }
}
</style>
