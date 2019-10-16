declare global {
  interface Window {
    globalThis: {
      UnityLoader: any;
      UnityProgress: any;
    };
  }
}

export {};
