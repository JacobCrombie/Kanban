<template>
  <div class="list-comp col-4">
    <div class="card">
      <button class="btn-sm btn-danger" @click="deleteList">Delete</button>
      <h3>{{listProp.title}}</h3>
      <ul>
        <task-comp v-for="task in tasks" :key="task.id" :taskProp="task"/>
      </ul>
    </div>
  </div>
</template>


<script>
import TaskComp from '../components/TaskComp'
export default {
  name: "list-comp",
  mounted() {
    this.$store.dispatch("getTasksByListId", this.listProp.id);
  },
  data() {
    return {};
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listProp.id];
    },
  },
  methods: {
    deleteList(){
      this.$store.dispatch('deleteList', this.listProp)
    }
  },
  components: {
    TaskComp
  },
  props: ["listProp"],
};
</script>


<style scoped>
</style>