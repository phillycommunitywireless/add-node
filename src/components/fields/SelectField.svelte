<script>
  import FieldWrapper from "./FieldWrapper.svelte";
  import { handleChange } from "../../lib/store";
  export let name,
    value,
    description,
    items = [];
</script>

<FieldWrapper {name} {description}>
  <select id={name} {name} bind:value on:change={handleChange}>
    {#each items as item}
      <option value={item.value}>{item.label}</option>
    {/each}
  </select>
</FieldWrapper>

<style>
  select {
    width: 100%;
    background-color: White;
    padding-right: 0.5rem;
    border-radius: 0.2em;
  }
</style>
