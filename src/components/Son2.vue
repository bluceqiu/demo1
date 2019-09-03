<template>
  <div>son2</div>
</template>

<script>
export default {
  mounted() {
    this.$bus.$on("你好？", r => {
      alert(r);
    });
  },
  methods: {}
};
</script>