import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Shield, Users, Zap, Globe } from "lucide-react";

export function Mission() {
    const values = [
        {
            icon: Shield,
            title: "Safety First",
            description:
                "Every ride is monitored with real-time tracking and driver verification",
        },
        {
            icon: Heart,
            title: "Customer Focus",
            description:
                "We prioritize rider satisfaction and continuously improve based on feedback",
        },
        {
            icon: Users,
            title: "Community",
            description:
                "Building trust between riders and drivers for a better experience",
        },
        {
            icon: Zap,
            title: "Innovation",
            description:
                "Leveraging technology to create seamless transportation solutions",
        },
        {
            icon: Globe,
            title: "Accessibility",
            description: "Making urban mobility affordable and available to everyone",
        },
        {
            icon: Target,
            title: "Excellence",
            description:
                "Striving for the highest standards in service and reliability",
        },
    ];

    return (
        <section className="py-20 px-5">
            <div>
                <div className="mx-auto text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-6">
                        Our Mission & Values
                    </h2>
                    <div className="px-5 md:px-16 space-y-6 text-lg text-muted-foreground">
                        <strong className="text-foreground">Our Mission</strong>
                        <p>
                            To
                            transform urban transportation by providing safe, reliable, and
                            affordable mobility solutions that connect communities and empower
                            individuals.
                        </p>
                        <strong className="text-foreground">Our Vision</strong>
                        <p>
                            To become
                            Bangladesh's most trusted transportation platform, recognized for
                            innovation, safety, and positive social impact.
                        </p>
                    </div>
                </div>

                <div className="grid md:w-4/5 lg:w-2/3 mx-auto md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {values.map((value, index) => (
                        <Card
                            key={index}
                            className="border-0 shadow-lg bg-card hover:shadow-xl transition-all group"
                        >
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-primary/50  group-hover:bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                                    <value.icon className="h-8 w-8 text-card" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                                    {value.title}
                                </h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}