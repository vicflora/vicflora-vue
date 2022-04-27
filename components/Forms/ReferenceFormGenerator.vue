<template>
  <form>
    <component
        v-for="(field, index) in schema"
        :key="index"
        :is="field.fieldType"
        :value="formData[field.name]"
        :inForm="'reference'"
        @input="onInput(field.name, $event)"
        @selected="onSelected"
        v-bind="field">
    </component>
  </form>
</template>

<script>
const NumberInput = () => import("@/components/FormControls/AppNumberInput")
const SelectList = () => import("@/components/FormControls/AppSelectList")
const TextInput = () => import("@/components/FormControls/AppTextInput")
const TextareaControl = () => import("@/components/FormControls/AppTextareaControl")
const AutocompleteControl = () => import("@/components/FormControls/AppAutocompleteControl") 
const TextInputSubform = () => import("@/components/FormControls/AppTextInputSubform")

export default {
  name: "ReferenceFormGenerator",
  components: { 
    NumberInput, 
    SelectList, 
    TextInput,
    TextInputSubform,
    TextareaControl, 
    AutocompleteControl,
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
      console.log(fieldName + ': ' + value)
      $nuxt.$emit('reference-form-input', fieldName, value)
    },
    onSelected(item) {
      this.$emit('selected', item)
    },
  },
  watch: {
    value() {
      this.formData = this.value
    },
  },
}
</script>
