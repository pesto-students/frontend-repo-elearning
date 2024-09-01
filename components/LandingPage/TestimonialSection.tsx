import { StarIcon } from '@heroicons/react/24/solid';
import Slider from 'react-slick';

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Scott Ross",
      role: "Sofash User",
      review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      rating: 4.5,
    },
    {
      name: "Kevin Strauser",
      role: "Sofash User",
      review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      rating: 4,
    },
    {
      name: "Teresa Morrison",
      role: "Sofash User",
      review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      rating: 5,
    },
    {
      name: "Eunice Spaulding",
      role: "Sofash User",
      review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      rating: 4,
    },
    {
      name: "Barry Harris",
      role: "Sofash User",
      review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      rating: 3.5,
    },
    {
      name: "Walter Chavez",
      role: "Sofash User",
      review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      rating: 4.5,
    },
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} className="h-5 w-5 text-yellow-500" />);
    }

    if (halfStar) {
      stars.push(<StarIcon key={fullStars} className="h-5 w-5 text-yellow-500 opacity-50" />);
    }

    return stars;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Default for mobile
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Tablets and larger devices
        settings: {
          slidesToShow: 3, // Show 3 testimonials at once
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 1, // Show 1 testimonial at a time
        },
      },
    ],
  };

  return (
    <section className="py-16 bg-gray-100" id="client">
      <div className="max-w-[1140px] mx-auto px-6 text-center">
        <div className="mb-12">
          <div className="text-indigo-600 text-5xl">
            <i className="mdi mdi-account-multiple"></i>
          </div>
          <h3 className="text-4xl font-bold mt-3 mb-4 border-b-4 border-indigo-500 inline-block pb-2">Our People Says</h3>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            We showcase only the best websites, portfolios, and landing pages built with passion, simplicity, and creativity!
          </p>
        </div>

        <div className="relative shadow-lg rounded-lg overflow-hidden"> {/* Added shadow and rounded corners */}
          <Slider {...sliderSettings} className="w-full">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <div className="text-indigo-600 text-5xl mb-4">
                  <i className="pe-7s-smile"></i>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
                <p className="font-bold text-gray-800">{testimonial.name}</p>
                <p className="text-gray-500 mb-2">{testimonial.role}</p>
                <div className="flex justify-center">{renderStars(testimonial.rating)}</div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
