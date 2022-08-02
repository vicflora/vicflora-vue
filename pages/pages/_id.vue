<template>
  <article class="container static-content">
    <header class="m-title">
      <h1>{{ markdown.title }}</h1>
    </header>
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
const TableOfContent = () => import("@/components/App/AppTableOfContent")
const CurrentDateComponent = () => import("@/components/global/CurrentDateComponent")
const CurrentYearComponent = () => import("@/components/global/CurrentYearComponent")
const BioregionsMap = () => import("@/components/global/BioregionsMap")
const BioregionsImageMap = () => import("@/components/global/BioregionsImageMap")
const MarkdownAlertComponent = () => import("@/components/global/MarkdownAlertComponent")
const MarkdownButtonLinkComponent = () => import("@/components/global/MarkdownButtonLinkComponent")
const MarkdownFigureComponent = () => import("@/components/global/MarkdownFigureComponent")

export default {
  name:"StaticContent",
  components: {
    TableOfContent,
    CurrentDateComponent,
    CurrentYearComponent,
    BioregionsMap,
    BioregionsImageMap,
    MarkdownAlertComponent,
    MarkdownButtonLinkComponent,
    MarkdownFigureComponent,
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