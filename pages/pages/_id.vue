<template>
  <article class="container static-content">
    <!-- title -->
    <BRow>
      <BCol class="mt-4 mb-2 m-title">
        <h1>{{ markdown.title }}</h1>
      </BCol>
    </BRow>
    <!-- content -->
    <BRow>
      <BCol align-self="start" cols="9" class="text-left">
        <nuxt-content
          id="scrollspy-nested"
          :document="markdown"
          class="m-content"
        />
      </BCol>
      <!-- table of content -->
      <BCol align-self="start" cols="3">
        <TableOfContent :toc="markdown.toc"></TableOfContent>
      </BCol>
    </BRow>
  </article>
</template>

<script>
import TableOfContent from "@/components/App/AppTableOfContent"

export default {
  name:"StaticContent",
  components: {
    TableOfContent
  },
  async asyncData({ $content, params }) {
    const markdown = await $content(`pages/${params.id.toLowerCase()}`).fetch()
    return { markdown }
  },
  data() {
    return {
      content: ""
    };
  },
  computed: {
  }
}
</script>