<template>
    <q-item class="center-items no-wrap column col-8">
        <div class="flex row no-wrap relative-position">
            <q-item-section avatar>
                <div class="q-avatar">
                    <q-avatar class="q-avatar__content row flex-center overflow-hidden">
                    <img :src="opinion.agencyLogo">
                    </q-avatar>
                </div>
            </q-item-section>

            <q-item-section>
                <q-item-label class="agency">{{ opinion.agency }} - {{ opinion.date }}</q-item-label>
                <q-item-label class="name" caption>{{ opinion.author }}</q-item-label>
            </q-item-section>        
            <q-btn v-if="LoggedState" v-on:click="onEdit(opinion)" round color="primary" class="news-edit absolute-top-right" icon="edit"></q-btn>          
        </div>

        <a :href="opinion.link"><div class="text-h3">{{ opinion.headline }}</div></a>
    </q-item>    
</template>

<script>
import { defineComponent } from 'vue'
import Opinion from '../models/Opinion'
import  store from '../store/index'
import { mapGetters, mapActions } from 'vuex';
import  {ASSIGN_CURRENT_SELECTED_ITEM, ASSIGN_EDIT_DRAWER_STATE}  from "../store/actions.type";

export default defineComponent({
    name: 'Opinion',
    store,
    props : {
        opinion : { type : Opinion, required : true }
    },

    computed: {                        
        ...mapGetters ( {LoggedState : 'getLoggedInState' })      
    },      
    
    methods : {
        ...mapActions( {
            ActionData : ASSIGN_CURRENT_SELECTED_ITEM,
            ActionEditItem: ASSIGN_EDIT_DRAWER_STATE
        }),    
           
        onEdit (obj) {
            this.ActionEditItem(0);
            this.ActionData(obj)            
        }
    }
})
</script>

<style scoped lang="scss">
    .card {
        padding-bottom: 50px;
        margin-bottom: 60px;

        &:after {
            content: '';
            border-bottom: 1px solid #fff;
            width: 100px;
            position: absolute;
            bottom: 0;
        }
        .date {
            font-size: 12px;
        }
        .name {
            font-weight: 400;
            font-size: 17px;
            color: #fff;
        }

        .agency {
            font-size: 12px;
            color: #fff;
        }

        a {
            text-decoration: none;
            color: #fff;
            font-family: 'Playfair Display';
            padding-top: 20px;
            float: left;              
        }
    }
</style>