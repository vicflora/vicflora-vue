<template>
  <div>
    <div class="m-title">
      <NameString
        :full-name="concept.taxonName.fullName"
        :rank-id="concept.taxonTreeDefItem.rankId"
        :taxonomic-status="concept.taxonomicStatus"
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
      v-if="concept.taxonName.protologue || concept.taxonName.apniName"
      class="m-protologue"
    >
      <Protologue
        v-if="concept.taxonName.protologue"
        :protologue="concept.taxonName.protologue"
      />

      <TaxonNameApniLink
        v-if="concept.taxonName.apniName"
        :apni="concept.taxonName.apniName"
      />
    </div>


  </div>
</template>

<script>

const NameString = () => import("@/components/Taxon/TaxonNameString")
const Authorship = () => import("@/components/Taxon/TaxonNameAuthorship")
const Protologue = () => import("@/components/Taxon/TaxonNameProtologue")
const VernacularName = () => import("@/components/Taxon/TaxonNameVernacularName")
const TaxonNameApniLink = () => import("@/components/Taxon/TaxonNameApniLink")

export default {
  name: "TaxonName",
  components: {
    NameString,
    Authorship,
    Protologue,
    VernacularName,
    TaxonNameApniLink,
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
}
</script>