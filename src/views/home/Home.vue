<template>
  <div id="home">
    <nav-bar class="home-nav">
      <span slot="center">购物街</span>
    </nav-bar>
    <tab-control
            class="tab-control"
            :titles="['流行', '新款', '精选']"
            @tabClick="tabClick"
            ref="tabControl1"
            v-show="isTabFixed"/>
    <!--:probe-type不加冒号的话，不管三七二十一，后面的内容统一当成字符串-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control
              :titles="['流行', '新款', '精选']"
              @tabClick="tabClick"
              ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!--在我们需要监听组件的原生事件时，使用.native属性修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <!--&lt;!&ndash;解决脱离标准流，内容出现在scroll后面&ndash;&gt;-->
    <!--<ul>-->
    <!--  <li>列表1</li>-->
    <!--  <li>列表2</li>-->
    <!--  <li>列表3</li>-->
    <!--  <li>列表4</li>-->
    <!--  <li>列表5</li>-->
    <!--  <li>列表6</li>-->
    <!--  <li>列表7</li>-->
    <!--  <li>列表8</li>-->
    <!--  <li>列表9</li>-->
    <!--  <li>列表10</li>-->
    <!--</ul>-->
  </div>
</template>

<script>
  // 只有default导出，才不需要大括号括起来
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  export default {
    name: "Home",
    data() {
      return {
        result: null,
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 1, list: []},
          'new': {page: 1, list: []},
          'sell': {page: 1, list: []},
        },
        currentType: 'pop',
        // isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mixins: [ itemListenerMixin, backTopMixin ],
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
    created() {
      //1、请求多个数据
      this.getHomeMultidata();

      //2、请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell')

      // 3、监听item中图片加载完成
      // this.$bus.$on('itemImageLoad', () => {
      //   // console.log('----------');
      //   //在created中，可能拿不到refs，所以这一步最好在mounted中进行此步骤
      //   this.$refs.scroll.refresh()
      // })
    },
    mounted() {
      // 1、监听item中图片加载完成
      // const refresh = debounce(this.$refs.scroll.refresh, 500)
      // this.itemImageListener = () => {
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImageListener)

      //2、获取tab-control的offsetTop
      //所有组件都有一个el属性，用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    destroyed() {
      console.log('destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1、保存Y值
      this.saveY = this.$refs.scroll.getScrollY();

      //2、取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImageListener)

    },

    methods: {
      /**
       * 事件监听相关的方法
       */

      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index
      },
      // backClick() {
      //   //传入x y time， time的默认值为300，表示300毫秒内回到顶部
      //   this.$refs.scroll.scrollTo(0,0)
      // },

      contentScroll(position) {
        //1、判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000 ? true : false

        //2、判断tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },

      loadMore() {
        this.getHomeGoods(this.currentType)

        //不需要事件总线，就解决的上拉加载更多方法
        // this.$refs.scroll.refresh()
      },
      swiperImageLoad(){
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
      *网络请求相关的方法
      */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.result = res
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      getHomeGoods(type) {
        getHomeGoods(type, this.goods[type].page).then(res=> {
          const goodList = res.data.data.list
          this.goods[type].list.push(...goodList)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  /*<!--scoped是作用域，表示此样式只会针对当前文件起效果-->*/
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  /*#home {*/
  /*  !*viewport height 视口*!*/
  /*  height: 100vh;*/
  /*}*/

  .home-nav {
    background-color: #ff8198;
    color: white;

    /*在使用浏览器原生滚动时，防止导航栏滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tab-control {
    /*position: sticky;  用了better-scroll后，不起作用了*/
    /*top: 44px;*/
    /*z-index: 9;*/
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

  /*<!--解决脱离标准流，内容出现在scroll后面-->*/
    /*background-color: #fff;*/

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  margin-top: 44px;*/
  /*  overflow: hidden;*/
  /*}*/
</style>