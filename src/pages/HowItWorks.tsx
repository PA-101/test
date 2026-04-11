import MainLayout from "@/layouts/MainLayout";
import { Phone, Bot, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Phone, title: "Connect Your Number", desc: "Link your business phone in under 2 minutes. No hardware needed." },
  { icon: Bot, title: "Activate Automation", desc: "Choose which automations to enable — missed calls, follow-ups, reviews." },
  { icon: TrendingUp, title: "Recover Leads", desc: "Watch as LeadRevive captures and converts leads 24/7 on autopilot." },
];

const HowItWorks = () => (
  <MainLayout>
    <div className="container mx-auto px-4 py-20">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold">
          How <span className="gradient-text">it works</span>
        </h1>
        <p className="text-muted-foreground text-lg">Three simple steps to never lose a lead again.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass rounded-xl p-8 flex items-start gap-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-heading font-bold text-lg">
              {i + 1}
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default HowItWorks;
