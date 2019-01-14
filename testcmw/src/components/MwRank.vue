<template>
  <div class="real-time">
   <!--  <b-row>&nbsp;</b-row> -->
   <div class="real-time-hashrate">
    <b-container style="padding:0">
    <b-row>
      <b-col sm="12">
        <h2>{{$t('message.rank1')}}</h2>
        <img src="../assets/overclock-1.png" style="display: none"/> 
        <img src="../assets/overclock-2.png" style="display: none"/> 
        <img src="../assets/overclock-3.png" style="display: none"/> 
        <img src="../assets/overclock-4.png" style="display: none"/> 
        <img src="../assets/overclock-5.png" style="display: none"/> 
      </b-col>
      <!-- <b-col sm="5">
        <b-btn v-if="showLottery" @click="lottery" size="lg" variant="danger">{{$t('message.lottery')}}</b-btn>
      </b-col> -->
     <!--  <b-col sm="2">
        <b-btn style="float: right" @click="showRankList" variant="primary">{{$t('message.rank2')}}</b-btn>
        <b-modal id="rank" ref="rank_list_modal" size="lg" :title="$t('message.rank3')">
          <b-table striped hover :items="rank_list"></b-table>
        </b-modal>
      </b-col> -->
    </b-row>
    <b-row>  
        <b-col sm="3">
          <div class="end-row">
            <span class="icon-clock"></span>
            <span class="text">{{$t('message.rank4')}}</span><br>
            <span class="time" style="font-weight:bold;color:#fff;">{{count_down}}</span>
          </div>
        </b-col>
      
     
        <b-col sm="3">
          <div class="end-row prize">
            <span class="icon-prize"></span>
            <span class="text">{{$t('message.rank5')}}</span><br>
            <span class="time" style="font-weight:bold;color:#fff;font-size: 24px;">{{format_pot}} ETH </span>
          </div>
        </b-col>
      
      <!--<b-col sm="12"><p class="text">{{$t('message.rank8')}}</p></b-col>-->
      <b-col sm="12"><p class="text">{{$t('message.rank6')}}</p></b-col>
    </b-row>
    </b-container>
    </div>
<b-container style="padding:0">
	<b-row>
  		<b-col sm="12" style="margin-top:10px">
        <div class="table-rank">
    		  <b-table striped hover :items="rank_list.slice(0,10)" :fields=fields>
    			<template slot="ranking" slot-scope="row">
            <div class="number-slot">
              <span v-if="row.item.ranking <= 3 && row.item.ranking > 0" :class="createRankingClass(row.item.ranking)"></span>
      			  <span v-if="row.item.ranking > 3" class="rank-number">{{row.item.ranking}} </span>
      			  <img v-if="flags[row.item.address]" :src="flags[row.item.address]">
            </div>
    			</template>
    			<template slot="hashrate" slot-scope="row">
    			  <span>{{row.item.hashrate}} </span>
    			  <span v-if="hasBooster(row.item.address)" style="color:red">x{{booster_rate(row.item.address)}}% ↑</span>
    			</template>
    			<template slot="percent" slot-scope="row">
    			  {{profit_percent[row.index]}}%
    			</template>
    			<template slot="profit" slot-scope="row">
            <span class="icon-prize-small"></span>
            <span>{{calcProfit(profit_percent[row.index])}}</span>
    			</template>
    		  </b-table>
        </div>
  		</b-col>
	</b-row>
  </b-container>
</div>
</template>
<script>
import { EthMagic } from '../js/eth-magic'
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      rank_list: [],
      boosterData: [],
      fields: [],
      profit_percent: [30, 20, 10, 8, 7, 5, 5, 5, 5, 5],
      deadline: 0,
      showLottery: false,
      pot: 0,
      cd: 0,
      flags: {},
    }
  },
  mounted () {
    this.boosterData = game.boostData
    this.countDown()
    this.setFileds()
  },
  watch: {
    deadline (val) {
      val ? this.countDown() : this.reset()
    },
  },
  computed: {
    count_down () {
      let cd = this.cd
      return (
        this.dealNum(cd / (24 * 60 * 60)) +
        ' : ' +
        this.dealNum((cd % (24 * 60 * 60)) / (60 * 60)) +
        ' : ' +
        this.dealNum((cd % (60 * 60)) / 60) +
        ' : ' +
        this.dealNum(cd % 60)
      )
    },
    format_pot () {
      return parseFloat(this.pot).toFixed(4)
    },
  },
  methods: {
    createRankingClass (index) {
      if ( index > 3 || index <= 0 ) return false;
      return "icon-number-" + index;
    },
    dealNum (val) {
      let str = Math.floor(val)
      return (str < 10 ? '0' : '') + str
    },
    setFileds () {
      this.fields = [
        {
          key: 'ranking',
          label: this.$t('message.ranking'),
          class: 'number-slot'
          
        },
        {
          key: 'address',
          label: this.$t('message.address'),
        },
        {
          key: 'hashrate',
          label: this.$t('message.hashrate'),
        },
        {
          key: 'percent',
          label: this.$t('message.percent'),
        },
        {
          key: 'profit',
          label: this.$t('message.profit'),
        },
      ]
    },
    reset () {
      clearInterval(this.interval)
      this.interval = 0
      this.cd = 0
    },
    countDown () {
      if (this.deadline) {
        this.cd = parseInt(this.deadline - new Date().getTime() / 1000)
        this.interval = setInterval(() => {
          this.cd > 0 ? --this.cd : this.reset()
        }, 1000)
      } else this.cd = 0
    },
    showRankList () {
      this.rank_list = game.rank_list
      this.$refs.rank_list_modal.show()
      this.getRankList()
    },
    lottery () {
      let self = this
      EthMagic.lottery(function (result) {
        self.deadline = result
      })
    },
    getContractBalance () {
      let self = this
      this.getDeadline()
      EthMagic.get_prize_pool(function (result) {
        self.pot = result
      })
    },
    getDeadline () {
      let self = this
      EthMagic.get_deadline(function (result) {
        self.deadline = result
        self.showLottery =
          new Date().getTime() / 1000 - result > 0 && result != 0
      })
    },
    getRankList () {
      this.rank_list = game.rank_list
      let self = this
      EthMagic.get_rank_list(function (result) {
        self.rank_list = game.rank_list
        self.getRankHashrate()
      })
    },
    getRankHashrate () {
      let count = 0
      let self = this
      for (var idx = 0; idx < 20; idx++) {
        var rank_detail = game.rank_list[idx]
        if (
          rank_detail.address == '0x' ||
          rank_detail.address == '0x0000000000000000000000000000000000000000' ||
          rank_detail.hashrate != 0
        ) {
          count++
        } else {
          EthMagic.get_rank_list_hashrate(idx, function (result) {
            rank_detail = result
          })
        }
      }
      if (count != 20) {
        setTimeout(() => {
          self.getRankHashrate()
        }, 2500)
      }
    },
    getBoosterData () {
      let self = this
      for (let index = 0; index < game.numberOfBoosts; index++) {
        EthMagic.get_booster_data(index, function (idx, owner, price) {
          let element = self.boosterData[index]
          element.owner = owner
        })
      }
    },
    hasBooster (address) {
      if (
        address == '0x' ||
        address == '0x0000000000000000000000000000000000000000'
      ) {
        return false
      } else {
        for (let index = 0; index < game.numberOfBoosts; index++) {
          let booster = this.boosterData[index]
          if (booster.owner == address) {
            return true
          }
        }
        return false
      }
    },
    booster_rate (address) {
      for (let index = game.numberOfBoosts - 1; index >= 0; index--) {
        let booster = this.boosterData[index]
        if (booster.owner == address) {
          return booster.boostRate
        }
      }
    },
    calcProfit (percent) {
      return (percent * this.pot * 0.9 * 0.01).toFixed(4)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './src/assets/sprite.scss';
.table-rank {
  span.icon-number-1 {
    @include sprite($icon-number-1);
    display: block;
    margin:0 auto;
  /*  margin-top: 10px;
    margin-right: 10px;*/
  }
  span.icon-number-2 {
    @include sprite($icon-number-2);
    display: block;
    margin:0 auto;
   /* margin-top: 10px;
    margin-right: 10px;*/
  }
  span.icon-number-3 {
    @include sprite($icon-number-3);
    display: block;
    margin:0 auto;
    /*margin-top: 10px;
    margin-right: 10px;*/
  }
  span.icon-prize-small {
    @include sprite($icon-prize-small);
    display: block;
    float: left;
    margin-right: 10px;
  }
  /*.rank-number {
    margin-left: 17px;
  }*/
}  
.real-time {
    height: 880px;
}
.real-time .real-time-hashrate {
  background-image: url(../assets/images/background-hashrate.png);
  background-size: contain;
  background-position: center center;
  padding-top: 50px;
  padding-bottom: 262px;
  color:#fff;
}
.real-time-hashrate h2 {
  font-weight: 700;
  font-size: 36px;
  margin-bottom: 16px;
}
.real-time-hashrate .end-row {
    padding: 14px;
    border-radius: 8px;
    background: #7c4a13;
    width: 100%;
    margin-right: 16px;
    margin-bottom: 21px;
}
.real-time-hashrate span.text {
  font-size: 13px;
  font-weight: 400;
}
.real-time-hashrate span.time {
  font-size: 24px;
  font-weight: 700;
} 
.real-time-hashrate span.icon-clock {
  @include sprite($icon-clock);
  display: block;
  float: left;
  margin-top: 10px;
  margin-right: 10px;
}
.real-time-hashrate span.icon-prize {
  @include sprite($icon-prize);
  display: block;
  float: left;
  margin-top: 10px;
  margin-right: 10px;
}
.real-time-hashrate p.text {
  width:50%;
  margin:0;
  font-size: 13px;
  font-weight: 400;
}
.real-time-hashrate span.time {
  font-size: 24px;
} 
.table-rank {
    background: #fff;
    position: relative;
    top: -230px;
    left: 0;
    right: 0;
    box-shadow: inset -1px -1px 0 #e9e9e9;
}
.table-rank table thead th {
  background-color: #f3f3f3!important;
  color: #888888;
  font-size: 16px;
  font-weight: 400;
}
.table td {
  border: 1px solid #dee2e6;
}
.table td span {
  font-size: 16px;
  font-weight: 700;
}
.table td .number-slot {
  text-align: center;
}
.table th {
  border-right: 2px solid #dee2e6;
}
.test {
  text-align:center!important;
}
</style>
<style lang="scss">
.table td,.table th {
  border: 1px solid #dee2e6;
}
.table th.number-slot {
  text-align: center;
}
@media (max-width:560px) {
  .real-time {
    height: 100%!important;
  }
  .real-time .real-time-hashrate {
    padding:30px!important;
  }
  .real-time-hashrate p.text {
    width:100%!important;
  }
  .table-rank {
    overflow: scroll !important;
    position: static!important;
  }
}
@media (max-width:812px) {
  .real-time-hashrate span.text {
        font-size: 10px!important;
  } 
  .real-time-hashrate {
    padding-left: 10px;
    padding-right: 10px;
  }
  .real-time-hashrate span.time {
    font-size: 9px!important;
  }
  .table-rank {
    overflow: scroll !important;
    position: static!important;
  }
  .real-time .real-time-hashrate {
    padding-bottom: 50px!important;
  }
  .real-time-hashrate h2 {
    font-size: 24px!important;
  }
  .real-time-hashrate .end-row {
    width: 112%!important;
  }
}

</style>