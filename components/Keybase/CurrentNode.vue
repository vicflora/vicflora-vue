<template>
  <div 
    class="keybase-player-currentnode"
    :key="componentKey"
  >
    <h3>Current node
      <span class="keybase-player-menu">
        <b-button 
          variant="outline-primary"
          size="sm"
          class="keybase-player-stepback"
        >
          <nuxt-link to="#" title="Step back">
            <font-awesome-icon icon="fa-solid fa-arrow-rotate-left"/>
          </nuxt-link>
        </b-button>
        <b-button 
          variant="outline-primary"
          size="sm"
          class="keybase-player-startover"
        >
          <nuxt-link to="#" title="Start over">
            <font-awesome-icon icon="fa-solid fa-rotate"/>
          </nuxt-link>
        </b-button>
        <b-button
          variant="outline-primary"
          size="sm"
          class="keybase-player-glossariser"
          title="Look up terms in glossary"
          @click.prevent="onGlossariseButtonClicked"
        >
          <font-awesome-icon icon="fa-solid fa-comment-dots"/>
        </b-button>
      </span>
    </h3>
    <div>
      <div v-if="currentNode && currentNode.length && glossarisedLeads 
          && glossarisedLeads.length">
        <div 
          v-for="(lead, index) in currentNode" 
          :key="lead.lead_id"
          class="glossarised-lead d-flex"
        >
          <div class="p-2 flex-grow-1"
            v-html="glossarisedLeads[index]"
          />
          <div class="p-2 glossarised-lead-next">
            <a 
              class="keybase-lead" 
              :href="`#l_${ lead.lead_id }`"
            >
              <font-awesome-icon icon="fa-solid fa-circle-chevron-right"/>
            </a>
          </div>
        </div>
      </div>

      <ul v-else-if="currentNode.length">
        <li v-for="lead in currentNode" :key="lead.lead_id">
          <a 
            class="keybase-lead" 
            :href="`#l_${ lead.lead_id }`"
          >{{ lead.lead_text }}</a>
        </li>
      </ul>

      <div 
        v-else-if="remainingItems && remainingItems.length"
        class="keybase-player-result"
      >
        <b>Result:</b> 
        <nuxt-link 
          v-if="remainingItems[0].url"
          :to="remainingItems[0].url.substr(remainingItems[0].url.indexOf('/'))"
        >
          {{ remainingItems[0].item_name }}
        </nuxt-link>
        <span v-else>{{ remainingItems[0].item_nam }}</span>
      </div>
    </div>

    <div 
      v-if="glossaryTermsInString"
      :key="popoverDivKey"
    >
      <b-popover
        v-for="item in glossaryTermsInString"
        :key="`${item.term.id}-${item.substring}`"
        :target="`${item.term.id}-${item.substring}`"
        triggers="hover"
        placement="topright"
      >
        <template #title>{{ item.term.name }}</template>
        <div v-html="item.term.definition"/>
        <div class="text-right"><nuxt-link :to="`/flora/glossary?name=${item.term.name}`">{{ item.term.name }} <b-icon-chevron-right/></nuxt-link></div>
      </b-popover>
    </div>
  </div>
</template>

<script>
import glossaryTermsInStringQuery from '@/graphql/queries/glossaryTermsInStringQuery'

export default {
  props: ['currentNode', 'remainingItems'],
  data() {
    return {
      text: '',
      glossarise: false,
      glossaryTermsInString: [],
      glossarisedLeads: [],
      popoverDivKey: 0,
      componentKey: 0,
    }
  },
  apollo: {
    glossaryTermsInString: {
      query: glossaryTermsInStringQuery,
      skip: true,
      result ({ data, loading }) {
        if (!loading) {
          if (data.glossaryTermsInString && data.glossaryTermsInString.length) {
            this.glossaryTermsInString = []
            let desc = this.currentNode.map(item => {return item.lead_text})
                .join(' | ')
            data.glossaryTermsInString.forEach(item => {
              let index = 0
              const regex = new RegExp('\\b' + item.substring + '\\b', 'g')
              desc = desc.replace(regex, match => {
                index++
                if (index > 1) {
                  this.glossaryTermsInString.push({
                    substring: item.substring,
                    term: {
                      id: item.term.id + '-' + index,
                      name: item.term.name,
                      definition: item.term.definition
                    }
                  })
                  return `<span class="glossary-term" id="${item.term.id}-${index}-${item.substring}">${item.substring}</span>`
                }
                else {
                  return `<span class="glossary-term" id="${item.term.id}-${item.substring}">${item.substring}</span>`
                }
              })
            })
            this.glossarisedLeads = desc.split(' | ')
          }
        }
      },
    }
  },
  watch: {
    currentNode: {
      deep: true,
      handler(currentNode, previousNode) {
        // if (previousNode && previousNode.length === 0) {
        //   this.componentKey++
        // }
        if (this.glossarise) {
          this.popoverDivKey++
          this.glossariseLeadText(currentNode)
        }
        else {
          this.$apollo.queries.glossaryTermsInString.skip = true
          this.glossarisedLeads = []
          this.glossaryTermsInString = []
        }
      }
    }
  },
  methods: {
    onGlossariseButtonClicked() {
      this.glossarise = !this.glossarise
      if (this.glossarise) {
        this.glossariseLeadText(this.currentNode)
      }
      else {
        this.$apollo.queries.glossaryTermsInString.skip = true
        this.glossarisedLeads = []
        this.glossaryTermsInString = []
      }
    },
    glossariseLeadText(currentNode) {
      const text = currentNode.map(item => {return item.lead_text})
          .join(' | ')
      this.text = text
      console.log(text)
      this.$apollo.queries.glossaryTermsInString.setVariables({
        string: text
      })
      this.$apollo.queries.glossaryTermsInString.skip = false
    }
  }
}
</script>

<style lang="scss">
.glossarised-lead-next {
  font-size: 160%;
}
</style>
