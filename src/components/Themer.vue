<template>
    <div class="themer" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @click="$emit('paint', name, $event.currentTarget)">
        <svg class="themer-circle" :style="svgStyle" viewBox="0 0 100 100">
            <circle :style="circleStyle" />
            <circle :style="circleStyle" />
        </svg>
    </div>
</template>

<script>
export default {
    data() {
        return {
            scale: 1
        }
    },
    computed: {
        svgStyle() {
            return {
                // filter: `drop-shadow(${this.theme['block-shadow'].split('),')[0]})`,
                transform: `scale(${this.scale > 1 ? this.scale : 1})`,
                opacity: this.scale > 9 ? 0 : 1,
                transition: this.scale > 9 ? 'transform 1s linear, opacity 0.8s linear' : 'none'
            }
        },
        circleStyle() {
            let circleStyle = {
                fill: this.theme['main']
            }
            if (this.scale !== 1) return {
                fill: this.theme['main'],
                animation: 'none',
                r: '50%'
            }
            return {
                fill: this.theme['main']
            }
        }
    },
    methods: {
        onTouchStart(e) {
            this.touchStart = {
                x: e.targetTouches[0].clientX,
                y: e.targetTouches[0].clientY
            }
        },
        onTouchMove(e) {
            let touchMove = {
                x: Math.abs(e.targetTouches[0].clientX - this.touchStart.x),
                y: Math.abs(e.targetTouches[0].clientY - this.touchStart.y)
            }
            let scale = touchMove.x > touchMove.y ? touchMove.x * 0.05 : touchMove.y * 0.05;
            if (scale > 9) {
                this.$emit('paint', this.name, e.currentTarget)
            } else this.scale = scale;
        },
        onTouchEnd(e) {
            if (this.scale < 9) this.scale = 1;
        }
    },
    props: ['theme', 'name']
}
</script>

<style lang="scss">
.themer {
    position: fixed;
    top: 0;
    width: 50px;
    height: 50px;
    will-change: width, height, transform;
    transition: width 1s, height 1s, transform 0.3s linear;
    z-index: 1000;
    transform-origin: center center;
    >svg {
        position: absolute;
        cursor: pointer;
        width: 100%;
        height: 100%;
        circle {
            transition: all 1s;
            cx: 50; cy: 50;
            animation: pulse 3s ease-out infinite normal;
            transform-origin: center center;
            &:nth-child(1) {
                opacity: 0.7;
            }
            &:nth-child(2) {
                transform: scale(0.8);
            }
        }
    }
    &:nth-child(1) {
        left: 0;
    }
    &:nth-child(2) {
        right: 0;
    }
    &.theme-active svg {
        animation: activate 1s forwards;
    }
}


@media screen and (min-width: 600px) {
    .themer {
        width: 80px; height: 80px;
        bottom: 0; top: auto;
    }
    .themer:not(.theme-active):hover {
        svg {
            animation: hover 1s;
        }
        circle {
            animation-duration: 5s;
            &:nth-child(1) {
                animation-delay: 0.14s;
            }
        }
    }
}

@keyframes hover {
    0% {
        transform: scale(1);
    }
    10% {
        transform: scale(0.9);
    }
    40% {
        transform: scale(1.2);
    }
    90% {
        transform: scale(1);
    }
}

@keyframes pulse {
    0% {
        r: 40%;
    }

    25% {
        r: 50%;
    }

    60% {
        r: 45%;
    }

    100% {
        r: 40%;
    }
}

@keyframes activate {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    60% {
        opacity: 0.6;
    }
    99% {
        transform: scale(50);
    }
    100% {
        opacity: 0;
        transform: scale(0);
    }
}
</style>
