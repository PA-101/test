import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Zap, MessageSquare, TrendingUp, Shield, ArrowRight, Phone, Bot, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const features = [
  { icon: Phone, title: "Missed Call Recovery", desc: "Auto-text customers within seconds of a missed call." },
  { icon: Bot, title: "Smart Automations", desc: "AI-powered follow-ups that feel personal, not robotic." },
  { icon: MessageSquare, title: "Review Requests", desc: "Automatically request reviews after every conversion." },
  { icon: BarChart3, title: "Real-Time Analytics", desc: "Track every lead, message, and conversion." },
];

const Home = () => (
  <MainLayout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.12),transparent_60%)]" />
      <div className="container mx-auto px-4 py-24 md:py-36 relative">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8"
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Zap className="h-3.5 w-3.5" /> AI-Powered Lead Recovery
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
            Stop Losing Customers.{" "}
            <span className="gradient-text">Start Capturing Them Automatically.</span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            LeadRevive AI turns missed calls into booked appointments, sends smart follow-ups, and generates reviews — all on autopilot.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8 animate-pulse-glow">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted">
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} custom={4} className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-8">
            {[{ n: "+40%", l: "Lead Recovery" }, { n: "2x", l: "Response Speed" }, { n: "24/7", l: "Automation" }].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-2xl font-bold text-primary">{s.n}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Problem */}
    <section className="border-t border-border/50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Every missed call is a <span className="text-destructive">lost customer</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            62% of calls to small businesses go unanswered. That's revenue walking out the door. LeadRevive captures it back.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 space-y-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="border-t border-border/50">
      <div className="container mx-auto px-4 py-20">
        <div className="glass glow-border rounded-2xl p-12 text-center space-y-6">
          <Shield className="h-10 w-10 text-primary mx-auto" />
          <h2 className="text-3xl font-heading font-bold">Ready to recover lost revenue?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Join hundreds of businesses already using LeadRevive AI to turn missed opportunities into paying customers.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </MainLayout>
);

export default Home;
