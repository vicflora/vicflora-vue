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

            <BNavItem
              class="m-menu-item"
              to="/flora/key/1903"
            >Keys</BNavItem>

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