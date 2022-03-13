<template>
  <li>
    <NuxtLink :to="`/flora/taxon/${id}`">
      <span class="m-taxon-name m-taxon-name-italic m-taxon-name-not-accepted">
        {{ fullName }}
      </span>
      <span
        v-if="authorship"
        class="vf-synonymy-author"
      >
        {{ authorship }}
      </span>
      <span
        v-if="accordingTo"
        class="vf-synonymy-according-to"
      >
        sensu {{ accordingTo }}
      </span>
    </NuxtLink>
  </li>
</template>

<script>
export default {
  name: "TaxonTabSynonymyItem",
  props: {
    id: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    authorship: {
      type: String,
      required: false
    },
    accordingTo: {
      type: String,
      required: false
    }
  }
}
</script>