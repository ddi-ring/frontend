export interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
}

export interface DaumPostcode {
  new (options: {
    oncomplete: (data: DaumPostcodeData) => void;
    width: string;
    height: string;
  }): {
    embed: (element: HTMLElement | string) => void;
  };
}

declare global {
  interface Window {
    daum: {
      Postcode: DaumPostcode;
    };
  }
}

export interface AddressSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: DaumPostcodeData) => void;
  isScriptLoaded: boolean;
}
