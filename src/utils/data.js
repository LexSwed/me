import f from "../assets/social/f.svg?inline";
import t from "../assets/social/t.svg?inline";
import git from "../assets/social/git.svg?inline";
import linkedin from "../assets/social/linkedin.svg?inline";
import dev from "../assets/social/dev.svg?inline";

export const techs = [
  {
    name: "HTML / CSS",
    short:
      "Confident in layout creation and styling. Use it a lot on daily basis."
  },
  {
    name: "Node.js",
    short:
      "Have a not long experience in creating services using Node.js (Express, Koa)."
  },
  {
    name: "React",
    short:
      "One of the main tools. Got a good experience rewriting a project from jQuery to React. Use actively, following all the recent news (are Hooks still a thing?) 🤔"
  },
  {
    name: "Vue.js",
    short:
      "Main tool for creating front end applications with vuex and vue-router. Had a great experience of creating an enterprise app from 0 💚"
  },
  {
    name: "Java",
    short:
      "I wrote some Java for some university courses. Don't ask me to write Java, it is here only for even parity 😅"
  },
  {
    name: "Elixir",
    short:
      "We built some simple API for our university project using Phoenix framework. Pretty nifty, like it 👍"
  },
  {
    name: "F#",
    short:
      "I've learnt some basics for the `Advanced programming` course. Love it the most from all the functional languages I tried ❤️"
  },
  {
    name: "R",
    short:
      "I have used it a lot for the Data Mining course (not because I love it, just because we had a lot of homeworks) 🙃"
  },
  {
    name: "TypeScript",
    short: "Main programming language for writing services."
  },
  {
    name: "Flutter/Dart",
    short:
      "Exploring Flutter. Feel pretty confident with Dart after reading whole documentation and code style guide. Flutter is awesome, OOP approach is 💩"
  },
  {
    name: "GraphQL",
    short:
      "Migrated one project with REST API to GraphQL, built simple one from scratch. Used Apollo on the server and on the client (with react-apollo and vue-apollo) 😍"
  },
  {
    name: "Docker",
    short:
      "Used actively within Pipedrive, during some university projects. Have surface understanding of what how it works. But it was enough so far."
  }
];

export const adjs = [
  "Eager",
  "Passionate",
  "Clever",
  "Keen",
  "Smart",
  "Enthusiastic"
];
export const links = [
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
  },
  {
    href: "https://dev.to/lexswed",
    svg: dev
  }
].map(el => ({
  ...el,
  delay: Math.random() * 0.5
}));
