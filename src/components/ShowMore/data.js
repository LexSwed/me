import CanvasVideo from "@/assets/video/Canvas.webm";
import ComponentsVideo from "@/assets/video/Components.webm";
import ComponentsVideo2 from "@/assets/video/Components2.webm";
import SWVideo from "@/assets/video/SW.webm";

export const techs = [
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
            "One of the main tools. I have a good experience rewriting a project from jQuery to React."
    },
    {
        name: "Vue.js",
        short:
            "Main tool for creating front end applications. Had a great experience of creating an enterprise app from 0."
    },
    {
        name: "Java",
        short:
            "I wrote some Java for some university courses. Don't ask me to write Java, it is here only for even parity."
    },
    {
        name: "Elixir",
        short:
            "We built some simple API for our university project using Phoenix framework. Pretty nifty."
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
];

export const cases = [
    {
        name: "Script Designer for call agents",
        deps: "vue, vuex, vue-router, axios, vue-slicksort, vue-dragscroll",
        videos: [
            {
                text:
                    "Canvas drawings, animations and performant calculations with pure javascript",
                src: CanvasVideo
            },
            {
                text:
                    "A solid set of reusable and highly customizable components",
                src: ComponentsVideo
            },
            {
                text: "Fully featured Vuex usage",
                src: ComponentsVideo2
            },
            {
                text: "Service Workers for heavy computations",
                src: SWVideo
            }
        ]
    }
];
