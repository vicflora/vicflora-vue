<!--
 Copyright 2022 Royal Botanic Gardens Board

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <tr>
    <td>&nbsp;</td>
    <td>
      <AutocompleteControl
        :key="autocompleteComponentKey"
        :name="'member'"
        placeholder="Start typing name for new member"
        :autocomplete="autocomplete"
        @input="onInput"
        :buttons="['create']"
        form="AgentForm"
        subtype="Person"
        inForm="group-person"

      />
    </td>
    <td class="text-right">
      <BButton
        variant="primary"
        size="sm"
        :disabled="addButtonDisabled"
        @click="onAddGroupPersonButtonClicked"
      >
        <FontAwesomeIcon icon="plus"/>
      </BButton>
    </td>
  </tr>
</template>

<script>
const AgentForm = () => import('@/components/Forms/AgentForm')
const AutocompleteControl = () => import('@/components/FormControls/AppAutocompleteControl')
import { Agent } from '@/models/AgentModel'

import PersonAutocompleteQuery from '@/graphql/queries/PersonAutocompleteQuery'

const agentSuggestionSerializer = (agent) => {
  return agent.name
}


export default {
  name: 'GroupPersonNewTableRow',
  components: {
    AutocompleteControl,
  },
  data() {
    return {
      agent: null,
      addButtonDisabled: true,
      autocomplete: {
        query: PersonAutocompleteQuery,
        serializer: agentSuggestionSerializer,
      },
      autocompleteComponentKey: 0,
      AgentForm,
    }
  },
  created() {
    this.$nuxt.$on("group-person-member-changed", agent => {
      this.agent = new Agent(agent)
      $nuxt.$emit('add-group-person-button-clicked', this.agent)
    })
  },
  mounted() {

  },
  methods: {
    onInput(event) {
      this.agent = new Agent(event)
      this.addButtonDisabled = false
    },
    onAddGroupPersonButtonClicked() {
      this.$emit('add-group-person-button-clicked', this.agent)
      this.autocompleteComponentKey++
    }
  }
}
</script>
