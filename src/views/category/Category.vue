<template>
  <div id="category">
    <nav-bar class="category-nav">
      <span slot="center">商品分类</span>
    </nav-bar>
    <div class="category-body">
      <category-mait :categories="cateMait"
                     class="body-left"
                     @cateMaitItemClick="cateMaitItemClick"/>
      <div class="body-right">
        <scroll class="content">
          <sub-category :subCategories="subCate"/>
          <tab-control
                  :titles="['流行', '新款', '精选']"
                  @tabClick="tabClick"/>
          <goods-list :goods="miniWallData"></goods-list>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CategoryMait from "components/content/category/CategoryMait";
  import SubCategory from "components/content/category/SubCategory";
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import { getCategory, getSubCategory, getCategoryDetail } from "network/category";

  export default {
    name: "Category",
    data() {
      return {
        cateMait: [],
        maitKey: '',
        miniWallKey: '',
        type: 'pop',
        subCate: [],
        cateDetail: [],
        miniWallData: []
      }
    },
    components: {
      NavBar,
      CategoryMait,
      SubCategory,
      Scroll,
      TabControl,
      GoodsList
    },
    created() {
      getCategory().then(res => {
        this.cateMait = res.data.data.category.list
        this.maitKey = this.cateMait[0].maitKey
        this.miniWallKey = this.cateMait[0].miniWallkey
        console.log(this.cateMait);

        getSubCategory(this.maitKey).then(res => {
          this.subCate = res.data.data.list
        })

        getCategoryDetail(this.miniWallKey, this.type).then(res => {
          // console.log(res);
          this.miniWallData = res.data
          console.log(this.miniWallData);
        })
      })

    },
    methods: {
      cateMaitItemClick(index) {
        this.maitKey = this.cateMait[index].maitKey;
        this.miniWallKey = this.cateMait[index].miniWallkey;
        // console.log(this.maitKey + '  ' + this.miniWallKey);

        getSubCategory(this.maitKey).then(res => {
          this.subCate = res.data.data.list
        })

        getCategoryDetail(this.miniWallKey, this.type).then(res => {
          // console.log(res);
          this.miniWallData = res.data
          console.log(this.miniWallData);
        })
      },
      tabClick(index) {
        switch (index) {
          case 0 :
            this.type = 'pop';
            break;
          case 1 :
            this.type = 'new';
            break;
          case 2 :
            this.type = 'sell';
            break;
        }

        getCategoryDetail(this.miniWallKey, this.type).then(res => {
          // console.log(res);
          this.miniWallData = res.data
          console.log(this.miniWallData);
        })
      }
    }
  }
</script>

<style scoped>
  #category {
    padding-top: 44px;
    height: 100vh;
  }

  .category-nav {
    background-color: #ff8198;
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
  }

  .category-body {
    display: flex;
    height: calc(100% - 44px);
  }

  .body-left {
    height: 100%;
  }

  .body-right {
    flex: 1;
    height: 100%;
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

</style>