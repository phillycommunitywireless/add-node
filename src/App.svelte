<script>
  import Form from "./Form.svelte";
  import ProgressBar from "./ProgressBar.svelte";
  let steps = ["CompassTest", "Info", "Location", "Angle", "Device"];
  let currentActive = 1;
  let progressBar;

  const handleProgress = (stepIncrement) => {
    progressBar.handleProgress(stepIncrement);
  };
</script>

<main>
  <h1>Add a node</h1>
  <div class="container">
    <ProgressBar {steps} bind:currentActive bind:this={progressBar} />

    <Form active_step={steps[currentActive - 1]} />

    <div class="step-buttons">
      <button
        class="btn"
        on:click={() => handleProgress(-1)}
        disabled={currentActive <= 1}>Prev</button
      >
      <button
        class="btn"
        on:click={() => handleProgress(+1)}
        disabled={currentActive >= steps.length}>Next</button
      >
    </div>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css?family=Muli&display=swap");

  :global(*) {
    box-sizing: border-box;
  }

  :global(body, html) {
    font-family: "Muli", sans-serif;
    font-size: 16px;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    overflow: hidden;
  }

  .container {
    width: 100%;
    max-width: 600px;
  }

  h1 {
    position: absolute;
    top: 2em;
  }

  .step-buttons {
    margin-top: 1rem;
    text-align: center;
  }

  .btn {
    background-color: #606bff;
    color: #fff;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    font-family: inherit;
    padding: 8px 30px;
    margin: 5px;
  }

  .btn:active {
    transform: scale(0.98);
  }

  .btn:focus {
    outline: 0;
  }

  .btn:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }

  @media screen and (max-width: 600px) {
    main {
      padding: 20px;
    }
    .container {
      box-shadow: none;
    }
    .btn {
      font-size: 2em;
      width: calc(50% - 12.5px);
      height: 100px;
    }
  }
</style>
