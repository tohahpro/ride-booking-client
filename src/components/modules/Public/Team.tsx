// components/about/TeamProfiles.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Mail } from "lucide-react";

export function Team() {
  const teamMembers = [
    {
      name: "MD Toha Hossain",
      role: "CEO & Founder",
      image: "/team/ceo.jpg",
      bio: "Visionary entrepreneur with 10+ years in tech industry. Passionate about solving urban mobility challenges.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "ceo@rideshare.com"
      }
    },
    {
      name: "Tarin Islam",
      role: "CTO",
      image: "/team/cto.jpg", 
      bio: "Tech expert specializing in scalable platforms. Leads our engineering team with innovation and precision.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "cto@rideshare.com"
      }
    },
    {
      name: "Sarah Islam",
      role: "Marketing Director",
      image: "/team/marketing.jpg",
      bio: "Creative marketer building the RideShare brand. Expert in digital marketing and customer engagement.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "marketing@rideshare.com"
      }
    },
    {
      name: "Karim Ahmed",
      role: "Head of Safety",
      image: "/team/safety.jpg",
      bio: "Safety expert implementing rigorous driver verification and ride monitoring protocols.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "safety@rideshare.com"
      }
    }
  ];

  return (
    <section className="py-20 px-5 md:px-20 bg-background">
      <div>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate professionals dedicated to revolutionizing transportation in Bangladesh
          </p>
        </div>

        <div className="md:4/5 lg:w-3/4 mx-auto grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="rounded-2xl border-0 shadow-lg bg-card hover:shadow-xl transition-all group">
              <CardContent className="p-6 text-center">
                {/* Profile Image */}
                <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>

                {/* Member Info */}
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{member.name}</h3>
                <div className=" font-medium mb-4">{member.role}</div>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {member.bio}
                </p>

                <div className="flex justify-center space-x-3">
                  <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-primary hover:text-primary-foreground">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-primary hover:text-primary-foreground">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-border hover:bg-primary hover:text-primary-foreground">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}