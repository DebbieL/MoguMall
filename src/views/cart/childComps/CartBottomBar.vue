<template>
  <div class="cart-bottom-bar">
    <div class="select-all">
      <div class="select-all-button" @click="selectAll">
        <check-button :isActive="$store.state.isAllSelected"/>
      </div>
      <div class="select-all-text">全选</div>
    </div>

    <div class="total">合计:￥{{ totalPrice }}</div>
    <div class="to-check" @click="calcClick">去结算({{ checkedCount }})</div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomBar",
    props: {
      count: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice() {
        let totalPrice = 0;
        for(let item of this.$store.state.cartList){
          if(item.checked){
            totalPrice += (item.price * item.count)
          }
        }
        return totalPrice.toFixed(2)
      },
      checkedCount() {
        let count = 0;
        for(let item of this.$store.state.cartList){
          if(item.checked){
            count++
          }
        }
        return count
      }
    },
    components: {
      CheckButton
    },
    methods: {
      selectAll() {
        this.$store.dispatch('selectAll')
      },
      calcClick() {
        if(this.count == 0) {
          this.$toast.show('购物车为空')
        } else if(this.checkedCount == 0) {
          this.$toast.show('请选择商品')
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar{
    position: relative;
    display: flex;
    background-color: #eee;
    height: 44px;
    line-height: 44px;
  }

  .select-all {
    margin-left: 53px;
  }

  .select-all-button {
    position: absolute;
    line-height: 0;
    left: 35px;
    top: 13px;
  }

  .select-all-text {
    font-size: 13px;
    margin-left: 5px;
  }

  .total {
    flex: 1;
    font-size: 17px;
    margin-left: 20px;
  }

  .to-check {
    background-color: orangered;
    color: #fff;
    width: 100px;
    text-align: center;
  }
</style>