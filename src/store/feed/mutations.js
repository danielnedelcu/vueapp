import { MUTATE_ASSIGN_FEED, 
         MUTATE_SORT_FEED, 
         MUTATE_CLEAR_FEED, 
         MUTATE_ASSIGN_CURRENT_FEED, 
         MUTATE_REMOVE_FEED} from "../mutations.type";

const mutations = {
    /**
     * Builds state item.
     * From Firebase
     * 
     * @param {*} state 
     * @param {*} obj 
     */
    [MUTATE_ASSIGN_FEED](state, obj) {        
        state.feeditems.push(obj);
    },

    /**
     * When in edit mode, preserves the news object selected for edit.
     * Default admin/ namespace
     * 
     * @param {*} state 
     * @param {*} obj 
     */    
    [MUTATE_ASSIGN_CURRENT_FEED](state, obj) {
        state.currentItem = obj
    },    

    /**
     * Removes all elements from state
     * 
     * @param {*} state 
     * @param {*} obj 
     */
    [MUTATE_CLEAR_FEED](state, obj) {
        state.feeditems.splice(0, state.feeditems.length);
        state.feeditems = [];
    },

    /**
     * Mutates feed items.
     * From Dashboard sort
     * 
     * @param {*} state 
     * @param {*} obj 
     */    
    [MUTATE_SORT_FEED](state, obj) {
        state.feeditems = obj
    },
    
    /**
     * Mutates single opinion item
     * 
     * @param {*} state 
     * @param {*} obj 
     */
    [MUTATE_REMOVE_FEED](state, obj) {
        state.feeditems =  state.feeditems.filter(e => e.id !== obj.id);
    }    
}

export default mutations;