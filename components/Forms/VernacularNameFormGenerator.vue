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
  <form>
    <component
        v-for="(field, index) in schema"
        :key="index"
        :is="field.fieldType"
        :value="formData[field.name]"
        @input="onInput(field.name, $event)"
        v-bind="field">
    </component>
  </form>
</template>

<script>
const TextInput = () => import("@/components/FormControls/AppTextInput")
const TextareaControl = () => import("@/components/FormControls/AppTextareaControl")
const CheckboxInput = () => import("@/components/FormControls/AppCheckboxInput")

export default {
  name: "VernacularNameFormGenerator",
  components: { 
    TextInput,
    TextareaControl,
    CheckboxInput,
  },
  props: {
    schema: Array,
    value: Object,
  },
  data() {
    return {
      formData: this.value || {},
      hide: false
    }
  },
  watch: {
    value() {
      this.formData = this.value
    }
  },
  methods: {
    onInput(fieldName, value) {
      this.$set(this.formData, fieldName, value)
      this.$emit("input", fieldName, value)
      $nuxt.$emit('vernacular-name-form-input', fieldName, value)
    },
  },
  watch: {
    value() {
      this.formData = this.value
    },
  },
}
</script>
