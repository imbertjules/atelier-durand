import { Banner } from "@/components/banner";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { Studio } from "@/components/studio";
import { getDocuments } from "@/lib/documents";

export default function Page() {
  const documents = getDocuments();
  return (
    <>
      <Banner />
      <Studio documents={documents} />
      <HowItWorks />
      <SiteFooter />
    </>
  );
}
