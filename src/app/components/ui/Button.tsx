// src/components/ui/Button.tsx

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'green' | 'yellow';
  className?: string;
};

export default function Button({
  onClick,
  children,
  size = 'medium',
  color = 'blue',
  className = '',
}: ButtonProps) {
  let buttonSizeClasses = '';

  switch (size) {
    case 'small':
      buttonSizeClasses = 'px-2 py-1 text-sm';
      break;
    case 'medium':
      buttonSizeClasses = 'px-4 py-2';
      break;
    case 'large':
      buttonSizeClasses = 'px-6 py-3 text-lg';
      break;
  }

  let colorClasses = '';

  switch (color) {
    case 'green':
      colorClasses = 'bg-green-600 hover:bg-green-700 text-white';
      break;
    case 'yellow':
      colorClasses = 'bg-yellow-600 hover:bg-yellow-700 text-white';
      break;
    case 'blue':
    default:
      colorClasses = 'bg-blue-500 hover:bg-blue-600 text-white';
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`rounded shadow-lg transition ${buttonSizeClasses} ${colorClasses} ${className}`}
    >
      {children}
    </button>
  );
}
