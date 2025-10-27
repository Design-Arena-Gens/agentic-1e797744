"use client";

import { useEffect, useMemo, useState } from "react";
import {
  type BaddiePlatform,
  type BaddieVibe,
  type GeneratedContent,
  generateBaddieContent,
  sanitizeKeywords,
} from "@/lib/baddie-generator";

type ContentLength = "flash" | "snackable" | "deep-dive";

const platformOptions: {
  value: BaddiePlatform;
  label: string;
  tagline: string;
}[] = [
  { value: "instagram", label: "Instagram", tagline: "Carousel, reels, captions" },
  { value: "tiktok", label: "TikTok", tagline: "Hooks, shots, transitions" },
  { value: "x", label: "X / Twitter", tagline: "Threads, clap-backs, quotables" },
  { value: "youtube", label: "YouTube", tagline: "Scripts, titles, cold opens" },
  { value: "newsletter", label: "Newsletter", tagline: "Subject lines, segments" },
];

const vibeOptions: { value: BaddieVibe; label: string; description: string }[] = [
  { value: "playful", label: "Playful", description: "Glitter, giggles, high-key fun" },
  { value: "luxury", label: "Luxury", description: "Couture clarity & quiet flexes" },
  { value: "rebellious", label: "Rebellious", description: "Rules? We ghosted them" },
  { value: "mentor", label: "Mentor", description: "Big sis energy, strategy first" },
  { value: "mystic", label: "Mystic", description: "Cosmic confidence, ethereal glow" },
];

const lengthOptions: { value: ContentLength; label: string; helper: string }[] = [
  { value: "flash", label: "Flash", helper: "30-60 words" },
  { value: "snackable", label: "Snackable", helper: "90-150 words" },
  { value: "deep-dive", label: "Deep Dive", helper: "200+ words" },
];

function CopyIcon({ copied }: { copied: boolean }) {
  return copied ? (
    <svg
      aria-hidden
      className="size-4 text-lime-300"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      viewBox="0 0 24 24"
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg
      aria-hidden
      className="size-4 text-fuchsia-200"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      viewBox="0 0 24 24"
    >
      <rect width="11" height="14" x="9" y="3" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 7v12a2 2 0 002 2h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleDivider() {
  return (
    <div className="relative flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-fuchsia-200/60">
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-fuchsia-200/40 to-transparent" />
      <span>Agent Logs</span>
      <span className="h-px w-12 bg-gradient-to-r from-transparent via-fuchsia-200/40 to-transparent" />
    </div>
  );
}

export default function Home() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<BaddiePlatform>("instagram");
  const [vibe, setVibe] = useState<BaddieVibe>("playful");
  const [length, setLength] = useState<ContentLength>("snackable");
  const [spiceLevel, setSpiceLevel] = useState(7);
  const [callToAction, setCallToAction] = useState("shop the drop");
  const [keywordsInput, setKeywordsInput] = useState("fashion tech, glow-up, launch");
  const [variations, setVariations] = useState(3);
  const [results, setResults] = useState<GeneratedContent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const personaPreview = useMemo(() => {
    if (!topic.trim()) return "Fill in a topic and let the baddie cook.";
    return `Strategizing ${topic.trim()} with ${spiceLevel}/10 spice for the ${vibe} persona.`;
  }, [topic, spiceLevel, vibe]);

  useEffect(() => {
    if (!copiedId) return;
    const timeout = window.setTimeout(() => setCopiedId(null), 1800);
    return () => window.clearTimeout(timeout);
  }, [copiedId]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setValidationError("Drop a topic so the agent knows what to amplify.");
      return;
    }

    setValidationError(null);
    setIsGenerating(true);

    const brief = {
      topic,
      platform,
      vibe,
      spiceLevel,
      callToAction,
      keywords: sanitizeKeywords(keywordsInput),
      length,
    } as const;

    await new Promise((resolve) => setTimeout(resolve, 420));
    const payload = Array.from({ length: variations }, () => generateBaddieContent(brief));

    setResults(payload);
    setIsGenerating(false);
  };

  const handleCopy = async (item: GeneratedContent) => {
    const assembled = `${item.headline}\n\n${item.body}\n\n${item.captionIdea}\n\n${item.hashtags.join(" ")}`;
    try {
      await navigator.clipboard.writeText(assembled);
      setCopiedId(item.id);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-12 sm:px-6 lg:px-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/25 via-slate-950/80 to-indigo-900/60 p-10 shadow-[0_30px_80px_rgba(8,3,25,0.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(246,124,255,0.18),_transparent_55%)]" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-fuchsia-100/80">
              Agent BΔDDIE // Content Operation
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              Craft scroll-stopping content with a cyber confident AI baddie.
            </h1>
            <p className="text-base text-fuchsia-100/80 sm:text-lg">
              Feed the agent a topic, pick the vibe, and watch her serve hooks, storytelling, and
              CTA magic that feels handcrafted for your brand universe.
            </p>
          </div>
          <div className="glass-card relative rounded-2xl px-6 py-5 text-sm text-fuchsia-100/90 backdrop-blur-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-200/70">
              Persona Preview
            </p>
            <p className="mt-2 text-base font-medium text-white/90">{personaPreview}</p>
          </div>
        </div>
      </section>

      <section className="glass-card relative grid grid-cols-1 gap-8 rounded-3xl px-7 py-8 backdrop-blur-xl lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-fuchsia-200/70">Topic</label>
            <textarea
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Soft launch strategy for a fashion-tech capsule collab"
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-base text-white shadow-inner outline-none transition focus:border-fuchsia-300/50 focus:ring-2 focus:ring-fuchsia-400/40"
              rows={3}
            />
            {validationError && <p className="mt-2 text-sm text-rose-200/80">{validationError}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-fuchsia-200/70">Platform</label>
              <div className="flex flex-col gap-2">
                {platformOptions.map((option) => {
                  const isActive = platform === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setPlatform(option.value)}
                      className={`group flex flex-col rounded-2xl border px-4 py-3 text-left transition ${
                        isActive
                          ? "border-fuchsia-400/80 bg-fuchsia-500/10"
                          : "border-white/10 bg-white/[0.04] hover:border-fuchsia-200/40"
                      }`}
                    >
                      <span className="text-sm font-semibold text-white">{option.label}</span>
                      <span className="text-xs text-fuchsia-100/80">{option.tagline}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-fuchsia-200/70">Persona Vibe</label>
              <div className="flex flex-col gap-2">
                {vibeOptions.map((option) => {
                  const isActive = vibe === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setVibe(option.value)}
                      className={`flex flex-col rounded-2xl border px-4 py-3 text-left transition ${
                        isActive
                          ? "border-indigo-300/80 bg-indigo-500/10"
                          : "border-white/10 bg-white/[0.04] hover:border-indigo-200/40"
                      }`}
                    >
                      <span className="text-sm font-semibold text-white">{option.label}</span>
                      <span className="text-xs text-indigo-100/80">{option.description}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-fuchsia-200/70">Length</label>
              <div className="flex flex-wrap gap-2">
                {lengthOptions.map((option) => {
                  const isActive = length === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setLength(option.value)}
                      className={`flex-1 rounded-2xl border px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? "border-fuchsia-300/80 bg-fuchsia-500/10 text-white"
                          : "border-white/10 bg-white/[0.05] text-fuchsia-100/80 hover:border-fuchsia-200/40"
                      }`}
                    >
                      <span>{option.label}</span>
                      <span className="ml-2 text-[11px] uppercase tracking-wide text-fuchsia-200/60">
                        {option.helper}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-fuchsia-200/70">
                Spice Level: {spiceLevel}/10
              </label>
              <input
                type="range"
                min={1}
                max={10}
                value={spiceLevel}
                onChange={(event) => setSpiceLevel(Number(event.target.value))}
                className="w-full cursor-pointer accent-fuchsia-400"
              />
              <p className="text-xs text-fuchsia-100/80">
                {spiceLevel > 7 ? "Expect mic drops & provocative hooks." : "Keeps it polished with subtle flexes."}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-fuchsia-200/70">
                Variations: {variations}
              </label>
              <input
                type="range"
                min={1}
                max={5}
                value={variations}
                onChange={(event) => setVariations(Number(event.target.value))}
                className="w-full cursor-pointer accent-indigo-400"
              />
              <p className="text-xs text-fuchsia-100/80">More variations = more angles to test.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-fuchsia-200/70">Call to Action</label>
              <input
                type="text"
                value={callToAction}
                onChange={(event) => setCallToAction(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none transition focus:border-fuchsia-300/50 focus:ring-2 focus:ring-fuchsia-400/40"
                placeholder="book your seat"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-fuchsia-200/70">
                Keywords or drops (comma-separated)
              </label>
              <input
                type="text"
                value={keywordsInput}
                onChange={(event) => setKeywordsInput(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white outline-none transition focus:border-indigo-300/50 focus:ring-2 focus:ring-indigo-400/40"
                placeholder="community, digital runway, AR filters"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="group inline-flex items-center justify-center rounded-full border border-fuchsia-200/40 bg-fuchsia-500/20 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:border-fuchsia-200/70 hover:bg-fuchsia-500/40"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="size-2 animate-ping rounded-full bg-white" />
                Processing
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-white" />
                Generate
              </span>
            )}
          </button>
        </div>

        <aside className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6">
          <h2 className="text-lg font-semibold text-white">Agent&apos;s Playbook</h2>
          <ul className="space-y-3 text-sm text-fuchsia-100/80">
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              Map your differentiator by stacking keywords — the algorithm loves specifics.
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              Spice 1-4: corporate chic. Spice 5-7: confident glam. Spice 8-10: viral chaos.
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              Test multiple variations, feed the winners back in, keep iterating the persona.
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              CTA should feel like a dare, a delight, or a door you only open for insiders.
            </li>
          </ul>
        </aside>
      </section>

      <section className="space-y-6">
        <SparkleDivider />
        {results.length === 0 ? (
          <div className="glass-card flex flex-col items-center justify-center gap-4 rounded-3xl px-8 py-14 text-center text-fuchsia-100/90">
            <div className="rounded-full border border-fuchsia-200/40 bg-fuchsia-500/20 px-6 py-2 text-xs uppercase tracking-[0.35em] text-white/90">
              Awaiting Brief
            </div>
            <p className="max-w-lg text-xl font-semibold text-white">
              Once you drop the brief, the AI baddie will serve multiple content angles ready for A/B
              testing.
            </p>
            <p className="max-w-md text-sm text-fuchsia-100/70">
              Bring receipts: mention launch names, moodboards, creators, or campaign vibes you want
              referenced.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {results.map((item) => (
              <article
                key={item.id}
                className="group relative flex flex-col gap-4 rounded-3xl border border-fuchsia-200/20 bg-gradient-to-b from-white/10 via-slate-900/60 to-black/80 p-6 text-fuchsia-100/90 shadow-[0_20px_60px_rgba(7,3,24,0.45)] transition hover:border-fuchsia-200/40"
              >
                <header className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-200/70">Digital Dossier</p>
                  <h3 className="text-lg font-semibold text-white">{item.headline}</h3>
                  <p className="text-sm text-indigo-100/80">Persona: {item.persona}</p>
                </header>
                <p className="text-sm leading-6 text-white/90">{item.body}</p>
                <div className="rounded-2xl border border-indigo-200/30 bg-indigo-500/10 px-4 py-3 text-sm text-white/90">
                  {item.captionIdea}
                </div>
                <div className="flex flex-wrap gap-2 text-xs tracking-wide text-fuchsia-100/80">
                  {item.hashtags.map((tag) => (
                    <span key={tag} className="rounded-full border border-fuchsia-200/30 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(item)}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/40 hover:bg-white/20"
                >
                  <CopyIcon copied={copiedId === item.id} />
                  {copiedId === item.id ? "Copied" : "Copy Mix"}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
