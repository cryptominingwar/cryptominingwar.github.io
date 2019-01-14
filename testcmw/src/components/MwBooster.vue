<template>
  <div class="booster">
    <div class="list-booster">
      <span class="small-text title-booter">{{$t('message.help1')}}</span>
      <b-row class="row-booster">
        <div v-for="(data,idx) in boosterData" :key="data.boostRate"  class="text-center booster-info col-booster">
          <img :src="createImageSrc(idx+1)" style="width:50%;margin:35px auto 50px;" />
          <h4 >{{data.price}} ETH</h4>
          <p>Improve</br>{{$t('message.increase_hashrate').replace('{$}', increase_hashrate(data.boostRate))}}</p>
          <b-button v-if="data.owner != user" variant="primary" @click="buyBooster(idx)">{{$t('message.now2')}}</b-button>
          <b-button v-else disabled variant="primary">{{$t('message.buy_button_3')}}</b-button>
        </div>
      </b-row>
    </div>
  </div>
</template>

<script>
import { EthMagic } from '../js/eth-magic'

export default {
  data () {
    return {
      boosterData: [],
      user: '0x',
    };
  },
  mounted () {
    this.boosterData = game.boostData;
  },
  methods: {
    createImageSrc (index) {
      return "./dist/overclock-"+index+".png";
    },
    getBoosterData () {
      let self = this
      this.user = game.user.address;
      for (let index = 0; index < this.boosterData.length; index++) {
        EthMagic.get_booster_data(index, function (idx, owner, price) {
          let element = self.boosterData[index];
          element.price = price;
          element.owner = owner;
        })
      }
    },
    buyBooster (idx) {
      let self = this
      let booster = this.boosterData[idx];
      EthMagic.buy_booster(idx, booster.price, function (result) {
        self.getBoosterData()
      })
    },
    increase_hashrate (data) {
      return data - 100;
    }
  }
}
</script>


<style lang="scss">
@import './src/assets/sprite.scss';
/*.booster {
  margin-top: 35px;
}*/
.booster h2.title {
  color: #333333;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 19px;
}
/*.booster .list-booster {
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
@media (max-width:560px) {
  .booster {
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
@media (max-width:812px) {
  .booster h2.title {
    font-size: 24px!important;
  }
  .list-booster .booster-info {
    width: 45%!important;
  }
  .booster {
    padding: 10px;
  }
}
</style>

