<script>
  import { Form } from "svelte-forms-lib";
  import * as yup from "yup";

  import Compass from "./Compass.svelte";
  import InputField from "./fields/InputField.svelte";
  import SelectField from "./fields/SelectField.svelte";

  export let steps, currentActive;

  $: activeStep = steps[currentActive];

  let nodeType, label, lat, long, direction, device, meshedWith;

  let formData = {
    nodeType,
    label,
    lat,
    long,
    direction,
    device,
  };

  const formProps = {
    initialValues: { name: "", email: "" },
    validationSchema: yup.object().shape({
      title: yup.string().oneOf(["Mr.", "Mrs.", "Mx."]),
      name: yup.string().required(),
      email: yup.string().email().required(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  };

  let nodeTypes = ["Mesh", "Hub"];
</script>

<div class="form-container">
  <Form {...formProps}>
    {#if activeStep == "Info"}
      <SelectField label={"Node type"} options={nodeTypes} />
      <InputField
        type={"password"}
        label={"Password"}
        bind:value={formData.password}
      />
    {:else if activeStep == "Location"}
      <InputField label={"Address"} bind:value={formData.address} />
      <InputField label={"City"} bind:value={formData.city} />
      <InputField label={"Country"} bind:value={formData.country} />
      <InputField label={"Postcode"} bind:value={formData.postcode} />
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
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    max-width: 100%;
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
