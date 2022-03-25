<script>
  import Form from "./components/Form.svelte";
  import ProgressBar from "./components/ProgressBar.svelte";

  import { steps, currentActive, isValid } from "./lib/store";

  $: error = !$isValid;

  $: firstPage = $currentActive <= 0;
  $: lastPage = $currentActive >= steps.length - 1;

  const setActive = (index) => {
    currentActive.update((i) => {
      if (i >= steps.length) return steps.length - 1;
      else if (i < 0) return 0;
      else return index;
    });
  };
  const turnLeft = () => setActive($currentActive - 1);
  const turnRight = () => setActive($currentActive + 1);

  let formEl;
  const submitForm = () => {
    // form.submit() bypasses handlers in Firefox -- dispatchEvent is the workaround
    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });
    formEl.dispatchEvent(submitEvent);
  };
</script>

<header>
  <h1>Add a node to PCW</h1>
  <ProgressBar />
</header>
<main>
  <Form bind:formEl />
</main>
<footer>
  <div class="step-buttons">
    <button type="button" class="btn" on:click={turnLeft} disabled={firstPage}
      >Prev</button
    >
    <button
      type="button"
      class="btn"
      class:submit={lastPage}
      class:error={lastPage && error}
      disabled={lastPage && error}
      on:click={lastPage ? submitForm : turnRight}
    >
      {lastPage ? (error ? "Fix errors" : "Submit") : "Next"}</button
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
    max-width: 100%;
    margin: 0 auto;
    padding: 10px;
    overflow: scroll;
  }
  footer {
    width: 600px;
    margin: auto;
    padding: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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
    font-weight: bolder;
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
  .btn.error {
    background-color: red;
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
