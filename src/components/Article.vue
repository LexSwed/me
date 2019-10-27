<template>
	<article :class="$style.card" :style="`--bg-url: url(${cover_image});`">
		<div :class="$style.cover">
			<a :href="url" target="_blank" :class="$style.link">
				<span :class="$style.title">{{ title }}</span>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path fill="none" d="M0 0h24v24H0V0z" />
					<path
						fill="#fff"
						d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
					/>
				</svg>
			</a>

			<span :class="$style.date">
				{{ readable_publish_date }}
			</span>
			<p>{{ description }}</p>
		</div>
	</article>
</template>

<script>
export default {
	props: {
		url: String,
		cover_image: String,
		title: String,
		description: String,
		readable_publish_date: String
	},
	inheritAttrs: false
};
</script>

<style lang="postcss" module>
.card {
	position: relative;
	background-color: #fff;
	max-width: 600px;
	margin: 0 auto;
	border-radius: 10px;
	margin-bottom: 20px;
	background: center/cover no-repeat var(--bg-url);
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 8px rgba(0, 0, 0, 0.4);
}
.cover {
	padding: 20px;
	background-color: rgba(0, 0, 0, 0.5);
	color: #fff;
	display: flex;
	flex-flow: column nowrap;
	align-items: flex-start;
	min-height: 160px;
}
.link {
	all: unset;
	cursor: pointer;
	margin-bottom: 10px;
	& svg {
		height: 14px;
		width: 14px;
		margin-left: 5px;
		transition: 0.3s;
		opacity: 0;
		transform: translateX(-50%);
	}
	&:hover svg {
		opacity: 1;
		transform: none;
	}
}
.title {
	font-size: 24px;
}
.date {
	font-size: 12px;
}

@media screen and (max-width: 600px) {
	.link svg {
		opacity: 1;
		transform: none;
	}
}
</style>
