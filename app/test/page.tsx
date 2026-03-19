import {
  TitleDescription,
  SubTitle,
  SingleImage,
  MultipleImage,
} from "../components/portfolio-components";

export default function TestPage() {
  return (
    <main className="portfolio-test-page">
      <section style={{ marginBottom: "3rem" }}>
        <TitleDescription
          title="Valentia"
          breadcrumbs={[
            { label: "design-gallery", href: "/design-gallery" },
            { label: "Valentia Dashboard" },
          ]}
          leftSubtitle="The silver-haired Bard drew back the string of their Terpander Lux, the rhythmic pulse of the Wanderer's."
          rightSubtitle="The silver-haired Bard drew back the string of their Terpander Lux, the rhythmic pulse of the Wanderer's Minuet guiding their breathing as the Interdimensional Rift shuddered. Before them stood the chillingly synchronized forms of Omega-M and Omega-F. The air crackled with latent aether as the pair moved in perfect unison—a dance of destruction honed across countless battles. With a shared nod, they closed in, weapons gleaming under the fractured light of the Rift. The Bard's fingers found the familiar grooves of their instrument, and the first note rang out, sharp and clear, a challenge and a promise."
        />
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <SubTitle
          showSubtitle
          subtitleText="The silver-haired Bard drew back the string of their Terpander Lux, the rhythmic pulse of the Wanderer’s."
        >
          SubTitle component
        </SubTitle>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <SubTitle>Single Image</SubTitle>
        <SingleImage
          src="https://picsum.photos/800/500"
          alt="Placeholder for single image"
          caption="Optional caption for the image."
        />
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <SubTitle>Multiple Image (grid)</SubTitle>
        <MultipleImage
          images={[
            { src: "https://picsum.photos/400/300?random=1", alt: "Grid image 1" },
            { src: "https://picsum.photos/400/300?random=2", alt: "Grid image 2" },
            { src: "https://picsum.photos/400/300?random=3", alt: "Grid image 3" },
          ]}
        />
      </section>
    </main>
  );
}
