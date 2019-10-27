<template>
	<section class="articles">
		<svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
			<path fill="none" d="M0 0h24v24H0V0z" />
			<path fill="#fff" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
		</svg>
		<dev-article v-for="article in articles" :key="article.id" v-bind="article" />
	</section>
</template>

<script>
import DevArticle from './Article';
import { devto } from '../utils/api';

export default {
	data() {
		return {
			articles: []
		};
	},
	mounted() {
		this.loadArticels();
	},
	methods: {
		async loadArticels() {
			this.articles = await devto.articles();
		}
	},
	components: {
		DevArticle
	}
};
</script>

<style lang="postcss">
.articles {
	margin-top: 80px;
}
.arrow {
	display: block;
	margin: 20px auto;
	animation: glow 2s ease-in infinite alternate;
	transition: 0.4s;
	&:hover {
		animation: none;
		opacity: 1;
	}
}

@keyframes glow {
	0% {
		opacity: 0.4;
	}
	100% {
		opacity: 1;
	}
}
</style>
