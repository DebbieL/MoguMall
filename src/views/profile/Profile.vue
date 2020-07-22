<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <span slot="center">个人中心</span>
    </nav-bar>

    <user-info/>

    <div class="assets-info">
      <div class="info-item">
        <div class="info-num">
          <span class="num">{{ myBalance.toFixed(2) }}</span><span class="unit">元</span>
        </div>
        <span class="info-title">我的余额</span>
      </div>
      <div class="info-item">
        <div class="info-num">
          <span class="num">{{ myDiscount }}</span><span class="unit">个</span>
        </div>
        <span class="info-title">我的优惠</span>
      </div>
      <div class="info-item">
        <div class="info-num">
          <span class="num">{{ myScore }}</span><span class="unit">分</span>
        </div>
        <span class="info-title">我的积分</span>
      </div>
    </div>

    <list-view :list-data="orderList" class="list-view"/>

    <list-view :list-data="serviceList" class="list-view"/>


  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  import UserInfo from "./childComps/UserInfo";
  import ListView from "./childComps/ListView";

  export default {
    name: "Profile",
    data() {
      return {
        myBalance: 0.00,
        myDiscount: 0,
        myScore: 0,
        orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    },
    components: {
      NavBar,
      UserInfo,
      ListView
    }
  }
</script>

<style scoped>
  .profile-nav {
    background-color: #ff8198;
    color: white;
  }

  .assets-info {
    display: flex;
    height: 83px;
  }

  .info-item {
    flex: 1;
    text-align: center;
    padding: 18px;

    border-right: 1px solid #eee;
  }

  .info-item:last-child {
    border-right: none;
  }

  .num {
    font-size: 25px;
    font-weight: 700;
    color: orangered;
  }

  .info-title {
    margin-top: 6px;
  }

  .list-view {
    border-top: 13px solid #eee;
  }

</style>