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
  <span class="vf-update-button">
    <b-button
      variant="primary"
      size="sm"
      @click="openModal"
    >
      <font-awesome-icon :icon="icon"/>
    </b-button>
    <component
      :is="form"
      :id="modal"
      :value="value"
      :subtype="subtype"
      :mode="button"
      :calledFrom="field"
    />
  </span>
</template>

<script>
const TaxonNameForm = () => import("@/components/Forms/TaxonNameForm")
const TaxonNameProtologueForm = () => import("@/components/Forms/TaxonNameProtologueForm")
const VernacularNameForm = () => import("@/components/Forms/VernacularNameForm")
const AgentForm = () => import("@/components/Forms/AgentForm")
const ReferenceForm = () => import('@/components/Forms/ReferenceForm')

export default {
  name: "AppButtonAppend",
  components: {
    TaxonNameForm,
    TaxonNameProtologueForm,
    VernacularNameForm,
    AgentForm,
    ReferenceForm,
  },
  props: {
    button: {
      type: String,
      required: true,
    },
    form: {
      type: String,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: false,
    },
    subtype: {
      type: String,
      required: false,
    },
    field: {
      type: String,
      default: '',
    },
  },
  computed: {
    icon() {
      let icon = ''
      switch (this.button) {
        case 'update':
          icon = 'pen-to-square'
          break;

        case 'create':
          icon = 'plus'
          break;

        default:
          break;
      }
      return icon
    },
    modal() {
      let modal = this.button + this.form.replace(/[A-Z]/g, ($0) => '-'
          + $0.toLowerCase())
      if (this.subtype !== undefined) {
        modal += '-' + this.subtype
      }
      if (this.index !== undefined) {
        modal += '-' + this.index
      }
      return modal
    },
  },
  methods: {
    openModal() {
      this.$bvModal.show(this.modal)
    },
  }
}
</script>

<style lang="scss">
.vf-update-button {
  display: inline-flex;
  height: 100%;

  .btn {
    border-radius: 0;
  }
}
</style>
