<template>
  <div class="task-comp">
    <li>
      {{taskProp.description}}
      <i class="fa fa-trash" @click="deleteTask"></i>
    </li>
    <select
      v-model="selectListData.listId"
      @change="selectList"
      class="form-control form-control-sm"
    >
      <option :value="list.id" v-for="list in lists" :key="list.id">{{list.title}}</option>
    </select>

    <ul>
      <li v-for="comment in taskProp.comments" :key="comment.id">
        {{comment.description}}
        <i class="fa fa-trash" @click="deletecomment"></i>
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
  props: ["taskProp"],
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
      this.$store.dispatch("addComment", newTask);
      this.addCommentData = {};
    },
  },
  components: {},
};
</script>


<style scoped>
</style>