<style lang="scss" scoped>
@import "./Glossary-definition.scss";
</style>

<template>
  <b-row>
    <b-col>
      <b-row>
        <b-col>
          <h3 class="m-name mb-3">{{ definition.name }}</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div v-html="definition.definition"></div>
        </b-col>
      </b-row>
      <b-row v-if="definition.relationships.length > 0" class="mb-3">
        <b-col>
          <b-row>
            <b-col>
              <h5>Relationships</h5>
            </b-col>
          </b-row>
          <b-row v-for="item in definition.relationships" :key="item.id">
            <b-col>
              <span class="m-relationship-type-name">{{
                item.relationshipType.name
              }}</span>
            </b-col>
            <b-col>
              <a :href="`?name=${item.relatedTerm.name}`">{{
                item.relatedTerm.name
              }}</a>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row v-if="definition.images.length > 0">
        <b-col>
          <b-row>
            <b-col>
              <h5>Images</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mb-5">
              <div v-viewer="viewerOptions">
                <div v-for="image in definition.images" :key="image.id">
                  <b-img
                   class="mt-3 m-img"
                    thumbnail
                    fluid
                    v-show="showImage"
                    @load="loadImage"
                    :src="image.imageUrl"
                    :data-src="image.imageUrl"
                    :alt="image.caption"
                  >
                  </b-img>
                  <b-spinner
                    label="Spinning"
                    v-show="showImage === false"
                    variant="primary"
                  ></b-spinner>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <!-- {{ definition }} -->
  </b-row>
</template>

<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);
export default {
  name: "GlossaryDefinition",
  props: ["definition"],
  data() {
    return {
      showImage: false,
      viewerOptions: {
        url: "data-src"
      }
    };
  },
  methods: {
    loadImage() {
      this.showImage = true;
    }
  }
};
</script>
