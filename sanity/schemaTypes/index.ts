import { type SchemaTypeDefinition } from "sanity";
import { homepage } from "./homepage";
import { aboutPage } from "./aboutPage";
import { service } from "./service";
import { news } from "./news";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homepage, aboutPage, service, news, siteSettings],
};

export const singletonTypes = new Set(["aboutPage", "siteSettings"]);
