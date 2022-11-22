<template>
  <button class="btn">{{ text }}</button>
</template>

<script lang="ts">
export default {
  props: {
    text: String,
  }
}
</script>

<style lang="scss">
.btn {
  background: transparent;
  padding: 0.2rem 2rem;
  height: 3.5rem;
  border: 0.1rem solid $grey;
  cursor: pointer;
  color: $white;
  font-size: 1.7rem;
  font-weight: 300;
  letter-spacing: 0.08rem;

  &:hover {
    transition: all 0.2s ease;
    background-color: rgba($grey, 0.1);
  }

  &:focus {
    outline: none;
  }
}
</style>
