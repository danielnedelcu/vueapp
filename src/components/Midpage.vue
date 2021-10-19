<template>
        <section class="midpage-section q-pa-sm q-py-xl">
            <div class="flex justify-between">
                <div v-if="blurbChange" class="update-indicator flex">
                    <div class=" fixed-left typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>   
                    <span class="flex q-ml-md">New blurbs...</span>
                </div>

                <q-space />
                
                <div class="flex justify-end">
                    <div class="flex items-center">
                        <q-checkbox v-model="checkedCategories" val=".politics" label="Politics" color="teal" />
                        <q-checkbox v-model="checkedCategories" val=".technology" label="Technology" color="orange" />
                        <q-checkbox v-model="checkedCategories" val=".business" label="Business" color="red" />
                        <q-checkbox v-model="checkedCategories" val=".economy" label="Economy" color="green" />
                        <q-checkbox v-model="checkedCategories" val=".culture" label="Culture" color="cyan-7" />
                        <q-checkbox v-model="checkedCategories" val=".world" label="World" color="yellow-7" />
                    </div>

                    <q-select
                        label="Sort by"
                        transition-show="jump-up"
                        transition-hide="jump-up"
                        filled
                        emit-value
                        map-options
                        v-model="model"
                        :options=Object.freeze(options)
                        style="width: 250px"
                        class="q-pl-lg"
                    />      
                </div>   
            </div>   
        </section> 
</template>

<script>
import { defineComponent } from 'vue'
import * as Constants from '../constants'
import store from '../store/index'
import { mapGetters, mapActions } from 'vuex';
import { ASSIGN_FEED_ITEMS }  from "../store/actions.type";

export default defineComponent({
    name: 'Midpage',
    
    data() {
        return { 
            model: 'Likes',
            options: [
                'Date Added', 'Likes', 'Organization'
            ],
            checkedCategories : [
               ".politics",
               ".technology",
               ".business",
               ".economy",
               ".culture",
               ".world"
            ],
            blurbChange : false
        }
    },

    methods : {
        ...mapActions( {
            ActionData : 'feed/' + ASSIGN_FEED_ITEMS,
        }), 
    },    

    watch : {
        model (value) {
            let type;

            switch(value) {
                case Constants.DATE_ADDED :
                    type = { type: 'date', order: "desc" };
                break;  
                case Constants.LIKES :
                    type = { type: 'likes', order: "desc" };
                break;  
                case Constants.ORGANIZATION :
                    type = { type: 'agency', order: "asc" };
                break;                                 
            }

            this.ActionData(type)            
        },

        checkedCategories (obj) {
            window.iso.arrange({ filter: obj });
        }
    }
})
</script>

<style scoped lang="scss">
    @import '../css/quasar.variables.scss';

    .update-indicator {
        height: 45px;

        .typing-indicator {
            $ti-color-bg: #E6E7ED;
            background-color: #ff5b7a;
            will-change: transform;
            width: auto;
            border-radius: 50px;
            padding: 20px 10px;
            position: relative;
            animation: 2s bulge infinite ease-out;
            &::before,
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: -1px;
                height: 15px;
                width: 15px;
                border-radius: 50%;
                background-color: #ff5b7a;
            }
            &::after {
                height: 8px;
                width: 8px;
                left: -7px;
                bottom: -6px;
            }
            span {
                height: 10px;
                width: 10px;
                float: left;
                margin: 0 1px;
                background-color: #fff;
                display: block;
                border-radius: 50%;
                opacity: 0.4;
                @for $i from 1 through 3 {
                &:nth-of-type(#{$i}) {
                    animation: 1s blink infinite ($i * .3333s);
                }
                }
            }
        }

        span {
            font-family: $typography-font-family;
            font-weight: bold;
            color: $accent;
            align-items: center;
        }
    }

    @keyframes blink {
        50% {
            opacity: 1;
        }
    }

    @keyframes bulge {
        50% {
            transform: scale(1.05);
        }
    }

</style>