<template>
  <div class="boards">
    <div class="p-3">
      <div>
        <h1 class="">My-Boards</h1>
      </div>
      <button
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target="#add-board"
      >
        Add Board
      </button>
      <div class="modal fade" id="add-board">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">New Board</h5>
              <button type="button" class="close" data-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addBoard">
                <input
                  type="text"
                  v-model="newBoard.title"
                  placeholder="Title"
                  required
                />
                <input
                  type="text"
                  v-model="newBoard.description"
                  placeholder="Description"
                  required
                />
                <button type="submit" class="btn btn-outline-success mt-3">
                  Create
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

    <div class="row mt-4">
      <board-comp v-for="board in boards" :key="board.id" :boardProp="board" />
    </div>
  </div>
</template>

<script>
import BoardComp from "../components/BoardComp.vue";
export default {
  components: { BoardComp },
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
      $("#add-board").modal("toggle");
    },
    setActive(board) {
      this.$store.dispatch("setActive", board);
    },
  },
};
</script>

<style scoped>
</style>