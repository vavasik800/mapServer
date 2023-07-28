<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid p-0 ps-4">
      <a class="navbar-brand ms-2" href="#">
        <img :src="pathImg" alt="Logo" width="30" height="24"
             class="d-inline-block align-text-top">
        {{ nameProgram }}
      </a>
      <div class="navbar-header navbar-right">
        <slot name="right-navbar"></slot>
      </div>
    </div>
  </nav>


</template>

<script>
export default {
  name: "Header",
  props: {
    nameProgram: String,
    pathImg: String,
  },
}
</script>

<style scoped>

</style>