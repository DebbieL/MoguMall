<template>
  <div class="check-button" :class="{checked: isActive}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isActive: {
        type:Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button img {
    border: 1px solid #777;
    border-radius: 50%;
  }

  .checked img {
    background-color: #ff8198;
  }
</style>