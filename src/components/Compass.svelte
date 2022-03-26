<script>
  import { onMount } from "svelte";

  export let angle, handleStopClick;

  let heading;
  // Normalize to degrees counter-clockwise from East;
  $: angle = -heading + (heading > 90 ? 450 : 90);

  let isIOS;

  onMount(() => {
    isIOS =
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/);

    if (!isIOS) {
      window.addEventListener(
        "deviceorientationabsolute",
        (e) => {
          heading = Math.floor(
            e.webkitCompassHeading ?? Math.abs(e.alpha - 360)
          );
        },
        true
      );
    }
  });

  let compassInfo;

  async function startCompassIOS() {
    let response;
    try {
      response = await DeviceOrientationEvent.requestPermission();
    } catch (e) {
      alert(e);
    }
    if (response === "granted") {
      window.addEventListener("deviceorientation", handler, true);
    } else {
      alert("has to be allowed!");
    }
  }
</script>

<div class="modal">
  <div class="container">
    <p>Tap the compass when facing the right direction</p>
    <div class="size">
      <div class="aspect" on:click={handleStopClick}>
        <div class="arrow" />
        <div
          class="compass-circle"
          style={`transform: translate(-50%, -50%) rotate(${-heading}deg);`}
        />
      </div>
      {#if isIOS}
        <button type="button" on:click|preventDefault={startCompassIOS}>
          Start compass
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  div.modal {
    position: fixed;
    display: flex; /* for margin-based centering */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(20px);
    z-index: 3;
  }
  div.container {
    position: relative;
    margin: auto;
    width: 70vw;
    max-width: 400px;
  }
  div.size {
    position: relative;
    width: 50%;
    height: 50vh;
    min-width: 13vw;
    max-width: 300px;
  }
  div.aspect {
    position: absolute;
    /* Fixed 1:1 aspect ratio */
    width: 100%;
    padding: 100%;
    height: 0;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    background-color: white;
  }

  .aspect .arrow {
    position: absolute;
    width: 0;
    height: 0;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
    border-width: 15px 8px 0 8px;
    border-color: red transparent transparent transparent;
    z-index: 1;
  }

  .compass-circle {
    position: absolute;
    width: 90%;
    height: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url(/img/compass.png) center no-repeat;
    background-size: contain;
  }
  p {
    color: white;
    font-weight: bold;
    font-size: 1.5em;
    text-align: center;
  }
  button {
    margin-bottom: auto;
  }
</style>
