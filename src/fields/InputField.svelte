<script>
  import FieldWrapper from "./FieldWrapper.svelte";
  export let value,
    label,
    description,
    placeholder,
    type = "text";

  function typeAction(node) {
    node.type = type;
  }
</script>

<FieldWrapper {label} {description}>
  <input use:typeAction name={label} bind:value {placeholder} />
</FieldWrapper>

<style>
  input {
    width: 100%;
    padding: 0.5rem;
    border-width: 1px;
    border-radius: 0.25rem;
  }
</style>
