declare global {
  interface Window {
    globalThis: {
      UnityLoader: {
        instantiate: (
          string,
          string,
          { onProgress: any }
        ) => {
          SendMessage: (string, string, string) => void;
        };
      };
      UnityProgress: any;
    };
    WebInteraction: {
      onInit: () => void;
      onChangeTemplate: (json: string) => void;
    };
  }
}

export {};
