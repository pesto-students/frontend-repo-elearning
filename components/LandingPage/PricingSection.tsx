import { APP_NAME } from "@/app/constant/app-constant";

const PricingSection = () => {
    return (
        <section id="pricing" className="py-16 bg-white">
        <div className="max-w-[1140px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 border-b-4 border-indigo-500 inline-block pb-2">Pricing Plans</h2>
          <p className="text-gray-600 mb-12">
            At {APP_NAME}, we understand that every organization or individual has unique requirements. That's why our pricing is designed to be as flexible as your needs. Choose from our wide range of modules and services, and create a plan that works for you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Pay-As-You-Go</h3>
              <p className="text-gray-600 mb-6">For individuals and small organizations.</p>
              <p className="text-4xl font-bold mb-6">Starting from ₹100/module</p>
              <a href="#" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">Get Started</a>
            </div>
      
            <div className="border p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Custom Plans</h3>
              <p className="text-gray-600 mb-6">For medium to large organizations with specific needs.</p>
              <p className="text-4xl font-bold mb-6">Contact for Pricing</p>
              <a href="#" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">Contact Us</a>
            </div>
      
            <div className="border p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Enterprise Solutions</h3>
              <p className="text-gray-600 mb-6">For large enterprises with complex needs.</p>
              <p className="text-4xl font-bold mb-6">Starting from ₹50/user</p>
              <a href="#" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>
      

    );
}

export default PricingSection;