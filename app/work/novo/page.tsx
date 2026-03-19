import TitleDescription from "@/app/components/portfolio-components/TitleDescription";
import MultipleImage from "@/app/components/portfolio-components/MultipleImage";

export default function NovoPage() {
  return (
    <main>
      <TitleDescription
        title="Novo"
        breadcrumbs={[
          { label: "work", href: "/work" },
          { label: "Novo", href: "/work/novo" },
        ]}
        leftSubtitle="NOVO is an app built for small business owners, entrepreneurs, and freelancers. I led the UI/UX design in taking this project from an early rough draft to a complete project shipped to the app store."
        rightSubtitle={`When I first joined Novo it was a very early stage startup running out of the Barclays Bank Startup accelerator. I was hired as the sole UI designer to take the research done and the early stage project they had and make it something shippable to the app store.\n\nThe goal was to make the app look modern with a modular feel, that allowed room for future features to be added later on.\n\nThe dashboard was designed as the primary user touchpoint, focusing on modularity and intuitive user experience. Key features were strategically placed for easy access:\n\n• Account Balance / Recent Transactions / Send Money / Fund Your Novo Account\n\nThe onboarding process was carefully structured, requiring users to complete two key steps: approval from Novo's partner bank and an initial $50 deposit to unlock full functionality. Special dashboard states were implemented to guide users through this process seamlessly.\n\nThe payment system was engineered to be frictionless, with particular attention to the user experience when adding payees and transferring money.\n\n`}
      />

      <MultipleImage
        enableOverlay
        images={[
          { src: "/Work/Novo/novo-1.png", alt: "Novo view 1" },
          { src: "/Work/Novo/novo-2.png", alt: "Novo view 2" },
          { src: "/Work/Novo/novo-4.png", alt: "Novo view 4" },
          { src: "/Work/Novo/novo-5.png", alt: "Novo view 5" },
        ]}
      />
    </main>
  );
}
