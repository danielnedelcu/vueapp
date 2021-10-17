import { MUTATE_DRAWER_STATE, 
    MUTATE_ASSIGN_LOGGED_STATE,
    MUTATE_ASSIGN_USER_STATE,
    MUTATE_EDIT_DRAWER_STATE,
    MUTATE_BLURB_IMAGES_STATE,
    MUTATE_ASSIGN_CURRENT_SELECTED,
    MUTATE_ASSIGN_REDIRECT_ROUTE } from "../mutations.type";
/**
* Assigns drawer state
* @param {*} param0 
* @param {*} payload 
*/
export async function AssignDrawerState ({ commit }, payload) {
    commit(MUTATE_DRAWER_STATE, payload);
}

export async function AssignEditDrawerState ({ commit }, payload) {
    commit(MUTATE_EDIT_DRAWER_STATE, payload);
}

export async function AssignLoggedState({commit}, payload) {
    commit(MUTATE_ASSIGN_LOGGED_STATE, payload);
}

export async function AssignCurrentUser({commit}, payload) {
    commit(MUTATE_ASSIGN_USER_STATE, payload);
}

export async function AssignBlurbImagesState ({ commit }, payload) {
    commit(MUTATE_BLURB_IMAGES_STATE, payload);
}

export function AssignCurrentSelectedItem({commit}, payload) {
    commit(MUTATE_ASSIGN_CURRENT_SELECTED, payload);   
}
export function AssignRedirectRoute({commit}, payload) {
    commit(MUTATE_ASSIGN_REDIRECT_ROUTE, payload)
}