<template>
  <div :class="error === undefined ? '' : error ? 'error' : 'ok'">
    <label :for="id">
      {{ name }}:
    </label>
    <input :type="type" :id="id" :value="modelValue" @input="(e) => updateValue(e)" :placeholder="placeholder">
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
div {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background: var(--input-name-color);
  border: solid transparent 1px;
  transition: border 100ms ease-in-out;

  label {
    min-width: 60px;
    height: 100%;
    padding: 0 10px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
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