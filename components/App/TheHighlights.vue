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

<style lang="scss" scoped>
@import "~/assets/scss/custom_variables.scss";

.m-highlight-title {
  margin-top: 15px;
  margin-bottom: -15px;
}

.m-highlight {
  padding: 0 !important;
  border: 1px solid $light !important;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 0px;
  margin-right: 0px;

  .m-highlight-image {
    margin: 5px 0;
  }
}

.m-hightlight-new {
  color: red;
}
</style>

