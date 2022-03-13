<template>
    <BContainer fluid class="vicflora-navbar">
      <BNavbar
        toggleable="lg"
        type="light"
        variant="info"
        class="m-navbar"
      >
        <BNavbarNav>
          <BNavItem href="/">
            <img src="@/assets/images/rbgv-logo-pink-badge.png" alt="Logo"/><span class="nav-brand">VicFlora</span></BNavItem>
        </BNavbarNav>

        <BNavbarToggle target="nav-collapse"></BNavbarToggle>
        <BCollapse
          id="nav-collapse"
          is-nav>
          <BNavbarNav>
            <BNavItem
              class="m-menu-item"
              href="/flora/search?q=*"
            >Search</BNavItem>

            <BNavItem
              class="m-menu-item"
              href="/flora/classification/6abc498a-70de-11e6-a989-005056b0018f"
            >Browse classification</BNavItem>

            <BNavItem
              class="m-menu-item"
              href="/flora/key/1903"
            >Keys</BNavItem>

            <BNavItem
              class="m-menu-item"
              href="/flora/checklist"
            >CheckLists</BNavItem>

            <BNavItem
              class="m-menu-item"
              href="/flora/glossary?name=abaxial"
            >Glossary</BNavItem>

            <BNavItem
              class="m-menu-item"
              href="/pages/bioregions"
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
import SearchInput from "@/components/Search/SearchInput"

export default {
  name: "TheFullWidthNavigationBar",
  components: {
    SearchInput
  },
  props: {
    fluid: {
      type: Boolean,
      default: false,
    },
  },
}
</script>