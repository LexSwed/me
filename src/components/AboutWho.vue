<template>
    <div class="about-who">
        <img :src="imgMap['web-design']" :class="{'who-img-active': whoActive === 0}" />
        <img :src="imgMap['front-end']" :class="{'who-img-active': whoActive === 1}" />
        <h2>Who am I?</h2>
        <div class="who-container" @scroll="onScroll">
            <div class="who-back">
                <div class="who-block" v-for="{title}, i in who">
                    <h3 @click="whoActive = i" :class="{'back-active': whoActive !== i}">{{title}}</h3>
                </div>
            </div>
            <div :class="`who-inner who-inner-${whoActive}`">
                <div class="who-block" v-for="{title, short, content}, i in who" :key="i">
                    <h3>{{title}}</h3>
                    <h4>{{short}}</h4>
                    <p v-html="content" />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { whoDescription } from "./data/skills.js"
import html from "../assets/html.png";
import frontend from "../assets/frontend.png";

export default {
    data() {
        return {
            who: whoDescription,
            whoActive: 0,
            imgMap: {
                'web-design': html,
                'front-end': frontend
            }
        }
    },
    methods: {
        setActive(num) {
            this.whoActive = num;
        },
        onScroll(e) {
            let w = e.target.scrollWidth;
            let l = e.target.scrollLeft;
            if (this.whoActive === 0 && w - l < w / 2) this.whoActive = 1;
            else if (this.whoActive === 1 && w - l >= w / 2) this.whoActive = 0;
        }
    }
}

</script>
<style lang="scss">
.about-who {
    position: relative;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: var(--b-r);
    >h2 {
        position: relative;
        margin-bottom: 3rem;
    }
    >img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: var(--b-r);
        filter: var(--who-fitler);
        opacity: 1;
        transition: filter 0.6s ease, opacity 0.6s 0.2s ease, clip-path 0.8s 0s ease;
        z-index: 0;
        &:nth-child(1) {
            clip-path: inset(0 0 0 100%);
        }
        &:nth-child(2) {
            clip-path: inset(0 100% 0 0);
        }
        &.who-img-active {
            z-index: -1;
            transition: none;
            opacity: 1;
            clip-path: inset(0 0 0 0);
        }
    }
}

.who-container {
    height: 400px;
}

.who-back {
    position: absolute;
    display: flex;
    justify-content: space-around;
    flex-flow: row nowrap;
    align-items: center;
    height: 100%;
    width: 100%;
    color: var(--text-color);
    text-align: center;
    h3 {
        cursor: pointer;
        text-align: center;
        display: inline-block;
        border-bottom: 2px solid var(--text-color);
        padding: 8px 8px;
        opacity: 0;
        transition: opacity 0.2s ease;
    }
    .back-active {
        opacity: 1;
        transition-delay: 0.3s;
    }
}

.who-inner {
    display: flex;
    justify-content: space-around;
    flex-flow: row nowrap;
    height: 100%;
    width: 100%;
    transition: clip-path 0.8s ease, transform 0.8s ease;
    background-color: var(--who-inner-bg);
    a {
        color: var(--text-color);
    }
    &-0 {
        clip-path: inset(0px 52% 0px 2% round 2px);
    }
    &-1 {
        clip-path: inset(0px 2% 0px 52% round 2px);
    }
}

.who-block {
    width: 45%;
    height: 100%;
    padding: 15px;
    h3 {
        font-size: 2.2rem;
    }
    h4 {
        font-size: 1.8rem;
    }
    p {
        font-size: 1.6rem;
    }
}

@keyframes fadeInImg {
    from {
        transform: translate3d(-15px, -15px, -15px);
        opacity: 0;
    }
    to {
        transform: none;
        opacity: 1;
    }
}

@keyframes backImg {
    from {
        transform: translateX(0, 0, 0);
    }
    to {
        transform: translate3d(50px, 20px 0)
    }
}

@keyframes switchBlock {
    0% {
        clip-path: inset(0 52% 0 2% round 2px);
    }
    50% {
        clip-path: inset(44% 48% 44% 48% round 2px);
    }
    100% {
        clip-path: inset(0 2% 0 52% round 2px);
    }
}

@media screen and (max-width: 600px) {
    .about-who {
        overflow: hidden;
        margin-bottom: 1rem;
        padding-bottom: 0;
        >img {
            width: auto;
        }
        .who-container {
            width: calc(100% + 8rem);
            margin: 0 -3rem;
            height: auto;
            overflow: auto;
        }
        .who-block {
            padding: 1rem;
            width: calc(100vw - 4rem);
            h3 {
                font-size: 3.5rem;
            }
            h4 {
                font-size: 2.4rem;
            }
            p {
                font-size: 2.4rem;
            }
        }
        .who-back {
            display: none;
        }
        .who-inner {
            width: 200vw;
            &-0 {
                clip-path: none;
            }
            &-1 {
                clip-path: none;
            }
        }
    }
}
</style>
