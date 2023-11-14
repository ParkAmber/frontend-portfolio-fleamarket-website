import { atom, selector } from "recoil";
import { getAccessToken } from "../libraries/getAccessToken";
// import { getAccessToken } from "../libraries/getAccessToken";

//atom==> recoil에서 변수 만드는 법!!
export const isEditState = atom({
  key: "isEditState",
  default: true,
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const visitedPageState = atom({
  key: "visitedPageState",
  default: "/flea_market",
});

//함수 만들기
export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  },
});
