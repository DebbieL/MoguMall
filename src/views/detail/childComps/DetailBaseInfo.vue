<template>
  <div v-if="Object.keys(goods).length !== 0" class="detail-base-info">
    <div class="goods-title">{{ goods.title }}</div>
    <div class="goods-price">
      <span class="new-price">{{ goods.newPrice }}</span>
      <span class="old-price">{{ goods.oldPrice }}</span>
      <span class="discount-desc">{{ goods.discount }}</span>
    </div>
    <div class="others-info">
      <span class="others-info-item">{{ goods.columns[0] }}</span>
      <span class="others-info-item">{{ goods.columns[1] }}</span>
      <span class="others-info-item">{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="service-info">
      <div v-for="index in goods.services.length-1" class="services-info-item">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{ goods.services[index-1].name }}</span>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
    }
  }
</script>

<style scoped>
  .detail-base-info {
    margin-top: 15px;
    padding: 0px 8px;

    border-bottom: 5px solid rgba(100,100,100,.1);
  }

  .goods-title {
    color: #222;
    font-size: 17px;
    text-align: justify;
  }

  .goods-price {
    margin-top: 10px;
  }

  .goods-price .new-price {
    font-size: 24px;
    color: var(--color-high-text);
  }

  .goods-price .old-price {
    margin-left: 5px;
    font-size: 13px;
    text-decoration: line-through;
  }

  .goods-price .discount-desc {
    font-size: 12px;
    background-color: var(--color-high-text);
    color: white;
    border-radius: 8px;
    padding: 2px 5px;
    margin-left: 5px;
    position: relative;
    top: -8px;
  }

  .others-info {
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
    font-size: 13px;
    line-height: 30px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .service-info {
    display: flex;
    justify-content: space-between;
    line-height: 60px;


  }

  .service-info .services-info-item {
    font-size: 13px;
    color: #333333;
  }

  .service-info .services-info-item img {
    width: 12px;
  }


</style>