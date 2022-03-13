<template>
  <div class="highlights">
    <div class="m-highlight-title">
      <p>HIGHLIGHTS</p>
    </div>

    <BRow 
      v-for="item in highlights" 
      :key="item.index" 
      class="m-highlight"
    >
      <BCol 
        cols="3" 
        class="m-highlight-col"
      >
        <BImg 
          :src="item.img" 
          fluid 
          class="m-highlight-image" 
          alt=""
        />
      </BCol>
      <BCol 
        cols="9" 
        class="m-highlight-col"
      >
        <div 
          class="m-hightlight-1" 
          v-html="item.text"
        ></div> 
      </BCol>
    </BRow>
  </div>
</template>

<script>
export default {
  name: "TheHighlights",
  props: {
    highlights: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/custom_variables.scss";

</style>

