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
    name="lat"
    type="number"
    bind:value={lat}
    inputAttrs={{ disabled: success }}
  />
  <InputField
    name="long"
    type="number"
    bind:value={long}
    inputAttrs={{ disabled: success }}
  />
</div>
{#if !success}
  <p>
    Tap here to use your device's GPS to auto-detect your current position. Not
    all devices are supported. If yours isn't, just input manual values via a
    mapping tool of your choice.
  </p>
{/if}
<button
  type="button"
  name="geolocation"
  on:click={handleClick}
  class:success
  class:error
  disabled={success || error}
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
    font-size: 0.9em;
    margin: 1em 0;
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
