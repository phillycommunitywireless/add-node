<script>
  import InputField from "./fields/InputField.svelte";
  import SelectField from "./fields/SelectField.svelte";
  import TagsField from "./fields/TagsField.svelte";
  import Direction from "./Direction.svelte";
  import Geolocate from "./Geolocate.svelte";
  import Review from "./Review.svelte";
  import Step from "./Step.svelte";

  import { nodeTypes, form, handleSubmit } from "../lib/store";

  export let formEl;
</script>

<div class="form-container">
  <!-- svelte-ignore component-name-lowercase -->
  <form bind:this={formEl} on:submit={handleSubmit}>
    <Step step="Info">
      <InputField
        name="nodeLabel"
        bind:value={$form.nodeLabel}
        inputAttrs={{
          placeholder: "e.g. Kensington Library South",
        }}
      />
      <SelectField
        name="nodeType"
        bind:value={$form.nodeType}
        items={nodeTypes}
      />
      <TagsField
        name="installers"
        bind:values={$form.installers}
        description={`Installers will be sent an optional form to add notes 
        and reflections on the installation.`}
        props={{
          allowPaste: true,
          splitWith: "\n",
          addKeys: [32, 13, 9, 188],
          onlyUnique: true,
          allowBlur: true,
          placeholder: "Enter installer email(s)...",
        }}
      />
      <InputField
        name="device"
        bind:value={$form.device}
        inputAttrs={{ placeholder: "e.g. UAP-AC-M" }}
      />
    </Step>

    <Step step="Location">
      <Geolocate bind:lat={$form.lat} bind:long={$form.long} />
    </Step>

    <Step step="Direction">
      <Direction bind:angle={$form.angle} />
    </Step>

    <Step step="Review">
      <Review />
    </Step>
  </form>
</div>

<style>
  .form-container {
    font-size: 1.1em;
    margin-bottom: 20px;
    width: 100%;
    max-width: 100%;
  }

  @media screen and (max-width: 600px) {
    .form-container {
      box-shadow: none;
    }
  }
</style>
