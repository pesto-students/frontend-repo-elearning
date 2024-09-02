const CtaSection = () => {
    return (
        <section className="py-16 bg-indigo-600 text-white bg-[#1A488E]">
            <div className="max-w-[1140px] mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-lg mb-8">Onboard your organization today and start leveraging the power of EduFlex.</p>
                <a href="/signup" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 hover:text-white shadow-lg">Get Started</a>
            </div>
        </section>

    );
}

export default CtaSection;