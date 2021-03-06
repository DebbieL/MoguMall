import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";


export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImageListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
    // console.log('我是mixin');
  }
}

//生命周期中的函数会合并，但是methods中的函数可新增，但不能合并
export const backTopMixin = {
  data() {
      return {
        isShowBackTop: false,
      }
    },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}