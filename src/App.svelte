<script lang="ts">
  import Carousel from "./components/Carousel.svelte";
  import { photos } from "./mock/images";
  import { Device } from "./utils/device";

  let width = 0;
  let marginBlock = 0;

  Device.Subscribe(({ executeIf }) => {
    executeIf({
      isMobilePortrait: () => {
        width = 100;
        marginBlock = 15;
      },

      isMobileLandscape: () => {
        width = 150;
        marginBlock = 30;
      },

      isTablet: () => {
        width = 200;
        marginBlock = 50;
      },

      isDesktop: () => {
        width = 250;
        marginBlock = 70;
      },

      isDesktopLarge: () => {
        width = 300;
        marginBlock = 100;
      },

      isDesktopExtraLarge: () => {
        width = 350;
        marginBlock = 150;
      },
    });
  });
</script>

<main>
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
