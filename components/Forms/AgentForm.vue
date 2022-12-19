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
    @cancel="onCancel"
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
import { Agent, CreateAgentInput, UpdateAgentInput } from '@/models/AgentModel'

const AgentFormGenerator = () => import("@/components/Forms/AgentFormGenerator.vue")

import AgentQuery from '@/graphql/queries/AgentQuery'
import UpdateAgentMutation from '@/graphql/mutations/UpdateAgentMutation'
import CreateAgentMutation from '@/graphql/mutations/CreateAgentMutation'


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
      formData: null,
    }
  },
  apollo: {
    agent: {
      query: AgentQuery,
      skip: true,
    },
  },
  watch: {
    agent: {
      immediate: true,
      deep: true,
      handler(agent) {
        if (Object.keys(this.agent).length > 0) {
          this.formData = new Agent(this.agent)
        }
        this.formData = new Agent({agentType: 'PERSON'})
      }
    },
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
    this.$nuxt.$on('group-persons-changed', (members) => {
      this.formData.members = members
      this.formData.name = members.map(item => item.member.name).join('; ')
      this.okDisabled = false
    })
  },
  mounted() {
    const index = this.schema.map(field => field.name).indexOf('name')
    this.schema[index].disabled = true
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
      }
      if (['lastName', 'initials'].indexOf(fieldName) > -1) {
        if (this.formData.agentType = 'ORGANIZATION') {
          this.formData.name = this.formData.lastName
        }
        if (this.formData.agentType === 'PERSON') {
          if (this.formData.initials) {
            this.formData.name = `${this.formData.lastName}, ${this.formData.initials}`
          }
          else {
            this.formData.name = this.formData.lastName
          }
        }
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
      event.preventDefault()
      let input = null, mutation = null
      if (this.mode === 'update') {
        mutation = UpdateAgentMutation
        input = new UpdateAgentInput(this.formData)
      }
      else {
        mutation = CreateAgentMutation
        input = new CreateAgentInput(this.formData)
      }
      console.log(JSON.stringify({input: input}, null, 2))
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
        console.log(JSON.stringify(data, null, 2))
        this.$nuxt.$emit(`${this.calledFrom}-changed`, data.agent)
        this.$bvModal.hide(this.id)
      })
    },
    onCancel(event) {
      event.preventDefault()
      this.formData = new Agent({agentType: 'PERSON'})
      this.$bvModal.hide(this.id)
    },
  },
}
</script>
