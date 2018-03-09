<template>
	<div class="show-more">
        <welcoming-header />
        <section>
            <techs />
            <education />
            <showcase />
        </section>
	</div>
</template>

<script>
import WelcomingHeader from "./Header";
import Techs from "./Techs";
import Education from "./Education";
import Showcase from "./Showcase";

export default {
    components: {
        WelcomingHeader,
        Techs,
        Education,
        Showcase
    }
};
</script>

<style lang="scss">
.show-more {
    color: var(--text-color);
    min-height: 600px;
    top: -5vh;
}
.s-card {
    transition: box-shadow 0.4s, transform 0.4s;
    margin-bottom: 20px;
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
}

.show-more-enter,
.show-more-leave-to {
    opacity: 0;
    > header {
        border-color: white;
        p {
            opacity: 0;
            filter: grayscale(1);
        }
    }
    .s-card {
        opacity: 0;
        transform: translateY(10px);
    }
    .techs > li,
    .cases > li {
        opacity: 0;
        transform: translate3d(-20px, 50px, 0) scale(0.9);
    }
}
.show-more-leave-active,
.show-more-enter-active {
    transition: all 1s, opacity 0.3s;
    > header {
        p {
            transition: opacity 0.3s, filter 0.7s 0.2s;
        }
    }
    .s-card {
        transition: opacity 0.4s, transform 0.8s;
    }
    @for $i from 1 through 4 {
        .s-card:nth-child(#{$i}) {
            transition-delay: #{$i * 0.3 + 0.2}s;
        }
    }
    @for $i from 1 through 8 {
        .techs > li:nth-child(#{$i}) {
            transition-delay: #{$i * 0.07 + 0.5}s;
        }
    }
}
@media screen and (max-width: 600px) {
}
</style>
