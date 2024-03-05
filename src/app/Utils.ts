export class StringUtils {
  public toUpperCase(arg: string) {
    return arg.toUpperCase();
  }
}

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export function getStringInfo(arg: string): stringInfo {
  return {
    lowerCase: arg.toLocaleLowerCase(),
    upperCase: arg.toUpperCase(),
    characters: arg.split(''),
    length: arg.length,
    extraInfo: {},
  };
}
