import { IconBook, IconClipboardText, IconSchool } from "@tabler/icons-react";

const HowItsWorkSection = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-[#764BA2] to-[#667EEA]">
      <div className="max-w-[1140px] mx-auto px-6 text-center">
        <div className="mb-12">
          <h3 className="text-4xl font-bold text-white mb-4 border-b-4 border-indigo-500 inline-block pb-2">How It Works</h3>
          <p className="text-white mt-4">
            Discover how our platform can streamline your educational management and enhance learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="w-full px-4 mb-8">
            <div className="bg-white p-8 rounded-lg shadow-lg relative h-full">
              <div className="bg-blue-500 p-4 rounded-full inline-block text-white mb-4">
                <IconSchool className="h-12 w-12" />
              </div>
              <h4 className="text-xl font-semibold">Step 1: Register Your Organization</h4>
              <p className="mt-2 text-gray-600">
                Easily onboard your school, college, or training center and start managing your courses and students effortlessly.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="w-full px-4 mb-8">
            <div className="bg-white p-8 rounded-lg shadow-lg relative h-full">
              <div className="bg-indigo-500 p-4 rounded-full inline-block text-white mb-4">
                <IconBook className="h-12 w-12" />
              </div>
              <h4 className="text-xl font-semibold">Step 2: Create and Schedule Classes</h4>
              <p className="mt-2 text-gray-600">
                Set up your class schedules, assign teachers, and manage student enrollments with ease.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="w-full px-4 mb-8">
            <div className="bg-white p-8 rounded-lg shadow-lg relative h-full">
              <div className="bg-green-500 p-4 rounded-full inline-block text-white mb-4">
                <IconClipboardText className="h-12 w-12" />
              </div>
              <h4 className="text-xl font-semibold">Step 3: Monitor Progress and Results</h4>
              <p className="mt-2 text-gray-600">
                Track student performance, manage assignments, and generate comprehensive reports to drive academic success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
      );
}

export default HowItsWorkSection;