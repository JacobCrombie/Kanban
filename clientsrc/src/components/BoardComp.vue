<template>
  <div class="board-comp col-4">
    <div class="text-dark cursor" @click="boardPush">
      <img class="card-img" src="../assets/images/sticky.png" />
      <div class="card-img-overlay d-flex justify-content-center">
        <h4 class="card-title align-self-center">{{ boardProp.title }}</h4>
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
.bg-image {
  background-image: url("../assets/images/sticky.png");
}
.card-title {
  transform: rotate(12deg);
}
.cursor {
  cursor: pointer;
}
</style>