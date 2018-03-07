<template>
	<section class="show-more">
        <header>
            <p>
                {{ wowWord }}! I am so glad <span class="accent-color">you</span> are here!<br>
                My real name is <span class="accent-color">Oleksandr Shvechykov</span>.
                I am from <span class="accent-color">Ukraine</span> but currently I study in <span class="accent-color">Tartu</span>.
                I love front end a lot, but I was taught a bit <span class="accent-color">more</span>.
            </p>
        </header>
        <div>
            <div class="s-card">
                <header>What you can ask me for:</header>
                <ul class="skills">
                    <li v-for="s in $options.skills" :key="s.name">
                        <div class="s-name">{{ s.name }}</div>
                        <div class="s-short">{{s.short}}</div>
                    </li>
                </ul>
            </div>
            <div class="s-card">
                <header>Education:</header>
                <ul class="edu">
                    <li>
                        <div>Applied Math <span title="Dates when I knew this speciality">(2012-2016)</span></div>
                        <a href="https://snu.edu.ua/en/" target="_blank">Volodymyr Dahl East Ukrainian National University</a>
                    </li>
                    <li>
                        <div>Software Engineering <span title="Dates when I knew this speciality">(2017-2019)</span></div>
                        <a href="https://www.ut.ee/en" target="_blank">University of Tartu</a>
                    </li>
                </ul>
            </div>
            <div class="s-card">
                <header>Showcase:</header>
                <ul class="cases">
                    <li v-for="(c, i) in $options.cases" :key="i" @mousemove="radialGradient" @mouseout="cancelGradient">
                        <div>{{ c.name }}</div>
                        <small>All dependecies: {{ c.deps }}</small>
                    </li>
                </ul>
            </div>
        </div>
	</section>
</template>

<script>
import { skills, cases } from "../data.js";

export default {
    skills,
    cases,
    words: [
        "Blessed saints",
        "Budha wearing gravity shoes",
        "Typed JavaScript",
        "Holly Abramov's glassess",
        "Colorful neckties of Saakashvili"
    ],
    data() {
        const i = Math.floor(Math.random() * this.$options.words.length);
        return {
            active: 0,
            wowWord: this.$options.words[i]
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
        }
    }
};
</script>

<style lang="scss">
.show-more {
    color: var(--text-color);
    min-height: 600px;
    top: -5vh;
    > header {
        width: 100%;
        position: relative;
        padding: 0 60px;
        margin-bottom: 40px;
        p {
            font-size: 24px;
            padding: 0;
            margin: 0;
        }
    }
}
.s-card {
    transition: box-shadow 0.4s, transform 0.4s;
    margin-bottom: 20px;
}
.skills,
.edu {
    list-style: none;
    padding: 0;
    margin: 0;
}
.skills {
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
}
.edu {
    li {
        div:first-child {
            font-size: 24px;
        }
        a {
            color: var(--accent);
            font-size: 18px;
            transition: filter 0.4s;
            filter: brightness(1.2);
            &:hover {
                filter: none;
            }
        }
    }
}
.cases {
    list-style: none;
    padding: 0;
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
.show-more-enter,
.show-more-leave-to {
    opacity: 0;
    > header {
        border-color: white;
        p {
            opacity: 0;
            filter: grayscale(1);
        }
    }
    .s-card {
        opacity: 0;
        transform: translateY(10px);
    }
    .skills > li,
    .cases > li {
        opacity: 0;
        transform: translate3d(-20px, 50px, 0) scale(0.9);
    }
}
.show-more-leave-active,
.show-more-enter-active {
    transition: all 1s, opacity 0.3s;
    > header {
        p {
            transition: opacity 0.3s, filter 0.7s 0.2s;
        }
    }
    .s-card {
        transition: opacity 0.4s, transform 0.8s;
    }
    @for $i from 1 through 3 {
        .s-card:nth-child(#{$i}) {
            transition-delay: #{$i * 0.3}s;
        }
    }
    @for $i from 1 through 8 {
        .skills > li:nth-child(#{$i}) {
            transition-delay: #{$i * 0.06}s;
        }
    }
}
@media screen and (max-width: 600px) {
}
</style>
