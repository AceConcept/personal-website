import TitleDescription from "@/app/components/portfolio-components/TitleDescription";
import MultipleImage from "@/app/components/portfolio-components/MultipleImage";

export default function ValentiaDesignPage() {
  return (
    <main>
      <TitleDescription
        title="Valentia"
        breadcrumbs={[
          { label: "design-gallery", href: "/design-gallery" },
          { label: "Valentia Dashboard", href: "/design-gallery/valentia" },
        ]}
        leftSubtitle="Valentia is a trading analysis platform for cryptocurrency traders. It provides tools for viewing and comparing the price and technical data of multiple tokens simultaneously within a single workspace."
        rightSubtitle={`Valentia's first page is a dashboard built for searching cryptocurrency tokens and viewing fundamental data for a single asset. It provides a live price chart, key technical indicators, and a summary of recent activity for the selected token. We generate insights on strategy around a single token based on the timeframe.\n\u00A0\nFrom the main dashboard move a token over to activate a multi token trade view, that will allow you to view two candle-stick charts at once and get insights on trade strategy.\n\u00A0\nMulti-Token Comparison features a side-by-side comparison of two selected cryptocurrency charts, allowing for direct visual analysis of price action, trends, and volatility against one another. The entire page updates to show we are now in a Multi-Token setting. New strategies are generated to account for a multi token comparison perspectives.\n\u00A0\nSelect one of the cards below the chart to generate several insights based on comparisons and patterns in the market. You can also change coins on the fly and generate new strategies.`}
      />

      <MultipleImage
        enableOverlay
        images={[
          { src: "/Gallery/Valentia/XPtWbHbkSsCLOBjiMpEhi7rQ5GA.png", alt: "Valentia dashboard view 1" },
          { src: "/Gallery/Valentia/6aoPfrOypg3USP9NtRAuHE7o.png", alt: "Valentia dashboard view 2" },
          { src: "/Gallery/Valentia/rREdYdoTik1vupOnJn3CRB1CCOQ.png", alt: "Valentia dashboard view 3" },
          { src: "/Gallery/Valentia/ruVe7171IxlcZLZBRZKs3TlCU.png", alt: "Valentia dashboard view 4" },
        ]}
      />
    </main>
  );
}


