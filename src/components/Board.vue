<template>

    <div id="kanban-board">

        <header class="board-header">
            <h3>Kanban Board</h3>
            <div class="action">
                <button class="find"  @click="$store.dispatch('setShowSearch', true);">find Task</button>
                <button @click="$store.dispatch('setShowFlag', true);">Add New Task</button>
            </div>
        </header>

        <hr />

        <main class="board-body">

            <div id="todo" class="board-column" @drop="drop" @dragover="allowDrop">
                <p class="col-title">todo</p>
                <card @dragstart="dragStart" draggable="true" v-for="(task, index) in todoList"
                    :key="`${$store.state.globalKey}-${index}`" :task="task" :id="task.id" />
            </div>


            <div id="inProgress" class="board-column" @drop="drop" @dragover="allowDrop">
                <p class="col-title"> in progress</p>
                <card @dragstart="dragStart" draggable="true" v-for="(task, index) in inProgressList"
                    :key="`${$store.state.globalKey}-${index}`" :task="task" :id="task.id" />
            </div>
            <div id="inReview" class="board-column" @drop="drop" @dragover="allowDrop">
                <p class="col-title">in review</p>
                <card @dragstart="dragStart" draggable="true" v-for="(task, index) in inReviewList"
                    :key="`${$store.state.globalKey}-${index}`" :task="task" :id="task.id" />
            </div>
            <div id="done" class="board-column" @drop="drop" @dragover="allowDrop">
                <p class="col-title">done</p>
                <card @dragstart="dragStart" draggable="true" v-for="(task, index) in doneList"
                    :key="`${$store.state.globalKey}-${index}`" :task="task" :id="task.id" />
            </div>
        </main>
    </div>

    <Search v-if="showSearch" />
    <Form v-if="showForm" />
</template>

<script>
import { ref } from 'vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import Card from './Card.vue';
import Form from './Form.vue';
import Search from './Search.vue';

export default {
    setup() {
        const store = useStore();
        const tasksArray = computed(() => store.getters.tasksArray);
        const showForm = computed(() => store.getters.isShowForm);
        const showSearch = computed(() => store.getters.isShowSearch);
        const todoList = computed(() => store.getters.tasksArray.filter(task => task.status === 'todo').slice().sort((a, b) => b.priority - a.priority));
        const inProgressList = computed(() => store.getters.tasksArray.filter(task => task.status === 'inProgress').slice().sort((a, b) => b.priority - a.priority));
        const inReviewList = computed(() => store.getters.tasksArray.filter(task => task.status === 'inReview').slice().sort((a, b) => b.priority - a.priority));
        const doneList = computed(() => store.getters.tasksArray.filter(task => task.status === 'done').slice().sort((a, b) => b.priority - a.priority));
      
        const drop = (event) => {
            // event.preventDefault();
            const allowedTargets = ['todo', 'inProgress', 'inReview', 'done'];

            if (allowedTargets.includes(event.target.id)) {
                const data = event.dataTransfer.getData("card");
                const element = document.getElementById(data);
                const draggedElement = tasksArray.value.find(task => task.id == element.id);
                draggedElement.status = event.target.id;

                // store.dispatch('editItem', { id: element.id, updatedItem: draggedElement });
                store.dispatch('editItem', { id: event.target.id, updatedItem: draggedElement });
                store.dispatch('updateGKey');
            }
        }
        const dragStart = (event) => {
            //event.preventDefault();
            event.dataTransfer.setData("card", event.target.id);
        }

        const allowDrop = (event) => {
            event.preventDefault();
            // console.log("allow drop");
        }

        return {
            //tasksStatus,
            showForm,
            todoList,
            inProgressList,
            inReviewList,
            doneList,
            drop,
            dragStart,
            allowDrop,
            showSearch,
        };
    },
    components: {
        Search,
        Card,
        Form
    }

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.board-header {
    display: flex;
    // flex-direction: row;
    // gap: 5px;
    justify-content: space-between;
    align-items: center;
    margin: 1rem;

    h3 {
        color: gray;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.5rem;
    }
    .action {
    display: flex;
    gap: 5px;
        
        button {
            border: 1px solid rgb(0 145 255);
            background-color: rgb(0 145 255);;
            color: #fff;
            font-size: 1rem;
            border-radius: 8px;
            padding: 0.9em;
            font-weight: bold;
            &.find {
                background-color: #fff;
                color: rgb(0 145 255);

            }
        }
    }


}

hr {
    border: 1px solid rgb(216, 216, 216);
}

.board-body {
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
    justify-content: flex-start;
    gap: 10px;

    .board-column {
        display: flex;
        flex-direction: column;
        gap: 8px;
        border: 1px solid rgb(216, 216, 216);
        // width: 87%;
        // padding: 0px 12px;
        padding: 0 8px 55px;
        // margin: 5px;
        border-radius: 8px;
        text-align: start;
        flex: 1;
        min-width: 100px;
        overflow: hidden;

        .col-title {
            font-size: 1rem;
            font-weight: bold;
            text-transform: capitalize;
            color: white;
            padding: 0 10px;
            line-height: 3;
            // border-radius: 8px 8px 0 0;
            margin: 0 -12px;
        }
    }

    #inReview {

        p {
            background-color: orange;
        }
    }

    #inProgress {
        p {
            background-color: rgb(181, 0, 0);
        }
    }

    #done {
        p {
            background-color: green;
        }
    }

    #todo {
        p {
            background-color: rgb(0, 145, 255);
        }
    }
}
</style>
