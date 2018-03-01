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
        this.updateColor();
        this.updateSize();
        this.ctx = this.$el.getContext("2d");
        this.ctx.fillStyle = "green";
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
            console.log(this.color);
        },
        updateSize() {
            const { scrollWidth, scrollHeight } = window.document.body;
            this.width = scrollWidth;
            this.height = scrollHeight;
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
    background-color: transparent;
}
</style>
