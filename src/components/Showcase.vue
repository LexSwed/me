<template>
    <section class="showcase">
        <div class="card-empty">
            <video autoplay loop>
                <source :src="hz" type="video/webm">
            </video>
            <h2>Nothing to show yet</h2>
            <div class="card-promise">But you can still check my
                <a href="https://github.com/LexSwed" target="_blank">GitHub account
                </a> to see some old code or even
                <a href="https://github.com/LexSwed/Me/blob/master/src/components/Showcase.vue" target="_blank">this page</a>.
            </div>
        </div>
        <component :is="tumbleweed" class="tumbleweed" />
    </section>
</template>

<script>
import tumbleweed from "./svg/tumbleweed.svg"
import hz from "../assets/hz.webm"

export default {
    data() {
        return {
            tumbleweed, hz
        }
    }
}
</script>

<style lang="scss">
.card-empty {
    width: 100%;
    color: var(--text-color);
    font-size: 4rem;
    position: relative;
    margin-bottom: 50px;
    border-radius: var(--b-r);
    video {
        border-radius: var(--b-r);
        width: 100%;
        display: flex;
        opacity: 0.3;
        box-shadow: var(--block-shadow);
    }
    h2 {
        position: absolute;
        top: 2rem;
        left: 3rem;
    }
}

.card-promise {
    width: 80%;
    padding: 20px;
    font-size: 3.2rem;
    border-radius: var(--b-r);
    transform: translateY(2rem);
    background-color: var(--main);
    position: absolute;
    bottom: 0;
    left: 10%;
    a {
        color: var(--text-color);
    }
}

.tumbleweed {
    width: 100px;
    height: 100px;
    position: absolute;
    will-change: bottom, left, transform;
    animation: jumping 1.5s infinite, rolling 8s linear infinite, rotating reverse 1s linear infinite;
}

.showcase {
    &-enter {
        transform: translateY(100px);
        opacity: 0;
        .card-promise {
            transform: translateY(300px);
        }
    }
    &-enter-active {
        transition: transform 1s ease, opacity 0.4s;
        .card-promise {
            transition: transform 1s;
        }
    }
}

@media screen and (max-width: 600px) {
    .card-empty {
        width: 98%;
        left: 1%;
    }
    .card-promise {
        position: relative;
        width: 100%;
        left: auto;
        bottom: auto;
    }
}

@keyframes jumping {
    0% {
        bottom: -60px;
        animation-timing-function: ease-in;
    }
    25% {
        bottom: -80px;
        animation-timing-function: ease-out;
    }
    50% {
        bottom: -70px;
        animation-timing-function: ease-in;
    }
    75% {
        bottom: -90px;
        animation-timing-function: ease-out;
    }
    100% {
        bottom: -60px;
        animation-timing-function: ease-in;
    }
}

@keyframes rolling {
    0% {
        left: calc(100% + 100px);
    }
    100% {
        left: -100px;
    }
}

@keyframes rotating {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
