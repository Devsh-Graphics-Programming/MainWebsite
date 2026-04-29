import CTAButton from "./CTAButton";

export default function HeroHeader() {
  return (
    <section className="w-full pt-8 pb-10 sm:pt-12 sm:pb-14">
      <div className="flex flex-col items-center text-center gap-5 sm:gap-7">
        <h1 className="!my-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
          Elite Graphics &amp; Performance
        </h1>

        <CTAButton />
      </div>
    </section>
  );
}
