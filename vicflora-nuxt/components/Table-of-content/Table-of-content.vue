<template>
  <ul>
    <li
      v-for="link of toc"
      :key="link.id"
      :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
    >
      <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TableOfContent",
props:["toc"],
  data(){
      return{
          markdown:{}
      }
  }
};
</script>
