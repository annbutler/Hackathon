import { notFound } from 'next/navigation';
import { getWardByIdServer } from '@/lib/wardDataServer';
import WardOverview from '@/Components/ward/WardOverview';
import { Ward } from '@/lib/types';

interface WardPageProps {
  params: {
    wardId: string;
  };
}

export default async function WardPage({ params }: WardPageProps) {
  const resolvedParams = await params;
  const wardId = parseInt(resolvedParams.wardId);
  
  if (isNaN(wardId)) {
    notFound();
  }

  const ward: Ward | null = await getWardByIdServer(wardId);
  
  if (!ward) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <WardOverview ward={ward} />
    </div>
  );
}

export async function generateStaticParams() {
  // Generate static params for all wards (1-50)
  return Array.from({ length: 50 }, (_, i) => ({
    wardId: (i + 1).toString(),
  }));
}
