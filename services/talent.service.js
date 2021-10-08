import { fetch } from "Utils/strapiApi";

const apiEndpoint = "/nfts";

export function getTalentAssets(start, limit, accountAddress) {
  return fetch(
    `${apiEndpoint}?_start=${start}&_limit=${limit}&talent.walletAddress=${accountAddress}`
  );
}
export function getTalentAssetsOnSale(start, limit, accountAddress) {
  return fetch(
    `${apiEndpoint}?_start=${start}&_limit=${limit}&talent.walletAddress=${accountAddress}&onSale=${onSale}`
  );
}
