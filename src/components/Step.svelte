<script>
  import { steps, currentActive } from "../lib/store";
  export let step;

  $: hidden = step != steps[$currentActive];
</script>

<div class="step {step.toLowerCase()}" class:hidden>
  <slot />
</div>

<style>
  .hidden {
    display: none;
  }
</style>
