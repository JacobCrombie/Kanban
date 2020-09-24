<template>
  <div class="list-comp col-4">
    <div class="card">
      <div class="col d-flex justify-content-between mt-2">
        <i class="fa fa-pen text-warning cursor" @click="editToggle=!editToggle"></i>
        <i class="fa fa-trash text-danger cursor" @click="deleteList"></i>
      </div>
      <div class="col d-flex justify-content-center" v-if="editToggle">
        <form @submit.prevent="editList" class="mt-2">
          <div class="form-group form-inline">
            <input
              type="text"
              class="form-control"
              placeholder="New List Title..."
              v-model="editListData.title"
            />
            <button class="btn-sm btn-warning ml-1" type="submit">Edit</button>
          </div>
        </form>
      </div>
      <h3>{{listProp.title}}</h3>
      <ul>
        <task-comp v-for="(task,index) in tasks" :key="task.id" :taskProp="task" :index="index" />
      </ul>
      <i
        class="ml-3 fa fa-plus d-flex justify-self-start mb-3"
        v-if="!addToggle"
        @click="addToggle=!addToggle"
      ></i>
      <form @submit.prevent="addTask" v-if="addToggle">
        <div class="form-group form-inline col d-flex">
          <i class="fa fa-angle-up mr-3" @click="addToggle=!addToggle" v-if="addToggle"></i>
          <input
            type="text"
            class="form-control"
            placeholder="Add Task..."
            v-model="addTaskData.description"
          />
          <button class="btn-sm btn-success ml-1" type="submit">Add Task</button>
        </div>
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
      editListData: {},
      addTaskData: {},
      editToggle: false,
      addToggle: false,
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
      this.$store.dispatch("editList", {
        id: this.listProp.id,
        title: this.editListData.title,
        boardId: this.listProp.boardId,
      });
      this.editListData = {};
    },
    addTask() {
      this.$store.dispatch("addTask", {
        listId: this.listProp.id,
        description: this.addTaskData.description,
      });
      this.addTaskData = {};
      this.addToggle = !this.addToggle;
    },
  },
  components: {
    TaskComp,
  },
  props: ["listProp"],
};
</script>


<style scoped>
i {
  cursor: pointer;
}
.form-control {
  width: 75%;
}
ul {
  list-style: lower-alpha;
  padding: 0px 20px 0px 20px
}
</style>