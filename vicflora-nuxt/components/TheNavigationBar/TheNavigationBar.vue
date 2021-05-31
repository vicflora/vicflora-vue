<template>
    <BContainer>
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
              href="/flora/Glossary?name=abaxial"
            >Glossary</BNavItem>

            <BNavItem 
              class="m-menu-item"
              href="/bioregions" 
            >Bioregions &amp; Vegetation</BNavItem>

            <BNavItemDropdown 
              no-caret 
              class="m-more-item"
            >
              <template #button-content>
                <span class="m-menu-item-more">More</span>
              </template>
              <BDropdownItem href="/Help">Help</BDropdownItem>
              <BDropdownItem href="/About">About</BDropdownItem>
              <BDropdownItem href="/Acknowledgements">Acknowledgements</BDropdownItem>
            </BNavItemDropdown>
            
            
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
import SearchInput from "@/components/Search/SearchInput/SearchInput"

export default {
  name: "TheNavigationBar",
  components: {
    SearchInput
  }
}
</script>

<style lang="scss" scoped>
.container::v-deep {
  @import "./TheNavigationBar.scss";
}
</style>
