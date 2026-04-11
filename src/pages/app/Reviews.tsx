import DashboardLayout from "@/layouts/DashboardLayout";
import { Star } from "lucide-react";

const reviews = [
  { customer: "Sarah Johnson", status: "Completed", rating: 5, date: "2026-04-09" },
  { customer: "Mike Chen", status: "Pending", rating: null, date: "2026-04-09" },
  { customer: "Robert Taylor", status: "Completed", rating: 4, date: "2026-04-07" },
];

const Reviews = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold">Reviews</h2>
        <p className="text-muted-foreground text-sm">Review requests sent to customers.</p>
      </div>

      {reviews.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No review requests yet — they'll show up here once sent.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((r) => (
            <div key={r.customer} className="glass rounded-xl p-6 flex items-center justify-between">
              <div>
                <h3 className="font-medium">{r.customer}</h3>
                <p className="text-sm text-muted-foreground">{r.date}</p>
              </div>
              <div className="flex items-center gap-4">
                {r.rating && (
                  <div className="flex items-center gap-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                )}
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${r.status === "Completed" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </DashboardLayout>
);

export default Reviews;
