<template>
  <div class="sponsor">
    <b-container >
      <!-- <b-row>&nbsp;</b-row> -->
      <b-row class="sponsor-top">
        <b-col sm="9">
          <h2 class="title">Game Sponsor
          </h2>
        </b-col>
        <b-col sm="3">
          <div class="button">
              <b-btn v-if="showSponsor" @click="becomeSponsor" variant="primary" class="btn btn-primary btn-sponsor" style="">Become Game Sponsor</b-btn>
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
                  <span>Current Game Sponsor:</span><br>
                  <span style="font-size: 22px;font-weight: 600;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 100%;float: left;">{{ gameSponsor }}</span>
                </div>
                <div class="prize">
                  <span>To be the next game sponsor, you will need： </span>
                  <span style="font-size: 14px;">{{formatEth(gameSponsorFee)}} ETH</span>
                </div>
              </b-col>
          </div>
        </b-row>

    </b-container>
  </div>
</template>
<script>

import EngineerGame from '../js/engineer'

export default {
  data () {
    return {
      gameSponsor: '',
      gameSponsorFee: 0,
    }
  },
  mounted () {
    this.loadGameSponsorInfo();
  },
  computed: {
    showSponsor () {
		return this.gameSponsor != game.user.address;
	}
  },
  methods: {
    becomeSponsor () {
      EngineerGame.becomeGameSponsor({ "gameSponsorFee": this.gameSponsorFee});
    },
    loadGameSponsorInfo() {
      let self = this;
      setInterval(() => {
        self.gameSponsor = game.gameSponsor;
        self.gameSponsorFee = game.gameSponsorPrice * 150 / 100;
      },1000);
    },
    formatEth (_value) {
      return parseFloat(parseFloat(_value).toFixed(5));
    }
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
@media (max-width:812px) {
  .sponsor h2.title {
    font-size: 24px;
  }
  .sponsor {
    padding: 10px;
  }
}
</style>