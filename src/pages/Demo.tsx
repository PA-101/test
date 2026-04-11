import MainLayout from "@/layouts/MainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneMissed, MessageSquare, Reply, CheckCircle } from "lucide-react";

const steps = [
  { icon: PhoneMissed, title: "Missed Call", msg: "Customer calls but you're busy. Call goes unanswered.", color: "text-destructive" },
  { icon: MessageSquare, title: "Auto Text Sent", msg: '"Hi! Sorry we missed you. How can we help? Reply here or we\'ll call you back ASAP."', color: "text-primary" },
  { icon: Reply, title: "Customer Replies", msg: '"I need a quote for a roof repair."', color: "text-accent" },
  { icon: CheckCircle, title: "Lead Converted", msg: "Appointment booked. Lead recovered. Revenue saved. ✅", color: "text-success" },
];

const Demo = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => Math.min(c + 1, steps.length - 1));
  const reset = () => setCurrent(0);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            See it in <span className="gradient-text">action</span>
          </h1>
          <p className="text-muted-foreground text-lg">Watch how a missed call becomes a paying customer.</p>
        </div>

        <div className="max-w-lg mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-10">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= current ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-xl p-8 text-center space-y-6"
            >
              {(() => {
                const Step = steps[current];
                return (
                  <>
                    <Step.icon className={`h-12 w-12 mx-auto ${Step.color}`} />
                    <h3 className="text-xl font-heading font-bold">{Step.title}</h3>
                    <p className="text-muted-foreground">{Step.msg}</p>
                  </>
                );
              })()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            {current < steps.length - 1 ? (
              <Button onClick={next} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Next Step
              </Button>
            ) : (
              <Button onClick={reset} variant="outline" className="border-border text-foreground hover:bg-muted">
                Replay Demo
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Demo;
