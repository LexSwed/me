<template>
  <div class="show-more">
    <welcoming-header />
    <section>
      <techs />
      <education style="transition-delay: 0.4s;" />
    </section>
  </div>
</template>

<script>
import WelcomingHeader from "../components/Header";
import Techs from "../components/Techs";
import Education from "../components/Education";

export default {
  components: {
    WelcomingHeader,
    Techs,
    Education
  }
};
</script>

<style lang="postcss">
.show-more {
  color: var(--text-color);
  min-height: 600px;
  top: -5vh;
}
.s-card {
  transition: box-shadow 0.4s, transform 0.4s;
  margin-bottom: 20px;
  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}

.show-more-enter,
.show-more-leave-to {
  opacity: 0;
  & > header {
    border-color: white;
    & p {
      opacity: 0;
      filter: grayscale(1);
    }
  }
  & .s-card {
    opacity: 0;
    transform: translateY(10px);
  }
}
.show-more-leave-active,
.show-more-enter-active {
  transition: all 1s, opacity 0.3s;
  & > header {
    & p {
      transition: opacity 0.3s, filter 0.7s 0.2s;
    }
  }
  & .s-card {
    transition: opacity 0.4s, transform 0.8s;
  }
}
</style>
