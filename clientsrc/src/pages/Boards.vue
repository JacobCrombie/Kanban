<template>
  <div class="boards container-fluid bg-img">
    <div class="row border-bottom border-dark">
      <div class="col p-2">
        <div>
          <button
            type="button"
            class="btn btn-success"
            data-toggle="modal"
            data-target="#add-board"
          >
            Create Board
          </button>
          <h1 class="my-2 board-title">My Boards</h1>
        </div>

        <div class="modal fade" id="add-board">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">New Board</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                ></button>
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
    </div>

    <div class="row scroll bg-img">
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
.bg-img {
  background-image: url("../assets/images/cork.png");
}
.scroll {
  position: absolute;
  height: 82vh;
  width: 100%;
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-image: url("../assets/images/cork.png");
}

.scroll::-webkit-scrollbar {
  width: 12px;
  background-image: url("../assets/images/cork.png");
}

.scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
.border-bottom {
  border-bottom: 3px solid #555 !important;
}
.board-title {
  text-shadow: 2px 2px 10px #ffffff;
}
</style>