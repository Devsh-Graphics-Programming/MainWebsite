import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  profileUrl: string;
  profilePicture: string;
  companyIcon: string;
  testimonial: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Phil Langrishe",
    role: "Managing Director at Applications in Cadd",
    profileUrl: "https://www.linkedin.com/in/aic-phil/",
    profilePicture: "/testimonials/phil.jpg",
    companyIcon: "/partners/appscadd.png",
    testimonial:
      "Matt, Erfan and the rest of the Devsh team have been amazing to work with.  We presented them with a very difficult challenge which was to take a large and very old, plus some what outdated C++ codebase written for a different time, and bring it up to date so that we could make use of their Vulkan based Nabla graphics engine. They broke the challenge down into manageable chunks and then over the past few years have proceeded to inject lightening fast graphics into our application.  All agreed targets have been met on time, and on budget.  I can not thank them enough for the hard work and dedication they have shown towards achieving our goals.  Their knowledge and professionalism has been second to none!",
  },
  {
    name: "Yoran Bosman",
    role: "Partner & Software Architect",
    profileUrl: "https://www.linkedin.com/in/yoranbosman/",
    profilePicture: "/testimonials/yoran.jpg",
    companyIcon: "/partners/ditt.png",
    testimonial:
      "The DevSH team transformed our CPU render farm for architectural visualization into a scalable GPU-based system with outstanding performance and reliability. Their expertise and commitment to achieving the best results were clear throughout the project. They maintained full backward compatibility, ensuring a smooth transition with minimal disruption to our workflows.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="site-container relative">
        <div className="section-head mb-[var(--testimonial-heading-gap)]">
          <h2 className="section-heading">What our partners say</h2>
        </div>

        <div className="testimonial-quotes">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="testimonial-quote group/testimonial"
            >
              <div className="testimonial-author">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="testimonial-avatar">
                    <Image
                      src={testimonial.profilePicture}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div className="min-w-0">
                    <a
                      href={testimonial.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${testimonial.name} on LinkedIn`}
                      className="testimonial-profile-link"
                    >
                      <h3 className="testimonial-name">
                        {testimonial.name}
                      </h3>
                      <span className="testimonial-link-badge" aria-hidden="true">in</span>
                    </a>
                    <p className="testimonial-role">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="testimonial-company">
                  <Image
                    src={testimonial.companyIcon}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(min-width: 64rem) 4.5rem, 3.25rem"
                  />
                </div>
              </div>

              <p className="testimonial-text">
                &ldquo;{testimonial.testimonial}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
