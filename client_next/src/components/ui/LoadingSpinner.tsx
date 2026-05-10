interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const sizeClasses = {
  small:  'h-4 w-4 border-2',
  medium: 'h-8 w-8 border-2',
  large:  'h-12 w-12 border-4',
};

export default function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-indigo-500 border-t-transparent animate-spin`}
    />
  );
}
