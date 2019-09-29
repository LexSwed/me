<template>
	<section class="welcome">
		<h1 class="heading">
			<span v-for="({ l, style }, i) in heading" :key="i" :style="style">{{ l }}</span>
		</h1>
		<p class="desc">
			<b>{{ adj }}</b> software engineer
		</p>
		<div class="links">
			<a
				v-for="({ href, svg, delay }, i) in $options.links"
				:key="i"
				:href="href"
				rel="noopener"
				target="_blank"
				class="link"
				:style="`transition-delay: ${delay}s;`"
			>
				<component :is="svg" />
			</a>
		</div>
	</section>
</template>

<script>
import { adjs, links } from '../utils/data.js';

export default {
	adjs,
	links,
	data() {
		return {
			randomNumber: 0
		};
	},
	beforeMount() {
		this.interval = setInterval(this.setRandomNumber, 2000);
	},
	computed: {
		adj() {
			return this.$options.adjs[this.randomNumber];
		},
		heading() {
			return 'alexander swed'.split('').map(l => {
				const animationDelay = `${Math.random() * 2}s`;
				const animationDuration = `${Math.random() * 3}s`;
				return {
					l,
					style: { animationDelay, animationDuration }
				};
			});
		},
		path() {
			return window.location.pathname;
		}
	},
	methods: {
		setRandomNumber() {
			this.randomNumber = Math.floor(Math.random() * this.$options.adjs.length);
		}
	},
	beforeDestroy() {
		clearInterval(this.interval);
	}
};
</script>

<style lang="postcss">
.welcome {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-flow: column nowrap;
	min-height: 500px;
	margin-bottom: 40px;
	& > * {
		display: block;
		width: 100%;
		position: relative;
	}
}
.heading {
	font-size: 80px;
	margin: 10% 4rem 0 0;
	text-align: right;
	transition: color 0.4s;
	color: var(--accent);
	font-family: 'Dosis', sans-serif;
	letter-spacing: 1px;
	& > span {
		opacity: 0;
		animation: fade 3s forwards;
	}
}

.desc {
	font-size: 30px;
	text-align: right;
	padding: 0;
	margin: 10px 40px 0 0;
	color: var(--text-color);
}

.links {
	display: flex;
	justify-content: center;
	flex-flow: row nowrap;
	margin-top: auto;
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

.welcome-enter-active {
	transition: opacity 0.8s;
	& .heading,
	& .desc {
		transition: transform 0.8s, opacity 0.6s;
	}
	& .link {
		transition: transform 1s, opacity 0.5s;
	}
}
.welcome-enter {
	& .heading {
		transform: translateY(-20px);
	}
	& .desc {
		opacity: 0;
	}
	& .link {
		transform: translateY(40px);
	}
}

.welcome-leave-active {
	transition: transform 0.5s, opacity 0.5s;
	& .heading,
	& .link {
		transition: transform 0.3s;
	}
}

.welcome-leave-to {
	opacity: 0;
	& .heading {
		transform: translateY(-20px);
	}
	& .link {
		transform: translateY(40px);
	}
}

@media screen and (max-width: 760px) {
	.heading,
	.desc {
		margin-right: 5px;
	}
	.heading {
		font-size: 70px;
	}
	.desc {
		font-size: 24px;
	}
}

@media screen and (max-width: 500px) {
	.welcome {
		min-height: 400px;
	}
	.heading {
		font-size: 50px;
	}
	.container {
		padding-right: 10px;
	}
}
</style>
