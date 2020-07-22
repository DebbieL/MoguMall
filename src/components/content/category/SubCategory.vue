<template>
  <div class="sub-category">
      <div class="sub-category-item">
        <a v-for="(item, index) in subCategories" :href="item.link">
          <div class="item" >
            <img class="item-img" :src="item.image">
            <span class="item-title">{{ item.title }}</span>
          </div>
        </a>
      </div>
  </div>
</template>

<script>
  export default {
    name: "SubCategory",
    props: {
      subCategories: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .sub-category {
    padding: 20px 8px;
    height: 100%;
  }

  .sub-category-item {
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-around;*/
    justify-content: flex-start;
  }

  .sub-category-item a {
    margin-bottom: 10px;
    margin-right: 27px;
  }

  .sub-category-item a:nth-child(3n) {
    margin-right: 0px;
  }

  .item {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .item-img {
    width: 64.8px;
    height: 64.8px;
  }

  .item-title {
    width: 64.8px;
    margin-top: 15px;

    font-size: 13px;
  }



</style>