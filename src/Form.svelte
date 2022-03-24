<script>
  import { Form } from "svelte-forms-lib";
  import * as yup from "yup";

  import InputField from "./fields/InputField.svelte";
  import SelectField from "./fields/SelectField.svelte";
  import TagsField from "./fields/TagsField.svelte";
  import Direction from "./Direction.svelte";
  import Geolocate from "./Geolocate.svelte";
  import Review from "./Review.svelte";

  import { nodeTypes, formData, formShape } from "./lib/constants";

  // Multi-step form

  export let steps, currentActive;
  $: activeStep = steps[currentActive];

  // Form data

  const formProps = {
    validationSchema: yup.object().shape(formShape),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  };
</script>

<div class="form-container">
  <Form {...formProps}>
    {#if activeStep == "Info"}
      <InputField
        label="Node name"
        bind:value={formData.password}
        inputAttrs={{
          placeholder: "e.g. Kensington Library South",
        }}
      />
      <SelectField label="Node type" items={nodeTypes} />
      <TagsField
        label="Installer(s)"
        description={`Installers will be sent an optional form to add notes 
        and reflections on the installation.`}
        bind:values={formData.installers}
        props={{
          allowPaste: true,
          splitWith: "\n",
          addKeys: [32, 13, 9, 188],
          onlyUnique: true,
          placeholder: "Enter installer email(s)...",
        }}
      />
      <InputField
        label="Device"
        bind:value={formData.device}
        inputAttrs={{ placeholder: "e.g. UAP-AC-M" }}
      />
    {:else if activeStep == "Location"}
      <Geolocate bind:lat={formData.lat} bind:long={formData.long} />
    {:else if activeStep == "Direction"}
      <Direction bind:angle={formData.angle} />
    {:else if activeStep == "Review"}
      <Review {formData} />
    {/if}
  </Form>
</div>

<style>
  .form-container {
    font-size: 1.1em;
    margin-bottom: 20px;
    width: 100%;
    max-width: 100%;
  }

  p {
    font-size: 1rem;
    color: grey;
  }

  .btn {
    color: white;
    padding: 0.5rem 0;
    margin-top: 0.5rem;
    display: inline-block;
    width: 100%;
    border-radius: 0.25rem;
    cursor: pointer;
  }
  .submit {
    background: linear-gradient(to bottom, #44c767 5%, #50b01c 100%);
    background-color: #44c767;
  }
  .submit:hover {
    background: linear-gradient(to bottom, #50b01c 5%, #44c767 100%);
    background-color: #50b01c;
  }
  .message {
    text-align: center;
  }

  @media screen and (max-width: 600px) {
    .form-container {
      box-shadow: none;
    }
  }
</style>
