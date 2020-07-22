<template>
  <div>
    <nav-bar>
      <div slot="left" class="backBtn" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             class="title-item"
             @click="itemClick(index)"
             :class="{active: index === currentIndex}">
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  export default {
    name: "detailNavBar",
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
      }
    },
    components: {
      NavBar,
      Scroll
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('itemClick', index)
      },
      backClick() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title .title-item {
    flex: 1;
  }

  .backBtn {
    line-height: 49px;
  }

  .backBtn img {
    width: 20px;
    height: 20px;
  }

  .active {
    color: #ff8198;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>