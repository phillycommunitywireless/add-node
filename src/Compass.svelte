<script>
  import { onMount } from "svelte";

  export let angle;

  let heading;
  // Normalize to degrees counter-clockwise from East;
  $: angle = -heading + (heading > 90 ? 450 : 90);

  let isIOS,
    offset = 0,
    dev = process.env.NODE_ENV == "dev"; // handled by rollup-plugin-replace

  const deviceOrientationEvent = `deviceorientation${dev ? "" : "absolute"}`;

  onMount(() => {
    isIOS =
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/);

    if (!isIOS) {
      window.addEventListener(deviceOrientationEvent, (e) => {
        heading = Math.floor(
          e.webkitCompassHeading ?? Math.abs(e.alpha - 360) - offset
        );
      });
    }
  });

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

<div id="compass">
  <div class="arrow" />
  <div
    id="compass-circle"
    style={`transform: translate(-50%, -50%) rotate(${-heading}deg);`}
  />
</div>
{#if isIOS}
  <button on:click|preventDefault={startCompassIOS}> Start compass </button>
{/if}

<style>
  #compass {
    position: relative;
    width: 100%;
    padding: 100%;
    height: 0;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }

  #compass .arrow {
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

  #compass-circle {
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
    margin: 0;
  }
  button {
    margin-bottom: auto;
  }
</style>
