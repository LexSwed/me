<template>
  <article class="s-card">
    <header>Education:</header>
    <ul>
      <li>
        <div class="edu-item__title">
          Applied Math
          <span title="Dates when I knew this speciality">(2012-2016)</span>
        </div>
        <a
          href="https://snu.edu.ua/en/"
          target="_blank"
          class="edu-item__link"
        >Volodymyr Dahl East Ukrainian National University</a>
      </li>
      <li>
        <div class="edu-item__title">
          Software Engineering
          <span>(2017-2019)</span>
        </div>
        <a href="https://www.ut.ee/en" class="edu-item__link" target="_blank">University of Tartu</a>
      </li>
    </ul>
  </article>
</template>

<style lang="postcss">
.edu-item__title {
  font-size: 24px;
}
.edu-item__link {
  color: var(--accent);
  font-size: 18px;
  transition: filter 0.4s;
  filter: brightness(1.2);
  &:hover {
    filter: none;
  }
}
</style>
