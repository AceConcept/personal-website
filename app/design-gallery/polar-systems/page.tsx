import TitleDescription from "@/app/components/portfolio-components/TitleDescription";
import MultipleImage from "@/app/components/portfolio-components/MultipleImage";

export default function PolarSystemsDesignPage() {
  return (
    <main>
      <TitleDescription
        title="Polar Systems"
        breadcrumbs={[
          { label: "design-gallery", href: "/design-gallery" },
          { label: "Polar Systems", href: "/design-gallery/polar-systems" },
        ]}
        leftSubtitle="System for identifying high-priority database anomalies , intelligently chosing which one to investigate, and generate actionable solutions."
        rightSubtitle={`The anomaly detection process begins in a centralized catalog where the Leo2.0Y engine surfaces high-priority threats, such as Case #8846 on db-core-02.internal. By grouping complex behaviors like DNS loops and unauthorized port scans into visual cards, the system allows analysts to bypass raw logs and immediately identify critical risks. This bird’s-eye view is essential for recognizing severity patterns across the database infrastructure before drilling into specific incidents.\n\u00A0\nOnce a case is selected, the system provides a dynamic Node Graph and detailed host insights to map the threat’s trajectory. This visual relationship map highlights lateral movement and correlation strength between internal and external nodes, while time-based graphs pinpoint exactly when activity escalated. 
          
          Armed with this context, analysts can execute AI-generated remediation steps—such as isolating the host or replaying traffic—to quickly contain the intrusion and resolve the compromise.`}
      />

      <MultipleImage
        enableOverlay
        images={[
          { src: "/Gallery/polar-systems/polar-systems1.webp", alt: "Polar Systems view 1" },
          { src: "/Gallery/Polar-Systems%2003.png", alt: "Polar Systems view 2" },
          { src: "/Gallery/polar-systems/2.webp", alt: "Polar Systems view 3" },
        ]}
      />
    </main>
  );
}
