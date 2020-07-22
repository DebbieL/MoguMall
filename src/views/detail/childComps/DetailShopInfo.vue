<template>
  <div v-if="Object.keys(shop).length !== 0" class="shop-info">
    <div class="shop-top">
      <img :src="shop.shopLogo" alt="" class="shop-logo">
      <span class="shop-name">{{ shop.shopName }}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="left-item">
          <span class="item-num">{{ getTotalSells }}万</span>
          <span class="item-name">总销量</span>
        </div>
        <div class="left-item">
          <span class="item-num">{{ shop.allGoods }}</span>
          <span class="item-name">全部宝贝</span>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.shopScore" :key="index">
            <td>{{item.name }}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <button>进店逛逛</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      getTotalSells() {
        return (this.shop.totalSell / 10000).toFixed(1)
      }
    }
  }
</script>

<style scoped>
  .shop-info {
    padding: 25px 8px;
    border-bottom: 5px solid rgba(100, 100, 100, .1);
  }

  .shop-top {
    line-height: 45px;
    display: flex;
    align-items: center;
  }

  .shop-top .shop-logo {
    width: 45px;
  }

  .shop-top .shop-name {
    margin-left: 10px;
  }

  .shop-middle {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .shop-middle-item{
    flex: 1;
  }
  .shop-middle-left {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #333;
    border-right: 1px solid rgba(0, 0, 0, .1);
  }

  .shop-middle-left .left-item {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .left-item .item-num {
    font-size: 18px;
  }

  .left-item .item-name {
    margin-top: 10px;
    font-size: 12px;
  }

  .shop-middle-right {
    font-size: 13px;
    color: #333;
  }

  .shop-middle-right table {
    width: 120px;
    margin-left: 30px;
  }

  .shop-middle-right table td {
    padding: 5px 0;
  }

  .shop-middle-right .score {
    color: #5ea732;
  }

  .shop-middle-right .score-better {
    color: #f13e3a;
  }

  .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }

  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }

  .shop-bottom {
    margin-top: 10px;
    text-align: center;
  }

  .shop-bottom button {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: none;
    border-radius: 10px
  }


</style>