import { Milestone } from "@/components/modules/Public/Milestone"
import { Mission } from "@/components/modules/Public/Mission"
import { Team } from "@/components/modules/Public/Team"



export default function AboutPage() {
  return (
    <div className=" text-white ">
      <div>
        <div className="w-full bg-[#f8fafc] relative">

          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
        linear-gradient(135deg, 
          rgba(248,250,252,1) 0%, 
          rgba(219,234,254,0.7) 30%, 
          rgba(165,180,252,0.5) 60%, 
          rgba(129,140,248,0.6) 100%
        ),
        radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0%, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(199,210,254,0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(224,231,255,0.3) 0%, transparent 60%)
      `,
            }}
          />
          <section className="relative overflow-hidden py-20">
            <div className="absolute inset-0 "></div>
            <div className="relative max-w-6xl mx-auto px-6 text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
                About <span className="text-indigo-600">RideShare</span>
              </h1>
              <p className="max-w-3xl text-black mx-auto text-lg mb-8">
                We are reimagining urban transportation in Bangladesh, making it safer, smarter, and more sustainable.
                RideShare provides riders and drivers with a seamless, community-driven experience.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Milestone />
      <Mission />
      <Team />

    </div>
  )
}
