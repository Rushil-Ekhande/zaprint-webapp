# 🖼️ How to Add Your Own Images to ZAPRINT Landing Page

## ✅ **Ready for Your Images!**

The landing page is now configured to use your own images. Follow these simple steps:

## 📁 **Step 1: Prepare Your Images**

You need **3 images** with these **exact filenames**:

1. **`hero-studio.jpg`** - Main hero background
2. **`studio-workspace.jpg`** - About section image  
3. **`print-studio-wide.jpg`** - Showcase section background

## 📐 **Recommended Image Sizes**

- **hero-studio.jpg**: 1920x1080px (landscape)
- **studio-workspace.jpg**: 800x600px (landscape)
- **print-studio-wide.jpg**: 1400x800px (landscape)

## 📂 **Step 2: Add Images to Your Project**

1. **Navigate to the `/public` folder** in your project
2. **Copy your 3 image files** into the `/public` folder
3. **Make sure the filenames match exactly** (including the `.jpg` extension)

Your `/public` folder should look like this:
```
public/
├── hero-studio.jpg          ← Your hero image
├── studio-workspace.jpg     ← Your workspace image
├── print-studio-wide.jpg    ← Your wide studio image
├── file.svg
├── globe.svg
└── ... (other files)
```

## 🔄 **Step 3: Refresh Your Browser**

1. **Save the files** in the `/public` folder
2. **Go to** `http://localhost:3000/premium-landing`
3. **Refresh the page** - your images will appear automatically!

## 🎨 **Image Style Tips**

For best results, use images that have:

### **Hero Image (hero-studio.jpg)**
- **Wide studio shot** with atmospheric lighting
- **Industrial/modern aesthetic** 
- **Good contrast** so white text shows clearly
- **Professional printing environment**

### **Workspace Image (studio-workspace.jpg)**
- **Close-up of creative workspace**
- **Wooden textures, plants, materials**
- **Cozy, inviting atmosphere**
- **Detail shots of craftsmanship**

### **Wide Studio Image (print-studio-wide.jpg)**
- **Comprehensive studio overview**
- **Multiple work stations visible**
- **Professional equipment showcase**
- **Clean, organized environment**

## 🛡️ **Automatic Fallback**

Don't worry about errors! If any image fails to load:
- **Automatic fallback** to gradient backgrounds
- **No broken images** or layout issues
- **Page continues to work perfectly**

## 🚀 **That's It!**

Once you add your 3 images to `/public`, they will automatically appear on your landing page. The images will:

- ✅ **Scale perfectly** on all devices
- ✅ **Maintain aspect ratios**
- ✅ **Work with hover effects**
- ✅ **Support text overlays**
- ✅ **Load quickly and efficiently**

## 📱 **File Format Support**

You can use:
- **JPG** (recommended for photos)
- **PNG** (for images with transparency)
- **WebP** (for optimized file sizes)

Just make sure to update the filename extensions in the component if you use different formats.

---

**Need help?** The landing page is already configured and ready - just drop your 3 images into `/public` and refresh!