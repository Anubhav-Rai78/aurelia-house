"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { CustomSelect } from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { CONTACT_PAGE, CONTACT } from "@/lib/constants";
import { apiClient } from "@/lib/api/client";
import { MapPin, Phone, Mail, Navigation, CheckCircle2 } from "lucide-react";
import { rooms } from "@/data/rooms";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();

  const guestOptions = CONTACT_PAGE.guestOptions.map((opt) => ({ label: opt, value: opt }));
  const roomOptions = rooms.map((room) => ({ label: room.name, value: room.name }));

  const [formData, setFormData] = useState({
    checkin: searchParams.get("checkin") || "",
    checkout: searchParams.get("checkout") || "",
    room: searchParams.get("room") || "",
    guests: searchParams.get("guests") || "2 Adults",
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
    if (searchParams.get("experience")) {
      const exp = searchParams.get("experience")!;
      setFormData((prev) => ({
        ...prev,
        message: `I would like to reserve the "${exp}" experience during my stay.`,
      }));
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitted(false);
    setSubmitting(true);

    const formPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      guests: formData.guests,
      checkin: formData.checkin,
      checkout: formData.checkout,
      room: !formData.room || formData.room === "Select a room" ? "Courtyard Room" : formData.room,
      message: formData.message,
    };

    try {
      const res: any = await apiClient("/api/reservation", {
        method: "POST",
        body: JSON.stringify(formPayload),
      });

      setSubmitted(true);
      setBookingCode(res?.bookingCode || "AH-RESERVATION");
    } catch (err: any) {
      setError(err.message || CONTACT_PAGE.errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="bg-sand/30 pb-16 pt-32 md:pb-[80px] md:pt-40">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <h1 className="text-display-lg text-center text-forest">{CONTACT_PAGE.headline}</h1>
            <p className="mt-3 text-center text-body text-forest/70">
              Complete your reservation request or connect directly with our Fort Kochi host team
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="py-16 md:py-[80px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
          <SectionReveal className="md:col-span-7">
            {submitted ? (
              <div className="rounded border border-forest/10 bg-ivory p-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-terracotta" />
                <span className="mt-4 block text-label text-terracotta">CONFIRMATION RECEIVED</span>
                <h2 className="mt-2 text-display-md text-forest">YOUR ROOM IS WAITING.</h2>
                <p className="mt-4 text-body text-charcoal">
                  Thank you, <span className="font-medium">{formData.name}</span>. Your reservation request has been registered under reference code:
                </p>
                <div className="my-6 inline-block rounded bg-forest/5 px-6 py-3 font-mono text-[20px] font-bold text-forest">
                  {bookingCode}
                </div>
                <p className="text-body-sm text-forest/70">
                  Our reservations team will send your formal confirmation and payment details to <span className="font-medium text-forest">{formData.email}</span> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField htmlFor="name" label="YOUR NAME *">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 w-full border-b border-forest/15 bg-transparent py-3 text-body text-forest transition-colors focus:border-terracotta focus:outline-none"
                      placeholder="Full Name"
                    />
                  </FormField>
                  <FormField htmlFor="email" label="EMAIL ADDRESS *">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 w-full border-b border-forest/15 bg-transparent py-3 text-body text-forest transition-colors focus:border-terracotta focus:outline-none"
                      placeholder="you@email.com"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField htmlFor="phone" label="PHONE NUMBER">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2 w-full border-b border-forest/15 bg-transparent py-3 text-body text-forest transition-colors focus:border-terracotta focus:outline-none"
                      placeholder="+91 …"
                    />
                  </FormField>
                  <CustomSelect
                    label="GUESTS"
                    name="guests"
                    value={formData.guests || undefined}
                    onValueChange={(val) => setFormData({ ...formData, guests: val })}
                    options={guestOptions}
                    placeholder="Select guests"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <DatePicker
                    label="CHECK-IN DATE"
                    date={formData.checkin ? parseISO(formData.checkin) : undefined}
                    onDateChange={(d) =>
                      setFormData((prev) => ({ ...prev, checkin: d ? format(d, "yyyy-MM-dd") : "" }))
                    }
                    placeholder="Select check-in"
                  />
                  <DatePicker
                    label="CHECK-OUT DATE"
                    date={formData.checkout ? parseISO(formData.checkout) : undefined}
                    onDateChange={(d) =>
                      setFormData((prev) => ({ ...prev, checkout: d ? format(d, "yyyy-MM-dd") : "" }))
                    }
                    placeholder="Select check-out"
                  />
                </div>

                <CustomSelect
                  label="ROOM PREFERENCE"
                  name="room"
                  value={formData.room || undefined}
                  onValueChange={(val) => setFormData({ ...formData, room: val })}
                  options={roomOptions}
                  placeholder="Select a room"
                />

                <FormField htmlFor="message" label="SPECIAL REQUESTS / NOTES">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 w-full resize-none border-b border-forest/15 bg-transparent py-3 text-body text-forest transition-colors focus:border-terracotta focus:outline-none"
                    placeholder="Dietary preferences, arrival time, or experience requests"
                  />
                </FormField>

                {error && <p className="text-body-sm text-terracotta">{error}</p>}

                <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={submitting}>
                  {submitting ? "SUBMITTING..." : CONTACT_PAGE.submitCta}
                </Button>
              </form>
            )}
          </SectionReveal>

          {/* Contact Details & Directions */}
          <SectionReveal className="md:col-span-5">
            <div className="rounded border border-forest/10 bg-ivory p-8 md:sticky md:top-32">
              <h2 className="text-label text-terracotta">GET IN TOUCH</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 text-body font-medium text-forest">
                    <MapPin className="h-4 w-4 text-terracotta" /> Address
                  </h3>
                  <address className="mt-2 text-body-sm not-italic leading-relaxed text-charcoal">
                    Aurelia House<br />12 Princess Street,<br />Fort Kochi, Kerala 682001, India
                  </address>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-body font-medium text-forest">
                    <Phone className="h-4 w-4 text-terracotta" /> Reservations
                  </h3>
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="mt-2 block text-body-sm text-charcoal transition-colors hover:text-terracotta">
                    {CONTACT.phone}
                  </a>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-body font-medium text-forest">
                    <Mail className="h-4 w-4 text-terracotta" /> Email
                  </h3>
                  <a href={`mailto:${CONTACT.email}`} className="mt-2 block text-body-sm text-charcoal transition-colors hover:text-terracotta">
                    {CONTACT.email}
                  </a>
                </div>

                <div className="border-t border-forest/10 pt-6">
                  <h3 className="flex items-center gap-2 text-body font-medium text-forest">
                    <Navigation className="h-4 w-4 text-terracotta" /> Arrival Guide
                  </h3>
                  <p className="mt-2 text-body-sm leading-relaxed text-forest/70">
                    {CONTACT.airportDistance}. Private airport chauffeur pick-up can be arranged upon request.
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
