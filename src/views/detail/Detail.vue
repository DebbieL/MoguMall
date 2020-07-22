<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!--<div>{{ $store.state.cartList }}</div>-->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-goods-params ref="params" :goods-params="goodsParams"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <detail-recommend-list ref="recommend" :recommend-list="recommendList"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>
    <!--<toast :message="message" :show="show"/>-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailGoodsParams from "./childComps/DetailGoodsParams";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailRecommendList from "./childComps/DetailRecommendList";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  // import Toast from "components/common/toast/Toast";

  import { itemListenerMixin, backTopMixin } from "common/mixin";

  import {
    getDetail,
    Goods,
    Shop,
    DetailInfo,
    GoodsParams,
    Comment,
    getRecommend} from "network/detail";
  import {debounce} from "common/utils";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: null,
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParams: {},
        commentInfo: {},
        recommendList: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: -1,
        // message: '',
        // show: false
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailCommentInfo,
      DetailRecommendList,
      DetailBottomBar,
      BackTop,
      // Toast
    },
    mixins: [ itemListenerMixin, backTopMixin ],
    created() {
      //1、保存传入的iid
      this.iid = this.$route.params.iid

      //2、根据iid获取数据
      getDetail(this.iid).then(res => {
        //1、获取顶部的轮播图片
        // console.log(res.data);
        const data = res.data.result
        this.topImages = res.data.result.itemInfo.topImages

        //2、获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3、获取店铺信息
        this.shop = new Shop(data.shopInfo)

        //4、保存商品的详情数据
        this.detailInfo = new DetailInfo(data.detailInfo)

        //5、获取商品尺寸信息以及具体描述信息
        this.goodsParams = new GoodsParams(data.itemParams)

        //6、取出评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = new Comment(data.rate)
        }

        //第一次获取，值不对的原因：this.$refs.params.$el.offsetTop压根没有渲染
        // this.themeTopYs = []
        //
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //
        // console.log(this.themeTopYs);


        //第二次获取，值不对的原因：图片没有加载完
        // this.$nextTick(() => {
        //   //存在bug，图片未加载完，获取到的位置不包含图片
        //   this.themeTopYs = []
        //
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //
        //   console.log(this.themeTopYs);
        // })
      })

      //3、获取推荐数据
      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.data.list
      })

      //4、给getThemeTopY赋值（对给this.themeTopYs赋值的操作进行防抖）
      this.getThemeTopY = debounce(() => {
        // console.log('------------YyY');

        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      }, 100)


    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },
      itemClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        // console.log(position);
        //1、获取Y值
        const positionY = -position.y
        //2、positionY和主题中的值进行对比
        let length = this.themeTopYs.length

        for(let i = 0; i < length - 1; i++) {
          // if(this.currentIndex !== i &&
          //     (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
          //     (i === length - 1 && positionY >= this.themeTopYs[i])) {
            if(this.currentIndex !== i &&
                (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex

            // console.log(this.currentIndex);
          }
        }

        //3、判断是否显示返回顶部按钮
        this.isShowBackTop = (-position.y) > 1000 ? true : false
      },
      addCart() {
        // 1、获取购物车需要的信息
        const product = {}
        product.img = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        //2、将商品加入到购物车
        //另一种方式，利用mapActions将store中的actions方法映射过来
        // import { mapActions } from "vuex"
        // methods: {
        //   ...mapActions(['addCart'])
        // }
        // this.addCart(product).then(res => {
        //   console.log(res);
        // })

        this.$store.dispatch('addCart', product).then(res => {

          this.$toast.show(res, 2000)

          // this.show = true;
          // this.message = res
          //
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = ''
          // }, 1500)
        })

        if(this.$store.state.isAllSelected) {
          this.$store.commit('is_select_all', false)
        }
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;

    height: 100vh;
  }

  .content {
    position: relative;
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>