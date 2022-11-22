<template>
  <div class="background-body">
    <div v-for="(snowflake, index) in snowflakes" :key="index" class="snow">
    </div>
    <RouterView></RouterView>
  </div>
  <div class="page-content">
  </div>
</template>

<script>
export default {
  setup() {
    const snowflakes = Array.from(Array(200).keys());
    return {
      snowflakes,
    }
  },
}
</script>

<style lang="scss">
@import '../css/snowBackground.scss';
</style>
