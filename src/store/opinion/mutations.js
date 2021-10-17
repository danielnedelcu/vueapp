import { MUTATE_ASSIGN_OPINION, 
         MUTATE_SORT_OPINION, 
         MUTATE_REMOVE_OPINION,
         MUTATE_CLEAR_OPINIONS } from "../mutations.type";

const mutations = {
    /**
     * Builds state item.
     * From Firebase
     * 
     * @param {*} state 
     * @param {*} obj 
     */    
    [MUTATE_ASSIGN_OPINION](state, obj) {        
        state.opinionitems.push(obj);
    },
    
    /**
     * Removes all elements from state
     * 
     * @param {*} state 
     * @param {*} obj 
     */    
    [MUTATE_CLEAR_OPINIONS](state, obj) {
        state.opinionitems.splice(0, state.opinionitems.length);
        state.opinionitems = [];
    },
    
    /**
     * Mutates opinion items.
     * From Dashboard sort
     * 
     * @param {*} state 
     * @param {*} obj 
     */    
    [MUTATE_SORT_OPINION](state, obj) {
        state.opinionitems = obj
    },
    
    /**
     * Mutates single opinion item
     * 
     * @param {*} state 
     * @param {*} obj 
     */
    [MUTATE_REMOVE_OPINION](state, obj) {
        state.opinionitems =  state.opinionitems.filter(e => e.id !== obj.id);
    }
}

export default mutations;