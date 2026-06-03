import type { EndpointKey } from "./retargetos-config";

export type TableRow = Record<string, string>;

export type ActionEndpoint = {
  label: string;
  endpoint: EndpointKey;
  method: "GET" | "POST";
  purpose: string;
};
