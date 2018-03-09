<template>
    <article class="s-card">
        <header>What you can ask me for:</header>
        <ul class="techs">
            <li v-for="s in $options.techs" :key="s.name">
                <div class="s-name">{{ s.name }}</div>
                <div class="s-short">{{s.short}}</div>
            </li>
        </ul>
    </article>
</template>

<script>
import { techs } from "./data.js";

export default {
    techs
};
</script>

<style lang="scss">
.techs {
    display: flex;
    flex-flow: row wrap;
    li {
        height: 100px;
        width: calc(25% - 8px);
        margin: 4px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        overflow: hidden;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
        transition: transform 0.4s, opacity 0.2s, border-color 0.1s;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid transparent;
        min-width: 210px;
        &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(
                rgba(255, 255, 255, 0.1),
                var(--show-more)
            );
            transition: opacity 0.4s;
            opacity: 0.2;
        }
        &:hover {
            border-color: var(--accent);
            &:before {
                opacity: 0.5;
            }
            .s-name {
                opacity: 0;
                transform: translateY(-10%);
            }
            .s-short {
                opacity: 1;
                transform: translateY(-100%);
            }
        }
        &:last-child {
            margin-right: auto;
        }
    }
    .s-name {
        font-size: 18px;
        padding: 41px 20px;
        text-align: center;
        line-height: 18px;
        transition: opacity 0.3s, transform 0.3s;
    }
    .s-short {
        padding: 4px;
        opacity: 0;
        font-size: 14px;
        transition: opacity 0.3s, transform 0.3s;
    }
}
</style>
