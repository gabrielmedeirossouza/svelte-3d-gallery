<script lang="ts">
  import { onMount } from "svelte";
  import Carousel from "./components/Carousel.svelte";
  import type { TCarouselItem } from "./components/Carousel.svelte";

  let photos: TCarouselItem[] = [];

  let clientWidth = 0;
  const isMobilePortrait = (value: number) => value < 500;
  const isMobileLandscape = (value: number) => value >= 500 && value < 800;
  const isTablet = (value: number) => value >= 800 && value < 1024;
  const isDesktop = (value: number) => value >= 1024;
  const isLargeDesktop = (value: number) => value >= 1440;
  const isExtraLargeDesktop = (value: number) => value >= 1920;

  let width = 0;
  let marginBlock = 0;
  $: {
    if (isMobilePortrait(clientWidth)) {
      width = 100;
      marginBlock = 15;
    }

    if (isMobileLandscape(clientWidth)) {
      width = 150;
      marginBlock = 30;
    }

    if (isTablet(clientWidth)) {
      width = 200;
      marginBlock = 50;
    }

    if (isDesktop(clientWidth)) {
      width = 250;
      marginBlock = 70;
    }

    if (isLargeDesktop(clientWidth)) {
      width = 300;
      marginBlock = 100;
    }

    if (isExtraLargeDesktop(clientWidth)) {
      width = 350;
      marginBlock = 150;
    }
  }

  onMount(() => {
    fetch(
      "https://api.unsplash.com/search/photos?client_id=" +
        import.meta.env.VITE_UNSPLASH_KEY +
        "&page=1&query=office"
    )
      .then((res) => res.json())
      .then((data) => {
        photos = data.results.map((photo: any) => ({
          image: photo?.urls?.regular || "https://picsum.photos/200/300",
          alt: photo?.alt_description || "Office",
        }));
      });
  });
</script>

<main bind:clientWidth>
  <h1>3D GALLERY</h1>

  <Carousel {photos} itemWidth={width} {marginBlock} />
</main>

<style lang="scss">
  main {
    width: 100vw;
    height: 100vh;

    h1 {
      text-align: center;
      padding-block: 50px;
    }
  }
</style>
