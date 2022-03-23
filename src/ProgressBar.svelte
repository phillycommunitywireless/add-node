<script>
  export let steps = [],
    currentActive = 1;

  $: numSteps = steps.length;
</script>

<div class="progress-container">
  <div
    class="progress"
    style={`
			width: ${(100 / (numSteps - 1)) * currentActive}%;
		`}
  />
  {#each steps as step, i}
    <div
      on:click={() => {
        currentActive = i;
      }}
      class="circle"
      class:active={currentActive >= i}
      data-title={step}
    >
      {i + 1}
    </div>
  {/each}
</div>

<style>
  .progress-container {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 50px auto 10px auto;
    max-width: 100%;
    width: 350px;
  }

  .progress-container::before {
    content: "";
    background-color: #e0e0e0;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 100%;
    z-index: -1;
  }

  .progress {
    background-color: #606bff;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 4px;
    width: 0%;
    z-index: -1;
    transition: 0.4s ease;
  }

  .circle {
    background-color: #fff;
    color: #999;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #e0e0e0;
    transition: 0.4s ease;
    cursor: pointer;
  }

  .circle::after {
    content: attr(data-title) " ";
    position: absolute;
    bottom: 35px;
    color: #999;
    transition: color 0.4s ease;
    -webkit-transition: color 0.4s ease;
  }

  .circle.active::after {
    color: #606bff;
  }

  .circle.active {
    font-weight: bold;
    color: #606bff;
    border-color: #606bff;
    background-color: #f0f1ff;
  }
</style>
