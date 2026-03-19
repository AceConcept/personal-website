import TitleDescription from "@/app/components/portfolio-components/TitleDescription";
import SingleImage from "@/app/components/portfolio-components/SingleImage";

export default function TheTradeDeskPage() {
  return (
    <main>
      <TitleDescription
        title="theTradeDesk"
        breadcrumbs={[
          { label: "work", href: "/work" },
          { label: "tradedesk", href: "/work/the-trade-desk" },
        ]}
        leftSubtitle="At The Trade Desk, I built and documented a scalable design system that unified the brand's digital presence across their main web platforms. "
        rightSubtitle={`The Trade Desk is a global technology company that provides a self-service demand-side platform (DSP), enabling advertisers to purchase and manage data-driven digital ad campaigns across the open internet, including video, display, and connected TV.
          
        I ensured scalability and reusability by adopting a mobile-first approach with responsive grids and layouts, creating modular components that adapt to different screen sizes, while allowing for easy customization through a drag and drop web design system. Everything following strict WCAG guidelines.
        
        My work at theTradeDesk is protected by NDA (Non Disclosure Agreement) so I am not able to show their design system.`}
      />

      <SingleImage
        src="/Work/TheTradeDesk/theTradedesk.webp"
        alt="The Trade Desk project preview"
      />
    </main>
  );
}
