<template>
	<section class="show-more">
        <header>
            <p>
                {{ wowWord }}! I am so glad <span class="show-more-accent">you</span> are here!<br>
                My real name is <span class="show-more-accent">Oleksandr Shvechykov</span>.
                I am from <span class="show-more-accent">Ukraine</span> but currently I study in <span class="show-more-accent">Tartu</span>.
                I love front end a lot, but I was taught a bit <span class="show-more-accent">more</span>.
            </p>
        </header>
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
        </div>
	</section>
</template>

<script>
export default {
    skills: [
        {
            name: "HTML / CSS",
            short:
                "Confident in layout creation and styling. Use HTML, CSS (SCSS actually) a lot on daily basis."
        },
        {
            name: "Node.js",
            short: "Have a not long experience in creating API using Node.js."
        },
        {
            name: "React",
            short:
                "One of the main tools. I have a good experience rewriting a project from jQuery to React. Do whatever He says to do."
        },
        {
            name: "Vue.js",
            short:
                "Main tool for creating front end applications. Good experience in implementing a project from zero to deployment."
        },
        {
            name: "Java",
            short:
                "I wrote some Java for some university courses. Don't ask me to write Java, it is here only for an even number."
        },
        {
            name: "Elixir",
            short:
                "We built some simple API for our university project, using it with Phoenix for quick setup of routers, controllers and model. Pretty nifty."
        },
        {
            name: "F#",
            short:
                "I have learnt some basics for the `Advanced programming` course. Love it the most from all FP languages I tried."
        },
        {
            name: "R",
            short:
                "I have used it a lot for the Data Mining course (not because I love it, just because we had a lot of homeworks)."
        }
    ],
    words: ["Blessed saints", "Budha wearing gravity shoes"],
    data() {
        const i = Math.floor(Math.random() * this.$options.words.length);
        return {
            active: 0,
            wowWord: this.$options.words[i]
        };
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
            border-color: var(--show-more-accent);
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
    .skills-grid > li {
        opacity: 0;
        transform: translate3d(-20px, 50px, 0) scale(0.9);
    }
}
.show-more-leave-active,
.show-more-enter-active {
    transition: background-color 0.7s, opacity 0.3s;
    > header {
        transition: border-color 0.7s;
        p {
            transition: opacity 0.3s, filter 0.7s 0.2s;
        }
    }
    @for $i from 1 through 8 {
        .skills-grid > li:nth-child(#{$i}) {
            transition-delay: #{$i * 0.06}s;
        }
    }
}
@media screen and (max-width: 600px) {
    .about {
        padding: 0 1rem;
        perspective: 2000px;
    }
}
</style>
