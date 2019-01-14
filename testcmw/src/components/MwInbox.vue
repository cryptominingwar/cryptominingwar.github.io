<template>
  <div class="inbox">
	<div>
	  <b-modal ref="inbox-message" id="modallg" size="lg">
        <div slot="modal-header" style="width:100%;">
		   <div class="engineer-header clearfix">
	          <b-button @click="changeStatus('def')" class="button-engineer-header" :class="{ active: (status == 'def')}">Defense Log <span class="number-inbox" v-if="countDefence > 0">({{ countDefence }})</span></b-button>
	          <b-button @click="changeStatus('atk')" class="button-engineer-header" :class="{ active: (status == 'atk')}">Attack Log <span class="number-inbox" v-if="countAtk > 0">({{ countAtk }})</span></b-button>
	          <b-button @click="changeStatus('inbox')" class="button-engineer-header" :class="{ active: (status == 'inbox')}">Inbox <span class="number-inbox" v-if="countInbox > 0">({{ countInbox }})</span></b-button>
	        </div>
	        <button type="button" aria-label="Close" class="close close-inbox" @click="hiddenModal()">×</button>
	  	</div>
	  	<div class="inbox-content">
	  		<mw-def v-if="status == 'def'" ref='def' v-bind:countDefence="countDefence"></mw-def>
	  		<mw-atk v-if="status == 'atk'" ref='atk' v-bind:countDefence="countAtk"></mw-atk>
	  		<mw-inbox v-if="status == 'inbox'" ref='inbox' v-bind:countDefence="countInbox"></mw-inbox>
	  	</div>
	  	<div slot="modal-footer" style="display: none;">
	  	</div>
	  </b-modal>
	</div>
  </div>
</template>
<script>

import MwDef from './inboxs/MwDef';
import MwAtk from './inboxs/MwAtk';
import MwInbox from './inboxs/MwInbox';

const Config = require("../../../config/config");
import querystring from 'querystring';
import MYWeb3 from '../js/web-3'

import axios from 'axios';


export default {
  components: {
    MwDef,
    MwAtk,
    MwInbox
  }, 
  data() {
    return {
      "status": 'def',
      "countDefence": 0,
      "countAtk": 0,
      "countInbox": 0
    }
  },
  methods: {
    changeStatus( _status ) {
     this.status = _status;
     let self = this;
     setTimeout(function() {
    		self.$refs[self.status].loadData();
     }, 100);
     this.updateNotification();
 	},
    hiddenModal() { this.$refs['inbox-message'].hide(); },
    showModal(countDefence, countAtk, countInbox) { 
    	let self = this;
    	this.status = 'def';
    	setTimeout(function() {
    		self.$refs[self.status].loadData();
    	}, 100);
    	this.$refs['inbox-message'].show();  
    	this.countDefence = countDefence;
    	this.countAtk     = countAtk;
    	this.countInbox   = countInbox;

    },
    updateNotification() {
    	  let self = this;
	      let data = { address: MYWeb3.getAccount(), type: this.status };
	      let opts = {
	          method: 'post',
	          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	          data: querystring.stringify(data),
	          url: Config.ETHERMINEWAR_BACKEND + '/api/notification'
	      };
	      axios( opts )
	          .then(response)
	          .catch(err => { console.log('[ERROR_REQUEST]: ', err); });
	      function response( res ) {
	          if ( res.data.code == "SUCCESS" ) setData();
	      }
	      function setData() {
	      	if (self.status == "def")   self.countDefence = 0;
	        if (self.status == "atk")   self.countAtk     = 0;
	        if (self.status == "inbox") self.countInbox   = 0;
	      }
    }
  }
}
</script>

<style lang="scss">
@import './src/assets/sprite.scss';
	.close {
		float: right;
	    font-size: 30px;
	    font-weight: 700;
	    line-height: 1;
	    color: #000;
	    text-shadow: 0 1px 0 #fff;
	    opacity: .5;
	    width: 50%;
	    text-align: right;
	}
	.close-inbox {
		width: 6%;
	}
	.modal-header .engineer-header {
		width:94%;
		float: left;
		text-align: center;
	}
	.engineer-header{
		display: flex;
		justify-content: center;
	}
	.engineer-header .button-engineer-header{
		display: inline-block;
		outline: none;
		margin: 0;
	}
	.engineer-header .button-engineer-header:focus{
		box-shadow: none;
		outline: none;
	}
	.engineer-header .button-engineer-header.active {
	    border: 2px solid #e9e9e9!important;
	    background-color: #ffffff!important;
	    color: #333333!important;
	    font-size: 18px;
	    font-weight: 700;
	}
	.engineer-header .button-engineer-header.active:focus{
		box-shadow: none;
		outline: none;
	}
	.engineer-header .button-engineer-header.active:active{
		box-shadow: none;
		outline: none;
	}
	.button-engineer-header:not(:disabled):not(.disabled).active:focus, .button-engineer-header:not(:disabled):not(.disabled):active:focus{
		box-shadow: none;
		outline: none;
	}
	.engineer-header .button-engineer-header.active{
		width: 184px;
		height: 40px;
		border: 1px solid #e9e9e9;
		background-color: #ffffff;
		color: #333333;
		font-size: 15px;
		font-weight: 700;
	}
	.engineer-header .button-engineer-header:hover{
		color: #fff;
		background-color: #545b62;
		border-color: #4e555b;
	}
	.engineer-header .button-engineer-header.active:hover{
		border-color: #e9e9e9;
		background-color: #ffffff;
		color: #333333;
	}
	.engineer-header .button-engineer-header:first-child.active{
		border-right: 0;
	}
	.engineer-header .button-engineer-header:last-child.active{
		border-left: 0;
	}
	.engineer-header .button-engineer-header{
		width: 184px;
		height: 40px;
		border: 1px solid #e9e9e9;
		background-color: #f0f0f0;
		color: #888888;
		font-size: 15px;
		font-weight: 500;
	}
	.title-inbox {
		margin-bottom: 12px;
	}
	span.title-left ,span.title-right {
		font-size: 13px;
		font-weight: 700;
	}
	span.title-left {
		width: 65%;
	}
	span.title-right {
		width:35%;
		float: right;
	}
	.inbox-content {
		padding: 15px;
		padding-top: 0;
	}
	.inbox-content .lost {
		background-image: linear-gradient(180deg, #fffcef 0%, #ffffff 100%); 
	}
	.inbox-content .win {
		background-image: linear-gradient(180deg, #f2fffa 0%, #ffffff 100%)
	}
	.inbox-item {
    	border-radius: 4px;
    	border: 1px solid #7c4a13;
    	margin-bottom: 16px;
	}
	.inbox-item:last-child {
		margin-bottom: 0;
	}
	.inbox-item .enemy {
		width: 65%;
		float: left;
		padding: 16px 21px;
		border-right:1px solid #7c4a13;
		height: 220px;
	}
	.inbox-item .status {
	    width: 35%;
    	float: right;
    	padding: 20px 21px;
    	padding-bottom: 16px;
	}
	span.image-viruts {
		@include sprite($icon-viruts);
  		display: block;
  		float: left;
  		margin-right: 10px;
	}
	span.image-attack {
		@include sprite($icon-attack);
  		display: block;
  		float: left;
  		margin-right: 9px;
	}
	span.image-crystal {
		@include sprite($icon-crystal-small);
  		display: block;
  		float: left;
  		margin-right: 13px;
	}
	.viruts,.attack,.crystal {
		font-size: 14px;
		font-weight: 500;
	}
	.viruts , .attack {
		margin-bottom: 12px;
	}
	.enemy h4.name {
		font-size: 16px;
		font-weight: 700;
		margin-bottom: 13px;
	}
	.status h5.title {
		font-size: 13px;
		font-weight: 700;
		margin-bottom: 21px;
		background: transparent;
	}
	h5.lost {
		color:#b31919;
	}
	h5.win {
		color:#0ca66d;
	}
	.defense {
		margin-bottom: 20px;
		font-size: 14px;
		font-weight: 500;
	}
	.defense span.image-defen {
		@include sprite($icon-defen);
  		display: block;
  		float: left;
  		margin-right: 12px;
	}
	.status button.btn-reven {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
		border-radius: 4px;
		border: 2px solid #7c4a13;
		background-image: linear-gradient(180deg, #d38e43 0%, #976127 100%);
		width: 100%;
		font-size: 14px;
		font-weight: 700;
		text-shadow: 0 2px 0 rgba(0, 0, 0, 0.15);
	}
	.inbox-item .time {
	    margin-top: 12px;
	    font-size: 14px;
	    font-style: italic;
	}
	.infor .programs {
		margin-top: 10px;
	}
	.infor .program-use {
	    border: 1px solid #f1f1f1;
        background: rgba(174,163,167,0.5);
        width: 15%;
    	float: left;
	}
	.program-use img {
		width: 100%;
	}
	
	@media (max-width:812px) {
		.close {
			width:50%!important;
		}
		.close-inbox {
			width: 9%!important;
		}
		.enemy h4.name {
			font-size: 10px;
		    word-break: break-all;
		}
		.viruts, .attack, .crystal {
			font-size: 10px;
		}
		.status h5.title {
			font-size: 10px;
		}
		.defense {
			font-size: 10px;
		}
		.enemy {
			width: 60%!important;
			height: 165px!important;
		}
		.status {
			width: 40%!important;
		}
	}
	@media (max-width:560px) {
		.inbox {
			display: none;
		}
		.close {
			width:100%!important;
		}
	}
</style>
