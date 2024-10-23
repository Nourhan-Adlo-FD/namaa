// store.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
        tasksArray: JSON.parse(localStorage.getItem('tasksArray')) || [],
        globalKey: 1,
        currentId:'',
        isEditMode: false,
        isShowForm: false,
        isShowSearch:false,
    },
    mutations: {
        SET_ARRAY(state, payload) {
            state.tasksArray = payload;
            localStorage.setItem('tasksArray', JSON.stringify(payload)); // Save to local storage
        },
        ADD_ITEM(state, item) {
            state.tasksArray.push(item);
            localStorage.setItem('tasksArray', JSON.stringify(state.tasksArray)); // Update local storage
        },
        EDIT_ITEM(state, { id, updatedItem }) {
           let index  = state.tasksArray.findIndex(task => task.id == id);
            state.tasksArray[index] = updatedItem;
            localStorage.setItem('tasksArray', JSON.stringify(state.tasksArray));
        },
        REMOVE_ITEM(state, id) {
            let index  = state.tasksArray.findIndex(task => task.id == id);
            state.tasksArray.splice(index, 1);
            localStorage.setItem('tasksArray', JSON.stringify(state.tasksArray)); // Update local storage
        },
        SET_EDIT_FLAG(state, status) {
            state.isEditMode = status; // Set the flag to true/false
        },
        SET_GlobalKey(state, status) {
            state.globalKey++;
        },
        SET_CurrentId(state, status) {
            state.currentId = status;
        },
        SET_SHOW_FLAG(state, status) {
            state.isShowForm = status; // Set the flag to true/false
        },
        SET_SHOW_SEARCH(state, status) {
            state.isShowSearch = status; // Set the flag to true/false
        },
    },
    actions: {
        updateGKey({ commit }) {
            commit('SET_GlobalKey');
        },
        updateCurrentId({commit},id) {
            commit('SET_CurrentId',id);
        },
        setArray({ commit }, array) {
            commit('SET_ARRAY', array);
        },
        addItem({ commit }, item) {
            commit('ADD_ITEM', item);
        },
        editItem({ commit }, { id, updatedItem }) {
            commit('EDIT_ITEM', { id, updatedItem });
        },
        removeItem({ commit }, index) {
            commit('REMOVE_ITEM', index);
        },
        setEditFlag({ commit }, status) {
            commit('SET_EDIT_FLAG', status);  // Dispatch action to set the flag
        },
        setShowFlag({ commit }, status) {
            commit('SET_SHOW_FLAG', status);  // Dispatch action to set the flag
        },
        setShowSearch({ commit }, status) {
            commit('SET_SHOW_SEARCH', status);  // Dispatch action to set the flag
        },
    },
    getters: {
        tasksArray: (state) => state.tasksArray,
        isEditMode: (state) => state.isEditMode,
        isShowForm: (state) => state.isShowForm,
        currentId: (state)=> state.currentId,
        isShowSearch: (state)=> state.isShowSearch
    },
});

export default store;
