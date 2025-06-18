
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  initialImage?: string;
  onImageChange: (imageUrl: string) => void;
}

const ImageUpload = ({ initialImage = "/placeholder.svg", onImageChange }: ImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState<string>(initialImage);
  const [uploading, setUploading] = useState<boolean>(false);
  const [inputMethod, setInputMethod] = useState<"url" | "file">("url");

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    onImageChange(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an image (JPEG, PNG, GIF, WEBP)");
      return;
    }

    setUploading(true);

    // In a real app, this would upload to a server or cloud storage
    // Here we're just creating a local object URL for demonstration
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImageUrl(result);
      onImageChange(result);
      setUploading(false);
      toast.success("Image uploaded successfully");
    };
    
    reader.onerror = () => {
      toast.error("Failed to upload image");
      setUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const resetImage = () => {
    setImageUrl("/placeholder.svg");
    onImageChange("/placeholder.svg");
    toast.success("Image reset to default");
  };

  return (
    <div className="space-y-4">
      <div className="border border-dashed border-cyber-purple/30 rounded-lg p-4 text-center bg-cyber-dark/50">
        <div className="mb-4 relative group">
          <img 
            src={imageUrl} 
            alt="Featured" 
            className="w-full h-60 object-cover rounded-lg border border-cyber-purple/30"
          />
          
          {imageUrl !== "/placeholder.svg" && (
            <button 
              onClick={resetImage}
              className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-red-500/90 transition-colors"
              title="Remove image"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="flex space-x-2 mb-4">
          <Button
            variant={inputMethod === "url" ? "default" : "outline"}
            onClick={() => setInputMethod("url")}
            className="flex-1"
          >
            Use URL
          </Button>
          <Button
            variant={inputMethod === "file" ? "default" : "outline"}
            onClick={() => setInputMethod("file")}
            className="flex-1"
          >
            Upload File
          </Button>
        </div>
        
        {inputMethod === "url" ? (
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="text"
              value={imageUrl === "/placeholder.svg" ? "" : imageUrl}
              onChange={handleImageUrlChange}
              placeholder="https://example.com/image.jpg"
              className="bg-cyber-dark/80 border border-cyber-purple/30 focus:border-cyber-purple"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="fileUpload" className="sr-only">
              Upload Image
            </Label>
            <div className="flex items-center justify-center">
              <label 
                htmlFor="fileUpload" 
                className="w-full py-6 flex flex-col items-center justify-center border-2 border-dashed border-cyber-purple/30 rounded-lg cursor-pointer hover:bg-cyber-dark/70 transition-colors"
              >
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 mb-2 text-cyber-purple-light" />
                  <p className="text-sm font-medium">
                    {uploading ? "Uploading..." : "Click to upload image"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    JPEG, PNG, GIF, WEBP up to 5MB
                  </p>
                </div>
                <Input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full py-2 px-4 border border-cyber-purple/30 rounded-lg text-cyber-purple-light hover:bg-cyber-purple/10 transition-colors text-sm flex items-center justify-center"
            onClick={() => setInputMethod("file")}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Browse Media Library
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
