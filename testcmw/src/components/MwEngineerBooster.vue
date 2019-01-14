<template>
  <div class="booster-eng">
    <div class="list-booster">
      <span class="small-text title-booter">Improve the current brain-speed for Engineer</span>
      <b-row class="row-booster">
        <div v-for="(data,idx) in boosterData" :key="data.boostRate"  class="text-center booster-info col-booster col-energy">
          <!-- <img :src="createImageSrc(idx+1)" style="width:50%;margin:35px auto 50px;" /> -->
          <div style="margin:35px auto 50px;" class="text-center">
            <span class="img-energy mx-auto"></span>
          </div>
          <h4 >{{data.price}} ETH</h4>
          <p>Improve</br>{{$t('message.increase_brain_speed').replace('{$}', increase_research(data.boostRate))}}</p>
          <b-button v-if="data.owner != user" variant="primary" @click="buyBooster(idx)">{{$t('message.now2')}}</b-button>
          <b-button v-else disabled variant="primary">{{$t('message.buy_button_3')}}</b-button>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
import EngineerGame from '../js/engineer'
import MYWeb3 from '../js/web-3'

export default {
  data () {
    return {
      boosterData: [],
      user: '0x',
    };
  },
  mounted () {
    this.boosterData = game.EngineerboostData;
  },
  methods: {
    createImageSrc (index) {
      return "./dist/energy-"+index+".png";
    },
    getBoosterData () {
      this.user = MYWeb3.getAccount();
      for (let index = 0; index < this.boosterData.length; index++) {
        EngineerGame.getBoosterData({ "boosterId": index }, function (idx, owner, price) {
          let element = this.boosterData[index];
          element.price = price;
          element.owner = owner;
        }.bind(this));
      }
    },
    buyBooster (idx) {
      let booster = this.boosterData[idx];
      EngineerGame.buyBooster({ "boosterId": idx, "price": booster.price }, function (result) {
        this.getBoosterData();
      }.bind(this));
    },
    increase_research (data) {
      return data - 100;
    }
  }
}
</script>


<style lang="scss">
@import './src/assets/sprite.scss';
/*.booster-eng {
  margin-top:50px;
  margin-bottom: 30px;
}*/
.booster-eng h2.title {
  color: #333333;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 19px;
}
/*.booster-eng .list-booster {
  box-shadow: 0 4px 24px rgba(124, 74, 19, 0.21);
  padding: 21px;
}*/
.list-booster .booster-info {
  border: 2px solid #e9e9e9;
  padding:16px 8px 10px;
  margin-top: 5px;
  margin-right: 5px;
  width: 32%;
}
.booster-info h4 {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
}
.booster-info p {
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
}
.booster-info button.btn-primary {
  border: 2px solid #d69848;
  background-color: #ffffff;
  color: #d69848;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
}
.small-text {
    font-size: 14px;
    font-weight: normal;
    color: #666;
    margin-left: 10px;
}
.row-booster{
  margin: 0 -8px;
}
.title-booter{
  margin-left: 0;
}
.col-energy:nth-child(1) span.img-energy{
  @include sprite($energy-1);
  display: block;
}
.col-energy:nth-child(2) span.img-energy{
  @include sprite($energy-2);
  display: block;
}
.col-energy:nth-child(3) span.img-energy{
  @include sprite($energy-3);
  display: block;
}
.col-energy:nth-child(4) span.img-energy{
  @include sprite($energy-4);
  display: block;
}
.col-energy:nth-child(5) span.img-energy{
  @include sprite($energy-5);
  display: block;
}

@media (max-width:560px) {
  .booster-eng {
      padding: 30px;
  }
  .list-booster {
    box-shadow: none!important;
    padding:0!important;
  }
  .list-booster .booster-info {
    width:100%!important;
  }
}
</style>

