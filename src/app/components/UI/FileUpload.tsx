type FileUploadProps = {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  };
  
  const FileUpload: React.FC<FileUploadProps> = ({ label, onChange, disabled = false }) => {
    return (
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        <input
          type="file"
          onChange={onChange}
          disabled={disabled}
          className="py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none disabled:bg-gray-200"
        />
      </div>
    );
  };
  
  export default FileUpload;
  