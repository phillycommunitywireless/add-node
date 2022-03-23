<script>
  import FieldWrapper from "./FieldWrapper.svelte";
  export let value,
    label,
    description,
    items = [],
    required = true;
</script>

<FieldWrapper {label} {description}>
  <select id={label} name={label} bind:value {required}>
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
