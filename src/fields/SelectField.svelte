<script>
  export let label, options;
</script>

<label>
  {label}:&nbsp;
  <select name={label}>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
</label>
