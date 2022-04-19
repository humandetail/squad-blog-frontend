<template>
  <h3 class="skeleton-title" />
</template>

<style lang="scss">
.skeleton-title {
  width: 100%;
  height: .2rem;
  margin-top: .2rem;
  background: linear-gradient(90deg,rgba(190,190,190,.2) 25%,rgba(129,129,129,.24) 37%,rgba(190,190,190,.2) 63%);
  background-size: 400% 100%;
  border-radius: .04rem;
  animation: skeleton-loading 1.4s ease infinite;
}

@keyframes skeleton-loading {
  from {
    background-position:100% 50%;
  }
  to {
    background-position:0 50%
  }
}
</style>
