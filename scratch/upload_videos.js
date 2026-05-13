const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

// Configure Cloudinary from your .env.local
cloudinary.config({
  cloud_name: 'dlvqjcd3o',
  api_key: '964821294538739',
  api_secret: 'TwIlX2pXjvn8_2TvE_6Rsr3GFVs'
});

const videosToUpload = [
  {
    name: 'reel2.mp4',
    path: path.join(__dirname, '../public/assets/portfolio/videos/reel2.mp4')
  },
  {
    name: 'commercial_large.mp4',
    path: path.join(__dirname, '../public/assets/portfolio/14652279_3840_2160_50fps.mp4')
  }
];

async function uploadVideos() {
  console.log('🚀 Starting video upload to Cloudinary...');
  
  for (const video of videosToUpload) {
    if (!fs.existsSync(video.path)) {
      console.error(`❌ File not found: ${video.path}`);
      continue;
    }

    try {
      console.log(`⏳ Uploading ${video.name}... (This might take a minute)`);
      
      const result = await cloudinary.uploader.upload(video.path, {
        resource_type: 'video',
        folder: 'portfolio_videos',
        use_filename: true,
        unique_filename: false,
        overwrite: true
      });

      console.log(`✅ Success: ${video.name}`);
      console.log(`🔗 URL: ${result.secure_url}`);
      console.log('---');
    } catch (error) {
      console.error(`❌ Failed to upload ${video.name}:`, error.message);
    }
  }

  console.log('✨ All done!');
}

uploadVideos();
