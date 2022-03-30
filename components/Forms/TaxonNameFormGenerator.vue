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
import NumberInput from "@/components/App/AppNumberInput"
import SelectList from "@/components/App/AppSelectList"
import TextInput from "@/components/App/AppTextInput"
import TextareaControl from "@/components/App/AppTextareaControl"
import TaxonNameProtologueInput from "@/components/Forms/TaxonNameProtologueInput"

export default {
  name: "TaxonNameFormGenerator",
  components: { 
    NumberInput, 
    SelectList, 
    TextInput,
    TextareaControl, 
    TaxonNameProtologueInput,
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
  methods: {
    updateForm(fieldName, value) {
      this.$set(this.formData, fieldName, value)
      this.$emit("input", fieldName, value)
    },
    onSelected(item) {
      this.$emit('selected', item)
    }
  },
  watch: {
    value() {
      this.formData = this.value
    }
  }
}
</script>
