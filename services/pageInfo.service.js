import { fetch } from "Utils/strapiApi";

const apiEndpoint = "/page-general-info";
/**
 * fetch asset from strapi, return null if not exists
 * @returns page info (footer and header info)
 */
export async function getPageInfo() {
  return fetch(`${apiEndpoint}`);
}
