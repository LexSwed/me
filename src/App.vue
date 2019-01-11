<template>
  <main id="app">
    <navbar :showMore.sync="showMore"/>
    <div class="main">
      <transition mode="out-in" :name="currentView">
        <more v-if="showMore"/>
        <welcome v-else/>
      </transition>
    </div>
  </main>
</template>

<script>
import Welcome from "@/views/Welcome.vue";
import More from "@/views/More.vue";
import Navbar from "@/components/Navbar.vue";

import { updateColor } from "./utils";

export default {
  data() {
    return {
      showMore: false
    };
  },
  computed: {
    currentView() {
      return this.showMore ? "show-more" : "welcome";
    }
  },
  watch: {
    showMore: {
      immediate: true,
      handler(value) {
        setTimeout(() => {
          updateColor(value, this.$el);
        }, 325);
      }
    }
  },
  components: {
    Navbar,
    Welcome,
    More
  }
};
</script>

<style lang="postcss">
html,
body {
  font-family: "Quicksand", sans-serif;
  width: 100%;
  height: 100%;
}

body {
  padding: 0;
  margin: 0;
}

:root {
  --welcome: #18191c;
  --welcome-accent: #f5bc60;
  --show-more: #050505;
  --show-more-accent: #23cf5f;
  --showcase: #23263d;
  --showcase-accent: #e91e63;
  --bg: var(--welcome);
  --light: #fffcff;
  --text-color: var(--light);
  --block-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  --b-r: 5px;
  --accent: var(--welcome-accent);
  --dark: rgb(12, 12, 12);
  --warning: #cf5c36;
}

body * {
  box-sizing: border-box;
}

h2,
h3,
h4 {
  margin: 10px 0;
}
a {
  text-decoration: none;
  color: inherit;
}

#app {
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  overflow-y: overlay;
  transition: background-color 0.3s 0.2s;
  background-color: #18191c;
  background-color: var(--bg);
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  & ::selection {
    background: transparent;
    color: var(--accent);
  }
}

.accent-color {
  color: var(--accent);
}

.main {
  position: relative;
  top: 15vh;
  max-width: 900px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  transition: filter 1s;
  border-radius: var(--b-r);
}

.flex {
  display: flex;
}
.flex-center {
  justify-content: center;
  align-items: center;
}
.flex-column {
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active,
.scale-enter-active,
.scale-leave-active {
  transform-origin: center;
  backface-visibility: hidden;
  transition: 0.45s;
}
.fade-enter-active,
.scale-enter-active {
  transition-delay: 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.scale-enter,
.scale-leave-to {
  transform: scale(0);
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@media screen and (max-width: 600px) {
  .main {
    top: 12vh;
    padding-bottom: 50px;
  }
}
</style>
