<template>
  <div class="container-fluid">
    <div class="row" v-if="board.title">
      <div class="card col">
        <div class="card-body">
          <h1 class="card-title">{{board.title}}</h1>
          <p class="card-text">{{board.description}}</p>
        </div>

        <div class="row">
          <list-comp v-for="list in lists" :key="list.id" :listProp="list" />
        </div>
        <div class="row">
          <form class="col" @submit.prevent="addList">
            <div class="form-group">
              <label for="newlist">New List</label>
              <input
                type="text"
                class="form-control"
                placeholder="List Title..."
                v-model="listData.title"
              />
              <button type="submit" class="btn btn-success">Add List</button>
            </div>
          </form>
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
  data(){
    return{
      listData:{}
    }
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    },
  },
  methods: {
    addList(){
      this.$store.dispatch('addList', {boardId: this.$route.params.boardId, title: this.listData.title} )
      this.listData = {}
    }
  },
  props: ["boardId"],
  components: {
    ListComp,
  },
};
</script>
