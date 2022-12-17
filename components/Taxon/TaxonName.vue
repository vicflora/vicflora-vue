<template>
  <div class="vf-taxon-name">
    <div class="m-title">
      <NameString
        :full-name="concept.taxonName.fullName"
        :rank-id="concept.taxonTreeDefItem.rankId"
        :taxonomic-status="concept.taxonomicStatus"
        :occurrence-status="concept.occurrenceStatus"
      />

      <Authorship
        v-if="concept.taxonName.authorship"
        :authorship="concept.taxonName.authorship"
      />

      <VernacularName
        v-if="concept.preferredVernacularName"
        :vernacular-name="concept.preferredVernacularName.name"
      />
    </div>

    <div
      v-if="concept.taxonName.publishedIn || concept.taxonName.apniName"
      class="vf-published-in"
    >
      <PublishedIn
        v-if="concept.taxonName.publishedIn"
        :publishedIn="concept.taxonName.publishedIn"
      />

      <TaxonNameApniLink
        v-if="concept.taxonName.apniName"
        :apni="concept.taxonName.apniName"
      />
    </div>

    <TaxonAccordingTo
      v-if="concept.accordingTo"
      :accordingTo="concept.accordingTo"
    />



  </div>
</template>

<script>

const NameString = () => import("@/components/Taxon/TaxonNameString")
const Authorship = () => import("@/components/Taxon/TaxonNameAuthorship")
const PublishedIn = () => import("@/components/Taxon/TaxonNamePublishedIn")
const VernacularName = () => import("@/components/Taxon/TaxonNameVernacularName")
const TaxonNameApniLink = () => import("@/components/Taxon/TaxonNameApniLink")
const TaxonAccordingTo = () => import('@/components/Taxon/TaxonAccordingTo')

export default {
  name: "TaxonName",
  components: {
    NameString,
    Authorship,
    PublishedIn,
    VernacularName,
    TaxonNameApniLink,
    TaxonAccordingTo,
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
}
</script>
