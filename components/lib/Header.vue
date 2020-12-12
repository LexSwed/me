<template>
  <header class="show-more-header">
    <p>
      {{ wowWord }}! I am so glad <span class="accent-color">you</span> are
      here!
      <br />
    </p>
    <p>
      My real name is
      <span class="accent-color">Oleksandr Shvechykov</span>. I am from
      <span class="accent-color">Ukraine</span> but currently I live in
      <span class="accent-color">Barcelona, Spain</span>. I am a Software
      Engineer who cares about the end-user experience and so ❤️UI Engineering.
    </p>
  </header>
</template>

<script>
const words = [
  'Blessed saints',
  'Budha wearing gravity shoes',
  'Functional JavaScript',
  "Holly Abramov's glassess",
  'Colorful neckties of Saakashvili'
];

export default {
  data() {
    const i = Math.floor(Math.random() * words.length);
    return {
      wowWord: words[i]
    };
  }
};
</script>

<style lang="postcss">
.show-more-header {
  width: 100%;
  position: relative;
  padding: 0 60px;
  margin-bottom: 40px;
  & p {
    font-size: 24px;
    padding: 0;
    margin: 0;
  }
}
@media screen and (max-width: 600px) {
  .show-more-header {
    padding: 5px 10px;
  }
}
</style>
