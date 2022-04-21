<template>
  <div>
    <div 
      v-if="show"
      class="form-group"
    >
      <label :for="name">{{label}}</label>
      <client-only placeholder="loading...">
        <CKEditorNuxt
          v-model="editorData" 
          :config="editorConfig"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
import { formControlPropsMixin } from "@/mixins/formMixins"

export default {
  name: 'ProfileCKEditor5Control',
  components: {
    CKEditorNuxt: () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },
  mixins: [
    formControlPropsMixin,
  ],
  data() {
    return {
      editorData: "",
      editorConfig: {
        toolbar: {
          items: [
            'heading', '|',
            'bold', 'italic', 'removeFormat'
          ]
        }, 
        style: [
          {
            name: 'Example style',
            element: 'h2',
            classes: [ 'foo' ]
          }
        ]
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
          styles: {
            color: "green"
          } 
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
      this.$emit('input', event.target.value)
    }
  }
}

</script>
