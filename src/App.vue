<template>
    <main id="app" :style="`background-color: var(--${routeName})`">
        <navbar />
        <div class='main'>
            <transition mode="out-in" :duration="1000" :name="routeName">
                <router-view></router-view>
            </transition>
        </div>
    </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
    data() {
        return {
            main: "white",
            about: "white",
            showcase: "white"
        };
    },
    mounted() {
        const docStyle = window.getComputedStyle(this.$el, null);
        this.main = docStyle.getPropertyValue("--main-accent");
        this.about = docStyle.getPropertyValue("--about-accent");
        this.showcase = docStyle.getPropertyValue("--showcase-accent");
        this.updateColor(this.routeName);
    },
    methods: {
        updateColor(routeName) {
            const color = this[routeName];
            document
                .querySelector("meta[name=theme-color]")
                .setAttribute("content", color);
            document.documentElement.style.setProperty("--accent", color);
        }
    },
    computed: {
        routeName() {
            return this.$route.name;
        }
    },
    watch: {
        $route({ name }) {
            setTimeout(() => {
                this.updateColor(name);
            }, 325);
        }
    },
    components: {
        Navbar
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
    --main: #18191c;
    --main-accent: #f5bc60;
    --about: #050505;
    --about-accent: #23cf5f;
    --showcase: #23263d;
    --showcase-accent: #e91e63;
    --light: #fffcff;
    --text-color: var(--light);
    --block-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    --b-r: 5px;
    --accent: var(--main-accent);
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
