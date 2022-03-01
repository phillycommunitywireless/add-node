<script>
  import Form from "./Form.svelte";
  import ProgressBar from "./ProgressBar.svelte";

  let steps = ["Info", "Location", "Direction", "Device"];
  let currentActive = 0;
  let progressBar;

  const setActive = (index) => {
    currentActive = index;
    if (currentActive >= steps.length) currentActive = steps.length - 1;
    if (currentActive < 0) currentActive = 0;
  };
</script>

<header>
  <h1>Add a node to PCW</h1>
</header>
<main>
  <ProgressBar {steps} bind:currentActive bind:this={progressBar} />
  <Form {steps} {currentActive} />
</main>
<footer>
  <div class="step-buttons">
    <button
      class="btn"
      on:click={() => setActive(currentActive - 1)}
      disabled={currentActive <= 0}>Prev</button
    >
    <button
      class="btn"
      on:click={() => setActive(currentActive + 1)}
      disabled={currentActive >= steps.length - 1}>Next</button
    >
  </div>
</footer>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;700&display=swap");

  :global(*) {
    box-sizing: border-box;
  }

  :global(body, html) {
    font-family: "Inconsolata", "Courier", monospace;
    font-size: 16px;
    padding: 0;
    margin: 0;
  }
  :global(body) {
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    overflow: hidden;
  }
  footer {
    padding: 20px;
  }

  h1 {
    font-size: 1.3em;
    font-weight: bolder;
    margin: 0;
    padding: 8px 0;
    border-bottom: solid 1px gainsboro;
    color: rgba(39, 22, 100, 0.5);
    background: #f2eaff;
    text-align: center;
  }

  .step-buttons {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
  }

  .btn {
    background-color: #606bff;
    color: #fff;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    padding: 8px 30px;
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
      justify-content: space-between;
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
