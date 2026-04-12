import MainLayout from "@/layouts/MainLayout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <MainLayout>
      <div className="px-6 py-24 max-w-6xl mx-auto text-center">

        {/* HERO */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Never lose a customer from a missed call again.
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          LeadRevive automatically texts back missed calls, follows up, and turns
          them into paying customers — without you lifting a finger.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/pricing"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Start Free Trial
          </Link>
          <Link
            to="/pricing"
            className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white/10 transition"
          >
            See Pricing
          </Link>
        </div>

        {/* PROBLEM SECTION */}
        <div className="mt-28 grid md:grid-cols-3 gap-6 text-left">
          {[
            "Missed calls = lost revenue",
            "Customers rarely call back",
            "Manual follow-ups get forgotten",
          ].map((text) => (
            <div key={text} className="bg-white/5 p-6 rounded-xl border border-white/10">
              <p className="text-gray-300">{text}</p>
            </div>
          ))}
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-28">
          <h2 className="text-3xl font-bold mb-10">How it works</h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Missed call detected",
                desc: "We instantly detect when a call is missed.",
              },
              {
                title: "Instant SMS sent",
                desc: "We text the customer immediately on your behalf.",
              },
              {
                title: "Customer books",
                desc: "They respond and book without you doing anything.",
              },
            ].map((step) => (
              <div key={step.title} className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold">
            Start recovering lost revenue today.
          </h2>

          <Link
            to="/pricing"
            className="inline-block mt-6 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
        </div>

      </div>
    </MainLayout>
  );
};

export default Home;