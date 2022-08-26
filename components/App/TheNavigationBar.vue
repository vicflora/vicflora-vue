<template>
    <BContainer :fluid="fluid" class="vicflora-navbar">
      <BNavbar
        toggleable="lg"
        type="light"
        variant="info"
        class="m-navbar"
      >
        <BNavbarNav>
          <BNavItem href="/">
              <BIcon
                icon="house-door-fill"
                font-scale="1.5"
                class="m-icon"
              />
          </BNavItem>
        </BNavbarNav>

        <BNavbarToggle target="nav-collapse"></BNavbarToggle>
        <BCollapse
          id="nav-collapse"
          is-nav>
          <BNavbarNav>
            <BNavItem
              class="m-menu-item"
              to="/flora/search?q=*"
            >Search</BNavItem>

            <BNavItem
              class="m-menu-item"
              to="/flora/classification/6abc498a-70de-11e6-a989-005056b0018f"
            >Browse classification</BNavItem>

            <b-nav-item-dropdown text="Keys">
              <b-dropdown-item to="/flora/key/1903">Key to the main groups of vascular plants</b-dropdown-item>
              <b-dropdown-item to="/flora/matrix-keys">Multi-access keys</b-dropdown-item>
            </b-nav-item-dropdown>

            <BNavItem
              class="m-menu-item"
              to="/flora/checklist"
            >CheckLists</BNavItem>

            <BNavItem
              class="m-menu-item"
              to="/flora/glossary?name=abaxial"
            >Glossary</BNavItem>

            <BNavItem
              class="m-menu-item"
              to="/pages/bioregions"
            >Bioregions &amp; Vegetation</BNavItem>

          </BNavbarNav>

          <!-- Right aligned nav items -->
          <BNavbarNav class="ml-auto">
            <li class="nav-item">
              <SearchInput class="m-search-input"></SearchInput>
            </li>
          </BNavbarNav>
        </BCollapse>
      </BNavbar>
    </BContainer>
</template>

<script>
const SearchInput = () => import("@/components/Search/SearchInput")


export default {
  name: "TheNavigationBar",
  components: {
    SearchInput,
  },
  props: {
    fluid: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.nuxt-link-exact-active:active {
  background-color: #ddd;
}
</style>