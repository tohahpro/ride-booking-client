// src/components/Footer.tsx
import { Facebook, Twitter, Instagram, Mail, MapPin } from "lucide-react"
import { Link } from "react-router"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-gray-600">
        {/* Brand + About */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-3">RideFlow</h2>
          <p className="text-sm leading-relaxed">
            Book affordable, safe, and fast rides at your fingertips. 
            Move smarter with RideFlow — your trusted companion on the road.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-600 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Get Started</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="#" className="hover:text-blue-600 transition">Login</Link></li>
            <li><Link to="#" className="hover:text-blue-600 transition">Register</Link></li>
            <li><Link to="/faq" className="hover:text-blue-600 transition">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Get in Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-blue-600" /> support@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-600" /> Dhaka, Bangladesh
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 bg-blue-100 rounded-full hover:bg-blue-600 hover:text-white transition"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} RideFlow. All rights reserved.
      </div>
    </footer>
  )
}
