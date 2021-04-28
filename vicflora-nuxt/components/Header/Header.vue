<style lang="scss" scoped>
.header::v-deep {
  @import "./Header.scss";
}
</style>

<template>
  <div class="header">
    <b-navbar toggleable="lg" type="light" variant="info" class="m-navbar">
      <b-container>
        <b-navbar-nav>
          <b-nav-item >
            <nuxt-link to="/Home">
              <b-icon
                icon="house-door-fill"
                font-scale="1.5"
                class="m-icon"
              ></b-icon>
            </nuxt-link>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item class="m-menu-item"><nuxt-link to="/flora/search?q=**">Search</nuxt-link></b-nav-item>
            <b-nav-item class="m-menu-item"
              ><nuxt-link to="/flora/classification/6abc498a-70de-11e6-a989-005056b0018f">Browse classification</nuxt-link></b-nav-item
            >
            <b-nav-item href="#" class="m-menu-item">Keys</b-nav-item>
            <b-nav-item href="#" class="m-menu-item">CheckLists</b-nav-item>
            <b-nav-item href="#" class="m-menu-item">Glossary</b-nav-item>
            <b-nav-item href="#" class="m-menu-item"
              >Bioregions & Vegetation</b-nav-item
            >
            <b-nav-item-dropdown no-caret class="m-more-item">
              <template #button-content>
                <span class="m-menu-item-more">More</span>
              </template>
              <b-dropdown-item href="#">Help</b-dropdown-item>
              <b-dropdown-item href="#">About</b-dropdown-item>
              <b-dropdown-item href="/static/acknowledgements"
                >Acknowledgements</b-dropdown-item
              >
            </b-nav-item-dropdown>
            
            
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <SearchInput class="m-search-input"></SearchInput>
            </b-nav-item>
            <b-nav-item>
              <img id="m-avatar" src="@/assets/images/Tree.jpg" />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import SearchInput from "@/components/Search-input/Search-input";
export default {
  name: "Header",
  components: {
    SearchInput,
  },
};
</script>
