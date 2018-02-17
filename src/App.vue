<template>
    <main id="app" :style="{backgroundColor: `var(--${routeName})`}">
        <navbar />
        <div class='main'>
            <transition mode="out-in" :name="routeName">
                <router-view></router-view>
            </transition>
        </div>
    </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
    computed: {
        routeName() {
            return this.$route.name;
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
    font-size: 10px;
    font-family: "Quicksand", sans-serif;
}

body {
    padding: 0;
    margin: 0;
}

:root {
    --main: rgb(12, 12, 12);
    --about: #420f21;
    --showcase: #23263d;
    --light: #fffcff;
    --text-color: #fffcff;
    --block-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    --b-r: 5px;
    --accent: #eaba6b;
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

h2 {
    font-size: 4.2rem;
}

h3 {
    font-size: 2.8rem;
}

h4 {
    margin: 0;
    font-size: 1.8rem;
}

#app {
    height: 100vh;
    width: 100vw;
    max-height: 100%;
    overflow-y: auto;
    overflow-y: overlay;
    transition: background-color 0.3s 0.2s;
    background-color: var(--main);
    position: relative;
    &::-webkit-scrollbar {
        display: none;
    }
}

.main {
    position: relative;
    top: 15%;
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

@keyframes show-main {
    0% {
        border-radius: 0px;
        background-color: var(--main);
        transform: scale(0.99);
        opacity: 0;
    }
    20% {
        opacity: 1;
    }
    60% {
        transform: scale(1.01);
        border-radius: 16px;
    }
    80% {
        background-color: var(--main);
    }
    100% {
        transform: scale(1);
        border-radius: 4px;
        background-color: var(--main-1);
        opacity: 1;
    }
}

@keyframes hello-after {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes hello {
    from {
        background-color: var(--dark);
    }
    to {
        background-color: var(--dark-1);
    }
}

@media screen and (max-width: 600px) {
    html {
        font-size: 8px;
    }
    .main {
        top: 12%;
        padding-bottom: 50px;
    }
}
</style>
