<template>
  <div :class="'alert alert-'.concat(color)" role="alert" size="">
    <div class="row float-end">
      <button type="button"
              class='btn btn-link p-2 w-auto'
              @click="closeAlert"
      >
        <font-awesome-icon icon="fa-solid fa-xmark" style="color: red"/>
      </button>
    </div>
    <div class="row">
       {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  name: "alertMessage",
  props: {
    content: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary'
    },

  },
  methods: {
    closeAlert() {
      this.$emit('close')
    },
  }
}
</script>

<style scoped>

</style>