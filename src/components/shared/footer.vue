<template>
    <footer class="q-footer q-layout__section--marginal text-white relative-position">
            <div class="flex">
                <div class="column absolute-center">
                    <img src="~/assets/logo.svg" />
                    <q-item-label caption  class="q-ml-none q-mt-sm text-white text-center">@2019 blurb news</q-item-label>
                </div>
            </div>
    </footer>
</template>

<script>
import { defineComponent } from 'vue'
import { auth } from '../../firebase';
import { mapGetters } from 'vuex';

export default defineComponent({
    name: "Footer",

    data() {
        return {
          search : []
        };
    },


    methods: {
   
    }
})
</script>

<style scoped lang="scss">
    @import '../../css/quasar.variables.scss';

    footer {
        padding : 70px 0;
        background-color: $footer;
        font-family: $typography-font-family;

        img {
            width: 80px;
            margin: 0 auto;
        }
    }
</style>