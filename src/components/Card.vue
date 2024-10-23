<template>
    <div :class="task.status" class="board-card">
        <div class="card-header">

            <p class="card-priority" v-if="task.priority == 1">low</p>
            <p class="card-priority" v-if="task.priority == 2">meduim</p>
            <p class="card-priority" v-if="task.priority == 3">high</p>

            <p class="card-dueDate">{{ task.dueDate }}</p>

            <div class="action">
                <button @click="editCard(task.id);">✎</button>
                <button @click="removeCard(task.id);" v-if="task.status == 'done'">🗑️</button>
            </div>
        </div>
        <div class="card-body">
            <p class="card-title">{{ task.title }}</p>
            <p class="card-desc">{{ task.desc }}</p>
            <!-- <p class="card-status">{{task.status}}</p> -->
        </div>

    </div>

</template>

<script>
//import { ref } from 'vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    props: {
        task: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
        const store = useStore();
        const showForm = computed(() => store.getters.isShowForm);
        const editCard = (id) => {
            //console.log(id);
            store.dispatch('setShowFlag', true);
            store.dispatch('updateCurrentId', id);
            store.dispatch('setEditFlag', true);
        }
        const removeCard = (id) => {
            console.log("id",id);
            store.dispatch('removeItem', id);
            console.log("store.getters.currentId",store.getters.currentId);
            store.dispatch('updateGKey');
        }

        return {
            showForm,
            task: props.task,
            editCard,
            removeCard
        }
    }
}
</script>

<style lang="scss">
.board-card {
    padding: 5px;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 5px;
    font-size: 0.9em;

    // ----
    .card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(211 211 211 / 40%);

        // ----
        .action {
            button {
                font-size: 1em;
                padding: 0;
                width: 1.5em;
                height: 1.5em;
                text-align: center;
                border: none;
                background-color: transparent;
                border-radius: 5px;

                &:hover {
                    border: 1px solid;
                }
            }
        }
    }

    // ----

    .card-body {
        .card-title {
            font-weight: bold;
            margin-bottom: 0.4em;
            line-height: 1.5;
            font-size: 1rem;
        }

        .card-desc {
            color: gray;
            line-height: 1.5;
            font-size: 0.9em;
        }

        .card-status {}
    }

    // ----
    $transparent: 5%;

    &.todo {
        background-color: rgb(0 145 255 / #{$transparent});
    }

    &.inProgress {
        background-color: rgb(181 0 0 / #{$transparent});
    }

    &.inReview {
        background-color: rgb(255 165 0 / #{$transparent});
    }

    &.done {
        background-color: rgb(0 128 0 / #{$transparent});
    }

}
</style>