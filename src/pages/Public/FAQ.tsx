import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  Users,
  Car,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";

const faqs = [
  {
    category: "General Questions",
    icon: <HelpCircle className="h-5 w-5 text-indigo-500" />,
    questions: [
      {
        q: "What is RideShare?",
        a: "RideShare is a platform that connects riders with nearby drivers for safe, affordable, and convenient transportation.",
      },
      {
        q: "Which cities do you operate in?",
        a: "We currently operate in major cities across Bangladesh and are expanding to new areas soon.",
      },
      {
        q: "Is RideShare available 24/7?",
        a: "Yes, RideShare operates 24/7, depending on driver availability in your area.",
      },
    ],
  },
  {
    category: "For Riders",
    icon: <Users className="h-5 w-5 text-indigo-500" />,
    questions: [
      {
        q: "How do I book a ride?",
        a: "Open the app, set your pickup and destination, choose your ride type, and confirm the booking.",
      },
      {
        q: "Can I schedule a ride in advance?",
        a: "Yes, you can schedule rides up to 7 days ahead from the “Schedule Ride” option.",
      },
      {
        q: "How is fare calculated?",
        a: "Fares are based on distance, time, and demand (surge pricing may apply).",
      },
    ],
  },
  {
    category: "For Drivers",
    icon: <Car className="h-5 w-5 text-indigo-500" />,
    questions: [
      {
        q: "How do I become a driver?",
        a: "Sign up, upload required documents, and get verified by our team.",
      },
      {
        q: "How are drivers paid?",
        a: "Payments are made weekly through bank transfer or mobile payment.",
      },
      {
        q: "Can I reject a ride request?",
        a: "Yes, but frequent cancellations may affect your rating and incentives.",
      },
    ],
  },
  {
    category: "Payment & Support",
    icon: <CreditCard className="h-5 w-5 text-indigo-500" />,
    questions: [
      {
        q: "What payment methods are supported?",
        a: "Cash, credit/debit cards, and mobile wallets are accepted.",
      },
      {
        q: "How can I contact support?",
        a: "You can chat with us through the app or email support@example.com.",
      },
      {
        q: "What if I left an item in the car?",
        a: "Go to “Trip History” → select your ride → tap “Report Lost Item”.",
      },
    ],
  },
  {
    category: "Safety & Support",
    icon: <ShieldCheck className="h-5 w-5 text-indigo-500" />,
    questions: [
      {
        q: "How does RideShare ensure my safety?",
        a: "We verify all drivers through background checks, vehicle inspections, and continuous safety training.",
      },
      {
        q: "Can I share my trip with someone for safety?",
        a: "Yes, you can share your live trip status with friends or family so they can track your journey in real-time.",
      },
      {
        q: "What should I do in case of an emergency?",
        a: "Use the in-app SOS button to alert local authorities and our safety team immediately.",
      },
      {
        q: "Are rides monitored by RideShare?",
        a: "Yes, our system continuously monitors ride activity to detect unusual behavior or route deviations.",
      },
      {
        q: "Can I report a driver or rider for unsafe behavior?",
        a: "Yes, after your trip ends, you can report any issue directly through the app for quick investigation.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h1>

        {faqs.map((section, i) => (
          <Card
            key={i}
            className="mb-8 border shadow-sm rounded-2xl overflow-hidden"
          >
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              {section.icon && (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
                  {section.icon}
                </div>
              )}
              <CardTitle className=" text-xl md:text-2xl font-bold">
                {section.category}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((item, j) => (
                  <AccordionItem
                    key={j}
                    value={`item-${i}-${j}`}
                    className="rounded-lg border my-2"
                  >
                    <AccordionTrigger className="px-4 hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}

        <div className="text-center mt-10">
          <p className="">
            Didn’t find what you’re looking for?{" "}
            <Link
              to="/contact"
              className=" font-medium hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
