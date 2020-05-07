<template>
</template>

<script>
export default {
  name: 'Profile',
  components: {
    
  },
  data(){
    return {}
  },
  computed: {
    width(){
      return this.$store.getters['appearance/getAppWidtg'] - this.$store.getters['appearance/getMenuLeftSpace'];
    }
  },
  created(){},
  methods: {}    
}
</script>

<style lang="scss">

</style>