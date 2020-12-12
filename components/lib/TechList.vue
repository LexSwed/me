<template>
  <article class="s-card">
    <h3><slot /></h3>
    <transition-group
      tag="ul"
      name="tech"
      class="techs"
      appear
      @afterEnter="afterEnter"
    >
      <li
        v-for="(s, i) in list"
        :key="s.name"
        :style="`transition-delay: ${i * 0.07 + 0.5}s;`"
        class="tech"
      >
        <div class="s-name">{{ s.name }}</div>
        <div class="s-short">{{ s.short }}</div>
      </li>
    </transition-group>
  </article>
</template>

<script>
export default {
  props: {
    list: Array
  },
  methods: {
    afterEnter(el) {
      el.removeAttribute('style');
    }
  }
};
</script>

<style lang="postcss">
.techs {
  display: flex;
  flex-flow: row wrap;
}
.tech {
  position: relative;
  height: 120px;
  width: calc(25% - 8px);
  margin: 4px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
  transition: border-color 0.1s;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid transparent;
  min-width: 170px;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      rgba(255, 255, 255, 0.05),
      var(--show-more) 80%
    );
    transition: opacity 0.4s;
    opacity: 0.2;
  }
  &:hover {
    transition-delay: 0s;
    border-color: var(--accent);
    &:before {
      opacity: 0.5;
    }
    & .s-name {
      opacity: 0;
      transform: translateY(-10%);
    }
    & .s-short {
      opacity: 1;
      transform: translateY(-100%);
    }
  }
  &:last-child {
    margin-right: auto;
  }
}
.s-name {
  font-size: 18px;
  padding: 50px 20px;
  text-align: center;
  line-height: 18px;
  transition: opacity 0.3s, transform 0.3s;
}
.s-short {
  padding: 4px;
  opacity: 0;
  font-size: 14px;
  transition: opacity 0.3s, transform 0.3s;
}
.tech-enter-active,
.tech-leave-active {
  transition: transform 0.4s, opacity 0.2s, border-color 0.1s;
}
.tech-enter,
.tech-leave-to {
  opacity: 0;
  transform: translate3d(-20px, 50px, 0) scale(0.9);
}

@media screen and (max-width: 600px) {
  .tech {
    height: 100px;
  }
  .s-name {
    font-size: 15px;
    padding: 40px 10px;
  }
  .s-short {
    font-size: 13px;
  }
}
</style>
