<template>
  <div class="list-comp col-4">
    <div class="card">
      <button class="btn-sm btn-danger" @click="deleteList">Delete</button>
      <form @submit.prevent="editList">
        <button class="btn-sm btn-warning" type="submit">Edit</button>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="New List Title..."
            v-model="editListData.title"
          />
        </div>
      </form>
      <h3>{{listProp.title}}</h3>
      <ul>
        <task-comp v-for="task in tasks" :key="task.id" :taskProp="task" />
      </ul>
            <form @submit.prevent="addTask">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Add Task..."
            v-model="addTaskData.description"
          />
        </div>
        <button class="btn-sm btn-warning" type="submit">Add Task</button>
      </form>
    </div>
  </div>
</template>


<script>
import TaskComp from "../components/TaskComp";
export default {
  name: "list-comp",
  mounted() {
    this.$store.dispatch("getTasksByListId", this.listProp.id);
  },
  data() {
    return {
      editListData:{},
      addTaskData:{}
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listProp.id];
    },
  },
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listProp);
    },
    editList() {
      this.$store.dispatch("editList", {id: this.listProp.id, title: this.editListData.title, boardId: this.listProp.boardId});
      this.editListData= {}
    },
    addTask(){
      this.$store.dispatch('addTask', {listId: this.listProp.id, description: this.addTaskData.description})
      this.addTaskData={}
    }
  },
  components: {
    TaskComp,
  },
  props: ["listProp"],
};
</script>


<style scoped>
</style>