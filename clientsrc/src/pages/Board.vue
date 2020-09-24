<template>
  <div class="container-fluid">
    <div class="row activeboard m-5" v-if="board.title">
      <div class="card col shadow p-3 bg-white rounded">
        <div class="card-body">
          <div class="d-flex justify-content-end">
            <i class="fa fa-trash text-danger" @click="deleteBoard"></i>
          </div>
          <div class="mb-3">
          <h1 class="card-title font-weight-bold under">{{board.title}}</h1>
          <p class="card-text">{{board.description}}</p>
          </div>

        <div class="row">
          <list-comp v-for="list in lists" :key="list.id" :listProp="list" />
        </div>
        </div>
        <div class="row">
          <form class="col" @submit.prevent="addList">
              <h5 class="under">New List</h5>
            <div class="form-group form-inline d-flex justify-content-center">
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
    this.$store.dispatch('getBoardById', this.$route.params.boardId)
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
    },
    deleteBoard(){
      this.$store.dispatch('deleteBoard', this.$route.params.boardId)
    }
  },
  props: ["boardId"],
  components: {
    ListComp,
  },
};
</script>

<style scoped>
.under{
  text-decoration: underline;
}
.activeboard{
  min-height: 82vh
}
</style>
