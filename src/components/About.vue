<template>
	<section class="about">
        <header>
            <p>
                Blessed saints! I am so glad <span class="about-accent">you</span> are here!<br>
                My real name is <span class="about-accent">Oleksandr Shvechykov</span>.
                I am from <span  class="about-accent">Ukraine</span> but currently I study in <span class="about-accent">Tartu</span>.
                I love front end a lot, but I was taught a bit <span class="about-accent">more</span>.
            </p>
        </header>
        <div class="s-card">
            <header>What you can ask me for:</header>
            <ul class="skills-grid" v-dragscroll>
                <li v-for="s in $options.skills" :key="s.name">
                    <div class="s-name">{{ s.name }}</div>
                    <div class="s-short">{{s.short}}</div>
                </li>
            </ul>
        </div>
	</section>
</template>

<script>
import { dragscroll } from "vue-dragscroll";

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
      name: "Java",
      short: "I wrote some Java for some university courses."
    },
    {
      name: "Elixir",
      short:
        "We built some simple API for our university project, using it with Phoenix for quick setup of routers, controllers and model. Pretty nifty."
    },
    {
      name: "React",
      short:
        "One of the main tools. I have a good experience rewriting a project from jQuery to React. I always keep an eye on latest news."
    },
    {
      name: "Vue.js",
      short:
        "Main tool for creating front end applications. Good experience in implementing a project from zero to deployment."
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
  data() {
    return {
      active: 0
    };
  },
  directives: { dragscroll }
};
</script>

<style lang="scss">
.about {
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
}
.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 8px;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  li {
    height: 100px;
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
      background: radial-gradient(rgba(255, 255, 255, 0.1), var(--about));
      transition: opacity 0.4s;
      opacity: 0.2;
    }
    &:hover {
      border-color: var(--about-accent);
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
.about-enter,
.about-leave-to {
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
    transform: translate3d(-20px, 50px, 0);
  }
}
.about-leave-active,
.about-enter-active {
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
