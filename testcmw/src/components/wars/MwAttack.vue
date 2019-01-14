<template>
 	<div class="arena">
      <div class="main-arena" v-if="status == 'main-arena'">
        
          <b-row style='margin-bottom: 20px;'>
            <b-col sm='4'>
              <div class="d-flex align-items-center">
                <div v-if="nextTimeAtk > (new Date()).getTime() / 1000" class="mr-5">
                  <div class="title">Cooldown Attack:</div>
                  <div class="result-arena">
                    <span class="cd-time-atk">
                      <span class="time-coudown">{{cdTimeAtk.min}}</span> :
                      <span class="time-coudown">{{cdTimeAtk.sec}}</span>
                    </span>
                  </div>
                </div>
                <div class="mr-4">

                  <!-- <img src="../assets/program1.png" style="display: none"/> 
                  <img src="../assets/program2.png" style="display: none"/> 
                  <img src="../assets/program3.png" style="display: none"/> 
                  <img src="../assets/program4.png" style="display: none"/> 
				  -->
                 <!--  <div class="title">Your Reward</div>
                  <div class="d-flex align-items-center">
                    <span class="img-crystal-arena mr-2"></span>
                    <div class="result-arena">{{ yourReward }}</div>
                  </div> -->
                </div>
                <!-- <button type="button"  @click="claimReward" class="btn-header-arena btn-claim text-center">Claim</button> -->
            </div>
            </b-col>
            <b-col sm="4">
                 <b-row>
                  <!-- <b-col sm="4">
                      <div class="virus-inventory-enginner d-flex">
                        <div class="total-virus d-flex align-items-center">
                          <span class="img-total-virus"></span>
                          <div class="info-total-virus" style="width: 140px;">
                            <div class="title-virus">Your Virus</div>
                            <div class="total-virus-count">{{$t('message.cur2').replace('{$}', formateToken(currentVirus))}}</div>
                          </div>
                        </div>
                      </div>
                    </b-col> -->
                    <b-col sm="8">
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
                </b-row>
            </b-col>
            <b-col sm='4'>             
              <button type="button" @click="randomPlayersDefence" class="btn-header-arena btn-refresh" style="float: right;"><span class=" refresh-arena mr-2" ></span> Refresh</button>
            </b-col>
          </b-row> 

        <div class="list-arena">
          <b-row>
            <b-col  lg="4" sm="6" v-for="(item, idx) in playersDefInfo" :key="idx">
              <div v-if="playersDefInfo[idx]" class="item-arena">
                <div class="img-arena d-flex justify-content-center align-items-center" style="height: 155px;" 
                :class="{
                  'color-0': colors[idx] == 0, 
                  'color-1': colors[idx] == 1, 
                  'color-2': colors[idx] == 2,
                  'color-3': colors[idx] == 3,
                  'color-4': colors[idx] == 4,
                  'color-5': colors[idx] == 5,
                  'color-6': colors[idx] == 6,
                  'color-7': colors[idx] == 7,
                  'color-8': colors[idx] == 8,
                  'color-9': colors[idx] == 9,
                }
                ">
                  <span class="img-warrior"></span>
                </div>
                <div class="info-arena">
                  <h3 class="title">{{ item.defAddress }}</h3>
                  <div class="sub-title d-flex align-items-center"><span >DEF</span>{{ formateToken(item.def) }}</div>
                  <div class="total-crystal-arena d-flex align-items-center"><span class="img-crystal-arena"></span> {{ formateToken(item.crystals) }}</div>
                  <div class="outline-btn-arena text-center" v-if="nextTimeAtk <= ( new Date() ).getTime() / 1000 && currentVirus != 0">
                    <button type="button" class="btn-arena mx-auto" @click="loadAttackModal(idx)" :disabled="currentVirus == 0">Attack</button>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </div>
      </div>
      <div class="your-army" v-if="status == 'your-army'">
        <!-- <b-modal ref="atk-player" size="lg" title="Your Army" @ok="attack(defAddressIdx)"> -->
          <div class="input-atk" v-if="nextTimeAtk <= ( new Date() ).getTime() / 1000 && currentVirus != 0">
                        <b-form>
              						<b-form-group
              						label="Number of viruses sent to attack:"
              						>
              							<b-form-input v-model="virusAttack[defAddressIdx]" :class="{error: (virusAttack[defAddressIdx] > currentVirus)}" placeholder="Enter number">
              							</b-form-input>
              						</b-form-group>
                          <b-form-group
                          label="Programs:"
                          v-if="hasProgram()"
                          >
                          <b-form-checkbox-group id="checkboxes2" v-model="programs">
                            <div class="programs-info">
                                <b-row class="row-program">

                                  <b-col class="col-program" lg="3" sm="6" @click="chooseProgram(0)" v-if="factoryData.programs[0] != 0">
                                    <!-- v-if="factoryData.programs[i] != 0" -->
                                    <div class="program" style="cursor: pointer;"> 
                                      <div class="program-active" v-if="programs[0] != 0">
                                        <img src="../../assets/program1.png" style="max-width: 100%; max-height: 100%">
                                      </div>

                                      <div class="program-inactive" v-if="programs[0] == 0">
                                        <img src="../../assets/program1_inactive.png" style="max-width: 100%; max-height: 100%">
                                      </div>

                                        <input type="checkbox" style='cursor: pointer;' name="programs" :checked="programs[0] != 0">
                                        <span class="program-name">Clone Program</span >
                                    </div> 
                                  </b-col>

                                   <b-col class="col-program" lg="3" sm="6"  @click="chooseProgram(1)" v-if="factoryData.programs[1] != 0">
                                    <!-- v-if="factoryData.programs[i] != 0" -->
                                    <div class="program" style="cursor: pointer;" > 
                                      <div class="program-active" v-if="programs[1] != 0">
                                        <img src="../../assets/program2.png" style="max-width: 100%; max-height: 100%">
                                      </div>

                                      <div class="program-inactive" v-if="programs[1] == 0">
                                        <img src="../../assets/program2_inactive.png" style="max-width: 100%; max-height: 100%">
                                      </div>

                                        <input type="checkbox" style='cursor: pointer;' name="programs" :checked="programs[1] != 0">
                                        <span class="program-name">Reborn Program</span>
                                    </div> 
                                  </b-col>

                                   <b-col class="col-program" lg="3" sm="6" @click="chooseProgram(2)" v-if="factoryData.programs[2] != 0">
                                    <!-- v-if="factoryData.programs[i] != 0" -->
                                    <div class="program" style="cursor: pointer;"> 
                                      <div class="program-active" v-if="programs[2] != 0">
                                        <img src="../../assets/program3.png" style="max-width: 100%; max-height: 100%">
                                      </div>

                                      <div class="program-inactive" v-if="programs[2] == 0">
                                        <img src="../../assets/program3_inactive.png" style="max-width: 100%; max-height: 100%">
                                      </div>

                                        <input type="checkbox" style='cursor: pointer;' name="programs" :checked="programs[2] != 0">
                                        <span class="program-name">Dmg Program</span>
                                    </div> 
                                  </b-col>

                                   <b-col class="col-program" lg="3" sm="6" @click="chooseProgram(3)"  v-if="factoryData.programs[3] != 0">
                                    <!-- v-if="factoryData.programs[i] != 0" -->
                                    <div class="program" style="cursor: pointer;"> 
                                      <div class="program-active" v-if="programs[3] != 0">
                                        <img src="../../assets/program4.png" style="max-width: 100%; max-height: 100%">
                                      </div>

                                      <div class="program-inactive" v-if="programs[3] == 0">
                                        <img src="../../assets/program4_inactive.png" style="max-width: 100%; max-height: 100%">
                                      </div>

                                        <input type="checkbox" style='cursor: pointer;' name="programs" :checked="programs[3] != 0">
                                        <span class="program-name">Poison Program</span>
                                    </div> 
                                  </b-col>
                                </b-row>
                            </div>
                          </b-form-checkbox-group>
                          </b-form-group>
                        </b-form>
                        <button type="button" class="btn-arena mx-auto" @click="attack(defAddressIdx)" :disabled="currentVirus == 0">Attack</button>
                    </div>
        <!-- </b-modal> -->
      </div>
  </div>
</template>

<script>

const Config = require("../../../../config/config");
import { EthMagic } from '../../js/eth-magic';
import EngineerGame from '../../js/engineer';
import Arena from '../../js/arena';
import MYWeb3 from '../../js/web-3';

export default {
  data () {
    return {
      "status": "main-arena",
      "factoryData": {},
      "programs": [0, 0, 0, 0],
      "defAddressIdx": 0, // index of add you want atk
      "colors": [1, 2, 3],
      "miners": [0, 0, 0, 0, 0, 0, 0, 0],
      "isRandom": false, 
      "playersDef": [],
      "virusAttack": [],
      "currentVirus": 0,
      "nextTimeAtk": 0,
      "playersDefInfo": [],
      "cdTimeAtk": {
        "min": 0,
        "sec": 0
      }
    }
  },
  components: {

  },
  mounted () {
    this.loadData();
    this.countDownTimeAtk();
    this.setPlayersDefInfoDefault();
  },
  methods: {
  	 createImageSrc (index) {
      
      if (this.factoryData.factoryLevel <= index) return "/dist/program"+index+".png";

      return "/dist/program" + index + "_inactive.png";      
    },
    loadData() {
      let self = this;
      self.factoryData       = game.factoryData;
      setInterval(() => {
        self.nextTimeAtk = game.arenaData.nextTimeAtk;
        self.currentVirus = game.currentVirus;
        self.factoryData       = game.factoryData;

        if (self.programs <= 0) self.setProgramsDefault();
      }, 1000);
    },
    setProgramsDefault() {
      let programs = [0, 0, 0, 0];
      //for (let idx = 0; idx < game.factoryData.programs.length; idx++) {
        //if (game.factoryData.programs[idx] == 0) programs.push(0);
        //else programs.push(1);
      //}
      this.programs = programs;
    },
    hasProgram() {
      let result = false;
      for (let idx = 0; idx < game.factoryData.programs.length; idx++) {
        if (game.factoryData.programs[idx] != 0) result = true;
      }
      return result;
    },
    loadAttackModal(idx) {
      this.defAddressIdx = idx;
      this.setProgramsDefault();
      this.showAtkPlayerModal(); 
    },
    showAtkPlayerModal() {
      this.status = 'your-army';
    },
    showMainArenaModal() {
      this.status = 'main-arena';
    },
    setPlayersDefInfoDefault() {
      this.playersDefInfo = [
        {
          defAddress: "Loading", def: "Loading", crystals: "Loading"
        }, 
        {
          defAddress: "Loading", def: "Loading", crystals: "Loading"
        }, 
        {
          defAddress: "Loading", def: "Loading", crystals: "Loading"
        }
      ];
    },
    randomPlayersDefence() {
      let self = this;
      if ( self.isRandom == true ) return false;
      
      self.isRandom = true;
      self.playersDef = [];
      self.setPlayersDefInfoDefault();
	    
      let players = JSON.parse(JSON.stringify(game.players));

      if (players.length <= 0) return false;
      
      random();
      function random() {
        let index = self.randomInRange(0, players.length - 1);
        let address = players[index];
        if ( isPlayerAtk(address) == true ) {
            players.splice ( index , 1 );
            random();
        } else if ( typeof address == 'undefined' ) {
          self.getPlayersDefenceInfo();
          self.randomColor();
          return true;
        } else {
          EngineerGame.calCurrentCrystals({ address }, function ( err, _currentCrystals) {
                if ( err ) return false;
                if (_currentCrystals < 5000) {
                  players.splice ( index , 1 );
                  random();
                } else {
                  self.playersDef.push(players[index]);
                  players.splice ( index , 1 );
                  if (self.playersDef.length == 3 || players.length <= 0) {
                      self.getPlayersDefenceInfo();
                      self.randomColor();
                      return true;
                  }
                  random();
                }
              });
        }
      }
      function isPlayerAtk(address) {
        if (address == MYWeb3.getAccount()) return true;
        return false;  
      }
    },
    revengePlayer(address) {
      let playersDef = [];
      let playersDefInfo = [];
      playersDefInfo[0] = {
          defAddress: "Loading", def: "Loading", crystals: "Loading"
      };
      playersDef[0] = address;
      this.playersDef = playersDef;
      this.playersDefInfo = playersDefInfo;
      this.getPlayersDefenceInfo();
      this.randomColor();
    },
    randomColor() {
      let self = this;
      self.colors = [];
      function random() {
        let index = self.randomInRange(0, 9);
        if (self.colors.includes(index) == false) {
          self.colors.push(index);
        }
        if (self.colors.length < 3) {
          random();
        } else {
          return true;
        }
      }
      random();
    },
    randomInRange(start,end){
       return Math.floor(Math.random() * (end - start + 1) + start);
    },
    // attack(idx) {
    //   EngineerGame.attack({ 
    //     "pAtkAddress": this.playersDefInfo[idx].defAddress, 
    //     "virusAttack": this.virusAttack[idx]
    //   });
    //   this.virusAttack[idx] = '';
    // },
    chooseProgram(idx) {
      if (this.factoryData.programs[idx] <= 0) return false;
      let program = this.programs[idx];
      if (program == 0) program = 1;
      else program = 0;
      this.programs[idx] = program;
    },
    checkProgramsActive(idx) {
      let program = this.programs[idx];
      if (program == 1) return true;
      return false;
    },
    validateAtk(idx) {
      let status = true;
      if (this.virusAttack[idx] <= 0 || typeof this.virusAttack[idx] == "undefined") status = false;
      return status;
    },
    attack(idx) {

      if (this.validateAtk(idx) == false) return false;
      let programs = this.programs;

      // programs = [1, 0, 0 ,2]
      // console.log(programs);
      if (programs.length != 4) return false;

      Arena.attack({ 
        "defAddress": this.playersDefInfo[idx].defAddress, 
        "virusAtk": this.virusAttack[idx],
        programs
      });
      this.virusAttack[idx] = '';
      this.setProgramsDefault();
      this.$emit('hiddenAttackModal');
      // this.status = 'main-arena';
    },
    setCanAtkForPlayerDef(index) {
      let self = this;
      if (self.isRandom == true) return false;
      self.setCanAttack(MYWeb3.getAccount(), self.playersDefInfo[index].defAddress, index);

    },
    setCanAttack( atkAddress, defAddress, idxPDef ) {
      let self = this;

      if ( MYWeb3.isAddress(defAddress) == false ) return false; 
      EngineerGame.canAttack({ 
        atkAddress, 
        defAddress 
      }, function ( err, result ) {
        if ( err ) return false;
        let pDef = self.playersDefInfo[idxPDef];  
        if ( pDef && pDef.defAddress == defAddress ) { 
          self.playersDefInfo[idxPDef].canAtk = result;
        }
      });
    },
    // getPlayersDefenceInfo() {
    //   let self = this;
    //   if (self.playersDef.length <=0) return false;
    //   if (self.playersDef.length < 3) {
    //     let count = self.playersDef.length;
    //     self.playersDefInfo.splice ( count - 1 , 3 - count );
    //   }
    //   let countPDef = self.playersDef.length;

    //   self.playersDef.forEach(player);
    //   function player(address, index) {
    //     EngineerGame.getPlayerDataForDef({ "playerAddess": address }, (err, _playerData) => {
    //       if ( err ) return false;
    //       EngineerGame.calCurrentCrystals({ address }, ( err, _currentCrystals) => {
    //         if ( err ) return false;
    //         let player = {
    //           "def": _playerData.virusDefence,
    //           "defAddress": address,
    //           "crystals": _currentCrystals,
    //           "canAtk": true
    //         };
    //         self.$set(self.playersDefInfo, index, player); 

    //         if (index == countPDef - 1) self.isRandom = false;
    //       });
    //     });
    //   }
    // },
     getPlayersDefenceInfo() {
      let self = this;
      if (self.playersDef.length <=0) return false;
      if (self.playersDef.length < 3) {
        let count = self.playersDef.length;
        self.playersDefInfo.splice ( count - 1 , 3 - count );
      }
      let countPDef = self.playersDef.length;

      self.playersDef.forEach(player);
      function player(address, index) {

        Arena.getData({ address }, (err, data) => {
          if (err) return false;
          let player = {
              "def": data.virusDef,
              "defAddress": address,
              "crystals": data.currentCrystals,
              "canAtk": data.canAtk
          };
          self.$set(self.playersDefInfo, index, player); 

          if (index == countPDef - 1) self.isRandom = false;
        });

      }
    },
     countDownTimeAtk() {
      let self = this;
      setInterval(() => {
          let now = ( new Date() ).getTime() / 1000;  
          let cd = self.nextTimeAtk - now;
          if ( cd <= 0 ) return self.cdTimeAtk = { "min": 0, "sec": 0 };
          return self.cdTimeAtk = self.getTimeCountDown( cd );
      }, 1000);
    },
    getTimeCountDown( time ) {
      return {
        "day": this.dealNum(time / (24 * 60 * 60)),
        "hour": this.dealNum((time % (24 * 60 * 60)) / (60 * 60)),
        "min": this.dealNum((time % (60 * 60)) / 60),
        "sec": this.dealNum(time % 60)
      };
    },
    dealNum (val) {
      let str = Math.floor(val)
      return (str < 10 ? '0' : '') + str
    },
    formateToken (labelValue) {
      if(labelValue === "Loading") return "Loading";
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
  @import './src/assets/sprite.scss';
  .header-arena{margin-bottom: 30px;}
  .main-arena {
    padding: 15px;
  }
  .btn-header-arena{color: #333333;font-size: 16px;font-weight: 700;border: 2px solid #e9e9e9;background-color: #ffffff;cursor: pointer;}
  .btn-claim{width: 107px;height: 48px;}
  .btn-refresh{width: 153px;height: 48px;}
  .refresh-arena{@include sprite($refresh);display: inline-block;position: relative;top: 5px;}
  .header-arena .title{color: #333333;font-size: 13px;font-weight: 400;line-height: 20px;}
  .item-arena .img-warrior{@include sprite($knight);display: inline-block;}
  .result-arena{color: #333333;font-size: 24px;font-weight: 700;line-height: 30px;}
  .btn-arena{@include sprite($button-arena);display: flex;align-items: center;justify-content: center;border: 0;outline: none;color: #ffffff;font-size: 16px;font-weight: 700;cursor: pointer;}
  .img-crystal-arena{@include sprite($crystal-arena);display: inline-block;}
  .info-arena{border: 2px solid #e9e9e9;border-top: 0;}
  .info-arena h3{color: #333333;font-size: 12px;font-weight: 700;margin:15px 0 10px;padding: 0 20px;
     display: inline-block;width: 100%;word-break: break-all;}
  .info-arena div{padding: 0 20px;color: #333333;font-size: 15px;font-weight: 500;}
  .info-arena .sub-title span{width: 38px;height: 22px;border-radius: 2px;background-color: #e53935;color: #ffffff;display: flex;justify-content: center;align-items: center;}
  .info-arena span{margin-right: 7px;}
  .info-arena div.total-crystal-arena{padding: 8px 20px;background-color: #efefef;margin-top: 14px;}
  .info-arena div.outline-btn-arena{padding: 15px 0;}
  .list-arena .row .col-sm-4{padding: 0 8px;}
	
  .players-defence { margin-top: 35px; }
  .players-defence .image { max-width: 100%; min-height: 155px; border: 1px solid #e9e9e9; }
  .players-defence .attack-player { text-align: center; margin-top: 15px; }
  .players-defence .attack-player .btn-atk { border: 4px solid #d69848; border: 2px solid #7c4a13; background-color: #c68632; border-radius: 0; font-weight: 700; padding: 10px 30px; width: 50%;}
  .players-defence .attack-player .btn-atk:hover{ color: #fff!important; background-color: #0069d9!important; border-color: #0062cc!important; }
  .color-0 { background-color: #f1d3d3 }
  .color-1 { background-color: #e6f6ec }
  .color-2 { background-color: #dcedf0 }
  .color-3 { background-color: #7FFF00 }
  .color-4 { background-color: #7FFFD4 }
  .color-5 { background-color: #FFE4C4 }
  .color-6 { background-color: #FF7F50 }
  .color-7 { background-color: #FFD700 }
  .color-8 { background-color: #008000 }
  .color-9 { background-color: #90EE90 }
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
  .title-virus {
      color: #333333;
      font-size: 13px;
      font-weight: 400;
      line-height: 20px;
  }
  .total-virus-count {
      color: #333333;
      font-size: 24px;
      font-weight: 700;
      line-height: 24px;
  }
  .title-power-virus {
      color: #888888;
      font-size: 14px;
      font-weight: 400;
      text-transform: uppercase;
  }
  .title-power-virus span {
      font-weight: 700;
      color: #333333;
  }
  @media (max-width:560px) {
    .mr-5,.mr-4 {
      margin-right: 10px!important;
    }
  }
  @media (max-width:812px) {
    .item-arena {
      margin-bottom: 20px;
    }
    .info-arena h3 {
        font-size: 10px;

    }
  }
</style>