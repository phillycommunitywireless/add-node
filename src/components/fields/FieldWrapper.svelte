<script>
  import { formFields } from "../../lib/store";
  export let name, description;

  const field = formFields.find((field) => field.key == name);
</script>

<div>
  <!-- svelte-ignore a11y-label-has-associated-control-->
  <label>
    <span class="label">{field.label}</span>
    {#if description}
      <span class="description">{description}</span>
    {/if}
    <slot {field} />
  </label>
</div>

<style>
  span.label {
    display: block;
    font-weight: bold;
    padding: 0.5rem 0;
  }
  span.description {
    display: inline-block;
    color: gray;
    font-size: 1em;
    padding-bottom: 0.6rem;
  }
  div {
    margin-bottom: 10px;
  }
</style>
