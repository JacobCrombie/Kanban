<template>
  <div class="list-comp col-4">
    <div class="card">
      <h3>{{listProp.title}}</h3>
      <ul>
        <task-comp v-for="task in tasks" :key="task.id" :taskProp="task" />
      </ul>
    </div>
  </div>
</template>


<script>
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
      return this.$store.state.tasks;
    },
  },
  methods: {},
  components: {},
  props: ["listProp"],
};
</script>


<style scoped>
</style>