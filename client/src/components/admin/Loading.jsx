import Sidebar from "./SideBar";

export default function Loading({ label = "Loading…" }) {
  return (
    <div className="min-h-screen bg-[#0b0d0f] text-[#f1f1ee]">
      <Sidebar />

      <main className="min-h-screen md:ml-[240px]">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#252a2f] border-t-[#315bea]" />
            <p className="text-[11px] text-[#666d74]">{label}</p>
          </div>
        </div>
      </main>
    </div>
  );
}