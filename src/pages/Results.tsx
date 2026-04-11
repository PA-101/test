import MainLayout from "@/layouts/MainLayout";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Maria G.", biz: "Spa Owner", text: "We recovered 35% of missed calls in the first week. Incredible ROI." },
  { name: "David R.", biz: "HVAC Contractor", text: "LeadRevive pays for itself 10x over. My team doesn't miss a lead anymore." },
  { name: "Jessica L.", biz: "Dental Office", text: "The automated review requests tripled our Google reviews in a month." },
];

const Results = () => (
  <MainLayout>
    <div className="container mx-auto px-4 py-20">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold">
          Real <span className="gradient-text">results</span>
        </h1>
        <p className="text-muted-foreground text-lg">Numbers don't lie. Here's what LeadRevive delivers.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
        {[
          { icon: TrendingUp, stat: "+40%", label: "Lead Recovery Rate" },
          { icon: Clock, stat: "< 30s", label: "Average Response Time" },
          { icon: Star, stat: "4.9★", label: "Customer Satisfaction" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-8 text-center space-y-3"
          >
            <m.icon className="h-8 w-8 text-primary mx-auto" />
            <p className="text-4xl font-heading font-bold gradient-text">{m.stat}</p>
            <p className="text-sm text-muted-foreground">{m.label}</p>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl font-heading font-bold text-center mb-10">What our customers say</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6 space-y-4"
          >
            <Quote className="h-5 w-5 text-primary/40" />
            <p className="text-sm text-muted-foreground italic">"{t.text}"</p>
            <div>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.biz}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </MainLayout>
);

export default Results;
