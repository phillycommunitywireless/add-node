<script>
  export let label, emoji, options;
</script>

<label for={label}>
  {#if emoji}
    <span aria-hidden>{emoji}</span>
  {/if}
  {label}
</label>
<select name={label}>
  {#each options as option}
    <option value={option.value}>{option.name}</option>
  {/each}
</select>

<style>
  label {
    font-size: 0.9em;
    color: #888;
    padding: 5px 0;
  }

  select {
    width: 100%;
  }
</style>
