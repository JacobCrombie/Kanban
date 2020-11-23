<template>
  <div class="task-comp">
    <li class="d-flex justify-content-between">
      <select
        v-model="selectListData.listId"
        @change="selectList"
        class="form-control form-control-sm"
      >
        <option :value="list.id" v-for="list in lists" :key="list.id">
          {{ list.title }}
        </option>
      </select>
      <p class="font-weight-bold">{{ taskProp.description }}</p>
      <div>
        <i
          class="fa fa-angle-up mr-4 text-info"
          @click="commentsToggle = !commentsToggle"
          v-if="commentsToggle"
        ></i>
        <i
          class="fa fa-angle-down mr-4 text-info"
          @click="commentsToggle = !commentsToggle"
          v-if="!commentsToggle"
        ></i>
        <i class="fa fa-trash text-danger" @click="deleteTask"></i>
      </div>
    </li>

    <ul v-if="commentsToggle">
      <li
        class="d-flex justify-content-start"
        v-for="(comment, index) in taskProp.comments"
        :key="comment.id"
      >
        <i class="fa fa-minus mr-2" @click="deleteComment(index)"></i>
        <p class="text-muted">
          {{ comment.description }}
        </p>
      </li>
    </ul>

    <form
      @submit.prevent="addComment"
      class="d-flex justify-content-end"
      v-if="commentsToggle"
    >
      <div class="form-group form-inline">
        <input
          type="text"
          class="form-control"
          placeholder="Add Comment..."
          v-model="addCommentData.description"
        />
        <button class="btn-sm btn-warning" type="submit">Add Comment</button>
      </div>
    </form>
  </div>
</template>


<script>
import sweetAlert from "../Utils/sweetAlert2.js";
export default {
  name: "task-comp",
  props: ["taskProp", "index"],
  data() {
    return {
      selectListData: {},
      addCommentData: {},
      commentsToggle: false,
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
  methods: {
    async deleteTask() {
      if (await sweetAlert.confirmAction())
        this.$store.dispatch("deleteTask", this.taskProp);
    },
    selectList() {
      this.$store.dispatch("selectList", {
        id: this.taskProp.id,
        listId: this.selectListData.listId,
        boardId: this.$route.params.boardId,
        oldListId: this.taskProp.listId,
      });
    },
    addComment() {
      let newTask = { ...this.taskProp };
      newTask.comments.push(this.addCommentData);
      this.$store.dispatch("editTask", newTask);
      this.addCommentData = {};
    },
    deleteComment(index) {
      let newTask = { ...this.taskProp };
      newTask.comments.splice(index, 1);
      this.$store.dispatch("editTask", newTask);
    },
  },
  components: {},
};
</script>


<style scoped>
select {
  width: 0;
  cursor: pointer;
}
i {
  cursor: pointer;
}
</style>