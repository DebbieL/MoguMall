<template>
  <div class="user-info">
    <div class="info-left">
      <img v-if="user.image != ''" :src="user.image" alt="">
      <svg v-else class="privateImage-svg left">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
      </svg>
    </div>
    <div class="info-right">
      <div class="login">
        <span v-if="user.name != ''">{{ user.name }}</span>
        <span v-else>登录/注册</span>
      </div>
      <div class="phone">
        <span>
            <svg data-v-735ff1be="" fill="#fff" class="icon-mobile">
              <use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
            </svg>
        </span>
        <span v-if="user.phone != ''">{{ user.phone }}</span>
        <span v-else>暂无绑定手机号</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    props: {
      user: {
        type: Object,
        default() {
          return {
            image: '',
            name: '',
            phone: ''
          }
        }
      }
    }
  }
</script>

<style scoped>
  .user-info {
    background-color: #ff8198;
    padding: 15px;
    margin-top: -5px;

    display: flex;
  }

  .info-left img {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 50%;
  }

  .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  .info-right {
    display: flex;
    flex-direction: column;

    margin-top: 10px;
    margin-left: 10px;

    color: #fff;
  }

  .info-right .login {
    margin-bottom: 5px;
  }

  .info-right .login span {
    font-size: 17px;
    font-weight: 700;
  }

  .icon-mobile {
    width: 12px;
    height: 18px;
    vertical-align: top;
  }

  .info-right .phone{
    height: 25px;
  }

  .info-right .phone span {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    font-size: 13px;
    margin-right: 5px;
  }



</style>