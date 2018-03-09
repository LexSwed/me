<template>
    <article class="s-card">
        <header>Education:</header>
        <ul class="edu">
            <li>
                <div>Applied Math <span title="Dates when I knew this speciality">(2012-2016)</span></div>
                <a href="https://snu.edu.ua/en/" target="_blank">Volodymyr Dahl East Ukrainian National University</a>
            </li>
            <li>
                <div>Software Engineering <span title="Dates when I knew this speciality">(2017-2019)</span></div>
                <a href="https://www.ut.ee/en" target="_blank">University of Tartu</a>
            </li>
        </ul>
    </article>
</template>

<style lang="scss">
.edu {
    li {
        div:first-child {
            font-size: 24px;
        }
        a {
            color: var(--accent);
            font-size: 18px;
            transition: filter 0.4s;
            filter: brightness(1.2);
            &:hover {
                filter: none;
            }
        }
    }
}
</style>
