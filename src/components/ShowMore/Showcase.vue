<template>
    <article class="s-card">
        <header>Showcase:</header>
        <ul class="cases">
            <li v-for="(c, i) in $options.cases" :key="i" @mousemove="radialGradient" @mouseout="cancelGradient" @click="selectCase(c)">
                <div>{{ c.name }}</div>
                <small>All dependecies: {{ c.deps }}</small>
            </li>
        </ul>
        <case-overview v-if="selectedCase" :selectedCase.sync="selectedCase" />
    </article>
</template>

<script>
import { cases } from "./data.js";
import CaseOverview from "./CaseOverview";

export default {
    cases,
    data() {
        return {
            selectedCase: null
        };
    },
    methods: {
        radialGradient(e) {
            const radGrad = window
                .getComputedStyle(e.currentTarget, null)
                .getPropertyValue("--rad-grad");
            const newRad = e.layerX / e.currentTarget.offsetWidth * 100;
            e.currentTarget.style.setProperty("--rad-grad", newRad + "%");
            e.currentTarget.style.setProperty("--opacity", 1);
        },
        cancelGradient(e) {
            e.currentTarget.style.setProperty("--opacity", 0);
        },
        selectCase(selectedCase) {
            this.selectedCase = selectedCase.videos;
        }
    },
    components: {
        CaseOverview
    }
};
</script>

<style lang="scss">
.cases {
    li {
        --rad-grad: 50%;
        --opacity: 0;
        position: relative;
        padding: 14px;
        background-color: rgba(255, 255, 255, 0.1);
        cursor: pointer;
        transition: border-color 0.2s;
        border: 1px solid transparent;
        div {
            position: relative;
        }
        &:hover {
            border-color: var(--accent);
        }
        &:before {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            content: "";
            pointer-events: none;
            transition: opacity 0.2s;
            opacity: 0;
            opacity: var(--opacity);
            background: radial-gradient(
                circle at var(--rad-grad),
                rgba(255, 255, 255, 0.1) 10%,
                rgba(255, 255, 255, 0.05) 30%,
                transparent 50%
            );
        }
    }
}
</style>
