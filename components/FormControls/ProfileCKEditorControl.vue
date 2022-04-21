<template>
  <div>
    <div 
      v-if="show"
      class="form-group"
    >
      <label :for="name">{{label}}</label>
      <client-only placeholder="loading...">
        <ckeditor
          v-model="editorData" 
          :config="editorConfig"
          @namespaceloaded="onNamespaceLoaded"
          @input="onInput"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
import { formControlPropsMixin } from "@/mixins/formMixins"

export default {
  name: 'ProfileCKEditorControl',
  mixins: [
    formControlPropsMixin,
  ],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editorData: "",
      editorConfig: {
        toolbarGroups: [
          { name: 'styles', groups: ['style']},
          { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
          { name: 'links' },
          { name: 'mode' },
          { name: 'tools' },
        ],
        removeButtons: 'Underline,Strike,Subscript,Superscript,Format,Font,FontSize,Anchor',
        stylesSet: 'custom_styles',
        contentsCss: '/ckeditor-styles.css',
        height: '300px',
      },
    }
  },
  watch: {
    value: {
      immiediate: true,
      handler() {
        this.editorData = this.value
      }
    }
  },
  mounted() {
    this.editorData = this.value
  },
  methods: {
    onNamespaceLoaded(CKEDITOR) {
      CKEDITOR.stylesSet.add( 'custom_styles', [
        // Block-level styles.
        { 
          name: 'Description', 
          element: 'p', 
          attributes: { 
            'class': 'description' 
          },
        },
        { 
          name: 'Phenology',  
          element: 'p', 
          attributes: { 
            'class': 'phenology' 
          }
        },
        { 
          name: 'State distribution',  
          element: 'p', 
          attributes: { 
            'class': 'distribution_australia' 
          } 
        },
        { 
          name: 'World distribution', 
          element: 'p', 
          attributes: { 
            'class': 'distribution_world' 
          } 
        },
        { 
          name: 'Habitat',  
          element: 'p', 
          attributes: { 
            'class': 'habitat' 
          } 
        },
        { 
          name: 'Note', 
          element: 'p', 
          attributes: { 
            'class': 'note' 
          } 
        },
        { 
          name: 'References', 
          element: 'p', 
          attributes: { 
            'class': 'references' 
          } 
        },

        // Inline styles.
        { 
          name: 'Scientific name', 
          element: 'span', 
          attributes: { 
            'class': 'scientific_name'
          } 
        }
      ])     
    },
    onInput(event) {
      this.$emit('input', event)
    }
  }
}

</script>
