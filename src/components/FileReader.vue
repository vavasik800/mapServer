<template>
  <label class="text-reader">
    <div class="mb-3">
      <input class="form-control form-control-sm" id="formFileSm" type="file" ref="file" @change="fileUpload">
    </div>
  </label>
</template>

<script>
export default {
  name: "FileReader",
  props: {
    isFile: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    isFile (val, oldVal) {
      if (!val) this.$refs.file.value = null
    },
  },
  methods: {
    fileUpload(ev) {
      if (ev.target.files.length === 0) {
        this.$emit("load", '');
        this.$emit('update:isFile', false)
        return
      }
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = e => this.$emit("load", e.target.result);
      reader.readAsText(file);
      this.$emit('update:isFile', true)
    }
  }
}
</script>

<style scoped>

</style>