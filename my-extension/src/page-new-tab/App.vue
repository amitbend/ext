<template>
<div >
  <div class="heading">
  <img class="logo" src="https://i.postimg.cc/c4Lz93jD/HONEY-n-OODLE.png"/>
  <div class="headings">
  <h2 class="header">{{ new Date().toLocaleDateString('en-us',{weekday : 'long', month : 'long' , day : 'numeric' })}} </h2>
  <h4 class="header2"> Honey Muffin </h4>
  </div>

  </div>

       <div class="select-container">
      <vue-single-select class="select2"
          v-model="language"
          :options="langs"
          :required="true"
          :placeholder="language.name"
        optionLabel="name"
          :classes="{
                    input : 'input2',
                    dropdown: 'dropdown2',
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
  props: {
    language: {
      type: Object,
      default: () => {
        return { name: 'Javascript', urlParam: 'javascript' };
      },
    },
  },
  watch: {
    language() {
      if (this.language) {
        this.saveLocal('language');
        console.log('getting trending for ' + JSON.stringify(this.language.name));
        this.getTrending(true);
      }
    },
  },
  mounted: function() {
    const lang = this.$storage.get('language');
    if (lang && lang.value) this.language = lang.value;
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
      this.$storage.set(topic, { key: topic, value: this[topic] }, { ttl: 60 * 1000 * 60 * 8 });
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
      this.$storage.remove('cards');
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

.logo {
  position: static;
  margin-right: 20px;
  padding: 0ch;
  border: 0ch;
  width: 85px;
  height: 85px;
  border-radius: 25px;
  float: left;
}

.heading {
  display: flex;
  text-align: center;
  justify-content: center;
}

.headings {
  display: flex;
  text-align: center;
  align-items: flex-start;
  flex-direction: column;
  position: static;
  margin-bottom: 20px;
}

.header {
  font-size: 1.75rem;
  text-align: center;
  display: inline-flex;
  margin-top: 15px;
  margin-bottom: 5px;
}

.header2 {
  align-self: flex-start;
  font-size: 0.875rem;
  color: #3c4043;
  font-weight: 400;
  margin: 5px;
  margin-left: 0px;
  font-family: roboto;
}

body {
  font-family: Roboto, Ubuntu, sans-serif;
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

<style lang="scss">
.vue-loading-container {
  position: absolute;
  left: 50% !important;
  top: 50% !important;
  color: aqua;
}

.sk-cube {
  background-color: aquamarine !important;
}

.dropdown2 {
  width: 9.8rem !important;
  font-size: 12px;
  box-shadow: 0px 1em 2em -1.5em rgba(0, 0, 0, 0.5);
}
ul {
  text-align: center;
  display: inline-block;
  position: relative;
}

.header {
  font-size: 2em;
}

.input2 {
  width: 4.8rem;
  margin-left: auto;
  margin-right: auto;
  padding: 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 2px;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  -webkit-appearance: none;
  margin: 0px;
  border-radius: 4px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  background-position-x: calc(100% - 8px);
  background-position-y: center;
  background-size: 8px 8px;
  background-repeat-x: no-repeat;
  background-repeat-y: no-repeat;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: initial;
  background-position: calc(100% - 8px) center;
  background-repeat: no-repeat;
}

.select-container {
  text-align: center;
}
</style>
