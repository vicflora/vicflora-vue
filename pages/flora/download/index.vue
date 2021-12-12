<style lang="scss" scoped>
@import "./Download.scss";
</style>

<template>
  <!-- <b-row>
        <b-col>
            <div>DownLoad</div>
            <b-btn size="sm">Back to search result</b-btn>
        </b-col>
    </b-row> -->
  <b-container class="m-search">
    <b-row>
      <b-col class="text-left">
        <div class="m-main-title">
          <h2>
            Download
          </h2>
        </div>
      </b-col>
    </b-row>
    <!-- query -->
    <b-row>
      <b-col class="text-left">
        <span class="m-subtitle">
          Query string
        </span>
      </b-col>
      <b-col class="text-right">
         <b-btn class="text-right" size="sm" variant="info" @click="backToSearch">
                Back to search result
        </b-btn>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-left"> <b>q: </b>{{ q }} </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col v-if="fq" class="text-left"> <b>fq: </b>{{ fq }} </b-col>
    </b-row>

    <!-- fields -->
    <b-row>
      <b-col class="text-left">
        <span class="m-subtitle">
          Fields
        </span>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="6" cols="12" class="text-left">
        <b-form-checkbox-group
          v-model="fieldsSelected"
          :options="fieldsOptions"
          stacked
        ></b-form-checkbox-group>
      </b-col>

      <b-col class="text-left">
        <h5>Classification</h5>
        <b-form-checkbox-group
          v-model="classificationSelected"
          :options="classificationOptions"
          stacked
        ></b-form-checkbox-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="text-left">
        <div>
          <span class="m-subtitle mt-3 mb-2">
            Filename
          </span>
        </div>
        <b-input-group prepend="Filename" class="mb-5" size="sm">
          <b-form-input size="sm" v-model="filenameSelected"></b-form-input>
          <b-input-group-append>
            <b-button variant="info" @click="handleDownload()"
              >Download</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import gql from "graphql-tag";
var downloadGql = gql`
  query DownloadSearchResult($input: DownloadInput) {
    download(input: $input) {
      data
    }
  }
`;
export default {
  name: "Dowload",
  data() {
    return {
      DownloadSearchResult: "",
      filenameSelected: `vicflora_download_${Date.now()}.csv`,
      delimiterSelected: [],
      input: {
        q: "**"
      },
      fieldsSelected: [
        "id",
        "scientific_name",
        "scientific_name_authorship",
        "taxon_rank",
        "accepted_name_usage",
        "taxonomic_status",
        "occurrence_status",
        "establishment_means"
      ],
      fieldsOptions: [
        { text: "taxon_id", value: "id", disabled: true },
        { text: "taxon_rank", value: "taxon_rank", disabled: false },
        { text: "scientific_name", value: "scientific_name", disabled: true },
        "scientific_name_authorship",
        "taxonomic_status",
        "occurrence_status",
        "establishment_means",
        "accepted_name_usage_id",
        "accepted_name_usage",
        "accepted_name_usage_authorship",
        "accepted_name_usage_taxon_rank",
        "name_according_to",
        "sensu",
        "threat_status",
        "profile",
        "vernacular_name"
      ],
      classificationSelected: ["family"],
      classificationOptions: [
        "kingdom",
        "phylum",
        "class",
        "order",
        "family",
        "genus",
        "specificEpithet",
        "infraspecificEpithet"
      ]
    };
  },
  computed: {
    q: function() {
      return this.$route.query.q;
    },
    fq: function() {
      // more than 1 filter in fq
      if (typeof this.$route.query.fq === "object") {
        return this.$route.query.fq;
        //1 filter in fq
      } else if (typeof this.$route.query.fq === "string") {
        return [this.$route.query.fq];
        // null in fq
      } else {
        return "";
      }
    }
  },
  methods: {
    // getch file data
    getData(input, filename) {
      console.log(filename);
      this.$apollo.addSmartQuery("download", {
        query: downloadGql,
        variables: {
          input: input
        },
        result({ data }) {
          var blob = new Blob([data.download.data], {type: '.csv'});
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        error(error) {
          console.error("We've got an error!", error);
        }
      });
    },
    // hundle the file attributes and fetch the file
    handleDownload() {
      this.input.fl = [...this.fieldsSelected, ...this.classificationSelected];
      this.input.q = this.q
      this.input.fq = this.fq
      this.getData(this.input, this.filenameSelected);
    },
    backToSearch(){
      this.$router.push({
        path: "/flora/Search",
        query: this.$route.query
      });
    },
  }
};
</script>
