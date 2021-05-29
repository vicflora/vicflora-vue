<style lang="scss" scoped>
@import "./Banner.scss";
</style>
<template>
    <div>
        <div class="m-banner">
            <b-container>
                <div class="m-logo-title">
                    <div class="m-logo-container">
                        <a href="/">
                            <img class="m-logo" src="@/assets/images/rbgv-logo-pink-badge.png" alt="Logo">
                        </a>
                    </div>
                    <div>
                        <a href="/">
                            <div class="m-title">
                                VICFLORA
                                <span class="m-sub-title">Flora of Victoria</span>  
                            </div>
                        </a>  
                    </div>                              
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

