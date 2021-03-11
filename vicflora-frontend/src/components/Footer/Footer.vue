<style lang="scss" scoped>
@import "./Footer.scss";
</style>
<template>
    <div class="m-footer">
        <b-container fluid="lg">
            <b-row >
                <b-col cols="5">
                    <b-row>
                        <b-col cols="4.5" class="text-right">
                            <span>VicFlora is sponsored by:</span>
                        </b-col>
                        <b-col>
                             <div class="text-left m-sponsor">
                                <p class="m-text">Royal Botanic Gardens</p>
                                <p class="m-text">Foundation Victoria</p>   
                            </div>
                        </b-col>
                        <b-col class="text-left" cols="3">
                            <img class="m-footer-logo" src="https://vicflora.rbg.vic.gov.au/images/bush-blitz-logo.png" alt="Bush Blitz logo"/>
                        </b-col>
                    </b-row>
                </b-col>
                

                <b-col cols="3">
                    <div class>
                        <a class="m-copyright" href="https://www.rbg.vic.gov.au/copyright">Copyright</a>
                    </div>            
                </b-col>

                <b-col class="text-right">
                    <a href="https://www.instagram.com/royalbotanicgardensvic/">
                        <b-icon-instagram font-scale="1.5" class="m-media"></b-icon-instagram>
                    </a>  
                </b-col>
                <b-col>
                    <a href="https://www.facebook.com/BotanicGardensVictoria">
                        <b-icon-facebook font-scale="1.5" class="m-media"></b-icon-facebook>
                    </a>          
                </b-col>
                <b-col class="text-left" cols="1">
                    <a href="https://twitter.com/RBG_Victoria">
                        <b-icon-twitter font-scale="1.5" class="m-media"></b-icon-twitter>
                    </a>
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