<template>
  <b-modal ref="modal-aidrop" size="lg">
      <!-- <b-row>&nbsp;</b-row> -->
        <div slot="modal-header" style="width:100%;">
          <b-row align-h="between">
            <b-col cols='9' >
              <h2 class="title">Crystal Airdrop</h2>
            </b-col>
            <b-col cols='3'>
               <button type="button" aria-label="Close" class="close" @click="hiddenModal()">×</button>
            </b-col>
          </b-row>
        </div>
         <div class="mini-game">
              <!-- <b-row>&nbsp;</b-row> -->
             
              <div class="mini-game-info">
                <!-- <div v-if="lastAirdropGameData.playerWin != '0x0000000000000000000000000000000000000000'" class="player-win-last-round">
              <span><span class="player">{{ lastAirdropGameData.playerWin }}</span> won the last Airdrop: <span class="player">{{ crystalsPlayerWinReceiveInLastAirdop }} crystals</span></span>
                </div> -->
                <div class="text" v-if="airdropData.lastDayJoin < 7">
                  <span v-if="hasNextTimeAirdropJoin()">New Airdrop Join in: </span>
                  <span v-if="!hasNextTimeAirdropJoin()">Your Can Join Airdrop: </span>
                </div>
                <div class="time" v-if="airdropData.lastDayJoin < 7">
                  <span  v-if="hasNextTimeAirdropJoin()">
                    <!-- {{cd_mini_game_start}} -->
                    <!-- <span class="time-coudown">{{cd_airdrop_game_start.day}}</span> : -->
                    <span class="time-coudown">{{cd_airdrop_game_start.hour}}</span> :
                    <span class="time-coudown">{{cd_airdrop_game_start.min}}</span> :
                    <span class="time-coudown">{{cd_airdrop_game_start.sec}}</span>
                  </span>
                  <!-- <span v-if="hasMiniGameStart() || !hasNextMiniGame()"> -->
                  <!-- {{cd_mini_game_end}} -->
                    <!-- <span class="time-coudown">{{cd_airdrop_game_end.day}}</span> : -->
                <!--     <span class="time-coudown">{{cd_airdrop_game_end.hour}}</span> :
                    <span class="time-coudown">{{cd_airdrop_game_end.min}}</span> :
                    <span class="time-coudown">{{cd_airdrop_game_end.sec}}</span>
                  </span> -->
                </div>
          <!--  <div v-if="hasPlayerWin()" class="player-win"><span class="player">{{ currentAirdropGameData.playerWin }}</span> is getting</div> -->
                <!-- <div class="prize-crystal">
                  <span class="icon-crystal"></span>
                  <span class="crystal">{{currentAirdropGameData.prizeCrystal}} crystals</span>
                </div> -->
                <b-btn v-if="hasJoinCurrentMiningWarGame == true && airdropData.lastDayJoin < 7" variant="primary" @click="joinAirdropGame()" class="btn-mini-game" :disabled="hasNextTimeAirdropJoin()">Join</b-btn>
                <span v-if="hasJoinCurrentMiningWarGame == true && airdropData.lastDayJoin < 7"> You joined: {{ airdropData.noJoinAirdrop }}</span>
              <p class="text">
              This is a lottery game in which the last person to JOIN at the end of a Airdrop wins the pot.
              <br>During a Airdrop, people can JOIN 1 or more which adds time to the timer and marks them as the current Winner.
              <br>Time is added per-join. 1 join = 15 seconds.
              <br>Airdrop's winner will take 50% of the pot. The remaining 50% is distributed to all players who Join the Airdrop.
              <br>Airdrop pot will be x1.68 each round.
            </p>
            </div>
          </div>
        <div slot="modal-footer" style="display: none;">
        </div>
  </b-modal>
</template>
<script>
  import { AirdropGame } from '../js/airdrop-game'
  export default {
  data () {
    return {
      hasJoinCurrentMiningWarGame: true,
      airdropData: {
        'miningWarRound': 0,
        'noJoinAirdrop': 0, 
        'lastDayJoin': 0,
        'nextTimeAirdropJoin': 0
      },
      cd_airdrop_game_start: {
        "day": '00',
        "hour": '00',
        "min": '00',
        "sec": '00'
      },
    }  
  },
  mounted () {
    this.countDownAirdropGameStart();
    this.setPlayerAirdropGame();
    this.setHasJoinCurrentMiningWarGame();
  },
  methods: {
    hiddenModal() { this.$refs['modal-aidrop'].hide(); },
    showModal() {
      this.$refs['modal-aidrop'].show(); 
    },
    setPlayerAirdropGame () {
      let self = this;
      self.airdropData = game.airdropData;
      setInterval(() => {
          self.airdropData = game.airdropData;
      }, 1000);
    },
    setHasJoinCurrentMiningWarGame () {
      let self = this;
      setInterval(() => {
          self.hasJoinCurrentMiningWarGame = ( game.user.miners[0] == 0 ) 
            ? false
            : true;
      }, 1000);
    },
    getTimeCountDown( time ) {
      return {
        "day" : this.dealNum(time / (24 * 60 * 60)),
        "hour": this.dealNum((time % (24 * 60 * 60)) / (60 * 60)),
        "min" : this.dealNum((time % (60 * 60)) / 60),
        "sec" : this.dealNum(time % 60)
      };
    },
    dealNum (val) {
      let str = Math.floor(val)
      return (str < 10 ? '0' : '') + str
    },
    hasNextTimeAirdropJoin() {
      let nextTimeAirdropJoin = parseFloat( game.airdropData.nextTimeAirdropJoin );
      let now = ( new Date() ).getTime() / 1000;
      if ( now < nextTimeAirdropJoin ) return true;
      return false;
    },
    hasNextMiniGame () {
      let startTimeCurrentMiniGame = parseFloat( game.currentAirdropGameData.startTime );
      let now = ( new Date() ).getTime() / 1000;
      if ( now < startTimeCurrentMiniGame ) {
        return true;
      }
      return false;
    },
    hasMiniGameStart () {
       let startTimeCurrentMiniGame = parseFloat( game.currentAirdropGameData.startTime );
       let endTimeCurrentMiniGame = parseFloat( game.currentAirdropGameData.endTime );
       let now = ( new Date() ).getTime() / 1000;
       if ( now >= startTimeCurrentMiniGame && now <= endTimeCurrentMiniGame ) {
          return true;
       }
       return false;
    },
    hasCrystal () {
      if ( this.playerAirdropGame.crystal == 0 ) {
        return false;
      }
      return true;
    },
    canJoinAirdropGame () {
      if ( this.hasMiniGameStart() == true || this.hasNextMiniGame() == false ) {
        return true;
      } 
      return false;
    },
    claimCrystal ( miniGameId ) {
      AirdropGame.claimCrystal(function (err, result) {});
    },
    joinAirdropGame () {
      AirdropGame.joinAirdropGame(function ( err, result ) {});
    },
    countDownAirdropGameStart () {
      let self = this;
      setInterval(() => {
          let nextTimeAirdropJoin = parseFloat( game.airdropData.nextTimeAirdropJoin );
          let now = ( new Date() ).getTime() / 1000;
          let cd = nextTimeAirdropJoin - now;
          if ( cd > 0 ) {
            self.cd_airdrop_game_start = self.getTimeCountDown( cd );
          }
      }, 1000);
    },
    hasPlayerWin () {
      if ( this.currentAirdropGameData.playerWin == "0x0000000000000000000000000000000000000000" || !this.currentAirdropGameData.playerWin ) {
        return false;
      }
      return true;
    }
  },
}
</script>
<style lang="scss" scoped>
@import './src/assets/sprite.scss';
.btn{
  border-radius: 0;
}
span.icon-crystal {
  @include sprite($icon-crystal);
  display: block;
  float: left;
  margin-top: 10px;
  margin-right: 17px;
}
/*.mini-game {
  margin-top: 64px;
}*/
.mini-game .mini-game-top .crystal-bonus { float: right; margin-top: 10px; }
.mini-game .container { padding: 0; }
.mini-game h2.title {
  color: #333333;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 19px;
}
.mini-game .mini-game-info {
  /*box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21);*/
  /*padding: 21px;*/
  background-image: url(../assets/images/background-minigame.png);
  background-size: cover;
  background-position: center center;
} 
.mini-game-info .text {
  margin-bottom: 10px;
}
.mini-game-info .text span {
    font-size: 14px;
    font-weight: 400; 
}
.mini-game-info .time {
  margin-bottom: 15px;
}
.mini-game-info .time span {
    font-size: 32px;
    font-weight: 700;
}
.mini-game-info .time span.time-coudown {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #eeeeee;
    background-color: #ffffff;
}
.mini-game-info .prize-crystal {
  margin-bottom: 15px;
}
.mini-game-info .prize-crystal .crystal {
  font-size: 24px;
  font-weight: 700;
}
.mini-game-info .prize-crystal span.icon-crystal {
   @include sprite($icon-crystal-minigame);
   display: block;
   margin-top: 6px;
} 
.mini-game-info p.text {
    width: 50%;
    font-size: 14px;
    font-weight: 500;
    color: #888888;
    line-height: 24px;
    margin-top: 25px;
}
span.icon-clock {
  @include sprite($icon-clock);
  display: block;
  float: left;
  margin-top: 10px;
  margin-right: 10px;
}
.mini-game .mini-game-top .crystal-bonus {
  font-size: 14px;
}
.btn-mini-game{
    border-radius: 0;
    font-size: 16px;
    font-weight: 700;
    color:#fff;
    border: 4px solid #d69848;
    border: 2px solid #7c4a13;
    background-color: #c68632;
}
.btn-mini-game:hover{
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
}
.btn-mini-game:disabled {
  border: 2px solid #b4b4b4 !important;
  background-color: #dfdfdf !important;
}
 span.player {
    color:red;
  }
@media (max-width:560px) {
  .mini-game {
    padding:30px;
  }
  .mini-game .mini-game-info {
        padding: 28px 25px!important;
  }
  .mini-game-info {
    margin-top: 20px;
  }
  .mini-game-info .player-win-last-round {
    font-size: 12px;
  }
  .mini-game-info .time span {
    font-size: 23px!important;
  }
  .mini-game-info p.text {
    width:100%!important;
  }
}
@media (max-width:812px) {
  .mini-game h2.title {
    font-size: 24px;
  }
  .mini-game {
    padding: 10px;
  }
}
</style>