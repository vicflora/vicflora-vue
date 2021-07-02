<template>
    <iframe style="width:100vw;height:100vh;" :src="`https://vicflora.rbg.vic.gov.au/matrix-keys/${id}`" />
</template>

<script>
export default {
    computed:{
        id:function(){
            return this.$route.params.id
        }
    }
}
</script>

