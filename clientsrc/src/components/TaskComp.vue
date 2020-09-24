<template>
  <div class="task-comp">
      <li class="d-flex justify-content-between">
        <select
          v-model="selectListData.listId"
          @change="selectList"
          class="form-control form-control-sm"
        >
          <option :value="list.id" v-for="list in lists" :key="list.id">{{list.title}}</option>
        </select>
        <p>{{taskProp.description}}</p>
        <i class="fa fa-trash" @click="deleteTask"></i>
      </li>

    <ul>
      <li v-for="(comment,index) in taskProp.comments" :key="comment.id">
        {{comment.description}}
        <i class="fa fa-trash" @click="deleteComment(index)"></i>
      </li>
    </ul>

    <form @submit.prevent="addComment">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Add Comment..."
          v-model="addCommentData.description"
        />
      </div>
      <button class="btn-sm btn-warning" type="submit">Add Comment</button>
    </form>
  </div>
</template>


<script>
export default {
  name: "task-comp",
  props: ["taskProp", "index"],
  data() {
    return {
      selectListData: {},
      addCommentData: {},
    };
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
  methods: {
    deleteTask() {
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
}

</style>