<template>
    <section class="page-main">
        <h1 class="heading">
            <span v-for="({ l, style }, i) in heading" :key="i" :style="style">{{ l }}</span>
        </h1>
        <p class="desc">
            <b>{{ adj }}</b> frontend developer</p>
        <div class="social">
            <a v-for="({href, svg}, i) in $options.links" :key="i" :href="href" rel="noopener" target="_blank" class="link">
                <component :is="svg" />
            </a>
        </div>
    </section>
</template>

<script>
import f from "@/assets/svg/f.svg";
import t from "@/assets/svg/t.svg";
import git from "@/assets/svg/git.svg";
import linkedin from "@/assets/svg/linkedin.svg";

export default {
    adjs: [
        "Eager",
        "Passionate",
        "Clever",
        "Keen",
        "Smart",
        "Resolute",
        "Enthusiastic"
    ],
    links: [
        {
            href: "https://github.com/LexSwed",
            svg: git
        },
        {
            href: "https://www.linkedin.com/in/lexswed/",
            svg: linkedin
        },
        {
            href: "https://facebook.com/lexswed",
            svg: f
        },
        {
            href: "https://twitter.com/lexswed",
            svg: t
        }
    ],
    data() {
        return {
            randomNumber: 0
        };
    },
    props: ["scroll", "scrollHeight"],
    mounted() {
        this.interval = setInterval(this.setRandomNumber, 2600);
    },
    computed: {
        adj() {
            return this.$options.adjs[this.randomNumber];
        },
        heading() {
            return "alexander swed".split("").reduce((res, el, i) => {
                let animationDelay = `${Math.random() * 2}s`;
                let animationDuration = `${Math.random() * 3}s`;
                res.push({
                    l: el,
                    style: { animationDelay, animationDuration }
                });
                return res;
            }, []);
        }
    },
    methods: {
        setRandomNumber() {
            this.randomNumber = Math.floor(
                Math.random() * this.$options.adjs.length
            );
        }
    },
    /* components: {
        f,
        t,
        git,
        linkedin
    }, */
    beforeDestroy() {
        clearInterval(this.interval);
    }
};
</script>

<style lang="scss">
.page-main {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-flow: column nowrap;
    min-height: 500px;
    background-color: transparent;
    > * {
        display: block;
        width: 100%;
        position: relative;
    }
}

.main-enter-active {
    transition: opacity 0.8s;
    .heading,
    .social,
    .desc {
        transition: transform 1s, opacity 0.6s;
    }
}
.main-enter {
    .heading {
        transform: translateY(-30px);
    }
    .desc {
        opacity: 0;
    }
    .social {
        transform: translateY(40px);
    }
}

.about-leave-active,
.showcase-leave-active,
.main-leave-active {
    transition: transform 0.5s, opacity 0.5s;
    .heading,
    .social,
    .card-empty,
    .card-promise {
        transition: transform 0.4s;
    }
    &.about {
        transition: opacity 0.8s;
    }
    .about-main,
    .about-main ~ * {
        transition: opacity 0.6s, transform 1s;
    }
}

.showcase-leave-to,
.about-leave-to,
.main-leave-to {
    opacity: 0;
    .heading {
        transform: translateY(-30px);
    }
    .social {
        transform: translateY(40px);
    }
    .card-empty {
        transform: translateY(-100px);
    }
    .card-promise {
        transform: translateY(200px);
    }
    .about-main {
        opacity: 0;
        transform: translate3d(0, -350px, -100px);
        & ~ * {
            opacity: 0;
            transform: translateY(150px);
        }
    }
}
.heading {
    font-size: 7rem;
    margin: 10% 4rem 0 0;
    text-align: right;
    transition: color 0.4s;
    color: var(--accent);
    font-family: "Dosis", sans-serif;
    > span {
        opacity: 0;
        animation: fadeIn 3s forwards;
    }
}

.desc {
    font-size: 3rem;
    text-align: right;
    padding: 0;
    margin: 0 4rem 0 0;
    margin-top: 1rem;
    color: var(--text-color);
}

.social {
    display: flex;
    justify-content: center;
    flex-flow: row nowrap;
    position: absolute;
    bottom: 0;
}

.link {
    position: relative;
    padding: 10px;
    margin: 10px;
    display: inline-block;
    width: 50px;
    height: 50px;
}

.link:hover svg {
    fill: var(--accent);
}

.link svg {
    width: 100%;
    height: 100%;
    fill: var(--text-color);
    transition: fill 0.4s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@media screen and (max-width: 760px) {
    .heading,
    .desc {
        margin-right: 5px;
    }
    .heading {
        font-size: 5rem;
    }
    .desc {
        font-size: 2.4rem;
    }
}

@media screen and (max-width: 600px) {
    .page-main {
        min-height: 400px;
    }
    .container {
        padding-right: 10px;
    }
}
</style>
