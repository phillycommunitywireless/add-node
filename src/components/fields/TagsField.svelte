<script>
  import * as yup from "yup";
  import FieldWrapper from "./FieldWrapper.svelte";
  import Tags from "svelte-tags-input";
  import { validateField } from "../../lib/store"

  export let values, name, description, props;

  const handleTags = (e) => {
    for (let text of e.detail.tags) {
      const isEmail = yup.string().email().isValidSync(text);
      if (!isEmail) {
        e.detail.tags.pop(e.detail.tags.indexOf(text));
      }
    }
    values = e.detail.tags;
    validateField(name);
  };
</script>

<div class="tags-container">
  <FieldWrapper {name} {description}>
    <Tags tags={values} {name} on:tags={handleTags} {...props} />
  </FieldWrapper>
</div>

<style>
  .tags-container :global(.svelte-tags-input-layout) {
    border-radius: 0.25rem !important;
    padding: 0.25rem 0 0.25rem 0.5rem !important;
    margin-bottom: 0.5em !important;
  }
  .tags-container :global(.svelte-tags-input-layout:focus-within) {
    outline: 2px auto Highlight;
    outline: 2px auto -webkit-focus-ring-color;
  }
  .tags-container :global(.svelte-tags-input-layout:hover) {
    border: solid 1px #ccc !important;
  }
  .tags-container :global(.svelte-tags-input) {
    font-family: inherit !important;
    font-size: inherit !important;
    margin: 0.25rem 0.5rem 0.25rem 0 !important;
    padding: 0 !important;
  }
  .tags-container :global(.svelte-tags-input-tag) {
    font-family: inherit !important;
    font-size: inherit !important;
    background-color: gainsboro !important;
    color: black !important;
    margin: 0.25rem 0.5rem 0.25rem 0 !important;
    padding: 0.2rem 0.4rem 0.25rem 0.4rem !important;
    border-radius: 0.5rem !important;
  }
  .tags-container :global(.svelte-tags-input-tag-remove) {
    vertical-align: center !important;
    text-align: center !important;
    padding: 0 0.3rem !important;
    margin-left: 0.2rem !important;
    border-radius: 50% !important;
  }
  .tags-container :global(.svelte-tags-input-tag-remove:hover) {
    background-color: grey !important;
  }
</style>
