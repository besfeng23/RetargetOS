export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-[26px] border border-dashed border-white/12 bg-[#070707] p-8 text-center">
      <h3 className="text-lg font-semibold text-white/92">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-white/55">{message}</p>
    </div>
  );
}
