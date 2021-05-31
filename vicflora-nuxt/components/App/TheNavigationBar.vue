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
import SearchInput from "@/components/Search/SearchInput"

export default {
  name: "TheNavigationBar",
  components: {
    SearchInput
  }
}
</script>

<style lang="scss" scoped>
.container::v-deep {
  @import "~/assets/scss/custom_variables.scss";

  .m-navbar {
    margin-left: -15px;
    margin-right: -15px;
    padding: 0.5rem 15px;
    background-color: $white !important;
    
    .m-icon {
      color: $primary;
    }
    .nav-item {
      margin-top: 4px;
      a {
        color: $primary;
      }
      a:hover {
        text-decoration: none;
      }
    }

    .m-menu-item-more {
      color: $primary;
    }

  }

  .dropdown-menu {
    font-size: small;
  }

  .navbar-toggler {
    border-color: $white !important
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/></svg>") !important;
  }

  .m-search-input{
    height: 30px;
    
    input {
      border-color: $primary;
    }

    button {
      background-color: $primary;
      border-color: $primary;
    }
  }

  .container {
    min-height: auto;
  }
}
</style>
