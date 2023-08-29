<template>
  <div :class="'spinner-border '.concat(createCustomClass()) " role="status">
    <span class="visually-hidden">Загрузка...</span>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    color: {
      type: String,
      default: 'dark',
    },
    size: {
      type: String,
      default: '',
    }
  },
  methods: {
    createCustomClass() {
      let customClass = 'text-'.concat(this.color)
      customClass = this.size === '' ? customClass : customClass.concat(' spinner-border-').concat(this.size)
      return customClass
    }
}
}
</script>

<style scoped>

</style>