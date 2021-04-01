<template>
  <div>
    <b-input-group>
        <b-form-input
        v-model="inputText"
        size="sm"
        @change="checkText"
        placeholder="Enter taxon name..."
        ></b-form-input>
        <b-input-group-append>
        <b-button size="sm">
            <b-icon font-scale="1" icon="search" />
        </b-button>
        </b-input-group-append>
    </b-input-group>
</div>
</template>
<script>
import gql from 'graphql-tag'
import searchgql from "../../graphql/queries/search.gql";
let searchGql = gql`${searchgql}`
export default {
  name: "SearchInput",
  data() {
    return {
      input: { fq: "*bor*" },
      inputText: "",
      search:'',
    };
  },
//   apollo: {
//     search: {
//       query: gql`${searchgql}`,
//       variables() {
//         return {
//           input: this.input,
//         };
//       },
//     },
//   },
  methods: {
    checkText() {
      if (this.inputText.length < 2) {
        return;
      }
      this.input = {
        fq: `*${this.inputText}*`,
      };
      console.log("change")  
      this.getData()    
    },
    getData(){
        this.$apollo.addSmartQuery('search', {
            query:searchGql,
            variables: {
                input: this.input,
            },
            result ({ data}) {
                this.$emit("data", data);
                console.log(data)
            },
            error (error) {
                console.error('We\'ve got an error!', error)
            }
        });
    },
  },
  created:function(){
    this.getData()
    }
};
</script>
