<template>
  <div class="engineer-player">
        <b-row class="d-flex justify-content-center header-inventory-enginner">
            <div class="top-header-inventory-enginner d-flex">
              <b-row>
                <!-- <b-col sm="4">
                <div class="virus-inventory-enginner d-flex">
                  <div class="total-virus d-flex align-items-center">
                    <span class="img-total-virus"></span>
                    <div class="info-total-virus" style="width: 140px;">
                      <div class="title-virus">Your Virus</div>
                      <div class="total-virus-count">{{$t('message.cur2').replace('{$}', formateToken(current_virus))}}</div>
                    </div>
                  </div>
                </div>
              </b-col> -->
              <b-col sm="6">
                <div class="virus-inventory-enginner d-flex">
                 <div class="total-virus">
                      <div class="title-virus">Power Per Virus</div>
                      <div class="d-flex align-items-center">
                        <span class="img-power-virus"></span> 
                        <div class="mr-2 title-power-virus">ATK <span>1</span></div>
                        <div class="title-power-virus">DEF <span>1</span></div>
                      </div>
                  </div>
                </div>
              </b-col>
              <b-col sm="6">
                <div class="virus-defend d-flex align-items-center">
                  <span class="img-virus-defend"></span>
                  <div class="defend-info">
                      <div class="title-defend">DEF</div>
                      <div class="count-defend">{{arenaData.virusDef}}</div>
                  </div>
                  <div class="defend-right text-right">
                    <div>
                    <span class="img-setting-defend" style="cursor: pointer" @click="showFormAddDefence"><a href="https://getbootstrap.com/docs/4.1/utilities/flex/#align-items" title=""></a></span></div>
                    <div @mouseover="upHere = true" @mouseleave="upHere = false" ><span class="img-note-defend"></span></div>
                  </div>
                  <div v-if="upHere == true" class="note-defend-message">You need to set number of your viruses for defence.</div>
                </div>
              </b-col>
              </b-row>
            </div>
        </b-row>
        <!-- <b-row align-h="between" class="title-engineer-player">
            <b-col sm='3'>
              <span class="icon-eth"></span>
              <span class="text">My Engineer Balance:</span><br>
              <span class="eth" >{{ formatBalence() }} ETH</span>
            </b-col>
            <b-col sm='5'>
              <span class="icon-crystal"></span>
               <span class="text">Viruts:</span><br>
               <span class="eth" >{{ formateToken( current_virus ) }} </span>
            </b-col>
            <b-col sm='4'>
              <b-btn v-if="engineerPlayer.playerBalance > 0" @click="withdraw" variant="success" class="float-right">Withdraw to your wallet</b-btn>
              <b-btn v-else disabled class="float-right btn-mine-withdraw">Withdraw to your wallet</b-btn>
           </b-col>
        </b-row> -->
        <!-- <b-col sm="4">
          <img width="100%" src="../assets/mining-animation.gif" />
        </b-col> -->
        <!-- <b-col sm="12"> -->
          <!-- <b-container> -->
        <b-row class="row-mine-player align-items-stretch">
          <b-col lg="8" sm="12" class="col-engineer-row col-inline">
            <div class="engineer-row engineer-machine" v-for="(number,idx) in engineerPlayer.engineers" :key="idx">
                <div v-if="number > 0" class="engineer-active">
                  <span class="lever">Lv{{idx + 1}}</span>
                  <span class="engineer"><span class="icon-engineer"></span> {{engineersName[idx]}}</span> <span class="number"><div class="number-engineer">{{number}}</div></span>
               </div>
               <div v-if="number == 0" class="engineer-inactive clearfix">
                  <span class="lever">Lv{{idx + 1}}</span>
                  <span class="engineer"><span class="icon-engineer"></span> {{engineersName[idx]}}</span> <span class="number"><div class="number-engineer">{{number}}</div></span>
               </div>
            </div>
          </b-col>
          <b-col lg="4" sm="12" class="col-inline">
            <div style="padding-bottom: 17px;height: 100%;overflow: hidden; margin-bottom: -20px;">
              <!-- <div class="stat clearfix">
                <div class="mine-row">{{$t('message.cur1')}}{{$t('message.hashrate_perday').replace('{$}', formateToken(hashratePerDay))}}</div>
                <div class="mine-row" style="color:red" v-if="hasBoost != 999">{{$t('message.res')}} {{$t('message.hashrate_perday').replace('{$}', formateToken(overclockHashrate))}}</div>
                <div class="mine-row" style="width:51%">{{$t('message.cur2').replace('{$}', formateToken(current_crystals))}}</div>
                <div class="mine-row" style="width:49%;margin-left: -7px;">{{$t('message.referral_count')}}{{referral_count}}</div>
              </div> -->
              <img src="../../assets/images/engineer-image.gif" class="engineer-image">
            </div>
          </b-col>
        </b-row>
        <b-row>&nbsp;</b-row>
         <b-row>
          <b-col sm='12'>
            <div class="list-item-mine">
              <div class="item-mine item-mine-engineer">
                Current Brain-speed<br>
                <span class="item-mine-engineer-bottom">
                <span >{{$t('message.hashrate_perday').replace('{$}', formateToken(engineerPlayer.research))}} viruses</span>/day</span>
              </div>
              <div v-if="engineerPlayer.hasBooster == true" class="item-mine item-mine-engineer">
                Redbull<br>
                <span class="overlock item-mine-engineer-bottom">
                <span >{{$t('message.hashrate_perday').replace('{$}', formateToken(engineerPlayer.researchPerDay))}} viruses</span>/day</span>
              </div>
            </div>
          </b-col>
        </b-row>
         <b-modal ref='add-defence' size="lg" @ok="addVirusDefence" :title="$t('message.sell_demand')">
          <span slot="modal-title">Add more viruses to upgrade your Defence</span>
          <div class="item-mine">
				<!-- <p>Your current Virus: {{ formateToken(current_virus) }}<p/> -->
				<p>Your current Defence: {{arenaData.virusDef}}<p/>
          </div>
          <b-form>
            <b-form-input v-model="virusDefence" :class="{error: (virusDefence > current_virus)}"></b-form-input>
          </b-form>
        </b-modal>
          <!-- </b-container> -->
        <!-- </b-col> -->
  </div>
</template>
<script>
const Config = require("../../../../config/config");
import { EthMagic } from '../../js/eth-magic'
import EngineerGame from '../../js/engineer'
import Arena from '../../js/arena'
import MYWeb3 from '../../js/web-3'

import axios from 'axios'

export default {
  data () {
    return {
      "upHere": false,
      "engineersName": [],
      "arenaData": {},
      "ETHERSCAN_URL": Config.ETHERSCAN_URL,
      "fields": [],
      "playersDef": [],
      "virusDefence": 0,
      "engineerPlayer": {
          "virusNumber": 0,
          "currentVirus": 0,
          "research": 0,
          "researchPerDay": 0,
          "lastUpdateTime": 0,
          "engineers": [0,0,0,0,0,0,0,0],
          "hasBooster": false
      },
      "current_virus": 0,
      "account": MYWeb3.getAccount(),
    }
  },
  mounted () {
    this.loadData();
    this.updateVirus();
    this.engineersName = game.engineersName;
  },
  methods: {   
    loadData () {
      let self = this;
      self.arenaData = game.arenaData;
      setInterval(() => {
        self.engineerPlayer = game.engineerPlayer;
        self.arenaData = game.arenaData;
      }, 1000);
    },
    withdraw () {
     EngineerGame.withdrawPayments(function (result) {});
    },
    updateVirus() {
      let self = this;
      setInterval(() => {
        var currentTime = (new Date()).getTime()
        var difference = (currentTime / 1000 - self.engineerPlayer.lastUpdateTime)
        var additional = self.engineerPlayer.virusNumber + difference * self.engineerPlayer.researchPerDay / game.VIRUS_MINING_PERIOD;
        self.current_virus = Math.floor(additional);
        game.currentVirus = self.current_virus; 
      }, 100);
    },
    showFormAddDefence() {
      this.$refs['add-defence'].show();
    },
    hideFormAddDefence() {
      this.$refs['add-defence'].hide();
    },
    addVirusDefence() {
      if ( this.virusDefence > this.current_virus ) return false;
      Arena.addVirusDef({
        "virusDef": this.virusDefence
      });
      this.hideFormAddDefence();
      this.virusDefence = 0;
    },
    formatBalence () {
      return parseFloat(parseFloat(this.engineerPlayer.playerBalance).toFixed(5));
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

<style lang="scss" scoped>
@import './src/assets/sprite.scss';
.error {
  color: red;
}
.top-header-inventory-enginner{
  border: 2px solid #e9e9e9;
  background-color: #ffffff;
}
.header-inventory-enginner{
  background-color: #eeeeee;
  margin: -21px -21px 20px;
  padding: 15px 0;
}
.list-item-mine{
  display: flex;
  justify-content: space-between;
  max-width: 835px;
}
.total-virus-count{
  color: #333333;
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
}
.title-virus{
  color: #333333;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
}
.virus-inventory-enginner{
  border-right: 2px solid #e9e9e9;
}
.virus-inventory-enginner .total-virus{
  padding: 10px 30px 10px 20px;
}
.virus-inventory-enginner .total-virus:last-child{
  padding-right: 60px;
  width:260px;
}
.title-power-virus{
  color: #888888;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
}
.title-power-virus span{
  font-weight: 700;
  color: #333333;
}
.virus-defend{
  padding: 10px 10px 5px 10px;
  position: relative;
}
.note-defend-message{
  position: absolute;
  width: 198px;
  height: 76px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  background-color: #353535;
  color: #ffffff;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  padding: 10px;
  right: -1px;
  top: 100%;
  z-index: 99;
}
.defend-info{
  padding: 0 15px 0 19px;
}
.defend-info .title-defend{
  background-color: #e53935;
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  width: 38px;
  height: 18px;
  border-radius: 2px;
  text-align: center;
}
.defend-info .count-defend{
  color: #333333;
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  margin-top: 7px;
}
.img-virus-defend{
  @include sprite($shield);
  display: inline-block;
  margin-bottom: 5px;
}
.img-total-virus{
  @include sprite($virut-engineer);
  display: inline-block;
  margin-right: 30px;
}
.img-power-virus{
  @include sprite($power-virut);
  display: inline-block;
  margin-right: 10px;
}
.img-setting-defend{
  @include sprite($settings);
  display: inline-block;
}
.img-note-defend{
  @include sprite($note);
  display: inline-block;
}
.icon-crystal {
  @include sprite($icon-crystal);
  display: inline-block;
  float: left;
      margin-top: 10px;
    margin-right: 17px;
}
span.icon-eth {
  @include sprite($icon-eth);
  display: block;
  float: left;
  margin-top: 5px;
  margin-right: 27px;
}
.list-item-engineer{
  display: flex;
  justify-content: space-between;
  max-width: 835px;
}
.item-engineer{
  color: #333333;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
}
.item-engineer span{
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
}
span.overlock {
  color:red;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
}
.engineer-player {
  /*box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21);*/
  padding:21px 21px 21px 21px;
}

.engineer-player .engineer-machine {
    border: 1px solid #e9e9e9;
    width: 45%;
    margin-right: 0px;
    margin-bottom: 17px;
}
.engineer-active {
  height: 100%;
}
.engineer-machine span.lever {
  width:20%;
  height: 100%;
  float: left;
  padding:17px;
  border-right:1px solid #e9e9e9;
  background-color: #f4f4f4;
}
.engineer-machine span.engineer {
    width: 60%;
    float: left;
    padding: 14px;
}
.engineer-machine span.icon-engineer {
  @include sprite($icon-miner);
  display: block;
  float: left;
  margin-right: 14px;
}
.engineer-inactive {
  background:#f4f4f4;
  height: 100%;
}
.engineer-inactive span.number .number-engineer {
  background: #b4b4b4;
}
.btn-primary{
    border: 2px solid #7c4a13;
    background-color: #c68632;
    border-radius: 0;
    font-weight: 700;
    padding: 10px 30px;
}
.engineer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.engineer-machine span.number {
  width:20%;
  float: left;
  padding:17px;
  text-align: center;
}
span.number .number-engineer {
  background: red;
  color:#fff;
  border-radius: 50%;
}
.stat {
  background-color: #eaeaea;
  border:1px solid #eaeaea;
  height: 100%;
  padding:17px;
}
.engineer-row {
    float: left;
    line-height: 36px;
}


.col-engineer-row{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.col-engineer-row .engineer-row{
  float: none;
  margin-right: 0;
  width: 49%;
}
.title-engineer-player{
  margin-bottom: 20px;
}
.row-engineer-player{
  margin: 0 -8px;
}
.col-inline{
  padding: 0 8px;
}
button.btn-success {
  border: 4px solid #d69848;
  border: 2px solid #7c4a13;
  background-color: #c68632;
  font-weight: 700;
  border-radius: 0;
  margin-left: 15px;
}
button.btn-success:hover{
  color: #fff!important;
    background-color: #0069d9!important;
    border-color: #0062cc!important;
}
.btn-engineer-withdraw{
  border: 4px solid #eeeeee!important;
  border: 2px solid #b4b4b4!important;
  background-color: #dfdfdf!important;
}
.btn-engineer-withdraw:hover{
      border: 4px solid #eeeeee !important;
    border: 2px solid #b4b4b4 !important;
    background-color: #dfdfdf !important;
}
.btn-quest{
  border: 4px solid #d69848;
    border: 2px solid #7c4a13;
    background-color: #c68632;
    border-radius: 0;
    font-weight: 700;
    padding: 10px 30px;
}
.modal-footer .btn-primary{
  border-radius: 0;
  font-size: 16px;
  font-weight: 700;
  border: 4px solid #d69848;
  border: 2px solid #7c4a13;
  background-color: #c68632;
}
.item-mine-engineer {
  color: #333333;
  font-size: 13px;
  font-weight: 400;
  line-height: 26px;
  margin-right: 80px;
}
.item-mine-engineer-bottom{
  color: #333333;
  font-size: 24px;
  line-height: 30px;
  /*font-family: "Montserrat - Regular";*/
  font-size: 15px;
  font-weight: 400;
}
.item-mine-engineer-bottom span{
  font-size: 24px;
  font-weight: 700;
}

.engineer-machine:nth-child(1) span.icon-engineer{
  @include sprite($engineer-1);
  display: block;
}
.engineer-machine:nth-child(2) span.icon-engineer{
  @include sprite($engineer-2);
  display: block;
}
.engineer-machine:nth-child(3) span.icon-engineer{
  @include sprite($engineer-3);
  display: block;
}
.engineer-machine:nth-child(4) span.icon-engineer{
  @include sprite($engineer-4);
  display: block;
}
.engineer-machine:nth-child(5) span.icon-engineer{
  @include sprite($engineer-5);
  display: block;
}
.engineer-machine:nth-child(6) span.icon-engineer{
  @include sprite($engineer-6);
  display: block;
}
.engineer-machine:nth-child(7) span.icon-engineer{
  @include sprite($engineer-7);
  display: block;
}
.engineer-machine:nth-child(8) span.icon-engineer{
  @include sprite($engineer-8);
  display: block;
}
@media (max-width:560px) {
  .player {
     padding: 30px;
  }
  .engineer-player {
    box-shadow:none!important;
    padding:0!important;
  }
  .engineer-machine span.lever {
    width:auto!important;
  }
  .engineer-machine span.number {
    width:20%!important;
  }
  .list-item-engineer {
    display: block!important;
  }
  .list-item-engineer .item-engineer {
    margin-bottom: 20px;
  }
  .engineer-player .engineer-machine {
    width:100%!important;
  }
  .list-item-mine{
    display: block!important;
  }
  
}
</style>  
