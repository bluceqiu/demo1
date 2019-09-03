<template>
  <div>
    <Parent/>
  </div>
</template>


<script>
import Parent from './components/Parent'
export default {
  components:{
    Parent
  },
  mounted(){
    this.$broadcast('say');
  }
}
</script>