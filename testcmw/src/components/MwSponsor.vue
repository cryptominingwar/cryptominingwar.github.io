<template>
  <div class="sponsor" v-if="1 == 0">
    <b-container >
      <!-- <b-row>&nbsp;</b-row> -->
      <b-row class="sponsor-top">
        <b-col sm="9">
          <h2 class="title">{{$t('message.sponsor')}}
          </h2>
        </b-col>
        <b-col sm="3">
          <div class="button">
              <b-btn v-if="showSponsor" @click="becomeSponsor" variant="primary" class="btn btn-primary btn-sponsor" style="">{{$t('message.become_sponsor')}}</b-btn>
          </div>
        </b-col>
      </b-row>
     
        <b-row>
           <div class="sponsor-info">
              <b-col sm="2" class="clearfix" cols="12">
                <span class="icon-sponsor"></span>
              </b-col>
              <b-col sm="10" class="clearfix" cols="12">
                <div class="current-sponsor">
                  <span>{{$t('message.current_sponsor')}}</span><br>
                  <span style="font-size: 22px;font-weight: 600;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 100%;float: left;">{{ sponsor }}</span>
                </div>
                <div class="prize">
                  <span>{{$t('message.sponsor_fee')}}</span>
                  <span style="font-size: 14px;">{{sponsor_fee}} ETH</span><br/>
				  <span style="font-size:12px;color: red;font-style: italic">Top Players Sponsor will reset after each round ended.</span>
                </div>
              </b-col>
          </div>
        </b-row>

    </b-container>
  </div>
</template>
<script>

import { EthMagic } from '../js/eth-magic'

export default {
  data () {
    return {
      sponsor: '',
      sponsor_fee: 0.1,
    }
  },
  mounted () {

  },
  computed: {
    showSponsor () {
		return this.sponsor != game.user.address;
	}
  },
  methods: {
    becomeSponsor () {
      this.getSponsorFee()
      let self = this;
      EthMagic.become_sponsor(this.sponsor_fee, function (result) {

      });
    },
    getSponsor () {
      let self = this;
      EthMagic.get_sponsor(function (result) {
        self.sponsor = result;
      });
    },
    getSponsorFee () {
      let self = this;
      EthMagic.get_sponsor_fee(function (result) {
        self.sponsor_fee = result;
      });
    },
  },
}
</script>
<style lang="scss" >
@import './src/assets/sprite.scss';
.btn{
  border-radius: 0;
}
.sponsor {
   margin-top: 64px;
}
.sponsor .sponsor-top {
   margin-left: -30px;
}
.sponsor h2.title {
  color: #333333;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 19px;
}
.sponsor .button {
  float: right;
  margin-right: -15px;
}
.sponsor .sponsor-info {
  box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21);
  padding:21px;
  display: flex;
  align-items: center;
  width: 100%;
} 
.sponsor-info span.icon-sponsor {
  @include sprite($icon-sponsor);
  display: block;
  float: left;
}
.btn-sponsor{
  border: 4px solid #d69848!important;
  border: 2px solid #7c4a13!important;
  background-color: #c68632!important;
  color: #fff!important;
  border-radius: 0;
}
.btn-sponsor:hover{
  color: #fff!important;
  background-color: #0069d9!important;
  border-color: #0062cc!important;
}
.modal-footer .btn-primary{
  border-radius: 0;
  font-size: 16px;
  font-weight: 700;
  border: 4px solid #d69848;
  border: 2px solid #7c4a13;
  background-color: #c68632;
}
@media (max-width:560px) {
  .sponsor {
    padding:30px;
  }
  .sponsor .sponsor-info {
    margin-top: 20px;
    display: block!important;
  }
}
</style>