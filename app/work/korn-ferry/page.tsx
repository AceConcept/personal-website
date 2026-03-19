import TitleDescription from "@/app/components/portfolio-components/TitleDescription";
import SingleImage from "@/app/components/portfolio-components/SingleImage";

export default function KornFerryPage() {
  return (
    <main>
      <TitleDescription
        title="Korn Ferry"
        breadcrumbs={[
          { label: "work", href: "/work" },
          { label: "Korn-Ferry", href: "/work/korn-ferry" },
        ]}
        leftSubtitle="Designed B2B software products for hiring processes, including AI-powered features and data visualization. "
        rightSubtitle={`During my year at Korn Ferry, I designed multiple B2B software products in a fast-paced agile environment, focusing on mass and specialized hiring processes.

        Working closely with the development team, I created features ranging from AI-powered automatic account and website creation to comprehensive hiring process data visualization.

        Due to an NDA (Non-Disclosure Agreement), I cannot share the product screens.`}
      />

      <SingleImage
        src="/Work/KornFerry/korn-ferry.png"
        alt="Korn Ferry project preview"
      />
    </main>
  );
}
