<template>
  <div class="vf-search-result-item vf-search-result-item row text-left">
    <BCol
      cols="auto"
      class="text-left mr-auto"
    >
      <div
        v-if="item.taxonomicStatus && item.taxonomicStatus === 'accepted' && item.occurrenceStatus !== 'excluded'"
      >
        <NuxtLink
          :to="`/flora/taxon/${item.id}`"
          :style="rankClass[item.taxonRank] > 140 ? 'font-style: italic;' : ''"
        >
          <span class="vf-search-result-item-name-accepted">{{ item.scientificName }}</span>
          <span class="vf-search-result-item-author">{{ item.scientificNameAuthorship }}</span>
          <span class="vf-search-result-item-vernacularname">{{ item.preferredVernacularName }}</span>
        </NuxtLink>
      </div>

      <div v-else>
        <div
          :style="item.acceptedNameUsageId ? '' : 'margin-bottom: 10px;'"
        >
          <NuxtLink
            :to="`/flora/taxon/${item.id}`"
            :style="
              rankClass[item.taxonRank] > 140
                ? 'font-style: italic;'
                : ''
            "
          >
            <span class="vf-search-result-item-name">{{ item.scientificName }}</span>
            <span class="vf-search-result-item-author">{{ item.scientificNameAuthorship }}</span>
            <span v-if="item.nameAccordingTo" class="vf-search-result-item-sensu">sensu {{ item.nameAccordingTo }}</span>
          </NuxtLink>
        </div>
        <div v-if="item.acceptedNameUsageId">
          <span>{{ `= ` }}</span>
          <NuxtLink
            :to="`/flora/taxon/${item.acceptedNameUsageId}`"
            :style="rankClass[item.taxonRank] > 140 ? 'font-style: italic;' : ''"
          >
            <span class="vf-search-result-item-name-accepted">{{ item.acceptedNameUsage }}</span>
            <span class="vf-search-result-item-author">{{ item.acceptedNameUsageAuthorship }}</span>
            <span class="vf-search-result-item-vernacularname">{{ item.vernacularName }}</span>
          </NuxtLink>
        </div>
      </div>
    </BCol>

    <BCol
      cols="auto"
      class="m-responsive-disappear"
    >
      <span class="vf-search-result-item-familyname">{{ item.family }}</span>
    </BCol>
  </div>
</template>

<script>
export default {
  name: "SearchResultItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rankClass: {
        life: -9999,
        kingdom: 10,
        phylum: 30,
        class: 60,
        superorder: 90,
        order: 100,
        family: 140,
        genus: 180,
        species: 220,
        subspecies: 230,
        variety: 240,
        forma: 260,
      }
    }
  }
}
</script>
