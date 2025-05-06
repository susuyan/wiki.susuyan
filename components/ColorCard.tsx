'use client';

import { Card } from 'fumadocs-ui/components/card';
import { toast } from 'sonner';

interface Color {
  value: string;
}

interface ColorCardProps {
  initialColors?: Color[];
  title?: string;
}

export function ColorCard({ initialColors = [{ value: '#F1F5F9' }], title = '' }: ColorCardProps) {
  const handleColorCopy = async (colorValue: string) => {
    try {
      await navigator.clipboard.writeText(colorValue);
      toast.success('颜色代码已复制');
    } catch (err) {
      console.error('复制失败:', err);
      toast.error('复制失败，请重试');
    }
  };

  return (
    <Card className="w-full" title={title}>
      <div className="p-4">
        <div className="flex gap-2">
          {initialColors.map((color, index) => (
            <div
              key={index}
              className="flex-1 h-12 rounded cursor-pointer relative group"
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorCopy(color.value)}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-20 text-white transition-opacity">
                点击复制
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
