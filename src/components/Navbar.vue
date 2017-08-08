<template>
<nav class="nav">
    <transition name="nav" appear appear-class="nav-appear">
        <ul>
            <router-link v-for="{to, text, name}, i in this.links"
                class="nav-link"
                :style="{animationDelay: `${i*0.3 + 2}s`}"
                tag="li"
                :to="to"
                :key="i"
                :ref="name"
            >
                <a>{{ text }}</a>
            </router-link>
            <span ref="pointer" class="pointer" :style="getPointerStyle"/>
        </ul>
    </transition>
</nav>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
            links: [
                { to: '/', text: 'Home', name: 'main' },
                { to: '/about', text: 'About', name: 'about' },
                { to: '/showcase', text: 'Showcase', name: 'showcase' }
            ],
            pointerLeft: 0,
            pointerWidth: 0
        }
    },
    watch: {
        $route(val, oldVal) {
            val !== oldVal && this.setPointerStyle();
        }
    },
    mounted() {
        window.addEventListener('resize', this.setPointerStyle);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.setPointerStyle)
    },
    methods: {
        setPointerStyle() {
            if (!this.$route.name) return null;
            let activeLink = this.$refs[this.$route.name][0].$el;
            let rect = activeLink.getBoundingClientRect();
            this.pointerLeft = activeLink.offsetLeft;
            this.pointerWidth = rect.width;
        }
    },
    computed: {
        getPointerStyle() {
            return {
                transform: `translateX(${this.pointerLeft}px) scaleX(${this.pointerWidth / 10})`
            }
        }
    }
}
</script>

<style lang="scss">
.nav {
    background-color: var(--nav-bg, transparent);
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    z-index: 100;
    border-top-left-radius: 4px;
    overflow: hidden;
    display: flex; justify-content: center;
    &-appear .nav-link {
        transform: translateY(-10px);
        opacity: 0;
        animation: showNavLinks 1.2s ease-out;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .nav-link {
        display: inline-block;
        height: 50px;
        margin: 0 5px;
        padding: 5px;
        transition: backdrop-filter 0.5s, background-color 0.3s, opacity 0.3s;
        opacity: 0.8;
        backdrop-filter: blur(4px);
        &:hover {
            opacity: 1;
            background-color: var(--nav-link-hover-bg, transparent);
        }
        a {
            display: block;
            width: 100%;
            height: 100%;
            transition: color 0.3s;
            color: var(--text-color);
            text-align: center;
            text-decoration: none;
            font-size: 18px;
            line-height: 38px;
            padding: 0 10px;
        }
        &.router-link-exact-active {
            opacity: 1;
            a {
                color: var(--accent);
            }
        }
    }
    .pointer {
        display: block;
        height: 2px;
        width: 10px;
        position: absolute;
        bottom: 0; left: 0;
        transition: transform 0.6s ease;
        background-color: var(--accent);
        transform: scaleX(0);
        transform-origin: left;
    }
}

@keyframes showNavLinks {
    0% {
        transform: translateY(-40px);
        opacity: 0;
    }
    40% {
        opacity: 1;
    }
    70% {
        transform: translateY(5px);
        opacity: 1;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@media screen and (max-width: 600px) {
    .nav {
        --bg: var(--nav-bg, var(--main));
        top: auto;
        bottom: 0;
        width: 100%;
        background-color: var(--bg);
        .pointer {
            bottom: auto;
            top: 0;
        }
    }
}
</style>