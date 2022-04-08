<template>
  <form>
    <component
        v-for="(field, index) in schema"
        :key="index"
        :is="field.fieldType"
        :value="formData[field.name]"
        @input="updateForm(field.name, $event)"
        @selected="onSelected"
        v-bind="field">
    </component>
  </form>
</template>

<script>
import NumberInput from "@/components/FormControls/AppNumberInput"
import SelectList from "@/components/FormControls/AppSelectList"
import TextInput from "@/components/FormControls/AppTextInput"
import TaxonNameAutocompleteButtonsInput from "@/components/FormControls/TaxonNameAutocompleteButtonsInput"
import TaxonConceptAutocompleteInput from "@/components/FormControls/TaxonConceptAutocompleteInput"


export default {
  name: "TaxonConceptFormGenerator",
  components: { 
    NumberInput, 
    SelectList, 
    TextInput, 
    TaxonNameAutocompleteButtonsInput,
    TaxonConceptAutocompleteInput,
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
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value)
      this.$emit("input", fieldName, value)
    },
    onSelected(item) {
      this.$emit('selected', item)
    }
  },
}
</script>
