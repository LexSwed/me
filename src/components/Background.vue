<template>
  <canvas :width="width" :height="height"/>
</template>

<script>
export default {
    data() {
        return {
            color: "white",
            timeoutId: null,
            intervalId: null,
            width: 100,
            height: 100,
            ctx: null,
            ro: null,
            mouseDown: null
        };
    },
    mounted() {
        let color = window.localStorage.getItem("theme");
        if (!color) {
            color = "#fffcff";
            window.localStorage.setItem("theme", color);
        }
        this.color = color;
        this.ro = new ResizeObserver(this.updateSize);
        this.ro.observe(this.$parent.$el);
        this.ctx = this.$el.getContext("2d");
        this.updateSize();
        document.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("mouseup", this.onMouseUp);
        document.addEventListener("mousemove", this.onMouseMove);
    },
    beforeDestroy() {
        this.ro.disconnect();
        document.removeEventListener("mousedown", this.onMouseDown);
        document.removeEventListener("mouseup", this.onMouseUp);
        document.removeEventListener("mousemove", this.onMouseMove);
    },
    methods: {
        onMouseDown(e) {
            this.startDrawing(e, 1500);
        },
        onMouseUp() {
            window.clearTimeout(this.timeoutId);
            this.mouseDown = null;
        },
        onMouseMove(e) {
            if (this.mouseDown !== null) {
                e.preventDefault();
                this.onMouseUp();
                this.startDrawing(e);
            }
        },
        updateSize(entries) {
            if (entries && entries.length > 0) {
                const [{ target }] = entries;
                const { scrollWidth, scrollHeight } = target;
                this.width = scrollWidth;
                this.height = scrollHeight;
            }
        },
        drawCircle() {
            this.ctx.fillStyle = this.color;
            const r = Math.random() * 14;
            const x = getRandomInt(this.mouseDown.x);
            const y = getRandomInt(this.mouseDown.y);
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2 * Math.PI);
            this.ctx.fill();
        },
        startDrawing(e, time) {
            this.mouseDown = {
                x: e.x,
                y: e.y
            };
            e.preventDefault();
            this.clearCanvas();
            this.timeoutId = setTimeout(() => {
                this.drawCircle();
                this.startDrawing(e, time - time / 4);
            }, time);
        },
        clearCanvas() {
            this.ctx.globalAlpha = 0;
            this.ctx.fillStyle = document.documentElement.style.getPropertyValue(
                "--bg"
            );
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.globalAlpha = 1;
        }
    }
};

function getRandomInt(coord) {
    return Math.floor(Math.random() * 41) + coord - 20;
}
</script>

<style lang="scss">
canvas {
    position: absolute;
    top: 0;
    left: 0;
}
</style>
