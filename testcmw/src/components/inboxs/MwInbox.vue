<template>
  <div class="defence-inbox">
	  		<!-- <div class="title-inbox" v-if="wars.length > 0">
		  		<span class="title-left">Opponent:</span>
		  		<span class="title-right">Outcome:</span>
	  		</div> -->
	  		<div class="list-inbox">
	  			<div class="inbox-item lost clearfix" v-for="(item, index) in inboxs" :key="`inbox-${index}`">
	  				<div class="">
	  					<h4 class="text">{{ item.text }}</h4>
	  					<div class="infor">
	  						<!-- <div class="viruts">
	  							<span class="image-viruts"></span>18.485.505 Virus
	  						</div> -->
	  						<div class="attack" v-if="item.type == 0">
	  							<span class="image-attack"></span>{{ item.atk }} Attack
	  						</div>
	  						<div class="crystal" v-if="item.crystals">
	  							<span class="image-crystal"></span>{{ item.crystals }} Crystals
	  						</div>
	  						<div class="eth" v-if="item.eth_reward">
	  							<span class="image-eth"></span>{{ formatEthReward(item.eth_reward) }} ETH
	  						</div>
	  						<div class="hashrate" v-if="item.hashrate">
	  							<span class="image-hashrate"></span>{{ item.hashrate }} Hashrate
	  						</div>
	  						<div class="virus" v-if="item.virus">
	  							<span class="image-virus"></span>{{ item.virus }} Viruses
	  						</div>
	  						<div class="time">
	  							<span class="image-time"></span>{{ item.time }} 
	  						</div>
	  					</div>
	  				</div>
	  			</div>
	  		</div>
	  	</div>
</template>
<script>
const Config = require("../../../../config/config");
import MYWeb3 from '../../js/web-3';
import axios from 'axios';

export default { 
  props: {
	countInbox: {
		type: Number
	}
  },	
  data() {
    return {
      "inboxs": []
    }
  },
  mounted () {
    
  },
  methods: {
    loadData() {
      let self = this;
      let opts = {
          method: 'get',
          params: { address: MYWeb3.getAccount() },
          url: Config.ETHERMINEWAR_BACKEND + '/api/inboxs'
      };
      axios( opts )
          .then(response)
          .catch(err => { console.log('[ERROR_REQUEST]: ', err); });
      function response( res ) {
          if ( res.data.code == "SUCCESS" ) setData(res.data.data.inboxs);
      }
      function setData(inboxs) {
        // inboxs = [{
        //     text: "sadsad",
        //     eth_reward: 8989,
        //     type: 5,
        //     time:44646
        // }];
        console.log(inboxs);
      	self.inboxs = inboxs;
      }
    },
    formatEthReward(eth_reward) {

    	return this.formatBalence(MYWeb3.toETH(eth_reward));
    },
    formatBalence (_value) {
      return parseFloat(parseFloat(_value).toFixed(5));
    },
  }
}
</script>

<style lang="scss" scoped>
@import './src/assets/sprite.scss';
	.inbox-item {
    	border-radius: 4px;
    	border: 1px solid #7c4a13;
    	margin-bottom: 16px;
    	padding: 16px 21px;
	}
	.inbox-item:last-child {
		margin-bottom: 0;
	}
	.inbox-item h4.text {
		font-size: 16px;
		font-weight: 700;
		margin-bottom: 13px;
	}
	h4.lost {
		color:#b31919;
	}
	h4.win {
		color:#0ca66d;
	}
	span.image-virus {
		@include sprite($icon-viruts);
  		display: block;
  		float: left;
  		margin-right: 10px;
	}
	span.image-eth {
		@include sprite($icon-prize-small);
  		display: block;
  		float: left;
  		margin-right: 10px;
	}
	span.image-hashrate {
		@include sprite($icon-booster-small);
  		display: block;
  		float: left;
  		margin-right: 10px;
	}
 @media (max-width: 1024px) {
 	.inbox-item h4.text {
 		font-size: 10px;
 		word-break: break-all;
 	}
 }
</style>
