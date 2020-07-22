<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
              v-for="(item, index) in list"
              :key="index"
              :product="item"/>
    </scroll>
  </div>
</template>

<script>
  import  {mapGetters} from "vuex"

  import CartListItem from "./CartListItem";

  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "CartList",
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters({
        list: 'cartList'
      })
    },
    components: {
      Scroll,
      CartListItem
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 44px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

</style>