<template>
<div>
  <h2>Honey Noodle!</h2>
  <div class="cards">
    <div class="card-container">
      <git-card></git-card>
    </div>
    <div class="card-container">
      <git-card></git-card>
    </div>    
    <div class="card-container">
      <git-card></git-card>
    </div>
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 40rem) {
  .card-container {
    width: 50%;
  }
}
@media (min-width: 56rem) {
  .card-container {
    width: 33.3333%;
  }
}
.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}
@media (max-width: 40rem) {
  .card-container {
    width: 18rem;
    height: 27.25rem;
  }

  git-card {
    flex-wrap: wrap;
  }
}

.card-container {
  width: 30rem;
  height: 13.625rem;
  display: flex;
  padding: 1rem;
}
</style>
