type TExecutableType = {
  isMobilePortrait?: () => void;
  isMobileLandscape?: () => void;
  isTablet?: () => void;
  isDesktop?: () => void;
  isDesktopLarge?: () => void;
  isDesktopExtraLarge?: () => void;
}

type TObserver = {
  isMobilePortrait?: boolean;
  isMobileLandscape?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
  isDesktopLarge?: boolean;
  isDesktopExtraLarge?: boolean;
  executeIf?: (param: TExecutableType) => void;
}

export class Device {
  private static _observer: ((param: TObserver) => void)[] = [];

  private static _width = 0;

  static {
    const body = document.body;

    window.addEventListener('resize', () => {
      this._width = body.clientWidth;
      this._Notify();
    });

    window.addEventListener('load', () => {
      this._width = body.clientWidth;
      this._Notify();
    })
  }

  public static Subscribe(fn: (param: TObserver) => void) {
    this._observer.push(fn);
  }

  public static Unsubscribe(fn: (param: TObserver) => void) {
    this._observer = this._observer.filter((f) => f !== fn);
  }

  private static _Notify() {
    this._observer.forEach((fn) => fn({
      isMobilePortrait: this._IsMobilePortrait(),
      isMobileLandscape: this._IsMobileLandscape(),
      isTablet: this._IsTablet(),
      isDesktop: this._IsDesktop(),
      isDesktopLarge: this._IsDesktopLarge(),
      isDesktopExtraLarge: this._IsDesktopExtraLarge(),

      executeIf: (params: TExecutableType) => {
        this._IsMobilePortrait() && params.isMobilePortrait?.();
        
        this._IsMobileLandscape() && params.isMobileLandscape?.();
        
        this._IsTablet() && params.isTablet?.();
        
        this._IsDesktop() && params.isDesktop?.();
        
        this._IsDesktopLarge() && params.isDesktopLarge?.();
        
        this._IsDesktopExtraLarge() && params.isDesktopExtraLarge?.();
        
      }
    }));
  }

  private static _IsMobilePortrait() {
    return this._width < 500
  }

  private static _IsMobileLandscape() {
    return this._width >= 500 && this._width < 800
  }

  private static _IsTablet() {
    return this._width >= 800 && this._width < 1024
  }

  private static _IsDesktop() {
    return this._width >= 1024
  }

  private static _IsDesktopLarge() {
    return this._width >= 1440
  }

  private static _IsDesktopExtraLarge() {
    return this._width >= 1920
  }
}
