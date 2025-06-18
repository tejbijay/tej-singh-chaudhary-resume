
import AdminLayout from './components/AdminLayout';
import MediaGallery from '@/components/admin/MediaGallery';

const Media = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold cyber-heading">Media Library</h1>
        </div>
        
        <div className="cyber-card">
          <MediaGallery selectable={false} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Media;
