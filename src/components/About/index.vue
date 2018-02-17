<template>
	<section class="about">
	</section>
</template>

<script>
export default {};
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
}

@media screen and (max-width: 600px) {
    .about {
        padding: 0 1rem;
        perspective: 2000px;
    }
}
</style>
