/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Car, MapPin, DollarSign, Shield } from "lucide-react"

export default function FeaturesPage() {
  const riderFeatures = [
    {
      icon: <Car className="w-6 h-6 text-purple-600" />,
      title: "Real-Time Booking",
      desc: "Instantly find and book the nearest available car or bike with just a few taps.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-600" />,
      title: "Live GPS Tracking",
      desc: "Track your driver’s arrival and monitor your trip progress on the map in real-time.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-purple-600" />,
      title: "Transparent Pricing",
      desc: "Get upfront fare estimates and choose from multiple payment options (Cash, Card, MFS).",
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: "In-App Safety",
      desc: "Access SOS button, share your live location with trusted contacts, and review driver details.",
    },
  ]

  const driverFeatures = [
    {
      icon: <MapPin className="w-6 h-6 text-purple-600" />,
      title: "Route Optimization",
      desc: "Get the best route suggestions for faster pickups and efficient rides.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-purple-600" />,
      title: "Earnings Dashboard",
      desc: "Track your earnings, completed trips, and incentives easily in one place.",
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: "Safety Tools",
      desc: "Access emergency support and rider verification for safer rides.",
    },
    {
      icon: <Car className="w-6 h-6 text-purple-600" />,
      title: "Instant Bookings",
      desc: "Receive nearby ride requests instantly and manage availability in real-time.",
    },
  ]

  const adminFeatures = [
    {
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      title: "User Management",
      desc: "Monitor, verify, and manage riders and drivers seamlessly.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-purple-600" />,
      title: "Revenue Analytics",
      desc: "Track overall revenue, commission, and growth metrics through analytics dashboards.",
    },
    {
      icon: <Car className="w-6 h-6 text-purple-600" />,
      title: "Fleet Monitoring",
      desc: "Keep an eye on vehicle performance, maintenance, and service data.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-600" />,
      title: "Live Trip Oversight",
      desc: "View all ongoing trips and resolve incidents with a single click.",
    },
  ]

  const renderFeatures = (features: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 max-w-6xl mx-auto">
      {features.map((feature:any) => (
        <Card
          className="p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <CardContent className="flex flex-col items-center text-center">
            <div className="bg-purple-50 p-3 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm">{feature.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Powerful Features for Everyone
      </h1>

      <p className="text-gray-600 max-w-2xl mb-8">
        Our platform is designed to provide a seamless, safe, and efficient
        experience for riders, drivers, and administrators alike.
      </p>

      <Tabs defaultValue="rider" className="w-full flex flex-col items-center">
        <TabsList className="rounded-lg w-1/2 p-1 mb-10">
          <TabsTrigger
            value="rider"
            className="rounded-lg px-6 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Rider
          </TabsTrigger>
          <TabsTrigger
            value="driver"
            className="rounded-lg px-6 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Driver
          </TabsTrigger>
          <TabsTrigger
            value="admin"
            className="rounded-lg px-6 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
          >
            Admin
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rider">{renderFeatures(riderFeatures)}</TabsContent>
        <TabsContent value="driver">{renderFeatures(driverFeatures)}</TabsContent>
        <TabsContent value="admin">{renderFeatures(adminFeatures)}</TabsContent>
      </Tabs>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-2">
          Ready to Experience the Difference?
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Whether you're looking for a ride, a flexible job, or a robust
          platform to manage, RideShare has the tools you need.
        </p>
      </div>
    </div>
  )
}
