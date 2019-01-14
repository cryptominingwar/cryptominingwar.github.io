<template>
  <div>
    <div class="notification-bar text-center">
		<p>Game data is <span>not correct</span>? Open MetaMask, switch to another Ethereum testnet for a second and then switch back to the mainnet.</p>
    </div>
   <!--  <div v-if="!showLottery && lastWarInfo._id" class="last-war-info notification-bar text-center">
      <span class="player-atk">{{ lastWarInfo.atk_address }}</span>
      <span class="text"> attacked </span>
      <span class="player-def">{{ lastWarInfo.def_address }}</span>
      <span class="result-war">
        <span v-if="lastWarInfo.status == 1" class="win">and won</span>
        <span v-if="lastWarInfo.status == 0" class="loss">and lost </span>
      </span>
      <span v-if="lastWarInfo.status == 1" class="reward">{{ lastWarInfo.reward_crystals }} crystals </span>
    </div> -->
    <b-row>
      <div class="container header-mainmenu d-flex align-items-center justify-content-between">

        <b-col sm="3">
          <div>
            <div class="nav-left">
              <img src="../assets/images/logo-left.png"/>
            </div>
          </div>
        </b-col>
         <b-col sm="5">
          <div>
            <div class="nav-menu">
              <b-link href="https://cryptominingwar.github.io/">Home</b-link>
              <b-link target="_blank" href="https://cryptogaming.store/how-to-play-cryptominingwar/">How to Play</b-link>
              <b-link target="_blank" href="https://etherscan.io/address/0xf84c61bb982041c030b8580d1634f00fffb89059">Contract</b-link>
            </div>
          </div>
        </b-col>
         <b-col sm="4">
          <div class="menu-right clearfix">
            <div class="nav-right">
              <a target="_blank" href="https://t.me/CryptoMiningWar"><img style="width: 13%;margin-left: 25px;" src="../assets/images/telegram.png"/></a>
              <a target="_blank" href="https://discord.gg/f9rFzWa"><img src="../assets/images/logo4.png"/></a>
            </div>
          </div>
        </b-col>
      
      </div>
      </b-row>
    </div>
  </div>
</template>
<script>
const Config = require("../../../config/config");
import { EthMagic } from '../js/eth-magic'
import axios from 'axios'

export default {
  data () {
    return {
      showLottery: true,
      lastWarInfo: {}
    };
  },
  mounted () {
    this.getShowLottery();
    // this.loadLastWarInfo();
  },
  methods: {
    lottery () {
      let self = this;
      EthMagic.lottery(function (result) {
        game.deadline = result;
        self.showLottery = false;
      });
    },
    loadLastWarInfo() {
      let self = this;
      self.getLastWar();
      setInterval(() => {
        self.getLastWar();
      }, 1000 * 60);
    },
    getLastWar() {
      let self = this;
      let opts = {
          method: 'get',
          url: Config.ETHERMINEWAR_BACKEND + '/api/last-war'
      };
      axios( opts )
          .then(response)
          .catch(err => { console.log('[ERROR_REQUEST]: ', err); });
      function response( res ) {
          if ( res.data.code == "SUCCESS" && res.data.data.war) {
            self.lastWarInfo = res.data.data.war;
          }
      }
    },
    getShowLottery () {
      let self = this;
      setInterval(() => {
        self.showLottery = new Date().getTime() / 1000 - game.deadline > 0;
      }, 1000);
    },
    formatTime(time) {
      let d = new Date(time);
      let date = d.getFullYear() + " : " + 
                 d.getMonth() + " : " +
                 d.getDate() + "  " +
                 d.getHours() + " : " +
                 d.getMinutes();
      return date;
    },
    change (to) {
      localStorage['lang'] = to
      this.$i18n.locale = to
      this.$emit('changeLang', to)
    },
    startGame () {
    },
    upgrade () {
    },
  }
}
</script>

<style lang="scss" scoped>
.btn {
    margin-right: 10px;
}
/*.nav {
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    background: white;
}*/

.nav-right {
  float: right;
  
}
.notification-bar {
  background-color: #f2f2f2;
  padding: 10px 0;
}
.notification-bar p {
    margin: 0;
    text-align: center;
    padding: 0 10px;
    font-size: 13px;
    font-weight: 700;
}
.notification-bar p span {
  color: #215cec;
}
.header-mainmenu {
  padding: 30px 0;
}
.header-mainmenu a {
    text-decoration: none;
    color: #333333;
    cursor: pointer;
    margin:0 12px;
    font-size: 14px;
    font-weight: 500;
}
.nav-menu {
  text-align: center;
}
.nav-left img {
  max-width: 100%;
}
.nav-right img {
    cursor: pointer;
    margin-left: 33px;
    max-width: 40%
}
.nav-right img:first-child {
    cursor: pointer;
    margin-left: 0;
    float: right;
}
.menu-right{
 
  width: 100%;
}
.btn-click-top{
    font-size: 13px;
    padding: 0px 10px;
}
@media (max-width:560px) {
  .header-mainmenu {
    padding:30px!important;
    display: block!important;
  }
  .menu-right {
    text-align: center;
    margin: 0 auto;
  }
  .nav-right {
    float: none!important;
  }
  .notification-bar {
    font-size: 10px!important;
  }
}
@media (max-width:812px) {
  .header-mainmenu a {
    font-size: 10px;
  }
}
</style>
