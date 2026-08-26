import Link from 'next/link';
import { Bugsy } from '@/components/Bugsy';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <Bugsy size={120} mood="dizzy" />
      <h2 className="text-4xl font-black text-amber-500 mt-8 mb-4">404 - Bug Not Found</h2>
      <p className="text-zinc-400 text-lg max-w-md mb-8">
        We searched everywhere, but this page seems to have escaped into the ether. Maybe a missing semicolon?
      </p>
      <Link 
        href="/"
        className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 active:scale-95"
      >
        Return to Safety
      </Link>
    </div>
  );
}
