<script>
  import { form, formFields, errors } from "../lib/store";

  $: console.log({ $form, $errors });

  const isNonEmpty = (error) => {
    return (
      error &&
      (Array.isArray(error) ? error?.filter((s) => s != "")?.length : error)
    );
  };

  $: displayData = formFields.map(({ key, label, display }) => {
    const formValue = $form[key];
    const value = display(formValue);
    const unset = !isNonEmpty(formValue);
    const error = $errors[key];
    return {
      value,
      label,
      unset,
      error,
    };
  });
</script>

<div>
  <h1>Is this correct?</h1>
  <table>
    {#each displayData as { error, label, value, unset }}
      <tr class:error={isNonEmpty(error)}>
        <td class="label">{label} </td>
        <td class="value">
          {#if isNonEmpty(error)}
            <span class="error">{error}</span>
          {:else if unset}
            <span class="unset">Not yet entered</span>
          {:else}
            {@html value}
          {/if}
        </td>
      </tr>
    {/each}
  </table>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
  }
  table {
    /* width: 100%; */
    border: solid 1px gainsboro;
    border-collapse: collapse;
  }
  td {
    padding: 5px;
  }
  td {
    border-color: gainsboro;
    border-style: solid;
    border-width: 1px 0;
  }
  td.label {
    font-weight: bold;
    background-color: #eee;
    padding: 5px 8px;
    white-space: nowrap; /* Fit content without wrapping */
  }
  tr.error td.label:before {
    content: "✖ ";
  }
  span.unset {
    color: gainsboro;
  }
  span.error {
    color: red;
    font-size: 0.8em;
  }
  h1 {
    font-size: 1.1em;
    text-align: center;
  }
  :global(span.email) {
    background-color: gainsboro;
    padding: 0.2rem 0.4rem 0.25rem 0.4rem;
    border-radius: 0.5rem;
    line-height: 2em;
  }
</style>
