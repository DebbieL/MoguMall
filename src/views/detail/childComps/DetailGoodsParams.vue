<template>
  <div v-if="Object.keys(goodsParams).length !== 0" class="goods-params">
    <div class="goods-rule">
      <table>
        <tr v-for="rules in goodsParams.goodsRule">
          <td v-for="item in rules">{{ item }}</td>
        </tr>
      </table>
    </div>
    <div class="goods-desc">
      <table>
        <tr v-for="params in goodsParams.goodsDesc">
          <td v-for="item in params">{{ item }}</td>
        </tr>
      </table>
    </div>
    <div class="info-img" v-if="goodsParams.image.length !== 0">
      <img :src="goodsParams.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsParams",
    props: {
      goodsParams: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .goods-params {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .goods-rule table {
    width: 100%;
    border-spacing: 0;
  }

  .goods-rule table td {
    line-height: 42px;
    border-bottom: 2px solid rgba(100, 100, 100, .1);
  }

  .goods-rule table tr td:first-child {
    width: 146px;
  }

  .goods-desc table {
    width: 100%;
    border-spacing: 0;
    border-top: 1px solid rgba(100, 100, 100, .1);
  }

  .goods-desc table td {
    height: 42px;
    border-bottom: 2px solid rgba(100, 100, 100, .1);
  }

  .goods-desc table tr td:first-child {
    width: 95px;
  }

  .goods-desc table tr td:nth-child(2) {
    color: var(--color-high-text);
  }

  .info-img img {
    width: 100%;
  }
</style>