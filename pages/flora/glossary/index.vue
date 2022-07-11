<template>
  <b-container class="vf-glossary-page">
    <b-row>
      <b-col class="text-left">
        <div class="page-header">
          <h1>
            Glossary
          </h1>
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
const GlossaryFirstLetters = () => import("@/components/Glossary/GlossaryFirstLetters")
const GlossaryTermList = () => import("@/components/Glossary/GlossaryTermList")
const GlossaryTerm = () => import("@/components/Glossary/GlossaryTerm")

export default {
  name: "Glossary",
  components:{
    GlossaryFirstLetters,
    GlossaryTermList,
    GlossaryTerm,
  },
}
</script>
