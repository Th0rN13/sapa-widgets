<script lang="ts">
  import { areEqual } from "./common/common";
  import { SCROLL_SPEED } from "./constants";
  import { tick, onMount, untrack } from "svelte";

  interface Props {
    imageSrc: string;
    list: string[];
  }

  let { imageSrc, list }: Props = $props();

  let currentList: string[] = $state(["Никого нет"]);
  let nextList: string[] = $state(["Никого нет"]);

  let duration: number = $state(5);

  let isChanging: boolean = $state(true);
  let currentWidth: number = $state(0);
  let newWidth: number = $state(0);
  let isLong = $derived(currentWidth > 550);
  let shouldScroll: boolean = $derived(isChanging || isLong);
  let offset: number = $state(550);
  let needChange: boolean = $state(false);

  $effect(() => {
    console.log("List changed:", $state.snapshot(list));
    untrack(() => {
      let isListEmpty = list.filter((el) => el.trim() === "").length !== 0;
      if (!isListEmpty && !areEqual(list, nextList)) {
        console.log("List change workflow");
        needChange = true;
      }
    });
  });

  function handleAnimationIteration() {
    console.log("Animation iteration");

    currentList = [...nextList];
    if (needChange) {
      offset = newWidth;
      duration = newWidth / SCROLL_SPEED;
      nextList = [...list];
      needChange = false;
    }

    console.log("Offset:", $state.snapshot(offset));
    console.log("Current:", $state.snapshot(currentList));
    console.log("Next:", $state.snapshot(nextList));
  }
</script>

<div class="widget">
  <img src={imageSrc} alt="Widget" class="widget-bg" />
  <div class="nickname">
    <div
      class="nickname-inner"
      class:scrolling={shouldScroll}
      style="--offset: {-offset}px; --duration: {20}s;"
      onanimationiteration={handleAnimationIteration}
    >
      {#each currentList as nick}
        <span class="nick-item">{nick}</span>
      {/each}
      {#each nextList as nick}
        <span class="nick-item">{nick}</span>
      {/each}
    </div>
    <div bind:clientWidth={currentWidth} class="nickname-hidden">
      {#each currentList as nick}
        <span class="nick-item">{nick}</span>
      {/each}
    </div>
    <div bind:clientWidth={newWidth} class="nickname-hidden">
      {#each nextList as nick}
        <span class="nick-item">{nick}</span>
      {/each}
    </div>
  </div>
</div>

<style>
  .widget {
    position: relative;
    width: 856px;
    height: 230px;
  }

  .widget-bg {
    position: absolute;
    top: 0;
    left: 0;
  }

  .nickname {
    position: absolute;
    top: 28px;
    right: 20px;
    width: 600px;
    height: 80px;
    font-size: 56px;
    font-weight: bold;

    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%
    );
  }

  .nickname-inner,
  .nickname-hidden {
    display: flex;
    gap: 50px;
    width: max-content;
    margin: 0 auto;
  }
  .nickname-hidden {
    position: absolute;
    opacity: 0;
  }

  .nickname-inner.scrolling {
    margin: 0;
    animation: scroll-left linear infinite;
    animation-duration: var(--duration);
  }

  @keyframes scroll-left {
    0% {
      transform: translateX(+50px);
    }
    100% {
      transform: translateX(var(--offset));
    }
  }

  .nick-item {
    background: linear-gradient(
      to bottom,
      #ffefba 0%,
      #e6b15b 50%,
      #d48c31 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    filter: drop-shadow(0px 2px 0px #704118)
      drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.3));

    -webkit-text-stroke: 2px #4d2b0f;

    white-space: nowrap;
    /* min-width: 100%; */
  }
</style>
