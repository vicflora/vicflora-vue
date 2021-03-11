<style lang="scss" scoped>
@import "./Banner.scss";
</style>
<template>
    <div>
        <div class="m-banner">
            <b-container fluid="xl">
                <div class="m-logo-title">
                    <a href="https://www.rbg.vic.gov.au/">
                        <img class="m-logo" src="@/assets/logo–white.png" alt="Logo">
                    </a>
                    <a href="https://vicflora.rbg.vic.gov.au/">
                        <div class="m-title">
                            VICTORY
                            <span class="m-sub-title">Flora of Victoria</span>  
                        </div>
                    </a>                   
                </div>
            </b-container>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Banner',
}
</script>

