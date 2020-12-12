<template>
  <div class="container-fluid bg-img">
    <div class="row activeboard p-3" v-if="board.title">
      <div class="card col shadow p-3 bg-offwhite rounded">
        <div>
          <div class="d-flex justify-content-end">
            <i class="fa fa-trash text-danger" @click="deleteBoard"></i>
          </div>
          <div class="mb-3">
            <h1 class="card-title font-weight-bold under">
              {{ board.title }}
            </h1>
            <p class="card-text">{{ board.description }}</p>
          </div>
        </div>

        <div class="row scroll">
          <list-comp v-for="list in lists" :key="list.id" :listProp="list" />
        </div>

        <div class="row">
          <div class="col p-2">
            <div>
              <button
                type="button"
                class="btn btn-success"
                data-toggle="modal"
                data-target="#add-list"
              >
                Create List
              </button>
            </div>
            <div class="modal fade" id="add-list">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">New List</h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form @submit.prevent="addList" class="d-flex flex-column">
                      <input
                        type="text"
                        v-model="newList.title"
                        placeholder="Title"
                        required
                      />
                      <button
                        type="submit"
                        class="btn btn-outline-success mt-3"
                      >
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
      </div>
    </div>
  </div>
</template>

<script>
import ListComp from "../components/ListComp.vue";
export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getBoardById", this.$route.params.id);
    this.$store.dispatch("getListsByBoardId", this.$route.params.id);
  },
  data() {
    return {
      newList: {},
    };
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
    addList() {
      this.$store.dispatch("addList", {
        boardId: this.$route.params.id,
        title: this.newList.title,
      });
      this.newList = {};
      $("#add-list").modal("toggle");
    },
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.$route.params.id);
    },
  },
  props: ["boardId"],
  components: {
    ListComp,
  },
};
</script>

<style scoped>
.under {
  text-decoration: underline;
}
.activeboard {
  height: 93.4vh;
}
.bg-offwhite {
  background-color: #f8f8ff;
}
.bg-img {
  background-image: url("../assets/images/cork.png");
}
.scroll {
  width: 100%;
  overflow-y: auto;
  height: 68vh;
}
.scroll::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f8f8ff;
}

.scroll::-webkit-scrollbar {
  width: 12px;
  background-color: #f8f8ff;
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
