<template>

    <div class="search">

        <div class="search-box">
            <div class="search-header">
                <h2>search box </h2><button @click="closeSearch">x</button>
            </div>
            <input @keydown="findInTasks()" v-model.trim="tempVal" placeholder="Find in Tasks..." type="text" name="search"
                id="search">
            <div v-if="tempVal && (tempArr && tempArr.length !== 0)"  :key="tempKey">
                <Card v-for="(task, index) in tempArr" :key="`${$store.state.globalKey}-${tempKey}-${index}`" :task="task"
                    :id="task.id" />
            </div>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import Card from './Card.vue';
import { computed } from 'vue';

export default {
    setup() {
        const store = useStore();
        // ----
        const tasksArray = computed(() => store.getters.tasksArray);
        const tempArr = ref([]);
        const tempKey = ref(0);
        const tempVal = ref('');
        const findInTasks = () => {
            let result = tasksArray.value.filter(task => task.title.toLowerCase().indexOf( tempVal.value.toLowerCase() ) !== -1 );
            tempArr.value = result;
            tempKey.value ++;

        }
        const closeSearch = () => {
            store.dispatch('setShowSearch', false);
        }
        return {
            tempKey,
            tempArr,
            tempVal,
            findInTasks,
            closeSearch
        };
    },
    components: {
        Card,
        // Form
    }

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .search-box {
        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: #fff;
        min-width: 80%;
        padding: 25px 15px;
        border-radius: 8px;

        input {
            font-size: 1rem;
            line-height: 1.5;
            padding: 0.5em 1em;
            margin-bottom: 1.5em;
            border-radius: 8px;
            border: 1px solid #0465b2;
        }

        .search-header {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            align-items: center;
        }
    }
}
</style>
