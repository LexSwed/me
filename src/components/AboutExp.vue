<template>
    <div class="about-block">
        <h2>Experience</h2>
        <ul class="exp-timeline" ref="timeline" :style="{height: `${expHeight}px`}">
            <li v-for="{name, resp, from, to} in exp" class="exp-job" :style="getStyle(from, to)">
                <div class="exp-job-time">{{getMonth(from)}} - {{getMonth(to)}}</div>
                <div class="exp-job-main">
                    <h4><b>@{{name}}</b>{{ to === undefined ? " (current)" : ""}}<span> - {{resp}}</span></h4>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import exp from "./data/experience.js"

export default {
    data() {
        return {
            monthInPixels: 20,
            exp,
            expHeight: 300
        }
    },
    mounted() {
        let lastIndex = this.exp.length - 1;
        let top = this.getFromStart(this.exp[lastIndex].from);
        let bottom = this.getFromStart();
        this.expHeight = top + bottom;
    },
    methods: {
        getStyle(from, to) {
            let top = this.getFromStart(from);
            let bottom = this.getFromStart(to);
            return {
                top: `${top}px`,
                height: `${bottom - top}px`
            }
        },
        getFromStart(date) {
            let curDate = date !== undefined ? new Date(date) : new Date();
            return this.monthInPixels * (curDate.getMonth() + curDate.getFullYear() - 2017);
        },
        getMonth(month) {
            if (!month) return "*";
            return new Date(month).toDateString().slice(4, 8);
        }
    }
}
</script>

<style lang="scss">
.exp-timeline {
    margin: 0; padding: 0;
    list-style: none;
    position: relative;
    /*=== Timeline ===*/
    &:before {
        position: absolute;
        top: 10px; bottom: -12px;
        left: 90px; width: 2px;
        border-radius: 1px;
        box-shadow: var(--block-shadow);
        background-color: var(--text-color);
        content: '';
        opacity: 0.6;
    }
}
.exp-job {
    padding-left: 100px;
    position: absolute;
    display: block; width: 100%;
    filter: brightness(50%);
    &:last-child {
        filter: brightness(100%);
        .exp-job-time:after {
            box-shadow: var(--block-shadow);
        }
    }
    &-time {
        position: absolute;
        width: 80px; left: 0;
        font-size: 16px;
        top: 10px;
        background-color: var(--text-color);
        color: var(--main);
        border-radius: var(--b-r);
        font-weight: 700;
        box-shadow: var(--block-shadow);
        padding: 0 4px;
        &:after {
            position: absolute; right: -16px;
            width: 10px; height: 10px;
            border-radius: 50%;
            background-color: var(--text-color);
            content: '';
            top: 5px;
            transform: rotate(45deg);
        }
    }
    &-main {
        display: flex; flex-flow: row nowrap;
        justify-content: flex-start;
        height: 100%;
        padding: 10px 0;
        line-height: 1;
    }
}
@media screen and (max-width: 420px) {
    .exp-job-main h4 {
        font-size: 2.6rem;
        span {
            display: none;
        }
    }
}
</style>

