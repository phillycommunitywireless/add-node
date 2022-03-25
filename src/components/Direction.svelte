<script>
  import InputField from "./fields/InputField.svelte";
  import Compass from "./Compass.svelte";

  export let angle;

  $: angle = isNaN(angle) ? 0 : angle;

  let usedCompass = false,
    usingCompass = false;

  const handleClick = (e) => {
    usedCompass = true;
    usingCompass = true;
  };
  const handleStopClick = (e) => {
    usingCompass = false;
  };
</script>

<InputField
  name="angle"
  type="number"
  description="A number between 0-360, representing degrees counter-clockwise from East."
  bind:value={angle}
  inputAttrs={{
    min: 0,
    max: 359,
  }}
/>

<div class="direction-container">
  {#if !usedCompass || usingCompass}
    <p>
      {usingCompass
        ? "Tap the compass when facing the correct direction."
        : `Tap here to use your device's compass to auto-detect the facing angle. 
          Not all devices are supported. If yours isn't, just estimate
          from a mapping tool or compass of your choice.`}
    </p>
  {/if}
  {#if usingCompass}
    <div class="compass-container" on:click={handleStopClick}>
      <Compass bind:angle />
    </div>
  {:else}
    <button type="button" name="get-direction" on:click={handleClick}>
      Use device compass
    </button>
  {/if}
</div>

<style>
  .compass-container {
    width: 35vw;
    max-width: 13vh;
    margin: 1rem auto;
    transform: translateX(-50%);
  }
  p {
    font-size: 0.9em;
    margin: 1em 0;
  }
</style>
