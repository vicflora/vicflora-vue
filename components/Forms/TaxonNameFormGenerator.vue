<template>
  <form>
    <component
        v-for="(field, index) in schema"
        :key="index"
        :is="field.fieldType"
        :value="formData[field.name]"
        @input="onInput(field.name, $event)"
        @selected="onSelected"
        v-bind="field">
    </component>
  </form>
</template>

<script>
import NumberInput from "@/components/FormControls/AppNumberInput"
import SelectList from "@/components/FormControls/AppSelectList"
import TextInput from "@/components/FormControls/AppTextInput"
import TextareaControl from "@/components/FormControls/AppTextareaControl"
const AutocompleteControl = () => import("@/components/FormControls/AppAutocompleteControl") 
const TextInputSubform = () => import("@/components/FormControls/AppTextInputSubform")

export default {
  name: "TaxonNameFormGenerator",
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
      $nuxt.$emit('taxon-name-form-input', fieldName, value)
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
