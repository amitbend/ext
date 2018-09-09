<template>

<a class="card-link" href="#">
  <article class="blog-card">
    <img class="post-image" :src="image" />
    <div class="article-details">
      <h4 class="post-category">{{ langs }}</h4>
      <h3 class="post-title">{{ name }}</h3>
      <p class="post-description">{{ desc }}</p>
      <p class="post-author">By {{ author }}</p>
    </div>
  </article>
</a>
</template>

<script>
export default {
  data: () => ({
    name: 'LALALAL repo',
    langs: 'Javascript',
    image: 'https://source.unsplash.com/DnWYw0zLJBg',
    author: 'Katherine Kato',
    desc: `Seattle is a seaport city on the west coast of the United States...`,
  }),
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
* {
  box-sizing: border-box;
}
*::before,
*::after {
  box-sizing: border-box;
}

body {
  display: flex;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  color: #777;
  background: #eedfcc;
  font-size: 0.9375rem;
  min-height: 100vh;
  margin: 0;
  line-height: 1.6;
  align-items: center;
  justify-content: center;
  text-rendering: optimizeLegibility;
}

.blog-card {
  display: flex;
  flex-direction: row;
  background: #fff;
  box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.375rem;
  overflow: hidden;
}

.card-link {
  position: relative;
  display: block;
  color: inherit;
  text-decoration: none;
}
.card-link:hover .post-title {
  transition: color 0.3s ease;
  color: #e04f62;
}
.card-link:hover .post-image {
  transition: opacity 0.3s ease;
  opacity: 0.9;
}

.post-image {
  transition: opacity 0.3s ease;
  display: block;
  width: 100%;
  object-fit: cover;
}

.article-details {
  padding: 1.5rem;
}

.post-category {
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.0625rem;
  margin: 0 0 0.75rem 0;
  padding: 0 0 0.25rem 0;
  border-bottom: 0.125rem solid #ebebeb;
}

.post-title {
  transition: color 0.3s ease;
  font-size: 1.125rem;
  line-height: 1.4;
  color: #121212;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.post-author {
  font-size: 0.875rem;
  line-height: 1;
  margin: 1.125rem 0 0 0;
  padding: 1.125rem 0 0 0;
  border-top: 0.0625rem solid #ebebeb;
}

@supports (display: grid) {
  body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.625rem;
    grid-template-areas: '. main main .' '. main main .';
  }

  .post-image {
    height: 100%;
  }

  .blog-card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }

  @media (max-width: 40rem) {
    .blog-card {
      grid-template-columns: auto;
      grid-template-rows: 12rem 1fr;
    }
  }
}
</style>
