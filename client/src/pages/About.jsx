function About() {
  return (
    <div className="bg-void">
      {/* Section 1 — HEADER */}
      <section className="curtain-section z-10 bg-void flex flex-col justify-center relative">
        <div className="absolute top-0 left-0 leading-none select-none pointer-events-none text-[#111111] font-display text-[25vw] opacity-80">
          01
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="section-label mx-auto">/ ABOUT COMCARE</span>
          <h1 className="font-display text-display-xl uppercase text-ink leading-none mt-8 mb-8">
            WE BELIEVE EARLY<br />AWARENESS SAVES LIVES
          </h1>
          <p className="font-body font-light text-lg text-ink-muted max-w-xl mx-auto leading-relaxed">
            ComCare bridges the gap between people seeking early disease identification
            and the healthcare resources they need.
          </p>
        </div>
      </section>

      {/* Section 2 — MISSION */}
      <section className="curtain-section z-20 bg-surface">
        <div className="min-h-screen flex items-center px-6 sm:px-12 lg:px-24 py-section">
          <div className="grid md:grid-cols-12 gap-16 lg:gap-24 w-full">
            
            {/* Left Column (approx 60%) */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <span className="section-label">/ OUR MISSION</span>
              <h2 className="font-display text-display-sm uppercase text-ink leading-none mb-8">
                DEMOCRATIZE BASIC HEALTH SCREENING
              </h2>
              <p className="font-body font-light text-base text-ink-muted leading-loose mb-8">
                Our mission is to provide everyone with a free, intelligent, and private symptom checking tool, 
                while seamlessly connecting them to verified NGOs and local medical aid. We believe healthcare 
                information should be accessible, precise, and immediately actionable without compromising personal privacy.
              </p>
              
              <div className="border-l-2 border-accent pl-6 mt-8">
                <p className="font-display text-2xl uppercase text-ink leading-tight">
                  "EVERY PIXEL EXISTS FOR A REASON. EVERY RECOMMENDATION COULD CHANGE A LIFE."
                </p>
              </div>
            </div>

            {/* Right Column (approx 40%) */}
            <div className="md:col-span-5 flex items-center">
              <div className="bg-void border border-[#2A2A2A] w-full p-8 relative">
                <div className="absolute top-0 left-0 w-full h-px bg-accent" />
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-accent text-lg">⚠</span>
                  <span className="section-label mb-0">MEDICAL DISCLAIMER</span>
                </div>
                <p className="font-body font-light text-xs text-ink-muted leading-relaxed mb-8">
                  The content and tools provided on the ComCare platform are strictly for informational and educational purposes only. They are not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
                <p className="font-mono text-2xs text-ink-faint">
                  INFORMATIONAL USE ONLY — NOT A SUBSTITUTE FOR PROFESSIONAL ADVICE
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 3 — HOW IT WORKS */}
      <section className="curtain-section z-30 bg-void">
        <div className="min-h-screen py-section flex flex-col justify-center w-full">
          <div className="px-6 sm:px-12 lg:px-24 mb-16">
            <span className="section-label">/ THE PROCESS</span>
            <h2 className="font-display text-display-md uppercase text-ink leading-none">
              HOW IT WORKS
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row border-y border-[#222222]">
            {/* Step 1 */}
            <div className="flex-1 flex gap-8 items-start p-8 lg:p-12 lg:border-r border-[#222222] border-b lg:border-b-0">
              <span className="font-display text-[8rem] text-[#1A1A1A] leading-none select-none -mt-4">01</span>
              <div className="pt-4">
                <h3 className="font-display text-3xl uppercase text-ink">INPUT SYMPTOMS</h3>
                <div className="h-px w-12 bg-accent my-4" />
                <p className="font-body font-light text-sm text-ink-muted leading-relaxed">
                  Enter what you're feeling using our intelligent autocomplete system.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 flex gap-8 items-start p-8 lg:p-12 lg:border-r border-[#222222] border-b lg:border-b-0">
              <span className="font-display text-[8rem] text-[#1A1A1A] leading-none select-none -mt-4">02</span>
              <div className="pt-4">
                <h3 className="font-display text-3xl uppercase text-ink">AI ANALYSIS</h3>
                <div className="h-px w-12 bg-accent my-4" />
                <p className="font-body font-light text-sm text-ink-muted leading-relaxed">
                  Our engine compares your symptoms against a clinical database to provide a confidence-scored prediction.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 flex gap-8 items-start p-8 lg:p-12">
              <span className="font-display text-[8rem] text-[#1A1A1A] leading-none select-none -mt-4">03</span>
              <div className="pt-4">
                <h3 className="font-display text-3xl uppercase text-ink">GET HELP</h3>
                <div className="h-px w-12 bg-accent my-4" />
                <p className="font-body font-light text-sm text-ink-muted leading-relaxed">
                  View recommended actions and browse our directory of NGOs for professional medical support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
