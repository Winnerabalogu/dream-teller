// src/app/admin/symbols/page.tsx
import { getSymbols } from '@/services/db';
import SymbolAdminClient from '@/components/admin/SymbolAdminClient';

export default async function SymbolsAdminPage() {
  const symbols = await getSymbols();
  return (
    <div className="min-h-screen p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light mb-6">Symbols Admin</h1>
        <SymbolAdminClient initialSymbols={symbols} />
      </div>
    </div>
  );
}
