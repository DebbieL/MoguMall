<template>
  <!-- ref如果是绑定在组件中的，那么通过this.$refs.refname获得的是一个组件对象 -->
  <!-- ref如果是绑定在普通的元素中的，那么通过this.$refs.refname获得的是该元素 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        message: 'hhhhhhhhhhhhh'
      }
    },
    mounted() {
      // document.querySelector('.wrapper') 拿到的不够准确
      //1、创建better-scroll
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // console.log(this.scroll);
      // this.scroll.scrollHeight = 1000000 不要随便修改，也不要设置固定值
      // this.scroll.refresh() 拿到图片后，刷新，重新设定scrollHeight的值

      //2、监听滚动的位置
      //probs中的probeType
      if(this.probeType ==2 || this.probeType == 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      //3、监听scroll滚动到底部
      //probs中的pullUpLoad
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }

    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        //防止图片快速加载过来之后，scroll组件还没有挂载
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>