<script>
  import Form from "./Form.svelte";
  import ProgressBar from "./ProgressBar.svelte";

  let steps = ["Info", "Location", "Direction", "Review"];
  let currentActive = 0;
  $: lastStep = currentActive == steps.length - 1;

  const setActive = (index) => {
    currentActive = index;
    if (currentActive >= steps.length) currentActive = steps.length - 1;
    if (currentActive < 0) currentActive = 0;
  };
</script>

<header>
  <h1>Add a node to PCW</h1>
  <ProgressBar {steps} bind:currentActive />
</header>
<main>
  <Form {steps} {currentActive} />
</main>
<footer>
  <div class="step-buttons">
    <button
      class="btn"
      on:click={() => setActive(currentActive - 1)}
      disabled={currentActive <= 0}>Prev</button
    >
    <!-- TODO wire this button up to the form -->
    <button
      class="btn"
      class:submit={lastStep}
      on:click={() => setActive(currentActive + 1)}
      >{lastStep ? "Submit" : "Next"}</button
    >
  </div>
</footer>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

  :global(*) {
    box-sizing: border-box;
  }

  :global(body, html) {
    font-family: "Open Sans", "Helvetica", monospace;
    font-size: 16px;
    padding: 0;
    margin: 0;
  }
  :global(body) {
    max-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    min-width: 500px;
    margin: 0 auto;
    padding: 10px;
    overflow: scroll;
  }
  footer {
    width: 600px;
    margin: auto;
    padding: 30px;
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
    justify-content: space-between;
    box-shadow: 10px 0 10 rgba(0, 0, 0, 0.4);
  }

  .btn {
    width: calc(50% - 15px);
    background-color: #606bff;
    color: #fff;
    border: 0;
    margin: 0;
    border-radius: 6px;
    cursor: pointer;
    padding: 20px;
  }

  .btn:focus {
    outline: 0;
  }

  .btn:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
  .btn.submit {
    background-color: #35c135;
  }
  @media screen and (max-width: 600px) {
    main {
      padding: 10px 30px;
      min-width: 100%;
    }
    footer {
      width: 100%;
    }
  }
</style>
