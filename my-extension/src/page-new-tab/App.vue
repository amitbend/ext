<template>
<div >
  <h2 class="header">Honey Noodle<img src="" /> </h2>
  <div class="select-container">
      <label>Language</label>
      <vue-single-select
          name="Language"
          v-model="language"
          :options="langs"
          :required="true"
          :placeholder="language.name"
          optionLabel="name"
          :classes="{
                    dropdown: 'dropdown'
          }"
     ></vue-single-select>
  </div>
 

  <div v-if="loading">
      <vue-loading spinner="folding-cube" ></vue-loading>
  </div>
  <div class="cards">
    <div v-for="card of cards" :key="card.name" class="card-container">
      <git-card v-bind:card="card" v-bind:language="language" :key="card.repo.name"></git-card>
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
      langs: [
        { urlParam: 'cpp', name: 'C++' },
        { urlParam: 'html', name: 'HTML' },
        { urlParam: 'java', name: 'Java' },
        { urlParam: 'javascript', name: 'JavaScript' },
        { urlParam: 'php', name: 'PHP' },
        { urlParam: 'python', name: 'Python' },
        { urlParam: 'ruby', name: 'Ruby' },
      ],
    };
  },
  props: { language: { type: Object, default: { name: 'Javascript', urlParam: 'javascript' } } },
  watch: {
    language() {
      if (this.language) {
        console.log('getting trending for ' + JSON.stringify(this.language.name));
        this.getTrending(true);
      }
    },
  },
  mounted: function() {
    this.getTrending();
  },
  methods: {
    getTrending: function(force) {
      console.log('fetching...', force);
      let _this = this;
      _this.loading = true;
      let isLocalExists = this.getLocal();
      if (!isLocalExists || force) {
        let uri = `https://github-trending-api.now.sh/developers?language=${this.language.urlParam}&since=daily`;
        console.log('uri', uri);
        fetch(uri)
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
            _this.clearLocal();
            _this.saveLocal();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else _this.loading = false;
    },
    saveLocal: function(topic = 'cards') {
      console.dir(this.cards);

      this.$storage.set(topic, { key: topic, value: this[topic] }, { ttl: 60 * 1000 }); // 1 min
    },
    getLocal: function(topic = 'cards') {
      const data = this.$storage.get();
      if (data && data.value) {
        this.cards = data.value;
        return true;
      }
      return false;
    },
    clearLocal: function() {
      this.$storage.clear();
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

body {
  font-family: Roboto, Ubuntu, sans-serif;
}

.dropdown {
  position: relative;
  overflow: hidden;
  display: block;
  margin: auto;
  width: 20em;
  height: 100%;
  border-bottom: 0px;
  border-radius: 3px;
  font-size: 12px;
  box-shadow: 0px 1em 2em -1.5em rgba(0, 0, 0, 0.5);
}

.vue-loading-container {
  position: absolute;
  left: 50% !important;
  top: 50% !important;
}

.sk-cube {
  background-color: aquamarine !important;
}

.header {
  text-align: center;
  padding: 1em;
  font-size: 2.5em;
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
