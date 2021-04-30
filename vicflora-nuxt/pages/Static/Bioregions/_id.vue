<template>
    <markdow>
    <nuxt-content :document="markdown" />
  </markdow>
</template>
<script>
// import marked from 'marked'
export default {
    async asyncData({ $content, params }) {
      // fetch our md here
      const markdown = await $content('statics', params.id).fetch()
      return { markdown }
    },
    data(){
        return{
            content:""
        }
    },
    computed:{
        id:function(){
            return this.$route.params.id
        }
    }
}
</script>