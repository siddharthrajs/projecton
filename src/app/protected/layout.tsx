import Sidebar from '@/components/Sidebar'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen overflow-y-auto p-6 box-border">
        {children}
      </main>
    </div>
  )
}
