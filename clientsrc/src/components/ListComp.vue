<template>
  <div class="list-comp col-4">
    <div class="card shadow mb-5 p-1 bg-white rounded">
      <div class="col d-flex justify-content-between mt-2">
        <i
          class="fa fa-pen text-warning cursor"
          @click="editToggle = !editToggle"
        ></i>
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
      <h3 class="under">{{ listProp.title }}</h3>
      <ul>
        <task-comp
          v-for="(task, index) in tasks"
          :key="task.id"
          :taskProp="task"
          :index="index"
        />
      </ul>
      <div class="col">
        <i
          class="ml-3 fa fa-plus mb-2"
          data-toggle="modal"
          data-target="#add-task"
        ></i>
        <div class="modal fade" id="add-task">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">New Task</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                ></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addList" class="d-flex flex-column">
                  <input
                    type="text"
                    v-model="newTask.description"
                    placeholder="Task Description"
                    required
                  />
                  <button type="submit" class="btn btn-outline-success mt-3">
                    Add Task
                  </button>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <form @submit.prevent="addTask" v-if="addToggle">
        <div class="form-group form-inline col d-flex">
          <i
            class="fa fa-angle-up mr-3"
            @click="addToggle = !addToggle"
            v-if="addToggle"
          ></i>
          <input
            type="text"
            class="form-control"
            placeholder="Add Task..."
            v-model="addTaskData.description"
          />
          <button class="btn-sm btn-success ml-1" type="submit">
            Add Task
          </button>
        </div>
      </form> -->
    </div>
  </div>
</template>


<script>
import TaskComp from "../components/TaskComp";
import sweetAlert2 from "../Utils/sweetAlert2.js";
export default {
  name: "list-comp",
  mounted() {
    this.$store.dispatch("getTasksByListId", this.listProp.id);
  },
  data() {
    return {
      editListData: {},
      newTask: {},
      editToggle: false,
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listProp.id];
    },
  },
  methods: {
    async deleteList() {
      if (await sweetAlert2.confirmAction())
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
  width: 70%;
}
ul {
  list-style: lower-alpha;
  padding: 0px 20px 0px 20px;
}
.under {
  text-decoration: underline;
}
</style>