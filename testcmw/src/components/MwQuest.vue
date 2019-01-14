<template>
  <div class="quest-container">
	<div v-if="!showDetailQuest" class="quest-player quest-2" style="cursor: pointer" @click="openDetailQuest()">
      <span v-if="totalQuest > 0" class="number-misson">{{ totalQuest }}</span>
      <div class="title-mission">
        <h5><span class="icon-mission"></span></h5>
      </div>
   </div>
	<div v-if="showDetailQuest && totalQuest > 0" class="quest-player">
		  <span v-if="totalQuest > 0" class="number-misson">{{ totalQuest }}</span>
		  <span class="arrow" @click="hideDetailQuest()" style="cursor: pointer"> > </span>
		  <div class="title-mission">
			  <h5><span class="icon-mission"></span>Your Quests</h5>
		  </div>
		  <div class="list-mission">
			  <div class="mission clearfix" :class="{ success: isBeginerQuestSuccess() == true  }" v-if="showFree() || hasBeginnerQuest()" @click="handleBeginnerQuest()">
				  <span class="icon-eth-mission"></span>
				  <div class="info-mission">
					  <h5 class="name-mission"><span class="title-quest">Beginner Quest {{ beginnerQuestData.currentQuest + 1 }}</span></h5>
					  <p class="content-mission" v-if="showFree()"><span style="cursor: pointer">Click here to get a free Miner.</span></p>
					  <p class="content-mission" v-if="hasBeginnerQuest() && beginnerQuestData.isFinish == false">{{ questName }} <span :class="{yellow: (beginnerQuestData.isFinish == false), blue: (beginnerQuestData.isFinish == true)}"> {{ number }} / {{ numberOfTimes }}</span></p>
					  <p class="content-mission" v-if="hasBeginnerQuest() && beginnerQuestData.isFinish == true"><span class="blue">{{ textConfirmBeginnerQuest }}</span></p>
				  </div>
			  </div>
			  <div class="mission success clearfix" v-if="showLottery">
				  <span class="icon-eth-mission"></span>
				  <div class="info-mission" @click="lottery">
					  <h5 class="name-mission"><span class="title-quest">Lottery Quest</span> </h5>
					  <p class="content-mission">This round is ended. Click here to get rewards.</p>
				  </div>
			  </div>
		  </div>
	</div>
  <mw-arena ref='arena'></mw-arena>
    <mw-shop ref='shop'></mw-shop>
    <mw-airdrop-game ref='airdrop-game'></mw-airdrop-game>
  </div>
</template>
<script>
import CrystalsDeposit from '../js/crystals-deposit';
import BeginnerQuest from '../js/beginner-quest';
import { EthMagic } from '../js/eth-magic'
import MwArena from './MwArena';
import MwShop from './MwShop';
import MwAirdropGame from './MwAirdropGame';
export default { 
  components: {
    MwArena,
    MwShop,
    MwAirdropGame,
  }, 
  data() {
    return {
	  "showDetailQuest": true,
      "showLottery": true,
      "beginnerQuest": 0,
      "totalQuest": 0,
      "textConfirmBeginnerQuest": "",
      "number": 0,
      "numberOfTimes": 0,
      "beginnerQuestData": {},
      "cdResetTime": {
      	"hour": 0,
        "min": 0,
        "sec": 0
      },
      "miners": [0, 0, 0, 0, 0, 0, 0, 0],
    }
  },
  mounted () {
    this.loadData();
    this.countDownResetTime();
  },
  methods: {
  	showFree () {
      if(this.miners[0] == 0) return true; 
      return false;
    },
    getFree () {
      let self = this
      EthMagic.get_free(function (result) {});
    },
	openDetailQuest() {
		this.showDetailQuest = true;
	},
	hideDetailQuest() {
		this.showDetailQuest = false;
	},
    hasBeginnerQuest() {
    	if (this.beginnerQuest > 0) return true;
    	return false;
    },
    handleBeginnerQuest() {
    	if (this.showFree() == true) return this.getFree();
    	if (this.beginnerQuestData.isFinish == false) return this.redirectComponents(this.beginnerQuestData.currentQuest);
    	BeginnerQuest.confirmQuest();
    },
  	setMiners(_miners) {
      if ( _miners.length <= 0 ) return false; 
      return this.miners = _miners;
    },
    setBeginnerQuest(beginnerQuestData) {
    	this.beginnerQuestData = beginnerQuestData;

    	this.number = 0;
    	this.numberOfTimes = 1;

    	if (beginnerQuestData.currentQuest == 0) {
    		this.questName = "Click here to get a free Miner.";
    		this.textConfirmBeginnerQuest = "Click here to complete and get 100 crystals";
      	}
      	if (beginnerQuestData.currentQuest == 1) {
      		this.questName = "Buy 10 Miners Lv1?";
      		this.number = this.miners[0];
    		this.numberOfTimes = 10;
    		this.textConfirmBeginnerQuest = "Click here to complete and get 100 crystals";
      	}	
      	if (beginnerQuestData.currentQuest == 2) {
      		this.questName = "Buy 10 'Link' Engineers ?"; 
      		this.number = game.engineerPlayer.engineers[0];
    		this.numberOfTimes = 10;
    		this.textConfirmBeginnerQuest = "Click here to complete and get 400 crystals";
      	}	
      	if (beginnerQuestData.currentQuest == 3) {
      		this.questName = "Deposit crystal to Crystal Deposit Pot?";
      		this.textConfirmBeginnerQuest = "Click here to complete and get 200 hashrate";
      	}	
      	if (beginnerQuestData.currentQuest == 4) { 
      		this.questName = "Join an Airdrop game?";
      		this.textConfirmBeginnerQuest = "Click here to complete and get 10 viruses";
      	}	
      	if (beginnerQuestData.currentQuest == 5) {
      		this.questName = "Attack WannaCry Boss?";
      		this.textConfirmBeginnerQuest = "Click here to complete and get 10 viruses";
      	}	
      	if (beginnerQuestData.currentQuest == 6) {
      		this.questName = "Attack a player?";
      		this.textConfirmBeginnerQuest = "Click here to complete and get 10000 crystals";
      	}	
      	if (beginnerQuestData.currentQuest == 7) {
      		this.questName = "Buy a Booster?";
      		this.textConfirmBeginnerQuest = "Click here to complete and get 100 viruses";
      	}	
      	if (beginnerQuestData.currentQuest == 8) {
      		this.questName = "Buy a Redbull?";
      		this.textConfirmBeginnerQuest = "Click here to complete and get 100 viruses";
      	}	
    },
    loadData() {
      let self = this;
      setInterval(() => {
      	self.getShowLottery();
      	self.setMiners(game.user.miners);
      	self.setBeginnerQuest(game.beginnerQuestData);
      	let lotteryQuest = 0;
      	let getFreeQuest = 0;
      	let beginnerQuest= 0;

		if (
			game.beginnerQuestData.currentQuest < 8 ||
			(game.beginnerQuestData.currentQuest == 8 && game.beginnerQuestData.endedQuest == false)
			) {
			beginnerQuest = 1;
		}      	
      	if (self.showFree() == true) getFreeQuest = 1;
      	if (self.showLottery == true) lotteryQuest = 1;
      	if (getFreeQuest == 1) beginnerQuest = 0;
      	self.beginnerQuest = beginnerQuest;

        self.totalQuest = lotteryQuest + getFreeQuest + beginnerQuest;
      }, 1000);
    },
    redirectComponents(currentQuest) {
    	let container;
    	if (currentQuest == 1) container = document.getElementById("miner");
    	if (currentQuest == 2) container = document.getElementById("engineer");
    	if (currentQuest == 3) container = document.getElementById("deposit");
    	if (currentQuest == 4) this.showAidropGame(); //container = document.getElementById("airdrop-game");
    	if (currentQuest == 5) container = document.getElementById("wanna-cry");
    	if (currentQuest == 6) this.showArena(); //container = document.getElementById("arena");
    	if (currentQuest == 7) this.showShop(); //container = document.getElementById("miner-booster");
    	if (currentQuest == 8) this.showShop(); //container = document.getElementById("engineer-booster");
		if (container) window.scrollTo(0, container.offsetTop);
    },
    showShop() {
      this.$refs.shop.loadData();
      this.$refs.shop.showModal();
    },
    showArena() {
      this.$refs.arena.loadData();
      this.$refs.arena.showModal();
    },
    showAidropGame() {
      // this.$refs['airdrop-game'].loadData();
      this.$refs['airdrop-game'].showModal();
    },
    isBeginerQuestSuccess() {
    	if (this.beginnerQuestData.isFinish == true) return true;
    	return false;
    },
    getShowLottery () {
      this.showLottery = new Date().getTime() / 1000 - game.deadline > 0;
    },
    lottery () {
      let self = this;
      EthMagic.lottery(function (result) {
        game.deadline = result;
        self.showLottery = false;
      });
    },
    countDownResetTime() {
      let self = this;
      setInterval(() => {
          let now = ( new Date() ).getTime() / 1000;  
          let cd = self.resetFreeTime - now;
          if ( cd <= 0 ) return self.cdResetTime = { "hour": 0, "min": 0, "sec": 0 };
          return self.cdResetTime = self.getTimeCountDown( cd );
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
    formatBalence (_value) {
      return parseFloat(parseFloat(_value).toFixed(5));
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
	.quest-player {
		position: fixed;
		top: 20%;
		right: 0;
		background-color: rgba(255, 255, 255, 0.95);
		border-radius: 4px 0 0 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
		border:1px solid rgba(0, 0, 0, 0.2);
    z-index: 99;
	}
	.quest-player span.number-misson {
	    width: 24px;
	    height: 24px;
	    background: red;
	    color: #fff;
	    position: absolute;
	    top: -12px;
	    left: -12px;
	    text-align: center;
	    border-radius: 50%;
	    font-size: 13px;
	    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
	    border: 2px solid #ffffff;

	}
	.quest-player span.arrow {
	    width: 16px;
	    height: 54px;
	    text-align: center;
	    position: absolute;
	    left: -16px;
	    top: 44%;
	    background-color: rgba(255, 255, 255, 0.9);
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    font-size: 13px;
	    font-weight: 700;
	    border-radius: 4px 0 0 4px;
	    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
		  border:1px solid rgba(0, 0, 0, 0.2);
	}
	.icon-mission {
		@include sprite($icon-mission);
  		display: inline-block;
	    margin-right: 30px;
	}
	span.reset-quest {
		cursor: pointer;
	}
	.icon-eth-mission {
		@include sprite($icon-eth-mission);
  		display: inline-block;
	    margin-right: 11px;
        float: left;
	}
	.icon-redbull-mission {
		@include sprite($icon-redbull-mission);
  		display: inline-block;
	    margin-right: 11px;
        float: left;
	}
	.title-mission {
		padding:15px;
		border-bottom: 1px solid #e7e6e2;
	}
	.title-mission h5 {
	    display: flex;
	    align-items: center;
	    font-size: 15px;
		margin:0;
		text-align: center;
	}
	.list-mission {
		padding:15px;
	}
  .quest-2 span.icon-mission {
    margin-right: 0!important;
  }
  .quest-2 .title-mission {
    padding:10px;
  }
	.mission {
		margin-bottom: 17px;
	}
	.mission .info-mission {
		float: left;
	}
	.info-mission h5.name-mission {
		font-size: 13px;
	}
	p.content-mission {
		font-size: 13px;
		font-weight: 400;
		margin:0;
	}
	.content-mission span.blue {
		font-weight: 700;
		color: #23c78a;
		cursor: pointer;
	}
	.content-mission span.yellow {
		color: #c68632;
		font-weight: 700;
		cursor: pointer;
	}
	.success h5.name-mission {
		color: #23c78a;
	}
	.success p.content-mission {
		color: #23c78a;
	}
	@media (max-width: 560px) {
		.quest-player {
			display: none;
		}
	}
	@media (max-width: 812px) {
		.quest-player {
			width: 220px;
		}
    .quest-2 {
      width:auto!important;
    }
		.title-mission ,.list-mission {
			padding:5px!important;
		}
		.mission .info-mission {
			width: 140px;
		}
		.info-mission h5.name-mission {
			font-size: 10px;
		}
		p.content-mission {
			font-size: 10px;
		}
	}
</style>
