<template>
  <div class="container-fluid">
    <div class="row" v-if="board.title">
      <div class="card col">
        <div class="card-body">
          <h1 class="card-title">{{board.title}}</h1>
          <p class="card-text">{{board.description}}</p>
        </div>

        <div class="row">
          <list-comp v-for="list in lists" :key="list.id" :listProp="list"/>
          <!--
          <li class="list-group-item">Item 1</li>
          -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListComp from "../components/ListComp.vue";
export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getListsByBoardId", this.boardId);
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    },
  },
  props: ["boardId"],
  components: {
    ListComp,
  },
};
</script>
