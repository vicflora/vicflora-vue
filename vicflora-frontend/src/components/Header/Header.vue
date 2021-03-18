<style lang="scss" scoped>
.header::v-deep {
    @import "./Header.scss";
}
</style>

<template>
   <div class="header">
    <b-navbar toggleable="lg" type="light" variant="info" class="m-navbar">
        <b-container fluid="xl">
            <b-navbar-nav>
                <b-nav-item href="/">
                    <b-icon icon="house-door-fill" font-scale="1.5" class="m-icon"></b-icon>
                </b-nav-item>
            </b-navbar-nav>  
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#" class="m-menu-item">Search</b-nav-item>
                    <b-nav-item href="/flora/classification/32063" class="m-menu-item">Browse classification</b-nav-item>
                    <b-nav-item href="#" class="m-menu-item">Keys</b-nav-item>
                    <b-nav-item href="#" class="m-menu-item">CheckLists</b-nav-item>
                    <b-nav-item href="#" class="m-menu-item">Glossary</b-nav-item>
                    <b-nav-item href="#" class="m-menu-item">Bioregions & Vegetation</b-nav-item>
                    <b-nav-item-dropdown no-caret>
                        <template #button-content>
                            <span class="m-menu-item-more">More</span>
                        </template>
                        <b-dropdown-item href="#">Help</b-dropdown-item>
                        <b-dropdown-item href="#">About</b-dropdown-item>
                        <b-dropdown-item href="/static/acknowledgements">Acknowledgements</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            
            
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item>
                        <b-input-group>
                            <b-form-input size="sm" placeholder="Enter taxon name..."></b-form-input>
                            <b-input-group-append>
                                <b-button size="sm">
                                    <b-icon font-scale="1" icon="search" />
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-nav-item>
                    <b-nav-item>
                        <!-- <span class="m-username">Username</span> -->
                        <img id="m-avatar" src="@/assets/images/Tree.jpg">
                    </b-nav-item>
                </b-navbar-nav>

            
            </b-collapse>
            </b-container>
        </b-navbar>
    </div>  
</template>

<script>
export default {
    name: 'Header',
}
</script>