<script>
  export let value,
    label,
    emoji,
    type = "text";

  function typeAction(node) {
    node.type = type;
  }
</script>

<label class="label" for={label}>
  {#if emoji}
    <span aria-hidden>{emoji}</span>
  {/if}
  {label}
</label>
<input use:typeAction name={label} bind:value />

<style>
  .emoji {
  }
  label {
    font-size: 0.9em;
    color: #888;
    padding: 5px 0;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    border-width: 1px;
    border-radius: 0.25rem;
  }
</style>
