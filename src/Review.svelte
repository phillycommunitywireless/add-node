<script>
  export let formData;
</script>

<div class="review">
  {#each Object.entries(formData) as [name, value]}
    <h2>{name}</h2>
    <p>{value}</p>
  {/each}
</div>

<style>
  h2 {
    font-size: 1em;
  }
  h2,
  p {
    margin: 0.5em 0;
  }
</style>
