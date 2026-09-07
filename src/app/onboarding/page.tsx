'use client'

import { useMemo, useState } from 'react'

const subjects = [
  { name: 'Mathematics', detail: 'Algebra, Geometry & Spatial Logic', tag: 'Visual proofs', icon: '∿' },
  { name: 'Science', detail: 'Biology, Chemistry & Deep Space', tag: 'Real-world experiments', icon: '◉' },
  ]

const formats = [
  { name: 'Text', detail: 'Dyslexia-friendly typography & structured outlines.', icon: '▤' },
  { name: 'Visual', detail: 'Diagrams, color maps & spatial flowcharts.', icon: '◇' },
  { name: 'Audio', detail: 'Calm narration, soundscapes & read-aloud.', icon: '◖' },
  { name: 'Examples', detail: 'Real-world metaphors & relatable analogies.', icon: '✦' },
  { name: 'Step-by-step', detail: 'Deconstructed bite-sized scaffolding.', icon: '☷' },
  { name: 'Interactive', detail: 'Tactile sliders & exploratory widgets.', icon: '⌁' },
]

const paces = [
  { name: 'Short (~10–15 min)', detail: 'Gentle micro-chunks, low cognitive load. Ideal when energy is modest.', icon: 'ϟ' },
  { name: 'Normal (~20–30 min)', detail: 'Balanced flow with natural sensory breathers every ten minutes.', icon: '◌', recommended: true },
  { name: 'Extended (40+ min)', detail: "Immersive unhurried deep dive when you're in hyperfocus flow.", icon: '◒' },
]

const stepTitles = ['Getting to know you', 'Exploration', 'Preferences', 'Pace & Rhythm', 'Ready to learn']

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('Maya')
  const [calmMode, setCalmMode] = useState(false)
  const [dyslexiaFont, setDyslexiaFont] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState(['Mathematics', 'Science'])
  const [selectedFormats, setSelectedFormats] = useState(['Text', 'Visual', 'Examples', 'Step-by-step'])
  const [pace, setPace] = useState('Normal (~20–30 min)')

  const progress = `${step * 20}%`
  const selectedSummary = useMemo(() => selectedSubjects.length ? selectedSubjects.join(', ') : 'your chosen topics', [selectedSubjects])

  const toggleValue = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value])
  }

  return (
    <main className={`min-h-screen bg-[#faf8ff] text-[#131b2e] antialiased transition-colors ${calmMode ? 'saturate-[.85] bg-[#f7f9f8]' : ''} ${dyslexiaFont ? 'font-[Open-Dyslexic]' : ''}`}>
      <header className="sticky top-0 z-50 border-b border-[#e2e7ff]/70 bg-[#faf8ff]/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between gap-4 px-4 sm:px-8">
          <a href="#" className="flex shrink-0 items-center gap-3 rounded-lg p-1 text-[#0284c7] focus:outline-none focus:ring-2 focus:ring-sky-500">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-xl">♧</span>
            <span className="text-xl font-bold tracking-tight">Neura</span>
          </a>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button type="button" onClick={() => setCalmMode((value) => !value)} className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${calmMode ? 'bg-sky-100 text-sky-700' : 'bg-[#f2f3ff] text-[#40474f] hover:bg-[#e2e7ff]'}`}>☁ <span className="hidden md:inline">Calm Canvas</span></button>
            <button type="button" onClick={() => setDyslexiaFont((value) => !value)} className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${dyslexiaFont ? 'bg-sky-100 text-sky-700' : 'bg-[#f2f3ff] text-[#40474f] hover:bg-[#e2e7ff]'}`}>Tᵀ <span className="hidden md:inline">Dyslexia Font</span></button>
            <span className="hidden h-5 w-px bg-[#c0c7d1]/50 sm:block" />
            <button type="button" onClick={() => setStep(5)} className="rounded-lg px-2.5 py-1.5 text-xs text-[#40474f] transition hover:text-sky-600 sm:text-sm">Exit &amp; Save</button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-8 sm:px-6">
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-2 px-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-100/70 px-3.5 py-1.5 text-xs font-medium text-sky-800 sm:text-sm">♧ <span>No wrong answers • Take all the time you need</span></div>
          <div className="inline-flex items-center gap-1.5 text-xs text-[#40474f]">☁ <span>Auto-saving continuously</span></div>
        </div>

        <section className="mb-6 w-full rounded-2xl border border-[#e2e7ff]/50 bg-white p-4 shadow-sm">
          <div className="mb-2.5 flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-sm font-semibold text-sky-700"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-xs text-white">{step}</span>Step {step} of 5: {stepTitles[step - 1]}</span><span className="text-xs font-medium text-[#40474f]">{progress} completed</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-[#e2e7ff]"><div className="h-full rounded-full bg-sky-600 transition-all duration-500" style={{ width: progress }} /></div>
          <div className="grid grid-cols-5 gap-1 pt-3 text-center text-[11px] sm:text-xs">{['You', 'Topics', 'Formats', 'Rhythm', 'Ready'].map((label, index) => <button key={label} type="button" onClick={() => setStep(index + 1)} className={`flex flex-col items-center gap-1 ${step === index + 1 ? 'font-semibold text-sky-700' : 'text-[#40474f]/60'}`}><span className={`h-2 w-2 rounded-full ${step >= index + 1 ? 'bg-sky-600' : 'bg-[#e2e7ff]'}`} />{index + 1}. {label}</button>)}</div>
        </section>

        <section className="w-full rounded-2xl border border-[#e2e7ff]/60 bg-white p-6 shadow-[0_4px_24px_-2px_rgba(15,23,42,.05)] sm:p-10">
          {step === 1 && <StepShell eyebrow="Step 1 • Welcome" title="What should we call you?" description="A gentle starting point. There are no right or wrong answers."><label className="flex items-center justify-between text-sm font-medium">Preferred name or alias <span className="text-xs font-normal text-[#40474f]">Private to you</span></label><div className="relative mt-2"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Maya or Alex" className="h-12 w-full rounded-xl border border-[#c0c7d1]/60 bg-[#f2f3ff]/50 px-4 text-base outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200" /><span className="absolute right-4 top-3 text-xl text-sky-600">▣</span></div><p className="mt-2 text-xs text-[#40474f]">We'll use this name for friendly prompts and encouragement.</p><Footer onBack={() => setStep(5)} backLabel="Skip for now" onNext={() => setStep(2)} /></StepShell>}

          {step === 2 && <StepShell eyebrow="Step 2 • Exploration" title="What would you like to learn?" description="Choose the topics that spark your curiosity. You can change these anytime."><div className="grid gap-3.5 sm:grid-cols-2">{subjects.map((item) => { const selected = selectedSubjects.includes(item.name); return <SelectableCard key={item.name} selected={selected} onClick={() => toggleValue(item.name, setSelectedSubjects)}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-lg text-sky-600">{item.icon}</span><span className="min-w-0 flex-1"><strong className="block text-base">{item.name}</strong><small className="mt-0.5 block text-xs text-[#40474f]">{item.detail}</small><em className="mt-2 inline-block rounded-md bg-sky-100 px-2 py-0.5 text-[11px] not-italic text-sky-700">{item.tag}</em></span><span className="text-xl text-sky-600">{selected ? '✓' : '○'}</span></SelectableCard>})}</div><Footer onBack={() => setStep(1)} onNext={() => setStep(3)} /></StepShell>}

          {step === 3 && <StepShell eyebrow="Step 3 • Preferences" title="How do you like to learn?" description="Select all formats that feel natural and comfortable for your mind."><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{formats.map((item) => { const selected = selectedFormats.includes(item.name); return <button key={item.name} type="button" onClick={() => toggleValue(item.name, setSelectedFormats)} className={`flex min-h-36 flex-col justify-between gap-3 rounded-xl p-4 text-left transition hover:shadow-sm ${selected ? 'border-2 border-sky-600 bg-sky-50/60' : 'border border-[#c0c7d1]/40 bg-white hover:bg-[#f2f3ff]'}`}><span className="flex items-center justify-between"><span className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg ${selected ? 'bg-sky-600 text-white' : 'bg-[#eaedff] text-[#40474f]'}`}>{item.icon}</span><span className={selected ? 'text-sky-600' : 'text-[#c0c7d1]'}>{selected ? '✓' : '○'}</span></span><span><strong className="mb-1 block text-sm">{item.name}</strong><small className="text-xs leading-relaxed text-[#40474f]">{item.detail}</small></span></button>})}</div><Footer onBack={() => setStep(2)} onNext={() => setStep(4)} /></StepShell>}

          {step === 4 && <StepShell eyebrow="Step 4 • Pace & Rhythm" title="How long would you like to study at a time?" description="No timers or speed pressure. Just your preferred rhythm."><div className="flex flex-col gap-3.5">{paces.map((item) => { const selected = pace === item.name; return <button key={item.name} type="button" onClick={() => setPace(item.name)} className={`flex items-start justify-between gap-4 rounded-xl p-4 text-left transition hover:shadow-sm ${selected ? 'border-2 border-sky-600 bg-sky-50/60' : 'border border-[#c0c7d1]/40 bg-white hover:bg-[#f2f3ff]'}`}><span className="flex items-start gap-3.5"><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl ${selected ? 'bg-sky-600 text-white' : 'bg-[#eaedff] text-[#40474f]'}`}>{item.icon}</span><span><strong className="flex flex-wrap items-center gap-2 text-base">{item.name}{item.recommended && <em className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] not-italic text-sky-700">Recommended</em>}</strong><small className="mt-0.5 block text-sm text-[#40474f]">{item.detail}</small></span></span><span className={selected ? 'text-xl text-sky-600' : 'text-xl text-[#c0c7d1]'}>{selected ? '✓' : '○'}</span></button>})}</div><Footer onBack={() => setStep(3)} nextLabel="Review Profile" onNext={() => setStep(5)} /></StepShell>}

          {step === 5 && <StepShell eyebrow="✦  Step 5 • Ready to learn" title="Your space is prepared!" description="We've shaped your personal environment around your natural strengths."><div className="flex items-start gap-4 rounded-2xl border border-sky-200/80 bg-gradient-to-r from-sky-100/50 via-[#f2f3ff] to-sky-50/80 p-5 sm:items-center sm:p-6"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl text-sky-600 shadow-sm">♥</span><div><strong className="block text-xs text-sky-800">✓ Our Neuro-Affirming Promise</strong><p className="mt-1 text-base text-[#40474f]">Your learning space will adapt to you—not the other way around.</p></div></div><div className="grid gap-3 pt-1 sm:grid-cols-2"><Summary title="Learner" value={name || 'Your name'} /><Summary title="Topics" value={selectedSummary} /><Summary title="Formats" value={`${selectedFormats.length || 0} selected`} /><Summary title="Rhythm" value={pace} /></div><div className="flex flex-col items-center justify-between gap-3 border-t border-[#e2e7ff]/60 pt-6 sm:flex-row"><button type="button" onClick={() => setStep(4)} className="rounded-full bg-[#eaedff] px-5 py-2.5 text-sm font-medium transition hover:bg-[#e2e7ff]">← Back</button><button type="button" onClick={() => alert('Your Neura learning space is ready!')} className="rounded-full bg-sky-600 px-7 py-3 text-base font-medium text-white shadow-sm transition hover:bg-sky-700">Enter my learning space →</button></div></StepShell>}
        </section>
      </div>
    </main>
  )
}

function StepShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) { return <div className="flex flex-col gap-6"><div className="flex flex-col gap-2"><span className="text-xs font-semibold uppercase tracking-wider text-sky-600">{eyebrow}</span><h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1><p className="text-base leading-relaxed text-[#40474f]">{description}</p></div><div className="pt-1">{children}</div></div> }
function Footer({ onBack, onNext, nextLabel = 'Continue', backLabel = 'Back' }: { onBack: () => void; onNext: () => void; nextLabel?: string; backLabel?: string }) { return <div className="mt-6 flex items-center justify-between gap-3 border-t border-[#e2e7ff]/60 pt-6"><button type="button" onClick={onBack} className="rounded-full bg-[#eaedff] px-5 py-2.5 text-sm font-medium transition hover:bg-[#e2e7ff]">{backLabel}</button><button type="button" onClick={onNext} className="rounded-full bg-sky-600 px-7 py-3 text-base font-medium text-white shadow-sm transition hover:bg-sky-700">{nextLabel} →</button></div> }
function SelectableCard({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) { return <button type="button" onClick={onClick} className={`flex items-start justify-between gap-3 rounded-xl p-4 text-left transition hover:shadow-sm ${selected ? 'border-2 border-sky-600 bg-sky-50/60' : 'border border-[#c0c7d1]/40 bg-white hover:bg-[#f2f3ff]'}`}>{children}</button> }
function Summary({ title, value }: { title: string; value: string }) { return <div className="rounded-xl bg-[#f2f3ff]/70 p-4"><span className="block text-xs font-semibold uppercase tracking-wide text-sky-600">{title}</span><span className="mt-1 block text-sm text-[#40474f]">{value}</span></div> }
