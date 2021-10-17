import { MUTATE_ASSIGN_NEWS, 
         MUTATE_CLEAR_NEWS,
         MUTATE_SORT_NEWS,
         MUTATE_ASSIGN_CURRENT_NEWS, 
         MUTATE_REMOVE_NEWS} from "../mutations.type";

const mutations = {
    /**
     * Builds state item.
     * From Firebase
     * @param {*} state 
     * @param {*} obj 
     */    
    [MUTATE_ASSIGN_NEWS](state, obj) {
        state.newsitems.push(obj);
    },

    /**
     * When in edit mode, preserves the news object selected for edit.
     * Default admin/ namespace
     * @param {*} state 
     * @param {*} obj 
     */
    [MUTATE_ASSIGN_CURRENT_NEWS](state, obj) {
        state.currentItem = obj
    },

    /**
     * Removes all elements from state
     * 
     * @param {*} state 
     * @param {*} obj 
     */    
    [MUTATE_CLEAR_NEWS](state) {
        for (var i = state.newsitems.length; i > 0; i--) {
            state.newsitems.pop();
        }
        state.newsitems.length = 0;  
    },

    /**
     * Mutates top news items.
     * From Dashboard sort
     * 
     * @param {*} state 
     * @param {*} obj 
     */
    [MUTATE_SORT_NEWS](state, obj) {
        state.newsitems = obj
    },

    /**
     * Mutates single opinion item
     * 
     * @param {*} state 
     * @param {*} obj 
     */
    [MUTATE_REMOVE_NEWS](state, obj) {
        state.newsitems =  state.newsitems.filter(e => e.id !== obj.id);
    }        

}

export default mutations;