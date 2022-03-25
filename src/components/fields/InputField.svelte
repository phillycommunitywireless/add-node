<script>
  import FieldWrapper from "./FieldWrapper.svelte";
  import { handleChange } from "../../lib/store";

  export let value,
    name,
    description,
    inputAttrs,
    type = "text";

  const typeAction = (node) => (node.type = type);
</script>

<FieldWrapper {name} {description}>
  <input
    on:change={handleChange}
    use:typeAction
    bind:value
    {name}
    {...inputAttrs}
  />
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
