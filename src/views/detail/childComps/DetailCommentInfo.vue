<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="comment-top">
      <img :src="commentInfo.userImg" alt="">
      <span>{{ commentInfo.userName }}</span>
    </div>
    <p>{{ commentInfo.content }}</p>
    <div class="comment-footer">
      <span>{{ commentInfo.createTime | showDate }}</span>
      <span>{{ commentInfo.userStyle }}</span>
    </div>
    <div class="info-imgs">
      <img :src="item" v-for="(item, index) in commentInfo.userPhoto" :key="index">
    </div>
  </div>
</template>

<script>
  import {formatDate} from "common/utils"
  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showDate(value) {
        let date = new Date(value*1000);
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .comment-top {
    padding: 10px 0 5px;
  }

  .comment-top img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .comment-top span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .comment-info p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .comment-footer {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .comment-footer>span:first-child {
    margin-right: 10px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>