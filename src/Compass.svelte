<script>
  import { onMount } from "svelte";

  let isIOS,
    compassCircle,
    heading,
    position,
    offset = 0,
    dev = process.env.NODE_ENV == "dev"; // handled by rollup-plugin-replace

  const deviceOrientationEvent = `deviceorientation${dev ? "" : "absolute"}`;

  onMount(() => {
    isIOS = !!(
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/)
    );

    if (!isIOS) {
      window.addEventListener(deviceOrientationEvent, (e) => {
        heading = Math.floor(
          e.webkitCompassHeading ?? Math.abs(e.alpha - 360) - offset
        );
        compassCircle.style.transform = `translate(-50%, -50%) rotate(${-heading}deg)`;
      });
    }

    navigator.geolocation.getCurrentPosition(
      (p) => (position = p),
      console.error
    );
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

  // let pointDegree;
  //
  // function calcDegreeToPoint(latitude, longitude) {
  //   // Qibla geolocation
  //   const point = {
  //     lat: 21.422487,
  //     lng: 39.826206,
  //   };

  //   const phiK = (point.lat * Math.PI) / 180.0;
  //   const lambdaK = (point.lng * Math.PI) / 180.0;
  //   const phi = (latitude * Math.PI) / 180.0;
  //   const lambda = (longitude * Math.PI) / 180.0;
  //   const psi =
  //     (180.0 / Math.PI) *
  //     Math.atan2(
  //       Math.sin(lambdaK - lambda),
  //       Math.cos(phi) * Math.tan(phiK) -
  //         Math.sin(phi) * Math.cos(lambdaK - lambda)
  //     );
  //   return Math.round(psi);
  // }
</script>

<div>
  <p>Tap the compass to choose North.</p>
  <div class="compass">
    <div class="arrow" />
    <div bind:this={compassCircle} class="compass-circle" />
  </div>
  <p>Degrees: {heading}</p>
  <p>
    Lat/long: {position?.coords?.latitude}, {position?.coords?.longitude}
  </p>
  {#if isIOS}
    <button on:click|preventDefault={startCompassIOS}> Start compass </button>
  {/if}
</div>

<style>
  .compass {
    position: relative;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    margin: auto;
  }

  .compass > .arrow {
    position: absolute;
    width: 0;
    height: 0;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    border-style: solid;
    border-width: 30px 20px 0 20px;
    border-color: red transparent transparent transparent;
    z-index: 1;
  }

  .compass > .compass-circle {
    position: absolute;
    width: 90%;
    height: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* transition: transform 0.1s ease-out; */
    background: url(/img/compass.png) center no-repeat;
    background-size: contain;
  }

  button {
    margin-bottom: auto;
  }
</style>
