<template>
  <div class="defence-inbox">
	  		<div class="title-inbox" v-if="wars.length > 0">
		  		<span class="title-left">Opponent:</span>
		  		<span class="title-right">Outcome:</span>
	  		</div>
	  		<div class="list-inbox">
	  			<div class="inbox-item lost clearfix" v-for="(war, index) in wars" :key="`war-${index}`">
	  				<div class="enemy">
	  					<h4 class="name">{{ war.atk_address }}</h4>
	  					<div class="infor">
	  						<!-- <div class="viruts">
	  							<span class="image-viruts"></span>18.485.505 Virus
	  						</div> -->
	  						<div class="attack">
	  							<span class="image-attack"></span>{{ war.atk / 86400 }} Attack
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
	  					<!-- Your Defense Lost Your Defense Won -->
	  					<h5 class="title" :class="{ lost: (war.status == 1), win: (war.status == 0)}">{{ (war.status == 1) ? "Your Defense Lost": "Your Defense Won" }}</h5>
	  					<div class="defense">
	  						<span class="image-defen"></span>{{ war.def / 86400 }} Defense
	  					</div>
	  					<b-btn variant="primary" class="btn-reven" @click="revengePlayer(war.atk_address)">Revenge</b-btn>
	  				</div>
	  			</div>		
	  		</div>
	  	</div>
</template>
<script>
const Config = require("../../../../config/config");
import MYWeb3 from '../../js/web-3';

import MwAttack from '../wars/MwAttack';

import axios from 'axios';

export default { 
  components: {
    MwAttack
  }, 
  props: {
	countDefence: {
		type: Number
	}
  },	
  data() {
    return {
      "wars": []
    }
  },
  mounted () {
    
  },
  methods: {
    loadData() {
      let self = this;
      let opts = {
          method: 'get',
          params: { type: "def", address: MYWeb3.getAccount() },
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
      //     atk_address: "asdasds",
      //     def_address: "asdasds",
      //     time_war: 12121,
      //     atk: 12121,
      //     def: 12121,
      //     reward_crystals: 12121,
      //     programs: [0,0,0,1],
      //     status: 1,

      //   }];
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
