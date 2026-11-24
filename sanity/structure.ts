import type { StructureResolver } from "sanity/structure";
import { CaseIcon, CogIcon, DocumentTextIcon, HomeIcon, InfoOutlineIcon } from "@sanity/icons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Nexora Corporate")
    .items([
      S.documentTypeListItem("homepage").title("Homepage").icon(HomeIcon),
      S.listItem()
        .title("About Page")
        .id("aboutPage")
        .icon(InfoOutlineIcon)
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.divider(),
      S.documentTypeListItem("service").title("Services").icon(CaseIcon),
      S.documentTypeListItem("news").title("News Articles").icon(DocumentTextIcon),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ]);
