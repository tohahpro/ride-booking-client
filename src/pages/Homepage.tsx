import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Car, User, ShieldCheck, DollarSign, Headphones, Star } from "lucide-react"
import { Link } from "react-router"



export default function HomePage() {

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">

            <section className="relative w-full bg-white overflow-hidden py-28 md:py-36">

                <div
                    className="absolute inset-0"
                    style={{
                        background: "radial-gradient(circle at top center, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0) 70%)",
                    }}
                ></div>
                <div className="relative z-10 flex flex-col items-center text-center px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold mb-4 text-gray-900"
                    >
                        Move Smarter with{" "}
                        <span className="text-blue-600 drop-shadow-sm">RideFlow</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600 max-w-2xl mx-auto mb-8"
                    >
                        Book affordable, safe, and fast rides at your fingertips.
                        <br className="hidden md:block" /> Your journey starts here.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-600 max-w-2xl mx-auto mb-8"
                    >
                        <div className="flex gap-6">
                            <Link to={`/rider/ride-request`}>
                                <Button>Booked Now</Button>
                            </Link>
                            <Link to={`/about`}>
                                <Button>About Us</Button>
                            </Link>
                        </div>

                    </motion.p>
                </div>
            </section>


            {/* Why Choose Us Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Choose Us</h2>
                    <p className="text-gray-500 mb-12">
                        We are committed to providing you with the best riding experience
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <ShieldCheck className="text-purple-600" size={28} />,
                                title: "Safe & Secure",
                                desc: "All drivers are verified with background checks and real-time ride tracking",
                            },
                            {
                                icon: <DollarSign className="text-purple-600" size={28} />,
                                title: "Best Prices",
                                desc: "Competitive pricing with no surprise charges. Upfront fare estimates",
                            },
                            {
                                icon: <Headphones className="text-purple-600" size={28} />,
                                title: "24/7 Support",
                                desc: "Round-the-clock customer support for any help you need",
                            },
                        ].map((item, i) => (
                            <Card
                                key={i}
                                className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <CardContent className="flex flex-col items-center text-center p-8">
                                    <div className="bg-purple-100 p-4 rounded-full mb-4">{item.icon}</div>
                                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>


            {/* Testimonials */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
                    <p className="text-gray-500 mb-12">
                        Don&apos;t just take our word for it. Hear from our satisfied customers.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                name: "Sarah Ahmed",
                                role: "Regular Rider",
                                text: "The best ride booking app I've used! Drivers are always professional and vehicles are clean.",
                                initials: "SA",
                            },
                            {
                                name: "Raj Sharma",
                                role: "Business Traveler",
                                text: "Perfect for my business trips. Reliable service and great customer support.",
                                initials: "RS",
                            },
                            {
                                name: "Fatima Begum",
                                role: "Student",
                                text: "Affordable prices and quick service. Love the real-time tracking feature!",
                                initials: "FB",
                            },
                        ].map((user, i) => (
                            <Card
                                key={i}
                                className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <CardContent className="p-8 text-left">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-gray-700 italic mb-6">&quot;{user.text}&quot;</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold">
                                            {user.initials}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>



            {/* Features */}
            <section className="py-20 ">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <Car className="text-blue-600" />, title: "Easy Booking", desc: "Book rides instantly anytime, anywhere." },
                        { icon: <User className="text-blue-600" />, title: "Verified Drivers", desc: "All drivers are background checked and verified." },
                        { icon: <Star className="text-blue-600" />, title: "Affordable Prices", desc: "Transparent fares and budget-friendly options." },
                    ].map((item, i) => (
                        <Card key={i} className="hover:shadow-lg transition-shadow">
                            <CardContent className="flex flex-col items-center text-center p-8">
                                <div className="bg-blue-100 p-4 rounded-full mb-4">{item.icon}</div>
                                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>


        </div>
    )
}
