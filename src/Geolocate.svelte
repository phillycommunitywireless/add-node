<script>
  import InputField from "./fields/InputField.svelte";

  let button,
    showButton = true;

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

  let lat, long;
  const handleClick = async () => {
    button.textContent = "Locating...";
    try {
      const { coords } = await getPosition();
      [lat, long] = [coords.latitude, coords.longitude];
      button.textContent = "Success!";
      button.style.color = "green";
      setTimeout(() => (showButton = false), 2000);
    } catch (err) {
      console.error(err);
      button.textContent = err;
      button.style.color = "red";
    }
  };
</script>

<div>
  <InputField label="Latitude" bind:value={lat} />
  <InputField label="Longitude" bind:value={long} />
</div>
{#if showButton}
  <button bind:this={button} on:click={handleClick} name="geolocation">
    Detect location
  </button>
{/if}

<style>
  div {
    display: flex;
  }
  div > :global(div:first-of-type) {
    margin-right: 20px;
  }
  button {
    margin: 10px 0;
  }
</style>
