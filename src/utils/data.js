import f from '../assets/social/f.svg?inline';
import t from '../assets/social/t.svg?inline';
import git from '../assets/social/git.svg?inline';
import linkedin from '../assets/social/linkedin.svg?inline';
import dev from '../assets/social/dev.svg?inline';
import gitlab from '../assets/social/gitlab.svg?inline';

export const daily = [
	{
		name: 'HTML / CSS',
		short: 'Confident in layout creation and styling using latest CSS features'
	},
	{
		name: 'React',
		short:
			'One of the main libraries I use daily at work or side projects, following all the recent features (are Hooks still a thing 🤔?)'
	},
	{
		name: 'Vue.js',
		short: 'Second library of choice (second only until Vue 3 with hooks 💚), used on data-rich projects.'
	},
	{
		name: 'Node.js',
		short: 'Main Back End tool used with Koa or Express.'
	},
	{
		name: 'TypeScript',
		short: 'Main programming language for writing services.'
	},
	{
		name: 'CSS-in-JS',
		short:
			'Not a big fan of it as I never had issues with css-modules, but developed a component library using styled-components'
	},
	{
		name: 'Optimizing for scale',
		short:
			'Configured, upgraded webpack setups for many different projects. Worked on a tool to unify the setup for many different services.'
	},
	{
		name: 'With UX in mind',
		short: `Not a designer per se, but constantly question things I developed from a user perspective. Constantly read resources on this topic.`
	}
];

export const using = [
	{
		name: 'GraphQL',
		short: 'Used on every side project as an extremely nice piece of tech with Apollo/GraphQL-Yoga'
	},
	{
		name: 'Docker',
		short:
			'Use actively, wrote a couple of Dockerfiles and compose. Have a bit of understanding of how it works. But it was enough so far.'
	},
	{
		name: 'CI/CD',
		short: 'Configured some Jenkins with GitHub hooks, used Gitlab CI to deliver my component library.'
	},
	{
		name: 'Flutter/Dart',
		short: 'Exploring Flutter with multiple homemade projects, Dart feels nice even being OOP.'
	}
];

export const adjs = [
	'Eager',
	'Passionate',
	'Keen',
	'Enthusiastic',
	'Thought',
	'Experienced',
	'Self-driven',
	'Motivated',
	'Team-first',
	'Maintainability oriented',
	'Performance focused'
];

export const links = [
	{
		href: 'https://github.com/LexSwed',
		svg: git
	},
	{
		href: 'https://gitlab.com/LexSwed',
		svg: gitlab
	},
	{
		href: 'https://www.linkedin.com/in/lexswed/',
		svg: linkedin
	},
	{
		href: 'https://facebook.com/lexswed',
		svg: f
	},
	{
		href: 'https://twitter.com/lexswed',
		svg: t
	},
	{
		href: 'https://dev.to/lexswed',
		svg: dev
	}
].map(el => ({
	...el,
	delay: Math.random() * 0.8
}));
