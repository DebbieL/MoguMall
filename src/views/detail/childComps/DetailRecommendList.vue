<template>
  <div class="recommend-info">
    <div class="recommend-title">热门推荐</div>
    <div class="recommend-list">
      <goods-list :goods="recommendList"></goods-list>
    </div>
  </div>
</template>

<script>
  import GoodsList from "components/content/goods/GoodsList";

  export default {
    name: "DetailRecommendList",
    props: {
      recommendList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsList
    }
  }
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
  }

  .recommend-title {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>