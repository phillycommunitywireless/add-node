<script>
  import InputField from "./fields/InputField.svelte";

  export let lat, long;

  let buttonText = "Detect location",
    state;

  $: success = state == "success";
  $: error = state == "error";
  $: switch (state) {
    case "loading":
      buttonText = "Loading...";
      break;
    case "success":
      buttonText = "Success!";
      break;
    case "error":
      buttonText = "Error. Enter position manually.";
      break;
  }

  const getPosition = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported.");
      } else {
        navigator.geolocation.getCurrentPosition(resolve, (e) => {
          reject(e.message);
        });
      }
    });
  };

  const handleClick = async () => {
    state = "loading";
    try {
      const { coords } = await getPosition();
      [lat, long] = [coords.latitude, coords.longitude];
      state = "success";
    } catch (err) {
      state = "error";
    }
  };
</script>

<div>
  <InputField
    label="Latitude"
    type="number"
    bind:value={lat}
    inputAttrs={{ disabled: success, step: "any" }}
  />
  <InputField
    label="Longitude"
    type="number"
    bind:value={long}
    inputAttrs={{ disabled: success, step: "any" }}
  />
</div>
<button
  on:click={handleClick}
  class:success
  class:error
  disabled={success || error}
  name="geolocation"
>
  {buttonText}
</button>

<style>
  div {
    display: flex;
  }
  /* Space between inputs */
  div > :global(div:first-of-type) {
    margin-right: 20px;
  }
  p {
    color: red;
  }
  button {
    margin: 10px 0;
  }
  button.success {
    color: green;
  }
  button.error {
    color: red;
  }
</style>
