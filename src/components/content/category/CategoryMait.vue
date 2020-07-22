<template>
  <div class="category-mait">
    <scroll class="content">
      <div v-for="(item, index) in categories"
           class="category-item"
           :class="{active: currentIndex === index}"
           :key="index"
           @click="itemClick(index)">
        {{ item.title }}
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "CategoryMait",
    props: {
      categories: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0,
        maitKey: '',
        miniWallKey: ''
      }
    },
    components: {
      Scroll
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('cateMaitItemClick', this.currentIndex)
      }
    }
  }
</script>

<style scoped>
  .category-mait {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    width: 100px;
    height: 100%;

    background-color: #f6f6f6;
    color: #666;
    text-align: center;
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

  .category-item {
    width: 100%;
    line-height: 45px;
  }

  .active {
    border-left: 5px solid #ff8198;
    background-color: #fff;
    color: #ff8198;
    font-weight: 700;
  }


</style>