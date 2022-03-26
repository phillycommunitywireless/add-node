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
          This feature does not work in Firefox. Google Chrome on Android and iOS
          should work. If you can't get it to work here, just estimate
          from a mapping/compass app of your choice.`}
    </p>
  {/if}
  {#if usingCompass}
    <Compass bind:angle {handleStopClick} />
  {:else}
    <button type="button" name="get-direction" on:click={handleClick}>
      Use device compass
    </button>
  {/if}
</div>

<style>
  p {
    font-size: 0.9em;
    margin: 1em 0;
  }
</style>
