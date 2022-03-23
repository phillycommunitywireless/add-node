<script>
  export let label, description;
</script>

<div>
  <!-- svelte-ignore a11y-label-has-associated-control-->
  <label name={label}>
    {label}
  </label>
  {#if description}
    <span>{description}</span>
  {/if}
  <slot />
</div>

<style>
  div {
    margin-bottom: 10px;
  }
  label {
    font-weight: bold;
    padding: 0.5rem 0;
  }
  span {
    display: inline-block;
    color: gray;
    font-size: 1em;
    padding-bottom: 0.6rem;
  }
</style>
