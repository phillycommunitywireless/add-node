<script>
  import { Form } from "svelte-forms-lib";
  import * as yup from "yup";

  import { emailRegex } from "./lib/constants";

  import InputField from "./fields/InputField.svelte";
  import SelectField from "./fields/SelectField.svelte";
  import TagsField from "./fields/TagsField.svelte";
  import Compass from "./Compass.svelte";
  import Geolocate from "./Geolocate.svelte";

  // Multi-step form

  export let steps, currentActive;
  $: activeStep = steps[currentActive];

  // Scrolling

  document.addEventListener("scroll", () => {});

  // Form validation

  let formData = {
    nodeLabel: "",
    nodeType: "",
    installers: [],
    lat: 0,
    long: 0,
    direction: 0,
    device: "",
  };

  const formProps = {
    validationSchema: yup.object().shape({
      nodeLabel: yup.string(),
      nodeType: yup
        .string()
        .oneOf([nodeTypes.map((t) => t.value)])
        .required(),
      installers: yup.array().of(yup.string().email()).required(),
      lat: yup.number().moreThan(-90).lessThan(90).required(),
      long: yup.number().moreThan(-90).lessThan(90).required(),
      direction: yup.number().moreThan(0).lessThan(360).required(),
      device: yup.string().required(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  };

  // Inputs

  let nodeTypes = [
    { value: "mesh", label: "Mesh (no router)" },
    { value: "hub", label: "Hub (router + radio)" },
  ];

  const handleTags = (e) => {
    for (let text of e.detail.tags) {
      if (!emailRegex.test(text)) {
        e.detail.tags.pop(e.detail.tags.indexOf(text));
      }
    }
    formData.installers = e.detail.tags;
  };
</script>

<div class="form-container">
  <Form {...formProps}>
    {#if activeStep == "Info"}
      <InputField
        label="Node name"
        bind:value={formData.password}
        placeholder="e.g. Kensington Library South"
      />
      <SelectField label="Node type" items={nodeTypes} />
      <TagsField
        label="Installer(s)"
        description={`Installers will be sent an optional form to add notes 
        and reflections on the installation.`}
        on:tags={handleTags}
        props={{
          allowPaste: true,
          splitWith: "\n",
          addKeys: [32, 13, 9, 188],
          onlyUnique: true,
          placeholder: "Enter installer email(s)...",
        }}
      />
      <p />
    {:else if activeStep == "Location"}
      <Geolocate />
    {:else if activeStep == "Direction"}
      <Compass />
    {:else if activeStep == "Device"}
      <InputField label={"Account Name"} bind:value={formData.account_name} />
      <InputField label={"Card No"} bind:value={formData.card_no} />
    {:else if activeStep == "Confirmation"}
      <div class="message">
        <h2>Thank you for choosing us</h2>
        <button class="btn submit">Finish </button>
      </div>
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
