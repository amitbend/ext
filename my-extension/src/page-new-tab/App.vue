<template>
<div >
  <h2 class="header">Honey Noodle!</h2>
  <div v-if="loading">
      <vue-loading spinner="folding-cube"></vue-loading>
  </div>
<vue-loading spinner="circles"></vue-loading>


  <div class="cards">
    <div v-for="card of cards" :key="card.name" class="card-container">
      <git-card v-bind:card="card"></git-card>
    </div>
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      cards: [],
      loading: false,
    };
  },
  props: { language: { type: String, default: 'Javascript' } },
  mounted: function() {
    this.getTrending();
  },
  methods: {
    getTrending: function() {
      let _this = this;
      _this.loading = true;
      let isLocalExists = this.getLocal();
      if (!isLocalExists) {
        fetch('https://github-trending-api.now.sh/developers?language=javascript&since=weekly')
          .then(function(response) {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
          .then(function(response) {
            // save on localstorage
            _this.cards = response;
            _this.loading = false;
            _this.saveLocal();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    saveLocal: function() {
      this.$storage.set('cards', { key: 'cards', value: this.cards }, { ttl: 60 * 1000 }); // 1 min
    },
    getLocal: function() {
      const data = this.$storage.get('cards');
      if (data && data.value) {
        this.cards = data.value;
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  padding: 1.5em;
}
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
  width: 100%;
  grid-area: main;
  align-self: center;
  justify-self: center;
  justify-content: center;
  text-rendering: optimizeLegibility;
}
@media (max-width: 40rem) {
  .card-container {
    width: 13.5rem;
    height: 20.44rem;
  }

  git-card {
    flex-wrap: wrap;
  }
}

.card-container {
  width: 27rem;
  height: 13.2625rem;
  display: flex;
  padding: 1rem;
}
</style>
