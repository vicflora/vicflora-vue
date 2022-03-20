<template>
  <b-container class="vf-glossary-page">
    <b-row>
      <b-col class="text-left">
        <div class="m-main-title">
          <h2>
            Glossary
          </h2>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="3" class="text-left">
        <div class="m-border-right">
          <GlossaryFirstLetters />
          <GlossaryTermList/>
        </div>
      </b-col>
      <b-col class="text-left">
        <GlossaryTerm />
      </b-col> 
    </b-row>
  </b-container>
</template>

<script>
import GlossaryFirstLetters from "@/components/Glossary/GlossaryFirstLetters"
import GlossaryTermList from "@/components/Glossary/GlossaryTermList"
import GlossaryTerm from "@/components/Glossary/GlossaryTerm"

export default {
  name: "Glossary",
  components:{
    GlossaryFirstLetters,
    GlossaryTermList,
    GlossaryTerm,
  },
}
</script>
