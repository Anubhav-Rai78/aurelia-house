"use client";

import { useState } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SiteImage } from "@/components/ui/site-image";
import { DINING } from "@/lib/constants";
import { apiClient } from "@/lib/api/client";

export default function DiningPage() {
  const [tableForm, setTableForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: new Date().toISOString().slice(0, 10),
    timeSlot: "Dinner (7:30 PM)",
    partySize: "2",
    seatingPreference: "Indoor",
    specialRequests: "",
  });

  const [resSuccess, setResSuccess] = useState(false);
  const [resError, setResError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40">
          <h1 className="text-display-xl whitespace-pre-line text-ivory">
            {DINING.headline}
          </h1>
        </div>
      </section>

      {/* Body + Hours */}
      <section className="py-16 md:py-[100px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12">
          {/* Left — body text + hours */}
          <SectionReveal className="md:col-span-6">
            <p className="text-body-lg text-charcoal">{DINING.body}</p>
            <p className="mt-4 font-serif text-[28px] font-medium leading-[1.2] tracking-[0.05em] text-forest">
              {DINING.restaurantName}
            </p>

            <div className="mt-12">
              <h2 className="text-label text-terracotta">OPENING HOURS</h2>
              <dl className="mt-6 space-y-4">
                {DINING.hours.map((h) => (
                  <div key={h.label} className="flex items-baseline justify-between border-b border-forest/10 pb-4">
                    <dt className="text-body font-medium text-forest">{h.label}</dt>
                    <dd className="text-body-sm text-charcoal">{h.time}</dd>
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
            {DINING.categories.map((cat) => (
              <SectionReveal key={cat.title}>
                <h3 className="border-b border-forest/20 pb-3 text-label tracking-widest text-terracotta">
                  {cat.title}
                </h3>
                <dl className="mt-6 space-y-6">
                  {cat.items.map((item) => (
                    <div key={item.dish} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <dt className="text-display-sm text-forest">{item.dish}</dt>
                        {item.description && (
                          <dd className="mt-1 text-body-sm text-charcoal/80">{item.description}</dd>
                        )}
                      </div>
                      <dd className="mt-2 font-serif text-[20px] text-terracotta sm:mt-0 sm:pl-6">
                        {item.price}
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
                  <div>
                    <label htmlFor="res-name" className="text-label text-forest/60">YOUR NAME</label>
                    <input
                      id="res-name"
                      type="text"
                      required
                      value={tableForm.name}
                      onChange={(e) => setTableForm({ ...tableForm, name: e.target.value })}
                      className="mt-2 w-full border-b border-forest/15 bg-transparent py-2 text-body text-forest focus:outline-none"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="res-email" className="text-label text-forest/60">EMAIL ADDRESS</label>
                    <input
                      id="res-email"
                      type="email"
                      required
                      value={tableForm.email}
                      onChange={(e) => setTableForm({ ...tableForm, email: e.target.value })}
                      className="mt-2 w-full border-b border-forest/15 bg-transparent py-2 text-body text-forest focus:outline-none"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <label htmlFor="res-phone" className="text-label text-forest/60">PHONE</label>
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      value={tableForm.phone}
                      onChange={(e) => setTableForm({ ...tableForm, phone: e.target.value })}
                      className="mt-2 w-full border-b border-forest/15 bg-transparent py-2 text-body text-forest focus:outline-none"
                      placeholder="+91 …"
                    />
                  </div>
                  <div>
                    <DatePicker
                      label="DATE"
                      date={tableForm.date}
                      onDateChange={(val) => setTableForm({ ...tableForm, date: val })}
                      placeholder="Select date"
                    />
                  </div>
                  <div>
                    <label className="text-label text-forest/60">TIME SLOT</label>
                    <Select
                      value={tableForm.timeSlot}
                      onValueChange={(val) => setTableForm({ ...tableForm, timeSlot: val })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakfast (8:30 AM)">Breakfast (8:30 AM)</SelectItem>
                        <SelectItem value="Lunch (1:00 PM)">Lunch (1:00 PM)</SelectItem>
                        <SelectItem value="Dinner (7:30 PM)">Dinner (7:30 PM)</SelectItem>
                        <SelectItem value="Late Dinner (9:00 PM)">Late Dinner (9:00 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

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
