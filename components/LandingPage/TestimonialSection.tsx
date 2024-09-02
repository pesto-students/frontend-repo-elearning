// import { Carousel } from '@mantine/carousel';
// import { useMediaQuery } from '@mantine/hooks';
// import { IconStar } from '@tabler/icons-react';

// const TestimonialSection = () => {
//   const testimonials = [
//     {
//       name: "Scott Ross",
//       role: "Sofash User",
//       review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
//       rating: 4.5,
//     },
//     {
//       name: "Kevin Strauser",
//       role: "Sofash User",
//       review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
//       rating: 4,
//     },
//     {
//       name: "Teresa Morrison",
//       role: "Sofash User",
//       review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
//       rating: 5,
//     },
//     {
//       name: "Eunice Spaulding",
//       role: "Sofash User",
//       review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
//       rating: 4,
//     },
//     {
//       name: "Barry Harris",
//       role: "Sofash User",
//       review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
//       rating: 3.5,
//     },
//     {
//       name: "Walter Chavez",
//       role: "Sofash User",
//       review: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
//       rating: 4.5,
//     },
//   ];

//   const renderStars = (rating: number) => {
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 !== 0;
//     const stars = [];

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<IconStar key={i} className="h-5 w-5 text-yellow-500" />);
//     }

//     if (halfStar) {
//       stars.push(<IconStar key={fullStars} className="h-5 w-5 text-yellow-500 opacity-50" />);
//     }

//     return stars;
//   };

//   const isMobile = useMediaQuery('(max-width: 768px)');

//   return (
//     <section className="py-16 bg-gray-100" id="client">
//       <div className="max-w-[1140px] mx-auto px-6 text-center">
//         <div className="mb-12">
//           <div className="text-indigo-600 text-5xl">
//             <i className="mdi mdi-account-multiple"></i>
//           </div>
//           <h3 className="text-4xl font-bold mt-3 mb-4 border-b-4 border-indigo-500 inline-block pb-2">What Our Users Say</h3>
//           <p className="text-gray-600 mt-4 max-w-xl mx-auto">
//             Discover how our AI-powered platform is enhancing learning experiences and simplifying educational management.
//           </p>
//         </div>

//         <Carousel
//           withIndicators
//           loop
//           autoplay
//           height="auto"
//           slideSize="100%"
//           breakpoints={[
//             { maxWidth: 'sm', slideSize: '100%' },
//             { maxWidth: 'md', slideSize: '50%' },
//             { maxWidth: 'lg', slideSize: '33.3333%' },
//           ]}
//           slideGap="md"
//           align="center"
//         >
//           {testimonials.map((testimonial, index) => (
//             <Carousel.Slide key={index}>
//               <div className="bg-white p-6 rounded-lg shadow-lg">
//                 <div className="text-indigo-600 text-5xl mb-4">
//                   <i className="pe-7s-smile"></i>
//                 </div>
//                 <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
//                 <p className="font-bold text-gray-800">{testimonial.name}</p>
//                 <p className="text-gray-500 mb-2">{testimonial.role}</p>
//                 <div className="flex justify-center">{renderStars(testimonial.rating)}</div>
//               </div>
//             </Carousel.Slide>
//           ))}
//         </Carousel>
//       </div>
//     </section>
//   );
// }

// export default TestimonialSection;
