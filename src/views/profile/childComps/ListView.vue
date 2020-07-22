<template>
  <div class="list-view">
    <div class="list-item" v-for="(item, index) in listData" :key="index">
      <span class="icon">
          <svg :fill="item.iconColor"><use :xlink:href="item.icon"></use></svg>
      </span>
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ListViev",
    props: {
      listData: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .list-view {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  .list-view .list-item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .list-item .icon {
    margin-top: 10px;
    position: absolute;
    left: 16px;
    top: -7px;
  }

  .icon svg {
    width: 18px;
    height: 18px;
  }

  .list-item .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }

  .list-item:last-of-type .info {
    border-bottom: none;
  }
</style>