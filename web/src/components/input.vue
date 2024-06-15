<template>
  <div class="input row center middle" :class="error === undefined ? '' : error ? 'error' : 'ok'">
    <label class="row center middle" :for="id">
      {{ name }}:
    </label>
    <input v-if="type !== 'color'" :type="type" :id="id" :value="modelValue" @input="(e) => updateValue(e)" :placeholder="placeholder">
    <div class="color row center middle" v-else-if="type === 'color'">
      <input type="text" :value="modelValue" @input="(e) => updateValue(e)" :placeholder="placeholder">
      <input type="color" :id="id" :value="modelValue" @input="(e) => updateValue(e)" :placeholder="placeholder">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: () => Math.random().toString(36).substring(7),
    },
    type: {
      type: String,
      default: "text",
    },
    name: String,
    placeholder: String,
    modelValue: {
      default: "",
      required: true
    },
    error: {
      type: Boolean,
      default: undefined
    }
  },
  methods: {
    updateValue(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  },
}
</script>

<style lang="scss" scoped>
.input {
  height: 32px;
  background: var(--input-name-color);
  border: solid transparent 1px;
  transition: border 100ms ease-in-out;

  label {
    min-width: 60px;
    height: 100%;
    padding: 0 10px;
    margin: 0;
    color: var(--title-color);
  }
  input {
    height: 100%;
    flex: 1;
    padding: 0 5px;
    border: none;
    background: var(--input-background-color);
    outline: none;
    font-size: 14px;
    color: var(--text-color);
  }
  .color {
    flex: 1;
    height: 32px;
    background: var(--input-background-color);
  }

  &:focus-within {
    border: solid var(--input-border-color) 1px;
    transition: border 50ms ease-in-out;
  }
  &.ok {
    border: solid var(--color-green) 1px;
    transition: border 50ms ease-in-out;
  }
  &.error {
    border: solid var(--color-red) 1px;
    transition: border 50ms ease-in-out;
  }
}
</style>