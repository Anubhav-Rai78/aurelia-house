"use client";

import { useState } from "react";
import { format, startOfDay } from "date-fns";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { CustomSelect } from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { SiteImage } from "@/components/ui/site-image";
import {
  MORA_BODY,
  MORA_HEADLINE,
  MORA_MEAL_SLOTS,
  MORA_RESTAURANT_NAME,
  MORA_SAMPLE_MENU,
  MENU_CATEGORY_LABELS,
} from "@/data/dining";
import { formatDateInputIST, parseLocalDateISO } from "@/lib/date";
import { apiClient } from "@/lib/api/client";
import { formatINRWhole } from "@/lib/utils";

export default function DiningPage() {
  const [tableForm, setTableForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: formatDateInputIST(new Date()),
    timeSlot: "Dinner (7:30 PM)",
    partySize: "2",
    seatingPreference: "Indoor",
    specialRequests: "",
  });

  const [resSuccess, setResSuccess] = useState(false);
  const [resError, setResError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const timeSlotOptions = MORA_MEAL_SLOTS.flatMap((slot) =>
    slot.reservationTimes.map((time) => ({ label: time, value: time }))
  );

  const partySizeOptions = Array.from({ length: 8 }, (_, i) => {
    const n = i + 1;
    return { label: n === 1 ? "1 Guest" : `${n} Guests`, value: String(n) };
  });

  const seatingOptions = [
    { label: "Indoor", value: "Indoor" },
    { label: "Courtyard", value: "Courtyard" },
  ];

  const menuSections = (
    Object.entries(MENU_CATEGORY_LABELS) as [keyof typeof MENU_CATEGORY_LABELS, string][]
  )
    .map(([category, title]) => ({
      title,
      items: MORA_SAMPLE_MENU.filter((item) => item.category === category),
    }))
    .filter((section) => section.items.length > 0);

  const handleTableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResError("");
    setResSuccess(false);
    setSubmitting(true);

    try {
      await apiClient("/api/dining-reservation", {
        method: "POST",
        body: JSON.stringify(tableForm),
      });
      setResSuccess(true);
      setTableForm((prev) => ({ ...prev, specialRequests: "" }));
    } catch (err: any) {
      setResError(err.message || "Failed to reserve table. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero — MORA headline over a cinematic dining image */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-forest">
        <div className="absolute inset-0">
          <SiteImage
            src="/images/dining-hero.jpg"
            alt="MORA restaurant interior in warm golden-hour light"
            caption="Cinematic MORA restaurant interior at golden hour"
            aspectRatio="h-full w-full"
            className="h-full w-full"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/30 to-transparent" aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-24 md:px-12 md:pb-24 md:pt-28">
          <h1 className="text-display-xl whitespace-pre-line text-ivory">
            {MORA_HEADLINE}
          </h1>
        </div>
      </section>

      {/* Body + Hours */}
      <section className="py-16 md:py-[100px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
          {/* Left — body text + hours */}
          <SectionReveal className="md:col-span-6">
            <p className="text-body-lg text-charcoal">{MORA_BODY}</p>
            <p className="mt-4 font-serif text-[28px] font-medium leading-[1.2] tracking-[0.05em] text-forest">
              {MORA_RESTAURANT_NAME}
            </p>

            <div className="mt-12">
              <h2 className="text-label text-terracotta">OPENING HOURS</h2>
              <dl className="mt-6 space-y-4">
                {MORA_MEAL_SLOTS.map((slot) => (
                  <div key={slot.id} className="flex items-baseline justify-between border-b border-forest/10 pb-4">
                    <dt className="text-body font-medium text-forest">{slot.label}</dt>
                    <dd className="text-body-sm text-charcoal">{slot.timeRange}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Button href="#reserve-table" variant="primary" className="mt-8">
              RESERVE A TABLE
            </Button>
          </SectionReveal>

          {/* Right — Chef Image */}
          <SectionReveal className="md:col-span-6">
            <div className="aspect-[4/5] overflow-hidden rounded">
              <SiteImage
                src="/images/dining-chef.jpg"
                alt="Chef plating modern coastal cuisine in MORA kitchen"
                caption="MORA Executive Chef at work"
                aspectRatio="h-full w-full"
                className="h-full w-full"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Complete MORA Menu Section */}
      <section id="full-menu" className="bg-sand/30 py-16 md:py-[120px]">
        <div className="mx-auto max-w-[1000px] px-6 md:px-12">
          <SectionReveal className="text-center">
            <span className="text-label text-terracotta">CURATED SELECTION</span>
            <h2 className="mt-2 text-display-md text-forest">THE MORA MENU</h2>
          </SectionReveal>

          <div className="mt-16 space-y-16">
            {menuSections.map((section) => (
              <SectionReveal key={section.title}>
                <h3 className="border-b border-forest/20 pb-3 text-label tracking-widest text-terracotta">
                  {section.title}
                </h3>
                <dl className="mt-6 space-y-6">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <dt className="text-display-sm text-forest">{item.name}</dt>
                        {item.description && (
                          <dd className="mt-1 text-body-sm text-charcoal/80">{item.description}</dd>
                        )}
                      </div>
                      <dd className="mt-2 font-serif text-[20px] text-terracotta sm:mt-0 sm:pl-6">
                        {formatINRWhole(item.price)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Table Reservation Form */}
      <section id="reserve-table" className="py-16 md:py-[120px]">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <SectionReveal className="text-center">
            <span className="text-label text-terracotta">TABLE RESERVATION</span>
            <h2 className="mt-2 text-display-lg text-forest">JOIN US AT MORA.</h2>
            <p className="mt-4 text-body text-charcoal">
              Book your table for breakfast, lunch, or evening coastal dining.
            </p>
          </SectionReveal>

          <SectionReveal className="mt-12 rounded border border-forest/10 bg-ivory p-8">
            {resSuccess ? (
              <div className="py-8 text-center">
                <span className="text-label text-terracotta">RESERVATION RECEIVED</span>
                <h3 className="mt-2 text-display-md text-forest">WE LOOK FORWARD TO SERVING YOU.</h3>
                <p className="mt-4 text-body text-charcoal">
                  Your table request at MORA has been logged. Our dining team will confirm via email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTableSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField htmlFor="res-name" label="YOUR NAME">
                    <input
                      id="res-name"
                      type="text"
                      required
                      value={tableForm.name}
                      onChange={(e) => setTableForm({ ...tableForm, name: e.target.value })}
                      className="mt-2 w-full border-b border-forest/15 bg-transparent py-2 text-body text-forest focus:outline-none"
                      placeholder="Name"
                    />
                  </FormField>
                  <FormField htmlFor="res-email" label="EMAIL ADDRESS">
                    <input
                      id="res-email"
                      type="email"
                      required
                      value={tableForm.email}
                      onChange={(e) => setTableForm({ ...tableForm, email: e.target.value })}
                      className="mt-2 w-full border-b border-forest/15 bg-transparent py-2 text-body text-forest focus:outline-none"
                      placeholder="you@email.com"
                    />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <FormField htmlFor="res-phone" label="PHONE">
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      value={tableForm.phone}
                      onChange={(e) => setTableForm({ ...tableForm, phone: e.target.value })}
                      className="mt-2 w-full border-b border-forest/15 bg-transparent py-2 text-body text-forest focus:outline-none"
                      placeholder="+91 …"
                    />
                  </FormField>
                  <DatePicker
                    label="DATE"
                    date={tableForm.date ? parseLocalDateISO(tableForm.date) : undefined}
                    onDateChange={(d) =>
                      setTableForm((prev) => ({
                        ...prev,
                        date: d ? format(d, "yyyy-MM-dd") : "",
                      }))
                    }
                    placeholder="Select date"
                    minDate={startOfDay(new Date())}
                  />
                  <CustomSelect
                    label="TIME SLOT"
                    name="timeSlot"
                    value={tableForm.timeSlot}
                    onValueChange={(val) => setTableForm((prev) => ({ ...prev, timeSlot: val }))}
                    options={timeSlotOptions}
                    placeholder="Select a time slot"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CustomSelect
                    label="PARTY SIZE"
                    name="partySize"
                    value={tableForm.partySize}
                    onValueChange={(val) => setTableForm((prev) => ({ ...prev, partySize: val }))}
                    options={partySizeOptions}
                    placeholder="Select party size"
                  />
                  <CustomSelect
                    label="SEATING PREFERENCE"
                    name="seatingPreference"
                    value={tableForm.seatingPreference}
                    onValueChange={(val) =>
                      setTableForm((prev) => ({ ...prev, seatingPreference: val }))
                    }
                    options={seatingOptions}
                    placeholder="Select seating"
                  />
                </div>

                <FormField htmlFor="res-requests" label="SPECIAL REQUESTS">
                  <textarea
                    id="res-requests"
                    name="specialRequests"
                    rows={3}
                    value={tableForm.specialRequests}
                    onChange={(e) => setTableForm({ ...tableForm, specialRequests: e.target.value })}
                    className="mt-2 w-full resize-none border-b border-forest/15 bg-transparent py-2 text-body text-forest focus:outline-none"
                    placeholder="Dietary needs, celebrations, seating notes…"
                  />
                </FormField>

                {resError && <p className="text-body-sm text-terracotta">{resError}</p>}

                <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                  {submitting ? "RESERVING..." : "RESERVE TABLE AT MORA"}
                </Button>
              </form>
            )}
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
