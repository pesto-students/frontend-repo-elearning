
import img from '../../app/public/elearning-logo.svg';

const HeroSection = () => {
    return (
        <section className="relative ui-hero hero-svg-layer-2 bg-[#8089ff] text-white h-screen overflow-hidden" 
        style={{background:`url(${img})`}}>
            <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp">
                    Welcome to e-Learning
                </h1>
                <p className="text-lg mb-6">
                Empower your learning with AI-driven solutions, offering personalized education, automated lecture summaries, and question paper generation for schools and colleges.
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
                        src="https://res.cloudinary.com/dy4zxtxoe/image/upload/v1725652661/dashboard-removebg-preview_pwgxlg.png"
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