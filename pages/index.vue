<template>
  <main id="app">
    <LibNavbar :showMore.sync="showMore" />
    <div class="main">
      <transition mode="out-in" :name="currentView">
        <LazyMore v-if="showMore" />
        <Welcome v-else />
      </transition>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      showMore: false
    };
  },
  computed: {
    currentView() {
      return this.showMore ? 'show-more' : 'welcome';
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
  head: {
    title: '⚡️ Alexander Swed - Softwarer Engineer',
    meta: [
      {
        'http-equiv': 'X-UA-Compatible',
        'content': 'IE=edge'
      },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        type: 'iamge/png',
        size: '180x180',
        href: '/img/icons/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/icons/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/img/icons/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/img/icons/site.webmanifest' },
      { rel: 'shortcut icon', href: '/img/icons/favicon.ico' }
    ]
  }
};

function updateColor(accent, $el) {
  if (typeof window === 'undefined') return;

  const docStyle = window.getComputedStyle($el, null);
  const [color, bg] = accent
    ? [
        docStyle.getPropertyValue('--show-more-accent'),
        docStyle.getPropertyValue('--show-more')
      ]
    : [
        docStyle.getPropertyValue('--welcome-accent'),
        docStyle.getPropertyValue('--welcome')
      ];

  document
    .querySelector('meta[name=theme-color]')
    .setAttribute('content', color);
  document.documentElement.style.setProperty('--accent', color);
  document.documentElement.style.setProperty('--bg', bg);
}
</script>

<style lang="postcss">
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
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-y: overlay;
  transition: background-color 0.3s 0.2s;
  background-color: #18191c;
  background-color: var(--bg);
  position: relative;
  font-family: 'Quicksand', sans-serif;
  &::-webkit-scrollbar {
    display: none;
  }
  & ::selection {
    background: rgba(255, 255, 255, 0.1);
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
  padding-bottom: 32px;
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
    width: 96%;
  }
}
</style>
