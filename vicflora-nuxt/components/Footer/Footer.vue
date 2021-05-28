<style lang="scss" scoped>
@import "./Footer.scss";
</style>
<template>
    <div class="m-footer">
        <b-container>
            <b-row >
                <b-col class="text-left">
                    <a class="m-copyright" href="https://www.rbg.vic.gov.au/copyright">Copyright</a>
                </b-col>

                <b-col class="text-right">
                    <div class="social-media">
                        <a href="https://www.instagram.com/royalbotanicgardensvic/">
                            <b-icon-instagram font-scale="1.5" class="m-media"></b-icon-instagram>
                        </a>  
                        <a href="https://www.facebook.com/BotanicGardensVictoria">
                            <b-icon-facebook font-scale="1.5" class="m-media"></b-icon-facebook>
                        </a>          
                        <a href="https://twitter.com/RBG_Victoria">
                            <b-icon-twitter font-scale="1.5" class="m-media"></b-icon-twitter>
                        </a>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
   name: "Footer",
}
</script>