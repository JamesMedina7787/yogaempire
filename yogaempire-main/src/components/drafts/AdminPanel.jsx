import React from 'react';
import CalendarGrid from './Calendar/CalendarGrid';
import SocialContainer from './Social/SocialContainer';
//import ZoomMeeting from './Zoom/ZoomMeeting';
import MediaUploader from './Media/MediaUploader';
import ShapeDesigner from './Design/ShapeDesigner';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1 className="text-3xl font-bold text-center my-6">Welcome to the Yoga Empire Admin Panel</h1>
      <div className="grid grid-cols-3 gap-6 p-6">
        {/* Calendar Section */}
        <div className="calendar-section col-span-2">
          <CalendarGrid />
        </div>
        
        {/* Media & Social Section */}
        <div className="media-social-section col-span-1 space-y-6">
          <MediaUploader />
          <SocialContainer />
        </div>

        {/* Design & Zoom Section */}
        <div className="zoom-design-section col-span-3 space-y-6">
          <ZoomMeeting />
          <ShapeDesigner />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
