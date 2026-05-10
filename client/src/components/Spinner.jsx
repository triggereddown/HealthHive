function Spinner({ size = 'md', className = '' }) {
  const sizeMap = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' };
  return (
    <span
      className={`
        inline-block rounded-full border border-[#333333] border-t-accent
        animate-spin ${sizeMap[size]} ${className}
      `}
      style={{ borderWidth: '1px' }}
    />
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-48 gap-4">
      <Spinner size="md" />
      <span className="font-mono text-2xs text-ink-faint tracking-widest">LOADING</span>
    </div>
  );
}

export default Spinner;
