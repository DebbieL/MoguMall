<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="desc-info">
      <div class="start"></div>
      <div class="content">{{ detailInfo.descInfo }}</div>
      <div class="end"></div>
    </div>
    <div class="key-info">{{ detailInfo.imageKey }}</div>
    <div class="image-info">
      <img v-for="item in detailInfo.imageList" :src="item" alt="" @load="imageLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      detailInfo: Object,
      default() {
        return {}
      }
    },
    data() {
      return {
        counter: 0,
        imgLength: 0
      }
    },
    methods: {
      imageLoad() {
        if(++this.counter === this.imgLength){
          this.$emit('imageLoad')
        }
      }
    },
    watch: {
      detailInfo() {
        this.imgLength = this.detailInfo.imageList.length
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .desc-info {
    padding: 0 15px;
  }

  .desc-info .start, .desc-info .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .desc-info .start {
    float: left;
  }

  .desc-info .end {
    float: right;
  }

  .desc-info .start::before, .desc-info .end::after {
    content: '';
    width: 5px;
    height: 5px;
    background-color: #333;
    position: absolute;
    bottom: 0;
  }

  .desc-info .end::after {
    right: 0;
  }

  .desc-info .content {
    padding: 15px 0;
    font-size: 14px;
  }

  .key-info {
    margin: 10px 0px 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .image-info img {
    width: 100%;
  }


</style>