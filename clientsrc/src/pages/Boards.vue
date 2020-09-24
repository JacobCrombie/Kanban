<template>
  <div class="boards chalk-img">
    <div class="bluepaint p-3">
      <div class>
        <h1 class="whiteText">WELCOME TO THE BOARDS!!!</h1>
      </div>
      <form @submit.prevent="addBoard">
        <input type="text" placeholder="title" v-model="newBoard.title" required />
        <input type="text" placeholder="description" v-model="newBoard.description" />
        <button type="submit">Create Board</button>
      </form>
    </div>

    <div class="row mt-4">
      <div
        class="col-2 paintstroke center"
        v-for="board in boards"
        :key="board.id"
        @click="setActive(board)"
      >
        <div class="mt-5">
          <div class="p-2">
            <router-link
              class="link-size"
              :to="{name: 'board', params: {boardId: board.id}}"
            >{{board.title}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    },
    setActive(board) {
      this.$store.dispatch("setActive", board);
    },
  },
};
</script>

<style scoped>
.chalk-img {
  background-image: url("../assets/paintStart.jpg");
  background-size: auto;
  background-repeat: no-repeat;
  min-height: 100vh;
}
.whiteText {
  color: black;
  font-size: 50px;
}
.paintstroke {
  background-image: url("../assets/paintstroke.png");
  background-size: 150px;
  background-repeat: no-repeat;
}
.bluepaint {
  background-image: url("../assets/bluepaint.jpg");
  background-size: auto;
  background-repeat: no-repeat;
}
.center {
  text-align: center;
  margin: auto;
  width: 50%;
}
.whiteText {
  color: white;
}
</style>