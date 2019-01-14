<template>
  <div class="factory" v-if="loadding == false">
    <b-container >
      <!-- <b-row>&nbsp;</b-row> -->
      <b-row class="sponsor-top">
        <b-col sm="8" style="padding: 0px;">
          <h2 class="title">Program Machine
          </h2>
        </b-col>
        <b-col sm="4">
     
          <b-row>
            <b-col sm="3" class="d-flex align-items-center">
              <span>
                  {{ factoryData.programs[0] }}
              </span>
              <span class="image">
                  <img src="../assets/program1.png" style="max-width: 100%; max-height: 100%" v-if="factoryData.programs[0] != 0"/> 
                  <img src="../assets/program1_inactive.png" style="max-width: 100%; max-height: 100%" v-if="factoryData.programs[0] == 0"/> 
              </span>
            </b-col>
            <b-col sm="3" class="d-flex align-items-center">
              <span>
                  {{ factoryData.programs[1] }}
              </span>
              <span class="image">
                  <img src="../assets/program2.png" style="max-width: 100%; max-height: 100%" v-if="factoryData.programs[1] != 0"/> 
                  <img src="../assets/program2_inactive.png" style="max-width: 100%; max-height: 100%" v-if="factoryData.programs[1] == 0"/> 
              </span>

            </b-col>
            <b-col sm="3" class="d-flex align-items-center">
                <span>
                  {{ factoryData.programs[2] }}
              </span>
                <span class="image">
                  <img src="../assets/program3.png" style="max-width: 100%; max-height: 100%" v-if="factoryData.programs[2] != 0" /> 
                  <img src="../assets/program3_inactive.png" style="max-width: 100%; max-height: 100%" v-if="factoryData.programs[2] == 0" /> 
              </span>
            </b-col>
            <b-col sm="3" class="d-flex align-items-center">
              <span>
                  {{ factoryData.programs[3] }}
              </span>
              <span class="image">
                  <img src="../assets/program4.png" style="max-width: 100%; max-height: 100%" v-if="factoryData.programs[3] != 0"/> 
                  <img src="../assets/program4_inactive.png" style="max-width: 100%; max-height: 100%" v-if="factoryData.programs[3] == 0"/> 
              </span>
            </b-col>
          </b-row> 
        </b-col>
        </b-col>

      </b-row>
     
        <b-row>
          <div class="factory-content">
            <b-row>
             <b-col sm="6" class="info">
              <span class="name-factory"> 
              Program Machine (level {{ factoryData.factoryLevel }})</span></br>
              <p>The Program Machine is a machine to produce magical programs. You can use that powerful program to turn the tide of battle in your Favor.<br>Upgrade your Program Machine to unlock more special programs.</p>
              <b-btn 
                class="btn" 
                @click="loadUpdateFactoryModal()" 
                :disabled="(factoryData.factoryTotal == factoryData.factoryLevel && factoryData.factoryLevel != 0) || showUpdateTime()"
                >Upgrade
              </b-btn>
              <b-btn class="btn" @click="loadBuyProgaramsModal()">Produce Program</b-btn>
             </b-col>
             <b-col sm="6" class="image">
              <div class="image">
                <img src="../assets/program_machine_static_0.png" v-if="checkFactoryLevel(0) && !showUpdateTime()">
                <img src="../assets/program_machine_1.gif" v-if="checkFactoryLevel(1) && !showUpdateTime()">
                <img src="../assets/program_machine_2.gif" v-if="checkFactoryLevel(2) && !showUpdateTime()">
                <img src="../assets/program_machine_3.gif" v-if="checkFactoryLevel(3) && !showUpdateTime()">
                <img src="../assets/program_machine_4.gif" v-if="checkFactoryLevel(4) && !showUpdateTime()">
                <img src="../assets/program_machine_upgrade.gif" v-if="showUpdateTime()">
              </div>
              <div class="update-time time" v-if="showUpdateTime()">
                <div class="update-time-line">
                  <div class="progress">
                    <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" class="progress-bar bg-primary" style="width: 0%;" id="line-update-time"><!----></div>
                  </div>
                </div>
                <div class="time">


                 <span>
                    <!-- {{cd_mini_game_start}} -->
                    <!-- <span class="time-coudown">{{cd_airdrop_game_start.day}}</span> : -->
                    <span class="time-coudown">{{cd.day}}</span> :
                    <span class="time-coudown">{{cd.hour}}</span> :
                    <span class="time-coudown">{{cd.min}}</span> :
                    <span class="time-coudown">{{cd.sec}}</span>
                  </span>
                </div>
              </div>
             </b-col>
           </b-row>
         </div>
        </b-row>

    </b-container>

     <b-modal ref="update-factory" size="lg" hide-footer :title="getUpgradeTitle()">
        <div class="next-level clearfix">
          <div class="image" style="margin-bottom: 30px;">
            <img src="../assets/program_machine_static_1.png" v-if="checkFactoryLevel(0)">
            <img src="../assets/program_machine_static_2.png" v-if="checkFactoryLevel(1)">
            <img src="../assets/program_machine_static_3.png" v-if="checkFactoryLevel(2)">
            <img src="../assets/program_machine_static_4.png" v-if="checkFactoryLevel(3)">
          </div>  
          <div class="level clearfix">
            <span class="center">Unlocks {{ getProgramName(parseFloat(factoryData.factoryLevel) + 1) }}</span>
          </div>

          <div class="program-unlock">
            <img style="width: 50%" src="../assets/program1.png" v-if="checkFactoryLevel(0)">
            <img style="width: 50%" src="../assets/program2.png" v-if="checkFactoryLevel(1)">
            <img style="width: 50%" src="../assets/program3.png" v-if="checkFactoryLevel(2)">
            <img style="width: 50%" src="../assets/program4.png" v-if="checkFactoryLevel(3)">
          </div>
		  <div class="program-description" style="font-size: 12px;">


          <p v-if="checkFactoryLevel(0)">Clone Program will increase your viruses<br/>by 10% when attack</p>
          <p v-if="checkFactoryLevel(2)">Use this program to increase your dmg by 20%</p>
          <p v-if="checkFactoryLevel(1)">The Reborn Program summon 15% your viruses from the dead<br/> and continue attack</p>
          <p v-if="checkFactoryLevel(3)">This Program will send 5%<br>of your opponent defense viruses to Hell</p>
		
		  </div>
        </div>
        <div class="update-info clearfix">
		  <p class="clearfix">Cost</p>
          <div class="price-crystals clearfix" style="margin-bottom: 10px;">
            <span class="title left">Crystals: </span>
            <span 
              class="price right"
              v-if="updateFactoryInfo[parseFloat(factoryData.factoryLevel) + 1]"
              >{{ updateFactoryInfo[parseFloat(factoryData.factoryLevel) + 1].crystals }}</span>
          </div>
          <div class="price-eth clearfix" style="margin-bottom: 10px;">
            <span class="title left">ETH: </span>
            <span 
              class="price right"
              v-if="updateFactoryInfo[parseFloat(factoryData.factoryLevel) + 1]"
              >{{ updateFactoryInfo[parseFloat(factoryData.factoryLevel) + 1].eth }}</span>
            <span class="icon-eth"></span>
          </div>
          <div class="update-time clearfix" style="margin-bottom: 10px;">
            <span class="title left" style="width: 40%">Upgrade time: </span>
            <span 
			         style="width: 60%;"
              class="time right"
              v-if="updateFactoryInfo[parseFloat(factoryData.factoryLevel) + 1]"
              >{{ updateFactoryInfo[parseFloat(factoryData.factoryLevel) + 1].time }}</span>
            <span class="icon-time"></span>
          </div>
        </div> 
        <div class="button-factory">
           <button class="form-control btn btn-attack" @click="updateFactory()" >Upgrade</button>
        </div>
     </b-modal>


      <b-modal ref="buy-programs" class="produce-program-modal" size="lg" hide-footer title="Produce Program">
         <b-row class="row-program">
          <b-col lg="6"></b-col>
          <b-col lg="6" sm="12">
            <b-form inline>
              <div>
                <div v-if="total != 0">{{$t('message.total').replace('{$}', total)}}</div>
                <div v-if="insufficient" style="color:red"></div>
              </div>
              <b-button class="btn-exc" v style="margin-left:10px;" @click="buyProgarams()" v-if="factoryData.factoryLevel != 0">Produce</b-button>
            </b-form>
          </b-col>
          <b-col class="col-program" lg="3" sm="6" v-for="(program,i) in programsBuy" :key="i">
            <div class="program">
              <b-card 
                :title="getProgramName(i + 1)" 
                :img-src="createImageSrc(i+1)" 
                img-alt="SCV" 
                img-top tag="article" 
                style="padding: 5px;border-radius: 0;">
                <p class="card-text clearfix" style="font-size: 11px; height: 60px">
					         <!-- Clone Program will increase your attack viruses by 20% -->
                  <span v-if="i == 0">Clone Program will increase your viruses by 10% when attack</span>
                  <span v-if="i == 2">Use this program to increase your dmg by 20%</span>
                  <span v-if="i == 1">The Reborn Program summon 15% your viruses from the dead and continue attack</span>
                  <span v-if="i == 3">This Program will send 5% of your opponent defense viruses to Hell</span>
                </p>
                <div class="price" style="margin-bottom: 10px;">
                  <p class="card-text clearfix">
                    <span class="left">Cost:</span>
                    <span class="right">{{ programPriceByCrystals[i] }} Crystals</span>
                  </p>
                </div>
                <div style="display:flex;align-items:center;justify-content: space-between;width: 100%;" v-if="validateBuyProgram(i)">
                  <b-input-group style="width: 100%;;background-color: #d69848;">
                    <button class="form-control btn btn-outline-primary" @click="decrease(i)">-</button>
                    <div style="display:flex;align-items:center;justify-content: center;">
                    <input 
                      type="text" 
                      required="required" 
                      v-model="programsBuy[i]" 
                      class="form-control" style="margin-left:0px;width:55px;background-color: #d69848;color:#fff;text-align: center;;border: 0;padding:0;">
                  </div>
                    <button class="form-control btn btn-outline-primary" @click="increase(i)">+</button>
                  </b-input-group>
                 <!--  <div style="margin-left:10px">{{$t('message.a')}}</div> -->
                </div>
              </b-card>
            </div>
          </b-col>
        </b-row>
      </b-modal>

  </div>
</template>
<script>
import Factory from '../js/factory';
export default {
  data () {
    return {
      "factoryData": {},
      "updateFactoryInfo": {},
      "programPriceByCrystals": [],
      "cd": {
        "day": '00',
        "hour": '00',
        "min": '00',
        "sec": '00'
      },
      'programsBuy': [],
      "loadding": true
    }
  },
  mounted () {
    this.loadData();
    this.countDownUpdateTime();
  },
  computed: {
    total () {
      let total = 0;
      for (let index = 0; index < this.programsBuy.length; index++) {
        const element = this.programsBuy[index];
        total += parseInt(element) * parseInt(game.programPriceByCrystals[index]);
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

      if (this.validateBuyProgram(index - 1) == true) return "/dist/program"+index+".png";

      return "/dist/program" + index + "_inactive.png";      
    },
    getUpgradeTitle() {
      let nextLevel = parseFloat(this.factoryData.factoryLevel) + 1;
      return "Upgrade to level " + nextLevel + "?";
    },
    getProgramName(level) {
      let name = "";

      if (level == 1) name = "Clone Program";
      if (level == 3) name = "Dmg Program";
      if (level == 2) name = "Reborn Program";
      if (level == 4) name = "Poison Program";

      return name;
    },
    setLineUpdateTime() {
      let lineUpTime = document.getElementById("line-update-time");
      let timeUp = 0;
      let timeDefault = 60 * 60 * 4;
      if (this.factoryData.factoryLevel == 0) timeUp = timeDefault * 1;
      if (this.factoryData.factoryLevel == 1) timeUp = timeDefault * 2;
      if (this.factoryData.factoryLevel == 2) timeUp = timeDefault * 3;
      if (this.factoryData.factoryLevel == 3) timeUp = timeDefault * 6;

      let now = ( new Date() ).getTime() / 1000;
      let cd = parseFloat( this.factoryData.factoryTime ) - now;

      if (cd <= 0) cd = 0;

      if (lineUpTime) lineUpTime.style.width = (100 - cd / timeUp * 100) + "%";
    },
    loadData() {
      let self = this;
      this.factoryData       = game.factoryData;
      this.updateFactoryInfo = game.updateFactoryInfo;
      this.programPriceByCrystals = game.programPriceByCrystals;
      this.loadding = false;
      setInterval(() => {
        self.factoryData = game.factoryData;
        self.programPriceByCrystals = game.programPriceByCrystals;

        if (self.programsBuy <= 0) self.setProgramsBuyDefault();

        if (self.showUpdateTime()) self.setLineUpdateTime();

      },1000);
    },
    setProgramsBuyDefault() {
      let programsBuy = [];
      for (let idx = 0; idx < game.factoryData.programs.length; idx++) {
        programsBuy.push(0);
      }
      this.programsBuy = programsBuy;
    },
    checkFactoryLevel(level) {
      if (this.factoryData.factoryLevel == level) return true;
      return false;
    },
    showUpdateTime() {
      let now = (new Date()).getTime() / 1000;
      if (now >= this.factoryData.factoryTime) return false;
      return true;
    },
     dealNum (val) {
      let str = Math.floor(val)
      return (str < 10 ? '0' : '') + str
    },
     getTimeCountDown( time ) {
      return {
        "day": this.dealNum(time / (24 * 60 * 60)),
        "hour": this.dealNum((time % (24 * 60 * 60)) / (60 * 60)),
        "min": this.dealNum((time % (60 * 60)) / 60),
        "sec": this.dealNum(time % 60)
      };
    },
    countDownUpdateTime() {
      let self = this;
      setInterval(() => {
          let updateTime = parseFloat( this.factoryData.factoryTime );
          let now = ( new Date() ).getTime() / 1000;
          let cd = updateTime - now;
          if ( cd > 0 ) {
            self.cd = self.getTimeCountDown( cd );
          }
      }, 1000);
    },
    loadBuyProgaramsModal() {
       this.$refs['buy-programs'].show();
    },
    loadUpdateFactoryModal() {
      if (this.showUpdateTime() == true) return false;
      if (this.factoryData.factoryTotal == this.factoryData.factoryLevel && this.factoryData.factoryLevel != 0) return false;
      this.$refs['update-factory'].show();
    },
    decrease (idx) {
      if (this.validateBuyProgram(idx) == false) return false;
      this.$set(this.programsBuy, idx, parseInt(this.programsBuy[idx]) - 1);
      if (this.programsBuy[idx] <= 0) {
        this.$set(this.programsBuy, idx, 0);
      }
    },
    validateBuyProgram(idx) {
      if (this.factoryData.factoryLevel <= idx) return false;
      return true;
    },
    increase (idx) {

      if (this.validateBuyProgram(idx) == false) return false;
      this.$set(this.programsBuy, idx, parseInt(this.programsBuy[idx]) + 1); 
      // const number = game.user.miners[idx];
      // var miner = this.minerData[idx]
      // this.miners[idx].number = parseInt(this.miners[idx].number) + 1;
      // if (this.miners[idx].number > miner.limit - number) {
      //   this.miners[idx].number = miner.limit - number;
      // }
    },
    updateFactory() {
      if (this.showUpdateTime() == true) return false;
      if (this.factoryData.factoryTotal == this.factoryData.factoryLevel && this.factoryData.factoryLevel != 0) return false;
      if (!this.updateFactoryInfo[parseFloat(this.factoryData.factoryLevel) + 1]) return false;
      let eth      = this.updateFactoryInfo[parseFloat(this.factoryData.factoryLevel) + 1].eth;

      Factory.updateFactory({ eth });

      this.$refs['update-factory'].hide();

    },
    buyProgarams() {
      let programs = this.programsBuy;
      Factory.buyProgarams({ programs });
      this.setProgramsBuyDefault();
      this.$refs['buy-programs'].hide();
    }
  },
}
</script>
<style lang="scss" scoped>

  .produce-program-modal {
	text-align: center;
	.card-body {
		padding: 0;
	}
	.card {
		border: 0;
	}
  }
  .border-active { border: 2px solid #d69848;}
  .border-default { border: 2px solid #e9e9e9; }
  .factory {
    margin-top: 35px;
  }
  .factory h2.title {
      color: #333333;
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 19px;
  }
  .factory-content {
      box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21);
      background-color: #ffffff;
      padding: 21px;
      width: 100%;
  }
  .image {
    text-align: center;
  }
  .info {
      color: #333333;
      font-size: 12px;
      font-weight: 400;
      line-height: 24px;
  }
  .info span.name-factory {
      font-size: 24px;
      font-weight: 700;
  }
  .info p {
    font-size: 14px;
    font-weight: 500;
    color: #888888;
    line-height: 24px;
  }
  .info button {
      border: 2px solid #7c4a13 !important;
      background-color: #c68632 !important;
      color: #fff !important;
      border-radius: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      outline: none;
      color: #ffffff;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      float: left;
      margin-right: 6px;
  }
  .info button.disabled , .info button:disabled {
      border: 2px solid #b4b4b4 !important;
      background-color: #dfdfdf !important;
  }
  .next-level {
    text-align: center;
    width: 40%;
    margin: 0 auto;
  }
  .update-info {
    text-align: center;
    width: 40%;
    margin: 0 auto;
  }
  .button-factory {
    width: 98px;
    margin: 0 auto;
  }
  button.btn-attack {
    border: 2px solid #7c4a13 !important;
    background-color: #c68632 !important;
    color: #fff !important;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    outline: none;
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    float: left;
    margin-right: 6px;
  }
  span.left {
    width: 30%;
    float: left;
    text-align: left;
  }
  span.right {
    width: 70%;
    float: right;
    text-align: right;
  }
  .program img.card-img-top {
    margin: 0 auto;
  }
  .card-body h4.card-title {
      font-size: 18px;
      font-weight: 700;
  }
  .card-text {
    font-size: 13px;
    font-weight: 500;
    line-height: 24px;
  }
  button.btn-outline-primary {
    color: #fff;
    border-color: #d69848;
  }
  form.form-inline {
    float: right;
    margin-bottom: 10px;
  }
  form button.btn-exc {
    border: 4px solid #d69848;
    border: 2px solid #7c4a13;
    background-color: #c68632;
    border-radius: 0;
    font-weight: 700;
    padding: 10px 30px;
  }
  .update-time-line .progress {
    height: 12px;
    background-color: #475c76;
    width: 30%;
    margin: 0 auto;
	border-radius: 0 !important;
  }
  .progress .bg-primary {
    background-color: #a3d030 !important;
	border-radius: 0 !important;
  }
  @media (max-width:812px) {
    .factory {
      padding: 10px;
    }
    .factory h2.title {
       font-size: 24px;
    }
    .factory-content {
      padding: 30px 25px;
      overflow: hidden;
    }
    .factory-content .info {
      margin-bottom: 20px;
    }
  }
</style>