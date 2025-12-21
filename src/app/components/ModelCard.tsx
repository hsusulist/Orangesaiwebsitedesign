import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface Feature {
  icon: LucideIcon;
  text: string;
}

interface ModelCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: Feature[];
  color: string;
  icon: LucideIcon;
}

export function ModelCard({ title, subtitle, description, features, color, icon: Icon }: ModelCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
      <div className={`h-2 ${color}`}></div>
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
            <Icon className="w-8 h-8" style={{ color: getColorValue(color) }} />
          </div>
          <div>
            <h3 className="text-2xl">{title}</h3>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1">
                <feature.icon className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-700">{feature.text}</p>
            </div>
          ))}
        </div>
        
        <button className={`mt-8 w-full py-3 px-6 rounded-lg ${color} text-white hover:opacity-90 transition-opacity`}>
          Try {title}
        </button>
      </div>
    </Card>
  );
}

function getColorValue(colorClass: string): string {
  const colorMap: Record<string, string> = {
    'bg-orange-500': '#f97316',
    'bg-amber-500': '#f59e0b',
    'bg-red-500': '#ef4444',
  };
  return colorMap[colorClass] || '#f97316';
}
