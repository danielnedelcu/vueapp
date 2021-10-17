import { MUTATE_DRAWER_STATE, 
         MUTATE_ASSIGN_LOGGED_STATE, 
         MUTATE_ASSIGN_USER_STATE,
         MUTATE_EDIT_DRAWER_STATE,
         MUTATE_BLURB_IMAGES_STATE,
         MUTATE_ASSIGN_CURRENT_SELECTED,
         MUTATE_ASSIGN_REDIRECT_ROUTE } from "../mutations.type";

const mutations = {
    [MUTATE_DRAWER_STATE](state, obj) {
        state.drawerState = obj = !obj
    },

    [MUTATE_EDIT_DRAWER_STATE](state, obj) {
        state.editDrawerState ^= 1
    },


    [MUTATE_ASSIGN_LOGGED_STATE](state, obj) {
        state.isLoggedIn = obj
    },
    
    [MUTATE_ASSIGN_USER_STATE](state, obj) {
        state.currentUser = obj
    },
    
    [MUTATE_BLURB_IMAGES_STATE](state, obj) {
        state.blurbImgUrl.push( obj )
    },
    
    [MUTATE_ASSIGN_CURRENT_SELECTED](state, obj) {
        state.currentItem = obj;
    },

    [MUTATE_ASSIGN_REDIRECT_ROUTE](state, obj) {
        state.redirectRoute = obj;
    }    
}

export default mutations;