import { Paragraph, Chapter } from "../components/TextUtils";
import { aboutParagraphs } from "../data/aboutContent";

export default function Page() {
    return (
        <main className="site-container-narrow section-pad flex flex-col gap-10 sm:gap-14">
            <Chapter title="Who We Are">
                <Paragraph>
                    {aboutParagraphs.map((paragraph, index) => (
                        <span key={index}>
                            {paragraph}
                            {index < aboutParagraphs.length - 1 && <><br /><br /></>}
                        </span>
                    ))}
                </Paragraph>
            </Chapter>
        </main>
    );
}
