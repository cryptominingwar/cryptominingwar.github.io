<template>
  <div class="atk-inbox">
	  		<div class="title-inbox" v-if="wars.length > 0">
		  		<span class="title-left">Opponent:</span>
		  		<span class="title-right">Outcome:</span>
	  		</div>
	  		<div class="list-inbox">
	  			<div class="inbox-item win clearfix" v-for="(war, index) in wars" :key="`war-${index}`">
	  				<div class="enemy">
	  					<h4 class="name">{{ war.def_address }}</h4>
	  					<div class="infor">
	  						<!-- <div class="viruts">
	  							<span class="image-viruts"></span>18.485.505 Virus
	  						</div> -->
	  						<div class="defense">
		  						<span class="image-defen"></span>{{ war.def / 86400 }} Defense
		  					</div>
	  						<div class="crystal">
	  							<span class="image-crystal"></span>{{ war.reward_crystals }} Crystal
	  						</div>
	  						<div class="programs clearfix" v-if="hasUseProgram(index)">
	  							<div class="program-use" v-if="war.programs[0] != 0">
	  								<img src="../../assets/program1.png"/>
	  							</div>
	  							<div class="program-use" v-if="war.programs[1] != 0">
	  								<img src="../../assets/program2.png"/>
	  							</div>
	  							<div class="program-use" v-if="war.programs[2] != 0">
	  								<img src="../../assets/program3.png"/>
	  							</div>	
	  							<div class="program-use" v-if="war.programs[3] != 0">
	  								<img src="../../assets/program4.png"/>
	  							</div>
	  						</div>	
	  						<div class="time">
	  							<span class="image-time"></span>{{ war.time_war }} 
	  						</div>
	  					</div>
	  				</div>
	  				<div class="status">
	  					<h5 class="title" :class="{ win: (war.status == 1), lost: (war.status == 0)}">{{ (war.status == 1) ? "You Won": "You Lost" }}</h5>
	  					<div class="attack">
	  							<span class="image-attack"></span>{{ war.atk / 86400 }} Attack
	  						</div>
	  					<b-button variant="primary" class="btn-reven" @click="revengePlayer(war.def_address)">Revenge</b-button>
	  				</div>
	  			</div>		
	  		</div>
	  	</div>
</template>
<script>
const Config = require("../../../../config/config");
import MYWeb3 from '../../js/web-3'
import axios from 'axios';
export default { 
	props: ['countAtk'],
  data() {
    return {
      "wars": []
    }
  },
  methods: {
    loadData() {
      let self = this;
      let opts = {
          method: 'get',
          params: { type: "atk", address: MYWeb3.getAccount() },
          url: Config.ETHERMINEWAR_BACKEND + '/api/history-wars'
      };
      axios( opts )
          .then(response)
          .catch(err => { console.log('[ERROR_REQUEST]: ', err); });
      function response( res ) {
          if ( res.data.code == "SUCCESS" ) setData(res.data.data.wars);
      }
      function setData(wars) {
      	// wars = [{
      	// 	def_address: "asdasds",
      	// 	time_war: 12121,
      	// 	def: 12121,
      	// 	reward_crystals: 12121,
      	// 	programs: [0,0,0,0],
      	// 	status: 1,

      	// }];

      	self.wars = wars;
      }
    },
    hasUseProgram(index) {
    	let war = this.wars[index];
    	let result = false;
    	war.programs.forEach(item => {
    		if (item != 0) result = true;
    	});
    	return result;
    },
    revengePlayer(address) {
    	this.$root.$children[0].$refs.arena.$children[0].revengePlayer(address);
    	this.$root.$children[0].$refs.box.hideInbox();
     	var container = document.getElementById("arena");
		window.scrollTo(0, container.offsetTop);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
