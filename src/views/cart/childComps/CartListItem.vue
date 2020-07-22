<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <check-button :is-active="product.checked" @click.native="itemClick"/>
    </div>
    <div class="item-img">
      <img :src="product.img" alt="">
    </div>
    <div class="item-info">
      <div class="info-title info-item">
        {{ product.title }}
      </div>
      <div class="info-desc info-item">
        {{ product.desc }}
      </div>
      <div class="info-num info-item">
        <div class="info-price">￥{{ product.price }}</div>
        <div class="info-count">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartListItem",
    data() {
      return {

      }
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CheckButton
    },
    methods: {
      itemClick() {
        this.$store.dispatch('selectAll', this.product);
      }
    }
  }
</script>

<style scoped>
  .cart-list-item {
    display: flex;
    padding: 10px 10px 10px 5px;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }

  .item-info {
    display: flex;
    flex-direction: column;
    padding: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .info-item {
    flex: 1;
  }

  .info-title, .info-desc {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .info-title {
    font-size: 17px;
    color: #333;
    position: relative;
  }

  .info-desc {
    font-size: 14px;
    color: #888;
  }

  .info-num {
    display: flex;
    justify-content: space-between;
  }
  
  .info-price {
    font-size: 17px;
    color: orangered;
  }


</style>