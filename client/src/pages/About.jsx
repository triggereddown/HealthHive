function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
      <div className="text-center mb-16">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About ComCare
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          ComCare is an intelligent, scalable healthcare platform designed to bridge the gap between people seeking early disease identification and the healthcare resources they need.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20 animate-slide-up">
        <div className="bg-hero-gradient rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <h2 className="font-playfair text-2xl font-bold mb-4 relative z-10">Our Mission</h2>
          <p className="text-white/80 leading-relaxed mb-6 relative z-10">
            We believe that early awareness saves lives. Our mission is to democratize basic health screening by providing everyone with a free, intelligent, and private symptom checking tool, while seamlessly connecting them to verified NGOs and local medical aid.
          </p>
          <div className="h-1 w-12 bg-primary-300 rounded-full" />
        </div>
        
        <div className="space-y-6">
          <h2 className="font-playfair text-3xl font-bold text-gray-900">How it Works</h2>
          
          <div className="flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">1</div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Input Symptoms</h3>
              <p className="text-sm text-gray-600">Enter what you're feeling using our intelligent autocomplete system.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">2</div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">AI Analysis</h3>
              <p className="text-sm text-gray-600">Our engine compares your symptoms against a clinical database to provide a confidence-scored prediction.</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">3</div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Get Help</h3>
              <p className="text-sm text-gray-600">View recommended actions and browse our directory of NGOs for professional medical support.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 text-center max-w-3xl mx-auto">
        <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Medical Disclaimer</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          The content and tools provided on the ComCare platform are strictly for informational and educational purposes only. They are not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </div>
    </div>
  );
}

export default About;
