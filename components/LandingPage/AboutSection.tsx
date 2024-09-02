import { APP_NAME } from "@/app/constant/app-constant";

const AboutSection = () => {
    return (
      <section className="bg-gray-100 py-16 bg-white">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 border-b-4 border-indigo-500 inline-block pb-2">
                About Us
            </h2>
            <p className="text-lg text-gray-600">
              Welcome to <strong>{ APP_NAME }</strong>, where we transform the way educational institutions operate and deliver learning. Our platform is designed to offer a comprehensive suite of features that cater to the diverse needs of schools, colleges, and training centers.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Mission */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                Our mission is to empower educational organizations with a flexible, scalable, and user-friendly platform that simplifies management and enhances the learning experience. We strive to provide innovative tools that support educators and learners, making education more accessible and effective.
              </p>
            </div>
  
            {/* Key Features */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Seamless onboarding for organizations with customizable features</li>
                <li>Advanced tools for managing students, teachers, and classes</li>
                <li>Interactive learning tools to engage students</li>
                <li>Advanced reporting and analytics for tracking progress</li>
                <li>Comprehensive support to help you make the most of our platform</li>
              </ul>
            </div>
  
            {/* Our Values */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h3>
              <p className="text-gray-600">
                At <strong>{APP_NAME}</strong>, we are committed to innovation, excellence, and customer satisfaction. We believe in creating solutions that drive educational success and support the growth of learning communities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;