<template>
  <canvas :width="width" :height="height"/>
</template>

<script>
export default {
    data() {
        return {
            color: "white",
            timeout: null,
            width: 300,
            height: 100,
            ctx: null,
            ro: null
        };
    },
    mounted() {
        this.ro = new ResizeObserver(this.updateSize);
        // Only observe the second box
        this.ro.observe(this.$parent.$el);
        this.ctx = this.$el.getContext("2d");
        this.updateColor();
        this.updateSize();
        // this.drawCircle();
        // window.addEventListener("resize", this.updateSize);
    },
    beforeDestroy() {
        this.ro.disconnect();
        // window.removeEventListener("resize", this.updateSize);
    },
    methods: {
        updateColor() {
            this.color = window
                .getComputedStyle(window.document.body, null)
                .getPropertyValue("--accent");
        },
        updateSize(entries) {
            if (entries && entries.length > 0) {
                const [{ target }] = entries;
                const { scrollWidth, scrollHeight } = target;
                this.width = scrollWidth;
                this.height = scrollHeight;
                this.$nextTick(this.drawCircle);
            }
        },
        drawCircle() {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.arc(0, this.height, 50, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    },
    watch: {
        showMore() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.updateColor, 3000);
        }
    },
    props: {
        showMore: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss">
canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
}
</style>
