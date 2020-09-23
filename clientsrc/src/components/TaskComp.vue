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
  </div>
</template>


<script>
export default {
  name: "task-comp",
  props: ["taskProp"],
  data() {
    return {
      selectListData: {},
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
      });
    },
  },
  components: {},
};
</script>


<style scoped>
</style>