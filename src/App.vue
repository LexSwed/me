<template>
    <main id="app" :style="`background-color: var(--${currentView})`">
        <navbar :showMore.sync="showMore" />
        <div class='main'>
            <transition mode="out-in" :name="currentView">
                <welcome v-if="!showMore" />
                <show-more v-else/>
            </transition>
        </div>
    </main>
</template>

<script>
import Welcome from "@/components/Welcome.vue";
import ShowMore from "@/components/ShowMore.vue";
import Navbar from "@/components/Navbar.vue";

export default {
    data() {
        return {
            welcomeColor: "white",
            showMoreColor: "white",
            showMore: false
        };
    },
    mounted() {
        const docStyle = window.getComputedStyle(this.$el, null);
        this.welcomeColor = docStyle.getPropertyValue("--welcome-accent");
        this.showMoreColor = docStyle.getPropertyValue("--show-more-accent");
        this.updateColor();
    },
    methods: {
        updateColor() {
            const color = this.showMore
                ? this.showMoreColor
                : this.welcomeColor;
            document
                .querySelector("meta[name=theme-color]")
                .setAttribute("content", color);
            document.documentElement.style.setProperty("--accent", color);
        }
    },
    computed: {
        currentView() {
            return this.showMore ? "show-more" : "welcome";
        }
    },
    watch: {
        showMore({ name }) {
            setTimeout(() => {
                this.updateColor();
            }, 325);
        }
    },
    components: {
        Navbar,
        Welcome,
        ShowMore
    }
};
</script>

<style lang="scss">
html,
body {
    font-family: "Quicksand", sans-serif;
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
    height: 100vh;
    width: 100vw;
    max-height: 100%;
    overflow-y: auto;
    overflow-y: overlay;
    transition: background-color 0.3s 0.2s;
    background-color: #18191c;
    position: relative;
    &::-webkit-scrollbar {
        display: none;
    }
    *::selection {
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
    > section {
        position: relative;
    }
    * {
        perspective: 300px;
    }
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
