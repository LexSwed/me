<template>
    <section class="showcase">
    </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.showcase {
    &-enter {
        transform: translateY(100px);
        opacity: 0;
        .card-promise {
            transform: translateY(300px);
        }
    }
    &-enter-active {
        transition: transform 1s ease, opacity 0.4s;
        .card-promise {
            transition: transform 1s;
        }
    }
}

@media screen and (max-width: 600px) {
}
</style>
