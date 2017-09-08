<template>
	<section class="about">
		<div class="about-main" @mousemove="changePerspective" @mouseleave="() => {this.x = 50; this.y = 50}" :style="{perspectiveOrigin: `${x}% ${y}%`}">
			<div class="about-img">
				<img src="../assets/1.jpg" rel="preload" />
			</div>
			<div class="about-info">
				<h2>Oleksandr Shvechykov</h2>
				<h5>Front-end Developer, Web UI/UX Designer</h5>
				<p>@lexswed</p>
				<p>{{ this.x }}</p>
				<p>{{ this.y }}</p>
			</div>
		</div>
		<about-who />
		<about-exp />
		<about-edu />
	</section>
</template>

<script>
import AboutWho from "./AboutWho"
import AboutExp from "./AboutExp"
import AboutEdu from "./AboutEdu"

export default {
	name: 'about',
	data() {
		return {
			isHired: false,
			x: 50,
			y: 50
		}
	},
	components: {
		'about-who': AboutWho,
		'about-exp': AboutExp,
		'about-edu': AboutEdu
	},
	mounted() {
		window.addEventListener('deviceorientation', this.mobileChangePerspective);
	},
	beforeDestroy() {
		window.removeEventListener('deviceorientation', this.mobileChangePerspective)
	},
	methods: {
		changePerspective(e) {
			this.x = e.clientX / 8;
			this.y = e.clientY / 4;
		},
		mobileChangePerspective(e) {
			const { beta: y, gamma: x } = e;
			this.x = -x * 3 + 380; this.y = y * 3;
		}
	}
}
</script>

<style lang="scss">
.about {
	color: var(--text-color);
	min-height: 600px;
	padding: 0 20px;
	&-enter {
		opacity: 0;
		background-color: transparent;
		.about-img img {
			clip-path: circle(0% at 10% 10%);
		}
		.about-info {
			transform: translateX(120px);
		}
		.about-who {
			transform: translateY(300px);
		}
	}
	&-enter-active {
		transition: background-color 0.7s, opacity 0.3s, clip-path 0.9s;
		.about-img img {
			transition: clip-path 0.9s;
		}
		.about-info {
			transition: transform 0.9s;
		}
		.about-who {
			transition: transform 0.9s;
		}
	}
	&-main {
		position: relative;
		z-index: 100;
		padding: 20px 0;
		margin-left: 20px;
		contain: style;
		backface-visibility: hidden;
		transition: perspective-origin 0.2s linear;
		&:hover {
			.about-img {
				transition: transform 1s;
				transform: translate3d(-15px, -25px, -20px);
				img {
					transition: filter 1s;
					filter: var(--about-img-filter);
				}
			}
			.about-info {
				transition: transform 1s;
				transform: translate3d(-120px, 20px, 30px);
			}
		}
	}
	.about-info h5 {
		font-size: 2.4rem;
		margin: 0.6rem 0;
		white-space: nowrap;
	}
	&-img {
		height: 230px;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		overflow: hidden;
		transform: translate3d(0, -20px, 30px);
		transition: transform 1.6s, filter 0.6s;
		border-radius: var(--b-r);
		filter: drop-shadow(var(--about-img-shadow));
		img {
			max-height: 100%;
			transition: clip-path 0.6s, filter 0.6s;
			clip-path: circle(100% at 10% 50%);
			transform: translateZ(10px);
		}
	}
	&-info {
		position: absolute;
		top: 15%;
		left: 50%;
		width: auto;
		display: inline-block;
		transform: translateX(-15px);
		transition: transform 1.6s ease-out, opacity 0.4s;
		p {
			text-align: right;
			font-size: 1.5rem;
		}
	}
}

.about-block {
	padding: 20px 20px 10px;
	background-color: var(--main);
	border-radius: var(--b-r);
	box-shadow: var(--block-shadow);
	margin-bottom: 20px;
}

@media screen and (max-width: 600px) {
	.about {
		padding: 0 1rem;
		.about-main {
			padding: 0;
			pointer-events: none;
			margin: 0;
		}

		.about-img {
			transform: translate3d(0, -10px, -20px);
			&:hover {
				transition: none;
			}
			img {
				filter: var(--about-img-filter);
				&:hover {
					transition: none;
				}
			}
		}
		.about-info {
			top: 0;
			left: 0;
			padding: 0.5rem;
			transform: translate3d(0, 0, 10px);
			&:hover {
				transition: none;
			}
			h5,
			p {
				white-space: normal;
			}
		}
	}
}
</style>
