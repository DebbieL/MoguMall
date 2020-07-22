<template>
  <div id="cart">
    <!--导航-->
    <nav-bar class="cart-nav">
      <span slot="center">购物车({{ length }})</span>
    </nav-bar>

    <!--购物车列表-->
    <cart-list/>

    <!--底部结算栏-->
    <cart-bottom-bar :count="length"/>
  </div>
</template>

<script>
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import NavBar from "components/common/navbar/NavBar";

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    computed: {
      //方式一，数组
      // ...mapGetters([
      //   'cartLength'
      // ])
      //方式二，对象
      ...mapGetters({
          length: 'cartLength'
      })
    },
    components: {
      NavBar,
      CartList,
      CartBottomBar
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }

  .cart-nav {
    background-color: #ff8198;
    color: white;
    font-weight: 700;
  }
</style>