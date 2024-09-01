
import { APP_NAME } from '@/app/constant/app-constant';
import { faFacebookF, faGooglePlusG, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MapPinIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { IconMail } from '@tabler/icons-react';
import AppLogo from '../AppLogo/AppLogo';

const FooterSection = () => {
    return (
        <footer className="relative bg-cover bg-center bg-no-repeat py-16 pb-[0px] bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1 - Logo and Description */}
            <div className="flex flex-col mb-8">
              <div className="mb-6">
                <a href="#">
                    <AppLogo></AppLogo>
                </a>
              </div>
              <p className="text-gray-300 mb-6">
              Welcome to {APP_NAME}, your go-to solution for transforming educational institutions. We provide powerful tools to streamline school management and enhance learning experiences. Join us and revolutionize the way education is delivered.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  <FontAwesomeIcon icon={faFacebookF} className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">
                  <FontAwesomeIcon icon={faGooglePlusG} className="h-6 w-6" />
                </a>
              </div>
            </div>
  
            {/* Column 2 - Company News */}
            <div>
              <h5 className="text-lg font-semibold mb-4 border-b-2 border-blue-400 pb-2 text-white">Company News</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Partners</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Career</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Reviews</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Terms & Conditions</a></li>
              </ul>
            </div>
  
            {/* Column 3 - Useful Links */}
            <div>
              <h5 className="text-lg font-semibold mb-4 border-b-2 border-blue-400 pb-2 text-white">Useful Links</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Project</a></li>
                <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-300">Our Team</a></li>
              </ul>
            </div>
  
            {/* Column 4 - Contact Us */}
            <div>
              <h5 className="text-lg font-semibold mb-4 border-b-2 border-blue-400 pb-2 text-white">Contact Us</h5>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 text-gray-300">
                  <PhoneIcon className="h-6 w-6 text-gray-300" />
                  <span>1800-121-3637<br />+91 555 234-8765</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <IconMail className="h-6 w-6 text-gray-300" />
                  <span><a href="mailto:info@example.com">info@example.com</a><br /><a href="mailto:sale@example.com">sale@example.com</a></span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <MapPinIcon className="h-6 w-6 text-gray-300" />
                  <span>380 St Kilda Road, Melbourne<br />VIC 3004, Australia</span>
                </li>
              </ul>
            </div>
          </div>
  
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-gray-300 mb-2">&copy; 2024 Brand. All Rights Reserved.</p> 
          </div>
        </div>
      </footer>
    );
}

export default FooterSection;