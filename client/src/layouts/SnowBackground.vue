<template>
  <div class="background-body">
    <div
    v-for="(snowflake, index) in snowflakes"
    :key="index"
    class="snow">
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const snowflakes = Array.from(Array(10).keys());
    return {
      snowflakes
    }
  }
}
</script>

<style>
@import '../css/snowBackground.scss';
</style>
