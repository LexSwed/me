<template>
  <canvas :width="width" :height="height"/>
</template>

<script>
export default {
    data() {
        return {
            color: "white",
            timeout: null,
            width: 0,
            height: 0,
            ctx: null
        };
    },
    mounted() {
        this.ctx = this.$el.getContext("2d");
        this.updateColor();
        this.updateSize();
        window.addEventListener("resize", this.updateSize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateSize);
    },
    methods: {
        updateColor() {
            this.color = window
                .getComputedStyle(window.document.body, null)
                .getPropertyValue("--accent");
        },
        updateSize() {
            const { scrollWidth, scrollHeight } = window.document.body;
            this.width = scrollWidth;
            this.height = scrollHeight;
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(0, 0, scrollWidth, scrollHeight);
        },
        drawCircle() {
            this.ctx.fillStyle = "green";
            this.ctx.beginPath();
            this.ctx.arc(0, this.height - 50, 50, 0, 2 * Math.PI);
            this.ctx.stroke();
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
    width: 100vw;
    height: 100vh;
    top: 0;
    z-index: -1;
}
</style>
