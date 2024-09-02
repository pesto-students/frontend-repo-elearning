const PricingSection = () => {
    return (
        <section id="pricing" className="py-16 bg-white">
            <div className="max-w-[1140px] mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-12 border-b-4 border-indigo-500 inline-block pb-2">Pricing Plans</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="border p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Basic Plan</h3>
                        <p className="text-gray-600 mb-6">For small organizations getting started.</p>
                        <p className="text-4xl font-bold mb-6">$29/month</p>
                        <a href="#" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">Get Started</a>
                    </div>

                    <div className="border p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Pro Plan</h3>
                        <p className="text-gray-600 mb-6">For growing organizations with advanced needs.</p>
                        <p className="text-4xl font-bold mb-6">$99/month</p>
                        <a href="#" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">Get Started</a>
                    </div>

                    <div className="border p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4">Enterprise Plan</h3>
                        <p className="text-gray-600 mb-6">For large organizations with custom requirements.</p>
                        <p className="text-4xl font-bold mb-6">Contact Us</p>
                        <a href="#" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">Contact Sales</a>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default PricingSection;