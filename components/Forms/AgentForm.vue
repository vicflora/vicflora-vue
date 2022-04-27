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
  <b-modal
    :id="id"
    :title="id.indexOf('update-agent-form') > -1 ? 'Update agent' : 'Create agent'"
    :ok-title="id.indexOf('update-agent-form') > -1 ? 'Update' : 'Save'"
    :ok-disabled="okDisabled"
    size="lg"
    @shown="onShown"
    @ok="onOk"
  >
    <div class="agent-form">
      <AgentFormGenerator 
        :schema="schema"
        :mode="mode"
        :value="formData"
        @input="onInput"
      />
    </div>
    <template slot="modal-ok"><FontAwesomeIcon icon="floppy-disk"/> Save</template>
    <template slot="modal-cancel"><FontAwesomeIcon icon="ban"/> Cancel</template>
  </b-modal>
</template>

<script>
import schema from "@/config/agentFormConfig"
import { formMethodsMixin } from "@/mixins/formMixins"
import { CreateAgentInput, UpdateAgentInput } from '@/models/AgentModel'

const AgentFormGenerator = () => import("@/components/Forms/AgentFormGenerator.vue")

import gql from "graphql-tag"
const AgentQuery = gql`query ($id: ID!) {
  agent(id: $id) {
    id
    agentType
    name
    lastName
    firstName
    initials
    members {
      id
      sequence
      member {
        id
        name
        lastName
        firstName
        initials
      }
    }
  }
}`

const UpdateAgentMutation = gql`mutation ($input: UpdateAgentInput!) {
  agent: updateAgent(input: $input) {
    id
    name
  }
}`

const CreateAgentMutation = gql`mutation ($input: CreateAgentInput!) {
  agent: createAgent(input: $input) {
    id
    name
  }
}`

export default {
  name: 'AgentForm',
  components: {
    AgentFormGenerator,
  },
  mixins: [
    formMethodsMixin,
  ],
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      required: false,
    },
    mode: {
      type: String,
      required: false
    },
    calledFrom: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      agent: {},
      okDisabled: true,
      schema: [],
    }
  },
  apollo: {
    agent: {
      query: AgentQuery,
      skip: true,
      result({ data, loading }) {
        if (!loading) {
          this.enableDisableNameInput(data.agent.agentType)
        }
      }
    },
  },
  computed: {
    formData() {
      if (Object.keys(this.agent).length > 0) {
        return this.agent
      }
      return {agentType: 'PERSON'}
    },
  },
  watch: {
    'formData.agentType': {
      immediate: true,
      deep: true,
      handler(agentType) {
        if (agentType) {
          this.schema = schema[agentType]
        }
        else {
          this.schema = schema.AGENT
        }
      }
    },
    'formData.members': {
      deep: true,
      handler(members) {
        if (members) {
          this.formData.name = members.map((item) => {return item.member.name}).join('; ')
        }
      }
    }
  },
  created() {
    this.$nuxt.$off('group-persons-changed')
    this.$nuxt.$on('group-persons-changed', (member) => {
      this.okDisabled = false
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('group-persons-changed')
  },
  methods: {
    onShown() {
      if (this.id.indexOf('update-agent-form') > -1) {
        this.$apollo.queries.agent.setVariables({
          id: this.value.id,
        })
        this.$apollo.queries.agent.skip = false
      }
    },
    onInput(fieldName, value) {
      this.okDisabled = false
      if (fieldName === 'agentType') {
        this.schema = schema[value]
        this.enableDisableNameInput(value)
      }
    },
    enableDisableNameInput(agentType) {
      const index = this.schema.map(field => field.name).indexOf('name')
      if (agentType === 'GROUP') {
        this.schema[index].disabled = true
      }
      else {
        this.schema[index].disabled = false
      }
    },
    onOk(event) {
      let input = null, mutation = null
      if (this.mode === 'update') {
        mutation = UpdateAgentMutation
        input = new UpdateAgentInput(this.formData)
      }
      else {
        mutation = CreateAgentMutation
        input = new CreateAgentInput(this.formData)
      }
      if (input.members) {
        input.members.forEach(item => {
          item.group = {
            connect: this.formData.id
          }
        })
      }
      this.$apollo.mutate({
        mutation: mutation,
        variables: {
          input: input
        }
      }).then(({data}) => {
        this.$nuxt.$emit(`${this.calledFrom}-changed`, data.agent)
        this.$bvModal.hide(this.id)
      })
    },
  },
}
</script>