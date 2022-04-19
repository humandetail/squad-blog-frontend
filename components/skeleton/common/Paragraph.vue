<template>
  <ul class="skeleton-paragraph">
    <li />
    <li />
    <li />
  </ul>
</template>

<style lang="scss">
.skeleton-paragraph {
  margin-top: .48rem;

  li {
    width: 100%;
    height: .2rem;
    margin-top: .16rem;
    background: linear-gradient(90deg,rgba(190,190,190,.2) 25%,rgba(129,129,129,.24) 37%,rgba(190,190,190,.2) 63%);
    border-radius: .04rem;
    background: linear-gradient(90deg,rgba(190,190,190,.2) 25%,rgba(129,129,129,.24) 37%,rgba(190,190,190,.2) 63%);
    background-size: 400% 100%;
    border-radius: .04rem;
    animation: skeleton-loading 1.4s ease infinite;

    &:last-child {
      width: 60%;
    }
  }
}
</style>
