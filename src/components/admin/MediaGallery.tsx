
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Trash2, X, Filter, Search } from "lucide-react";

// Mock data for images
// In a real application, this would come from an API
const mockImages = [
  { id: 1, url: "/placeholder.svg", name: "Placeholder 1", type: "svg", size: "1.2 KB", date: "2023-09-15" },
  { id: 2, url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7", name: "Woman with laptop", type: "jpg", size: "1.5 MB", date: "2023-10-20" },
  { id: 3, url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", name: "Laptop computer", type: "jpg", size: "2.1 MB", date: "2023-11-05" },
  { id: 4, url: "https://images.unsplash.com/photo-1518770660439-4636190af475", name: "Circuit board", type: "jpg", size: "1.8 MB", date: "2023-12-10" },
  { id: 5, url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", name: "Java programming", type: "jpg", size: "2.3 MB", date: "2024-01-15" },
  { id: 6, url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", name: "Person with MacBook", type: "jpg", size: "1.9 MB", date: "2024-02-20" },
];

interface MediaGalleryProps {
  onSelectImage?: (imageUrl: string) => void;
  onClose?: () => void;
  selectable?: boolean;
}

const MediaGallery = ({ onSelectImage, onClose, selectable = true }: MediaGalleryProps) => {
  const [images, setImages] = useState(mockImages);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setImages(mockImages);
      return;
    }
    
    const filtered = mockImages.filter(
      img => img.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setImages(filtered);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an image (JPEG, PNG, GIF, WEBP, SVG)");
      return;
    }

    setUploading(true);

    // Simulate file upload with a delay
    setTimeout(() => {
      const newImage = {
        id: mockImages.length + 1,
        url: URL.createObjectURL(file),
        name: file.name,
        type: file.type.split('/')[1],
        size: `${(file.size / 1024).toFixed(1)} KB`,
        date: new Date().toISOString().split('T')[0]
      };
      
      setImages(prev => [newImage, ...prev]);
      setUploading(false);
      toast.success(`"${file.name}" uploaded successfully`);
    }, 1500);
  };

  const handleDeleteImage = (id: number) => {
    setImages(prev => prev.filter(img => img.id !== id));
    toast.success("Image deleted successfully");
    if (selectedImage === id) {
      setSelectedImage(null);
    }
  };

  const handleImageSelect = (id: number, url: string) => {
    setSelectedImage(id);
    if (onSelectImage) {
      onSelectImage(url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold cyber-heading">Media Gallery</h2>
        {onClose && (
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4 mr-1" />
            Close
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="bg-cyber-dark/80 border border-cyber-purple/30"
          />
          <Button variant="outline" onClick={handleSearch}>
            <Search className="w-4 h-4 mr-1" />
            Search
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="whitespace-nowrap">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          
          <div className="relative">
            <Input
              id="media-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
            <label 
              htmlFor="media-upload"
              className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {uploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1"></span>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-1" />
                  Upload
                </>
              )}
            </label>
          </div>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-cyber-purple/30 rounded-lg">
          <p className="text-gray-400">No images found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div 
              key={image.id} 
              className={`group relative border rounded-lg overflow-hidden ${
                selectedImage === image.id ? 'border-cyber-blue ring-1 ring-cyber-blue' : 'border-cyber-purple/30'
              }`}
            >
              <div className="aspect-square relative overflow-hidden bg-cyber-dark/50">
                <img 
                  src={image.url} 
                  alt={image.name} 
                  className="object-cover w-full h-full"
                />
                
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3 ${
                  selectable ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                } transition-opacity`}>
                  <div className="w-full">
                    <p className="text-sm font-medium truncate text-white">{image.name}</p>
                    <p className="text-xs text-gray-300">{image.size}</p>
                  </div>
                </div>
                
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 bg-black/50 border-white/20 hover:bg-red-500/90"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {selectable && (
                <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <Button
                    variant={selectedImage === image.id ? "default" : "outline"}
                    size="sm"
                    className={`opacity-0 group-hover:opacity-100 ${
                      selectedImage === image.id ? 'opacity-100' : ''
                    }`}
                    onClick={() => handleImageSelect(image.id, image.url)}
                  >
                    {selectedImage === image.id ? 'Selected' : 'Select'}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
