import { ShieldCheck, Banknote, RotateCcw, Award, Headphones } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'Original Products',
      subtitle: '100% Genuine Tech Only'
    },
    {
      icon: Banknote,
      title: 'Cash on Delivery (COD)',
      subtitle: 'Pay at your doorstep Pakistan-wide'
    },
    {
      icon: RotateCcw,
      title: '7-Day Returns',
      subtitle: 'Easy hassle-free returns'
    },
    {
      icon: Award,
      title: 'Official Warranty',
      subtitle: 'Brand guaranteed protection'
    },
    {
      icon: Headphones,
      title: '24/7 Premium Support',
      subtitle: 'Lahore helpdesk active now'
    }
  ];

  return (
    <div className="border-y border-gray-800/60 bg-[#060a0f] py-8 my-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-gray-800/40">
          {badges.map((b, i) => (
            <div key={i} className="flex flex-col items-center md:items-start md:px-6 pt-4 md:pt-0 first:pt-0">
              <div className="p-3 bg-[#0c1520] rounded-xl border border-gray-800/80 mb-3 text-[#00e5ff] shadow-sm">
                <b.icon className="w-6 h-6" />
              </div>
              <h4 className="font-display font-semibold text-sm tracking-wide text-white">
                {b.title}
              </h4>
              <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                {b.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
