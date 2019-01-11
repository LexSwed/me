import f from "../assets/social/f.svg?inline";
import t from "../assets/social/t.svg?inline";
import git from "../assets/social/git.svg?inline";
import linkedin from "../assets/social/linkedin.svg?inline";
import dev from "../assets/social/dev.svg?inline";

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
