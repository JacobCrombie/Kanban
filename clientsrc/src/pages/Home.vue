<template>
  <div class="home container-fluid bg-img">
    <div class="row align-items-center">
      <div class="col">
        <h1 class>KanBan</h1>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  justify-content: center;
}
.bg-img {
  background-image: url("../assets/deskimg.jpg");
  background-size: auto;
  background-repeat: no-repeat;
}
</style>