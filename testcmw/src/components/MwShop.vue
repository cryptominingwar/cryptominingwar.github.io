<template>
  <div class="wars">
    <b-modal ref="game-shop" id="modallg" size="lg">
      <!-- <b-row>&nbsp;</b-row> background-color: #c68632-->
        <div slot="modal-header" style="width:100%;">
          <b-row align-h="between">
            <b-col cols='9' >
              <h2 class="title">Shop</h2>
            </b-col>   
            <b-col cols='3'>
               <button type="button" aria-label="Close" class="close" @click="hiddenModal()">×</button>
            </b-col> 
          </b-row>
         
        </div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Overclock" active>
              <mw-booster ref='booster' id="miner-booster"></mw-booster>
            </b-tab>
            <b-tab title="Redbull">
               <mw-engineer-booster ref='engineer-booster' id="engineer-booster"></mw-engineer-booster>
            </b-tab>
          </b-tabs>
        </b-card>
        <div slot="modal-footer" style="display: none;">
        </div>
    </b-modal>
  </div>
</template>
<script>

import MwBooster from './MwBooster';
import MwEngineerBooster from './MwEngineerBooster';
// import MwHistory from './wars/MwHistory';

export default {
  components: {
    MwBooster,
    MwEngineerBooster
    // MwHistory
  }, 
  data() {
    return {
      
    }
  },
  mounted () {
  
  },
  methods: {
    loadData() {
      this.$refs['engineer-booster'].getBoosterData();
      this.$refs['booster'].getBoosterData(); 
    },
    hiddenModal() { this.$refs['game-shop'].hide(); },
    showModal() {  
      let self = this;
      self.$refs['game-shop'].show();
      setInterval(() => {
        self.loadData();
      }, 1000 * 5);
    }
  }
}
</script>

<style lang="scss" scoped>
.wars {
  margin-top: 0px;
}
.outline-wars { box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21); width: 100%; }
.wars-header{display: flex;justify-content: center;padding: 20px 0 0; border-bottom: 1px solid #e9e9e9; height: 88px;}
.wars-header .button-wars-header{display: inline-block;outline: none;margin: 0;}
.wars-header .button-wars-header:focus{box-shadow: none;outline: none;}
.wars-header .button-wars-header.active:focus{box-shadow: none;outline: none;}
.wars-header .button-wars-header.active:active{box-shadow: none;outline: none;}
.button-wars-header:not(:disabled):not(.disabled).active:focus, .button-wars-header:not(:disabled):not(.disabled):active:focus{box-shadow: none;outline: none;}
.wars-header .button-wars-header.active{width: 184px;height: 48px;border: 2px solid #e9e9e9;background-color: #ffffff;color: #333333;font-size: 18px;font-weight: 700;}
.wars-header .button-wars-header:hover{color: #fff;background-color: #545b62;border-color: #4e555b;}
.wars-header .button-wars-header.active:hover{border-color: #e9e9e9;background-color: #ffffff;color: #333333;}
.wars-header .button-wars-header:first-child.active{border-right: 0;}
.wars-header .button-wars-header:last-child.active{border-left: 0;}
.wars-header .button-wars-header{width: 184px;height: 48px;border: 2px solid #e9e9e9;background-color: #f0f0f0;color: #888888;font-size: 18px;font-weight: 500;}
.wars { margin-top: 0px; }
.wars h2.title { color: #333333; font-size: 36px; font-weight: 700; }
@media (max-width:560px) {
  .outline-wars {
    box-shadow:none!important;
  }
  .mr-5,.mr-4 {
    margin-right: 1px!important;
  }
}
@media (max-width:812px) {
  .wars h2.title {
    font-size: 24px;
  }
}
</style>
