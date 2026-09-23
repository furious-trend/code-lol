// agent-notes: { ctx: "Root route template wrapper with safe CSS page transition", deps: ["./globals.css"], state: active, last: "sato@2026-09-23" }
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 w-full flex flex-col page-enter">
      {children}
    </div>
  );
}

