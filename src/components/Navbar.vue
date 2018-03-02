<template>
  
<nav class="nav">
    <transition name="nav" appear appear-class="nav-circle-appear">
        <div class="nav-inner" @click="$emit('update:showMore', !showMore)">
            <transition name="scale" mode="out-in">
                <svg v-if="showMore" height="24" width="24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
                <span v-else>More</span>
            </transition>
        </div>
    </transition>
</nav>
</template>

<script>
export default {
    props: {
        showMore: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss">
.nav {
    background-color: var(--nav-bg, transparent);
    width: 100%;
    position: fixed;
    left: 0;
    top: 20px;
    z-index: 100;
    display: flex;
    justify-content: center;
}
.nav-inner {
    cursor: pointer;
    padding: 8px 20px;
    backface-visibility: hidden;
    transform-origin: center;
    color: var(--accent);
    font-size: 20px;
    transition: all 0.3s;
    span {
        display: inline-block;
    }
    svg {
        fill: var(--accent);
    }
    > span,
    > svg {
        transition: 0.4s;
    }
    &:hover {
        span {
            color: var(--show-more-accent);
        }
        svg {
            fill: var(--welcome-accent);
        }
    }
    &:active {
        transform: scale(0.9);
    }
    &-appear {
        transform: scale(0.7);
        opacity: 0;
    }
}
@keyframes scale {
    0% {
        transform: scale(1);
    }
    30% {
        transform: scale(0.95);
    }
    100% {
        transform: scale(1);
    }
}

@media screen and (max-width: 600px) {
    .nav {
        --bg-color: var(--nav-bg, var(--main));
        top: auto;
        bottom: 0;
        width: 100%;
        background-color: var(--bg-color);
    }
}
</style>
