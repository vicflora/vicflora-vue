<style lang="scss" scoped>
@import "./Header.scss";
</style>

<template>
   <div>
    <b-navbar toggleable="lg" type="light" variant="info" class="m-navbar">
        <b-icon icon="grid3x3-gap-fill" font-scale="1.5" class="m-icon"></b-icon>
        <img src="@/assets/logo–white.png" class="d-inline-block align-top m-logo" alt="Logo">
        <b-navbar-brand href="#" class="m-title">Royal Botanic Gardens</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search here"></b-form-input>
            </b-nav-form>
        </b-navbar-nav>

         <b-navbar-nav class="ml-auto" >
            <b-nav-item>
                <b-icon-gear-fill class="m-icon"></b-icon-gear-fill>
                <b-icon-question-circle-fill class="m-icon"></b-icon-question-circle-fill> 
                <img id="m-avatar" src="@/assets/Tree.jpg">
            </b-nav-item>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>  
</template>

<script>
export default {
    name: 'Header',
}
</script>