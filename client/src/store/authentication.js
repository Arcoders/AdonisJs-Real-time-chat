/* eslint-disable */

export default {

    namespaced: true,
    
    state: {
        registerEmail: null,
        registerPassword: null,
        registerConfirmedPassword: null,
    },

    mutations: {
        setRegisterEmail(state, e) {
            state.registerEmail = e.target.value;
        },
        setRegisterPassword(state, e) {
            state.registerPassword = e.target.value;
        },
        setConfirmedPassword(state, e) {
            state.registerConfirmedPassword = e.target.value;
        }
    }

}