

const HeroSection = () => {
    return (
        <section className="relative ui-hero hero-svg-layer-2 bg-[#8089ff] text-white h-screen overflow-hidden">
            <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp">
                    Welcome to e-Learning
                </h1>
                <p className="text-lg mb-6">
                    Empower your organization with a flexible e-learning platform. Customize features and onboard with ease.
                </p>
                <div className="flex space-x-4">
                    <a
                        href="#features"
                        className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg shadow-xl hover:opacity-90 animate-fadeInUp delay-600"
                    >
                        Explore Features
                    </a>
                    <a
                        href="#pricing"
                        className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg shadow-xl hover:opacity-90 animate-fadeInUp delay-600"
                    >
                        View Pricing
                    </a>
                </div>
                <div className="mt-10 animate-fadeInUp delay-400">
                    <img
                        src="/path/to/mockup-image.png"
                        alt="Applify - App Landing Page"
                        className="max-w-full mx-auto"
                        style={{ maxWidth: '1000px' }}
                    />
                </div>
            </div>
        </section>

    );
}

export default HeroSection;