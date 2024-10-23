<template>
    <div class="board-form">
        <div class="form-wraper">
            <div class="form-header">
                <p v-if="editMode">Edit</p>
                <p v-else >Create</p>
                <button @click="closeForm">x</button>
            </div>
            <form @submit.prevent="submitForm" class="form-body">
                <div>
                    <label for="title">title</label>
                    <input name="title" type="text" placeholder="enter task title" id="title" v-model="formData.title"
                        required />
                </div>
                <div>
                    <label for="desc">description</label>
                    <input type="text" placeholder="enter task description" id="desc" v-model="formData.desc"
                        required />
                </div>
                <div>
                    <label for="date-picker">Choose due date:</label>
                    <input type="date" id="date-picker" v-model="formData.dueDate" :min="minDate" />
                </div>
                <div>
                    <label for="priority">priority level</label>
                    <select id="priority" v-model="formData.priority" required>
                        <option selected disabled value="">Choose priority</option>
                        <option v-for="item in priorityList" :value="item.id" :key="item.id">{{ item.title }}</option>
                    </select>
                </div>
                <div>
                    <label for="status">task status</label>
                    <select id="status" v-model="formData.status" required>
                        <option selected disabled value="">Choose status</option>
                        <option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.title }}</option>
                    </select>
                </div>

                <button type="submit">submit</button>
            </form>
        </div>

    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const editMode = computed(() => store.getters.isEditMode);
        const currentId = computed(() => store.getters.currentId);
        const tasksArray = computed(() => store.getters.tasksArray);
        const priorityList = ref([{ id: 1, title: 'low', isSelected: true }, { id: 2, title: 'meduim', isSelected: false }, { id: 3, title: 'high', isSelected: false }])
        const statusList = ref([{ id: 'todo', title: 'todo', isSelected: true }, { id: 'inProgress', title: 'in progress', isSelected: false }, { id: 'inReview', title: 'in review', isSelected: false }, { id: 'done', title: 'Done', isSelected: false }])
        const formData = ref({
            title: '',
            desc: '',
            priority: '',
            status: '',
            dueDate: '',
            id: ''
        });
        const submitForm = () => {
            if (editMode.value) {
                store.dispatch('editItem', { id: store.getters.currentId, updatedItem: formData.value });
                store.dispatch('setEditFlag', false);
                store.dispatch('updateGKey');
            } else {
                // Add new item
                formData.value.id = `${store.state.globalKey}-${formData.value.title}`;
                store.dispatch('addItem', formData.value);
            }
            // Optionally, you can reset the form after submission
            formData.value = {
                title: '',
                desc: '',
                priority: '',
                status: '',
                dueDate: '',
                id: '',
            };
            store.dispatch('setShowFlag', false);
            store.dispatch('updateGKey');
        };
        const dueDate = ref('');
        const minDate = ref('');

        // Function to get today's date in 'YYYY-MM-DD' format
        const getCurrentDate = () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero for months < 10
            const day = String(today.getDate()).padStart(2, '0'); // Add leading zero for days < 10
            return `${year}-${month}-${day}`;
        };
        const closeForm = () => {
            store.dispatch('setShowFlag', false);
            store.dispatch('setEditFlag', false);

        }
        onMounted(() => {
            minDate.value = getCurrentDate();
            if (editMode.value) {
                let currentobj = tasksArray.value.filter(task => task.id == store.getters.currentId);
                formData.value = JSON.parse(JSON.stringify(currentobj))[0];

            }

        });

        return {
            formData,
            submitForm,
            priorityList,
            statusList,
            dueDate,
            minDate,
            editMode,
            closeForm,
        };
    },
}
</script>

<style lang="scss">
.board-form {
    background-color: rgb(68, 65, 65, 0.25);
    width: 100vw;
    height: 100vh;
    z-index: 9;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;

    //opacity: 0.75;
    div {
        // width: 70%;
        // background-color: white;
        // opacity: 1;
        // padding: 12px;
    }

    .form-wraper {
        min-width: 70%;
        background-color: white;
        padding: 30px 20px;
        border-radius: 10px;

        .form-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background-color: rgb(128 128 128 / 28%);
            margin-bottom: 40px;
            height: 3em;
            align-items: center;
            padding: 0 12px;
            border-radius: 5px;
            text-transform: capitalize;
        }
    
        .form-body {
            display: flex;
            flex-direction: column;
            align-items: stretch;


            > div {
                display: flex;
                gap: 8px;
                margin-bottom: 10px;
                label {
                    flex: 1;
                    font-size: 1em;
                }
                input, select {
                    flex: 2;
                    font-size: 1em;
                    padding: 0.3em 0.5em;
                }
            }
            button {
                margin-top: 2em;
                padding: 0.5em 0;
                font-size: 1rem;
            }
        }
    }
}
</style>