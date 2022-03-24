<script>
  import FieldWrapper from "./FieldWrapper.svelte";
  export let value,
    label,
    description,
    inputAttrs,
    type = "text";

  function typeAction(node) {
    node.type = type;
  }
</script>

<FieldWrapper {label} {description}>
  <input use:typeAction name={label} bind:value {...inputAttrs} />
</FieldWrapper>

<style>
  input {
    width: 100%;
    padding: 0.5rem;
    border-width: 1px;
    border-radius: 0.25rem;
  }
  input:disabled {
    color: #666;
  }
</style>
