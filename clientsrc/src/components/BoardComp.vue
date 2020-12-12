<template>
  <div class="board-comp col-12 col-md-6 col-lg-4 col-xl-3 text-dark">
    <div class="card">
      <img src="../assets/images/sticky.png" class="card-img" />
      <div class="card-img-overlay d-flex justify-content-center">
        <h5 class="card-title align-self-center cursor" @click="boardPush">
          {{ boardProp.title }}
        </h5>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "board-comp",
  props: ["boardProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    boardPush() {
      this.$store.dispatch("setActiveBoard", this.boardProp);
    },
  },
  components: {},
};
</script>


<style scoped>
.card {
  background-color: transparent;
  border: none;
}
.cursor {
  cursor: pointer;
}
.card-title {
  transform: rotate(12deg);
}
</style>