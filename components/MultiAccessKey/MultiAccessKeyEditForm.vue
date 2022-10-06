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
  <form 
    class="form"
    @input="onInput">
    <b-form-group
      v-if="form.name !== undefined"
      label="Name:"
      label-for="input-name"
    >
      <b-form-input
        id="input-name"
        v-model="form.name"
        placeholder="Enter name"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      v-if="form.title !== undefined"
      label="Title:"
      label-for="input-title"
    >
      <b-form-input
        id="input-title"
        v-model="form.title"
        placeholder="Enter title"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      v-if="form.characterType !== undefined"
      label="Character type:"
      label-for="select-character-type"
    >
      <b-form-select
        id="select-character-type"
        v-model="form.characterType"
        :options="characterTypeOptions"
        placeholder="Enter character type"
        required
      ></b-form-select>
    </b-form-group>

    <b-form-group
      v-if="form.description !== undefined"
      label="Description:"
      label-for="textarea-description"
    >
      <client-only placeholder="loading...">
        <ckeditor
          v-model="form.description" 
          :config="editorConfig"
          @input="onInput"
        />
      </client-only>
    </b-form-group>
  </form>
</template>

<script>
import CharacterTypeEnum from "~/graphql/enums/CharacterTypeEnum"

export default {
  name: 'MultiAccessKeyEditForm',
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editorConfig: {
        toolbarGroups: [
          { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
          { name: 'links' },
          { name: 'mode' },
          { name: 'tools' },
        ],
        removeButtons: 'Underline,Strike,Subscript,Superscript,Format,Font,FontSize,Anchor',
        stylesSet: 'custom_styles',
        contentsCss: '/ckeditor-styles.css',
        height: '200px',
      },
      okDisabled: true,
    }
  },
  computed: {
    characterTypeOptions() {
      if (this.form.characterType !== undefined) {
        return Object.keys(CharacterTypeEnum).map(item => {
          return {
            value: item,
            text: CharacterTypeEnum[item].label
          }
        })
      }
    }
  },
  methods: {
    onInput() {
      this.$nuxt.$emit('multi-access-edit-form-input')
    }
  }
}
</script>