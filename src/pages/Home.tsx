import MainLayout from "@/layouts/MainLayout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <MainLayout>
      <div className="px-6 py-28 max-w-6xl mx-auto text-center">

        {/* HERO */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
          Turn missed calls into{" "}
          <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            paying customers
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          LeadRevive instantly texts back missed calls, follows up automatically,
          and books customers for you — even when you’re busy or offline.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/pricing"
            className="bg-white text-black px-7 py-3 rounded-lg font-semibold hover:bg-gray-200 transition shadow-xl"
          >
            Start Free Trial
          </Link>

          <Link
            to="/pricing"
            className="border border-white/20 px-7 py-3 rounded-lg hover:bg-white/10 transition"
          >
            See Pricing
          </Link>
        </div>

        {/* PROBLEM */}
        <div className="mt-28 grid md:grid-cols-3 gap-6 text-left">
          {[
            "Every missed call is a lost customer",
            "Customers rarely call back",
            "Manual follow-ups never happen",
          ].map((text) => (
            <div
              key={text}
              className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition"
            >
              <p className="text-gray-300">{text}</p>
            </div>
          ))}
        </div>

        {/* HOW IT WORKS */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold mb-12">How it works</h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Missed call detected",
                desc: "We instantly detect missed opportunities.",
              },
              {
                title: "Instant SMS sent",
                desc: "We respond in seconds, not hours.",
              },
              {
                title: "Customer books",
                desc: "They reply and convert automatically.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition"
              >
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-36">
          <h2 className="text-3xl font-bold">
            Stop losing customers today.
          </h2>

          <Link
            to="/pricing"
            className="inline-block mt-6 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition shadow-xl"
          >
            Get Started
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;