<script context="module" lang="ts">
  export type TCarouselItem = {
    image: string;
    alt: string;
  };
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let photos: TCarouselItem[];
  export let itemWidth: number;
  export let marginBlock: number;

  let itemHeight = 0;
  let horizontalItemsSpacing = 0;
  $: itemHeight = itemWidth / 2;
  $: horizontalItemsSpacing = itemWidth * 1.6;

  let mouseHorizontalAngle = 0;
  let mouseVerticalAngle = 0;

  let horizontalAngle = 0;
  let selectedIndex = 0;
  let turns = 0;

  let carouselItemsCount = 0;
  let theta = 0;
  $: carouselItemsCount = photos.length;
  $: theta = 360 / carouselItemsCount;

  function rotateCarousel() {
    const oldAngle = 360 * turns;
    horizontalAngle = (theta * selectedIndex + oldAngle) * -1;
  }

  function next() {
    if (selectedIndex < carouselItemsCount - 1) {
      selectedIndex++;
    } else {
      selectedIndex = 0;
      turns++;
    }

    rotateCarousel();
  }

  function previous() {
    if (selectedIndex > 0) {
      selectedIndex--;
    } else {
      selectedIndex = carouselItemsCount - 1;
      turns--;
    }

    rotateCarousel();
  }

  function onMouseMove(mouseEvent: MouseEvent) {
    const rawX = mouseEvent.clientX;
    const rawY = mouseEvent.clientY;

    const xPercent = (rawX / window.innerWidth) * 100;
    const yPercent = (rawY / window.innerHeight) * 100;

    mouseHorizontalAngle = ((xPercent - 50) / 100) * -1;
    mouseVerticalAngle = (yPercent - 50) / 100;
  }

  onMount(() => {
    window.addEventListener("mousemove", onMouseMove);
  });

  onDestroy(() => {
    window.removeEventListener("mousemove", onMouseMove);
  });
</script>

<div class="container">
  <div
    class="carousel-parent"
    style:--width={itemWidth + "px"}
    style:--height={itemHeight + "px"}
    style:--margin-block={marginBlock + "px"}
  >
    <div style:transform={`rotateY(${horizontalAngle}deg)`} class="carousel">
      <div
        class="carousel__items"
        style:transform={`rotateY(${mouseHorizontalAngle}deg) rotateX(${mouseVerticalAngle}deg)`}
      >
        {#each photos as item, i}
          <div
            class="carousel__items__item"
            style:transform={`rotateY(${
              i * theta
            }deg) translateZ(${horizontalItemsSpacing}px)`}
          >
            <img
              class:active={i === selectedIndex}
              src={item.image}
              alt={item.alt}
            />
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="actions">
    <button on:click={previous}>{"<"}</button>
    <button on:click={next}>{">"}</button>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .carousel-parent {
      $width: var(--width);
      $height: var(--height);
      $margin-block: var(--margin-block);
      position: relative;
      width: $width;
      height: $height;
      margin-inline: auto;
      margin-block: $margin-block;
      perspective: 1000px;

      .carousel {
        width: 100%;
        transform-style: preserve-3d;
        transition: transform 1s cubic-bezier(0.47, 0.83, 0.2, 0.97);

        .carousel__items {
          transform-style: preserve-3d;

          .carousel__items__item {
            position: absolute;
            width: $width;
            height: $height;
            font-size: 80px;
            font-weight: bold;
            color: white;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.932);
            overflow: hidden;
            border-radius: 4px;
            transition: transform 1s, opacity 1s;

            img {
              image-rendering: high-quality;
              width: 100%;
              height: 100%;
              object-fit: cover;
              filter: grayscale(1) contrast(0.4);
              transition: all 500ms;

              &.active {
                filter: grayscale(0) contrast(1.1);
              }
            }
          }
        }
      }
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 50px;
      font-size: 18px;
      font-weight: 700;

      button {
        padding: 8px 36px;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
  }
</style>
