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

    <Protologue  
      v-if="concept.taxonName.protologue" 
      :protologue="concept.taxonName.protologue"
    />
  </div>
</template>

<script>

import NameString from "@/components/Taxon/TaxonNameString"
import Authorship from "@/components/Taxon/TaxonNameAuthorship"
import Protologue from "@/components/Taxon/TaxonNameProtologue"
import VernacularName from "@/components/Taxon/TaxonNameVernacularName"

export default {
  name: "TaxonName",
  components: { 
    NameString,
    Authorship,
    Protologue,
    VernacularName 
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss">
@import "~/assets/scss/custom_variables.scss";

.m-title {
  display: inline-block;

  .m-authorship {
    margin-right: 15px;
  }
  
  .m-vernacular-names {
    font-size: xx-large;
  }

  h2.m-taxon-name-not-accepted {
    margin-top: 30px;
  }
}

.m-protologue {
  margin-bottom: 15px;
  i {
    margin-right: 10px;
  }
}
</style>
