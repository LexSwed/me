<template>
    <header>
        <p>
            {{ wowWord }}! I am so glad <span class="accent-color">you</span> are here!<br>
        </p>
        <p>
            My real name is <span class="accent-color">Oleksandr Shvechykov</span>.
            I am from <span class="accent-color">Ukraine</span> but currently I study in <span class="accent-color">Tartu</span>.
            I love front end a lot, but I was taught a bit <span class="accent-color">more</span>.
        </p>
    </header>
</template>

<script>
export default {
    words: [
        "Blessed saints",
        "Budha wearing gravity shoes",
        "Functional JavaScript",
        "Holly Abramov's glassess",
        "Colorful neckties of Saakashvili"
    ],
    data() {
        const i = Math.floor(Math.random() * this.$options.words.length);
        return {
            wowWord: this.$options.words[i]
        };
    }
};
</script>

<style lang="scss">
.show-more > header {
    width: 100%;
    position: relative;
    padding: 0 60px;
    margin-bottom: 40px;
    p {
        font-size: 24px;
        padding: 0;
        margin: 0;
    }
}
</style>
