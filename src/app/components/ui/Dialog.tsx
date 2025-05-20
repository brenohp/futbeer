// components/ui/Dialog.tsx

type DialogProps = {
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: React.ReactNode;
};

export default function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded shadow-lg p-6 max-w-lg w-full relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
