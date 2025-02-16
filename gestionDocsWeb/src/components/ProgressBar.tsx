interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div className="w-full bg-gray-300 rounded my-4">
    <div
      className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded"
      style={{ width: `${progress}%` }}
    >
      {progress}%
    </div>
  </div>
);

export default ProgressBar;
