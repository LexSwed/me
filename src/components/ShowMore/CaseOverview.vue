<template>
<transition name="fade">
    <div class="flex flex-center case-overview" @touchstart="onTouchStart" @touchend="onTouchEnd">
            <button class="arrows" @click="changeCurrent(-1)" style="left: 0;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M15.4 16l-4.6-4.5 4.6-4.6L14 5.5l-6 6 6 6z"/>
                    <path fill="none" d="M0-.5h24v24H0z"/>
                </svg>
            </button>
            <transition :name="transitionName" mode="out-in" :duration="500">
                <div class="flex flex-center flex-column case-video" :key="current">
                    <h1>{{currentCase.text}}</h1>
                    <video autoplay loop frameborder="0" muted>
                        <source :src="currentCase.webm" type="video/webm">
                        <source :src="currentCase.mp4" type="video/mp4">
                    </video>
                </div>
            </transition>
            <button class="esc-btn" @click="close">ESC</button>
            <button class="arrows" @click="changeCurrent(1)" style="right: 0;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M8.6 16.3l4.6-4.6-4.6-4.5L10 5.7l6 6-6 6z"/>
                    <path fill="none" d="M0-.3h24v24H0z"/>
                </svg>
            </button>
    </div>
</transition>
</template>

<script>
export default {
    data() {
        return {
            current: 0,
            transitionName: "case-left",
            touchStartX: 0,
            touchStartY: 0
        };
    },
    mounted() {
        window.addEventListener("keydown", this.keyPressHandler);
    },
    computed: {
        currentCase() {
            return this.selectedCase[this.current];
        }
    },
    methods: {
        changeCurrent(num = 1) {
            let newCurrent = this.current + num;
            if (newCurrent >= this.selectedCase.length) {
                newCurrent = 0;
            } else if (newCurrent < 0) {
                newCurrent = this.selectedCase.length - 1;
            }
            this.current = newCurrent;
            this.transitionName = num > 0 ? "case-left" : "case-right";
        },
        close() {
            this.$emit("update:selectedCase", null);
        },
        keyPressHandler(e) {
            if (e.keyCode === 27) {
                this.close();
            } else if (e.keyCode === 39) {
                this.changeCurrent(1);
            } else if (e.keyCode === 37) {
                this.changeCurrent(-1);
            }
        },
        onTouchStart(e) {
            this.touchStartX = e.changedTouches[0].screenX;
            this.touchStartY = e.changedTouches[0].screenY;
        },
        onTouchEnd(e) {
            const diffX = this.touchStartX - e.changedTouches[0].screenX;
            if (diffX > 100) {
                this.changeCurrent(1);
            } else if (diffX < -100) {
                this.changeCurrent(-1);
            }
            const diffY = this.touchStartY - e.changedTouches[0].screenY;
            if (diffY > 200) {
                this.close();
            }
            this.touchStart = 0;
        }
    },
    beforeDestroy() {
        window.removeEventListener("keypress", this.keyPressHandler);
    },
    props: {
        selectedCase: {
            type: Array
        }
    }
};
</script>

<style lang="scss">
.case-overview {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--show-more);
    overflow: hidden;
    z-index: 100;
    > .arrows {
        outline: none;
        border: none;
        background: none;
        width: 50px;
        height: 50px;
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 0;
        svg {
            width: 100%;
            height: 100%;
            fill: var(--text-color);
        }
        &:hover svg {
            fill: var(--accent);
        }
    }
    .esc-btn {
        position: absolute;
        bottom: 30px;
        font-size: 3vh;
        outline: none;
        border: none;
        background: none;
        color: var(--text-color);
        transition: color 0.2s;
        cursor: pointer;
        font-family: "Quicksand", sans-serif;
        &:hover {
            color: var(--accent);
        }
    }
}
.case-video {
    position: relative;
    width: calc(100vw - 100px);
    backface-visibility: hidden;
    top: -60px;
    h1 {
        font-size: 4vh;
        display: inline-block;
        text-transform: uppercase;
        color: var(--text-color);
        margin: 10px 0;
    }
    video {
        max-height: 70vh;
        max-width: 80vw;
        background-color: transparent;
    }
}
.case-left-enter-active,
.case-left-leave-active,
.case-right-enter-active,
.case-right-leave-active {
    transition: opacity 0.3s;
    h1 {
        transition: transform 0.4s;
    }
    video {
        transition: transform 0.4s 0.1s;
    }
}
.case-left-enter,
.case-right-leave-to {
    opacity: 0;
    h1 {
        transform: translateX(20%);
    }
    video {
        transform: translateX(20%);
    }
}

.case-right-enter,
.case-left-leave-to {
    opacity: 0;
    h1 {
        transform: translateX(-20%);
    }
    video {
        transform: translateX(-20%);
    }
}
@media screen and (max-width: 600px) {
    .case-overview .esc-btn {
        bottom: 12px;
    }
    .case-overview .arrows {
        top: auto;
        bottom: 0;
        transform: none;
    }
}
</style>
