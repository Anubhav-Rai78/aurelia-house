"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";
import { CONTACT_PAGE } from "@/lib/constants";
import { apiClient } from "@/lib/api/client";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();

  // Pre-populate from URL params
  const [formData, setFormData] = useState({
    checkin: searchParams.get("checkin") || "",
    checkout: searchParams.get("checkout") || "",
    room: searchParams.get("room") || "",
    guests: "2 Adults",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (searchParams.get("checkin")) {
      setFormData((prev) => ({ ...prev, checkin: searchParams.get("checkin")! }));
    }
    if (searchParams.get("checkout")) {
      setFormData((prev) => ({ ...prev, checkout: searchParams.get("checkout")! }));
    }
    if (searchParams.get("room")) {
      setFormData((prev) => ({ ...prev, room: searchParams.get("room")! }));
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setSubmitted(false);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await apiClient("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setSubmitted(true);
      e.currentTarget.reset();
    } catch {
      setError(true);
    }
  }

  return (
    <>
      <section className="bg-sand/30 pt-32 pb-16 md:pt-40 md:pb-[80px]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h1 className="text-display-lg text-center text-forest">{CONTACT_PAGE.headline}</h1>
          </SectionReveal>
        </div>
      </section>

      <section className="py-16 md:py-[80px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
          <SectionReveal className="md:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-label text-forest/60">NAME</label>
                  <input id="name" name="name" type="text" required
                    className="mt-2 w-full border-b border-forest/10 bg-transparent py-3 text-body text-forest focus:outline-none focus:border-terracotta transition-colors"
                    placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="text-label text-forest/60">EMAIL</label>
                  <input id="email" name="email" type="email" required
                    className="mt-2 w-full border-b border-forest/10 bg-transparent py-3 text-body text-forest focus:outline-none focus:border-terracotta transition-colors"
                    placeholder="you@email.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="text-label text-forest/60">PHONE</label>
                  <input id="phone" name="phone" type="tel"
                    className="mt-2 w-full border-b border-forest/10 bg-transparent py-3 text-body text-forest focus:outline-none focus:border-terracotta transition-colors"
                    placeholder="+91 …" />
                </div>
                <div>
                  <label htmlFor="guests" className="text-label text-forest/60">GUESTS</label>
                  <select id="guests" name="guests"
                    className="mt-2 w-full cursor-pointer border-b border-forest/10 bg-transparent py-3 text-body text-forest focus:outline-none">
                    {CONTACT_PAGE.guestOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="checkin" className="text-label text-forest/60">CHECK-IN</label>
                  <input 
                    id="checkin" 
                    name="checkin" 
                    type="date"
                    defaultValue={formData.checkin}
                    className="mt-2 w-full border-b border-forest/10 bg-transparent py-3 text-body text-forest focus:outline-none" 
                  />
                </div>
                <div>
                  <label htmlFor="checkout" className="text-label text-forest/60">CHECK-OUT</label>
                  <input 
                    id="checkout" 
                    name="checkout" 
                    type="date"
                    defaultValue={formData.checkout}
                    className="mt-2 w-full border-b border-forest/10 bg-transparent py-3 text-body text-forest focus:outline-none" 
                  />
                </div>
              </div>

              <div>
                <label htmlFor="room" className="text-label text-forest/60">ROOM PREFERENCE</label>
                <select 
                  id="room" 
                  name="room"
                  defaultValue={formData.room}
                  className="mt-2 w-full cursor-pointer border-b border-forest/10 bg-transparent py-3 text-body text-forest focus:outline-none"
                >
                  {CONTACT_PAGE.roomOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="text-label text-forest/60">MESSAGE</label>
                <textarea id="message" name="message" rows={4}
                  className="mt-2 w-full resize-none border-b border-forest/10 bg-transparent py-3 text-body text-forest focus:outline-none focus:border-terracotta transition-colors"
                  placeholder="Any special requests or questions" />
              </div>

              {submitted && <p className="text-body-sm text-forest">{CONTACT_PAGE.successMessage}</p>}
              {error && <p className="text-body-sm text-terracotta">{CONTACT_PAGE.errorMessage}</p>}

              <Button type="submit" variant="primary" className="w-full md:w-auto">
                {CONTACT_PAGE.submitCta}
              </Button>
            </form>
          </SectionReveal>

          <SectionReveal className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <h2 className="text-label text-forest/60">GET IN TOUCH</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-body font-medium text-forest">Address</h3>
                  <address className="mt-2 text-body-sm text-charcoal not-italic leading-relaxed">
                    Aurelia House<br />12 Princess Street,<br />Fort Kochi, Kerala 682001, India
                  </address>
                </div>
                <div>
                  <h3 className="text-body font-medium text-forest">Reservations</h3>
                  <a href="tel:+914800002148" className="mt-2 block text-body-sm text-charcoal transition-colors hover:text-terracotta">
                    +91 480 000 2148
                  </a>
                </div>
                <div>
                  <h3 className="text-body font-medium text-forest">Email</h3>
                  <a href="mailto:stay@aureliahouse.in" className="mt-2 block text-body-sm text-charcoal transition-colors hover:text-terracotta">
                    stay@aureliahouse.in
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}