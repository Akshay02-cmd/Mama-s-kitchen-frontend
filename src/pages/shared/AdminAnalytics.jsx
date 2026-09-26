import { Activity, ChefHat, TrendingUp, Users, UtensilsCrossed } from "lucide-react";

const summaryCards = [
  {
    title: "Total Users",
    value: "1,284",
    change: "+12.4% this month",
    color: "#0EA5E9",
    icon: Users,
  },
  {
    title: "Total Meals Listed",
    value: "356",
    change: "+28 new this week",
    color: "#F97316",
    icon: UtensilsCrossed,
  },
  {
    title: "Mess Owners",
    value: "89",
    change: "+6 onboarded",
    color: "#10B981",
    icon: ChefHat,
  },
  {
    title: "Order Conversion",
    value: "64.8%",
    change: "+3.1% vs last week",
    color: "#8B5CF6",
    icon: TrendingUp,
  },
];

const mealAnalytics = [
  { category: "Breakfast", totalMeals: 74, avgPrice: "Rs. 85", avgRating: 4.4 },
  { category: "Lunch", totalMeals: 142, avgPrice: "Rs. 130", avgRating: 4.6 },
  { category: "Dinner", totalMeals: 98, avgPrice: "Rs. 145", avgRating: 4.5 },
  { category: "Snacks", totalMeals: 42, avgPrice: "Rs. 70", avgRating: 4.2 },
];

const userAnalytics = [
  { metric: "Active Customers", value: "1,032", trend: "+9.8%" },
  { metric: "New Signups (30d)", value: "214", trend: "+18.2%" },
  { metric: "Repeat Buyers", value: "68%", trend: "+4.6%" },
  { metric: "Avg Orders / User", value: "5.7", trend: "+1.3%" },
];

const ownerAnalytics = [
  { owner: "Spice Route Mess", meals: 41, orders: 402, rating: 4.8 },
  { owner: "Green Bowl Kitchen", meals: 33, orders: 361, rating: 4.7 },
  { owner: "Tiffin Town", meals: 29, orders: 334, rating: 4.6 },
  { owner: "Daily Dabba Hub", meals: 26, orders: 288, rating: 4.5 },
];

const demandByDay = [
  { day: "Mon", orders: 190 },
  { day: "Tue", orders: 220 },
  { day: "Wed", orders: 244 },
  { day: "Thu", orders: 238 },
  { day: "Fri", orders: 281 },
  { day: "Sat", orders: 312 },
  { day: "Sun", orders: 267 },
];

const maxOrders = Math.max(...demandByDay.map((item) => item.orders));

const AdminAnalytics = () => {
  return (
    <div className="min-h-screen px-4 pb-10 pt-8 sm:px-6 lg:px-8" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="mx-auto w-full max-w-7xl animate-fade-in-up">
        <div
          className="mb-6 rounded-2xl border p-6"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 55%, #334155 100%)",
            borderColor: "#1E293B",
            color: "#FFFFFF",
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em]" style={{ color: "#CBD5E1" }}>
                Admin View
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Static Analytics Dashboard</h1>
              <p className="mt-2 text-sm sm:text-base" style={{ color: "#E2E8F0" }}>
                Frontend raw data preview for meals, users, and mess owner performance.
              </p>
            </div>
            <div className="rounded-xl border px-4 py-3" style={{ borderColor: "#475569", backgroundColor: "#0B1220" }}>
              <div className="flex items-center gap-2 text-sm">
                <Activity className="h-4 w-4" />
                <span>Last Updated: 10 Apr 2026</span>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map(({ title, value, change, color, icon: Icon }) => (
            <article
              key={title}
              className="rounded-2xl border p-5"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)" }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold" style={{ color: "#475569" }}>
                  {title}
                </h2>
                <div className="rounded-lg p-2" style={{ backgroundColor: `${color}1A` }}>
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
              </div>
              <p className="text-3xl font-bold" style={{ color: "#0F172A" }}>
                {value}
              </p>
              <p className="mt-2 text-sm" style={{ color: "#16A34A" }}>
                {change}
              </p>
            </article>
          ))}
        </section>

        <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <article
            className="rounded-2xl border p-5 xl:col-span-2"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)" }}
          >
            <h3 className="mb-4 text-lg font-semibold" style={{ color: "#0F172A" }}>
              Weekly Meal Demand
            </h3>
            <div className="space-y-3">
              {demandByDay.map((item) => (
                <div key={item.day}>
                  <div className="mb-1 flex items-center justify-between text-sm" style={{ color: "#475569" }}>
                    <span>{item.day}</span>
                    <span>{item.orders} orders</span>
                  </div>
                  <div className="h-2 w-full rounded-full" style={{ backgroundColor: "#E2E8F0" }}>
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(item.orders / maxOrders) * 100}%`,
                        background: "linear-gradient(90deg, #F97316, #FB923C)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article
            className="rounded-2xl border p-5"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)" }}
          >
            <h3 className="mb-4 text-lg font-semibold" style={{ color: "#0F172A" }}>
              User Analytics
            </h3>
            <div className="space-y-3">
              {userAnalytics.map((item) => (
                <div key={item.metric} className="rounded-xl border p-3" style={{ borderColor: "#E2E8F0" }}>
                  <p className="text-sm" style={{ color: "#64748B" }}>
                    {item.metric}
                  </p>
                  <div className="mt-1 flex items-end justify-between">
                    <p className="text-xl font-bold" style={{ color: "#0F172A" }}>
                      {item.value}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "#16A34A" }}>
                      {item.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <article
            className="rounded-2xl border p-5"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)" }}
          >
            <h3 className="mb-4 text-lg font-semibold" style={{ color: "#0F172A" }}>
              Meal Category Performance
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr style={{ color: "#64748B" }}>
                    <th className="py-2 pr-3 font-semibold">Category</th>
                    <th className="py-2 pr-3 font-semibold">Total Meals</th>
                    <th className="py-2 pr-3 font-semibold">Average Price</th>
                    <th className="py-2 font-semibold">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {mealAnalytics.map((item) => (
                    <tr key={item.category} className="border-t" style={{ borderColor: "#E2E8F0" }}>
                      <td className="py-3 pr-3 font-medium" style={{ color: "#0F172A" }}>
                        {item.category}
                      </td>
                      <td className="py-3 pr-3" style={{ color: "#334155" }}>
                        {item.totalMeals}
                      </td>
                      <td className="py-3 pr-3" style={{ color: "#334155" }}>
                        {item.avgPrice}
                      </td>
                      <td className="py-3" style={{ color: "#334155" }}>
                        {item.avgRating}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article
            className="rounded-2xl border p-5"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)" }}
          >
            <h3 className="mb-4 text-lg font-semibold" style={{ color: "#0F172A" }}>
              Top Mess Owner Snapshot
            </h3>
            <div className="space-y-3">
              {ownerAnalytics.map((owner) => (
                <div
                  key={owner.owner}
                  className="rounded-xl border p-3"
                  style={{ borderColor: "#E2E8F0", backgroundColor: "#F8FAFC" }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-semibold" style={{ color: "#0F172A" }}>
                      {owner.owner}
                    </h4>
                    <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: "#DBEAFE", color: "#1D4ED8" }}>
                      Rating {owner.rating}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm" style={{ color: "#475569" }}>
                    <p>Meals: {owner.meals}</p>
                    <p>Orders: {owner.orders}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default AdminAnalytics;
