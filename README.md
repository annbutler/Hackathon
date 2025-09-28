# 🏛️ PoliConnect - Chicago

**Your comprehensive civic engagement hub for Chicago residents**

PoliConnect is a modern web application that bridges the gap between Chicago residents and their local government. Built for the Black CS Success Summit Hackathon, this platform empowers citizens to stay informed about their ward, connect with their alderman, and actively participate in local government.

---

## ✨ What's Inside

- **Next.js 15** – Modern React framework with App Router
- **TypeScript** – Type-safe development
- **Shadcn/UI** – Beautiful, accessible UI components
- **Tailwind CSS** – Utility-first styling
- **Real Chicago Ward Data** – Authentic alderman and ward information
- **Request Management System** – Submit and track requests to aldermen
- **Local Business Integration** – Chicago-based advertisements and services

---

## 🚀 Key Features

### 🗺️ **Ward & Alderman Information**
- **Comprehensive Ward Data**: Real Chicago ward information including demographics, boundaries, and statistics
- **Alderman Profiles**: Detailed profiles with contact information, platforms, committee memberships, and biographies
- **Search Functionality**: Find wards by number, alderman name, or specific issues
- **Interactive Ward Pages**: Dedicated pages for each ward with detailed information

### 📝 **Request Management System**
- **Submit Requests**: Residents can submit requests to their alderman for various issues (infrastructure, safety, environment, housing)
- **Request Tracking**: View and track the status of submitted requests
- **Professional Success Messages**: Detailed confirmation and next steps after submission
- **Request History**: Complete history of all submitted requests with status updates

### 🏢 **Local Business Integration**
- **Chicago-Based Advertisements**: Local businesses including lawn care, child care, and plumbing services
- **Revenue Model**: Demonstrates how the platform can be monetized while serving residents
- **Responsive Ad Design**: Professional advertisement cards with contact information and service details

### 📅 **Event Management**
- **Ward Events**: View upcoming community meetings, forums, and events
- **Calendar Integration**: Add events directly to personal calendars (Google Calendar)
- **Event Details**: Comprehensive event information including location, time, and description

---

## 🛠️ Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/annbutler/Hackathon.git
cd Hackathon
```

### 2. Install Dependencies

Make sure you have Node.js installed (version 18 or higher), then run:

```sh
npm install
```

### 3. Run the Development Server

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see PoliConnect.

### 4. Explore the Features

- **Homepage**: Search for wards and aldermen
- **Ward Pages**: Click on any ward to see detailed information
- **Submit Requests**: Use the request form to submit issues to aldermen
- **My Requests**: View and track your submitted requests
- **Local Businesses**: Browse Chicago-based service advertisements

---

## 📊 Data Structure

### **Ward Data** (`public/data/wards.json`)
Contains comprehensive information about Chicago wards including:

```json
{
  "wards": [
    {
      "id": 1,
      "name": "Ward 1",
      "alderman": {
        "name": "Daniel La Spata",
        "party": "Democratic",
        "email": "daniel.laspata@cityofchicago.org",
        "phone": "(773) 227-0100",
        "office": "1958 N Milwaukee Ave, Chicago, IL 60647",
        "biography": "Daniel La Spata has served as Alderman...",
        "platforms": ["Affordable Housing Development", "Public Transportation Improvements"],
        "committees": ["Housing and Real Estate", "Transportation and Public Way"]
      },
      "demographics": {
        "population": 54000,
        "area": "3.2 sq mi",
        "medianIncome": "$65000"
      },
      "events": [
        {
          "id": 1,
          "title": "Ward 1 Community Meeting",
          "date": "2025-03-15T18:00:00Z",
          "location": "Wicker Park Library",
          "description": "Monthly community meeting..."
        }
      ]
    }
  ]
}
```

### **Advertisement Data** (`public/data/advertisements.json`)
Local Chicago business advertisements including:

```json
{
  "advertisements": [
    {
      "id": 1,
      "type": "lawn-care",
      "title": "Expert Lawn Care Services",
      "businessName": "Chicago Lawn Care Pro",
      "phone": "(312) 555-1234",
      "serviceArea": "All Chicago Wards",
      "rating": 4.8,
      "services": ["Mowing", "Trimming", "Fertilization"]
    }
  ]
}
```

### **Request Storage** (`src/lib/requestStorage.ts`)
In-memory storage system for submitted requests with tracking capabilities.

---

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage with ward search
│   ├── ward/[wardId]/     # Dynamic ward pages
│   ├── dashboard/         # My Requests page
│   └── layout.tsx         # Root layout with navigation
├── Components/            # React components
│   ├── ward/             # Ward-related components
│   ├── requests/         # Request management components
│   ├── ads/              # Advertisement components
│   ├── layouts/          # Navigation and layout components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions and data management
│   ├── types.ts          # TypeScript interfaces
│   ├── wardData.ts       # Ward data utilities
│   └── requestStorage.ts # Request storage system
└── public/data/          # JSON data files
    ├── wards.json        # Ward and alderman data
    └── advertisements.json # Local business ads
```

## 🎨 Customization Guide

### Adding New Wards
1. Edit `public/data/wards.json`
2. Add new ward objects with the same structure
3. Include alderman information, demographics, and events

### Modifying UI Components
- **Ward Search**: `src/Components/ward/WardSearch.tsx`
- **Ward Pages**: `src/Components/ward/WardOverview.tsx`
- **Request Forms**: `src/Components/ward/RequestForm.tsx`
- **My Requests**: `src/Components/requests/MyRequests.tsx`

### Styling
- Uses Tailwind CSS for styling
- Dark theme with blue accent colors
- Responsive design for mobile and desktop

---

## 📚 Useful Links

### **Development Resources**
- [Next.js 15 Documentation](https://nextjs.org/docs) - App Router and server components
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Type safety and interfaces
- [Shadcn/UI Components](https://ui.shadcn.com/docs) - UI component library
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework

### **Chicago Government Resources**
- [City of Chicago Official Website](https://www.chicago.gov/)
- [Chicago Ward Map](https://www.chicago.gov/city/en/about/wards.html)
- [Chicago City Council](https://www.chicago.gov/city/en/about/council.html)

### **Deployment**
- [Vercel Deployment Guide](https://vercel.com/docs) - Deploy your app to Vercel
- [Deployment Tutorial](https://docs.google.com/presentation/d/1CqtNVXFvsKRtkE7Bi5KmnTfgCEeaGEss3ALGEOFnmuk/edit?usp=sharing) - Step-by-step deployment guide

---

## 🎯 Features Overview

### **For Residents**
- 🔍 **Find Your Ward**: Search by ward number, alderman name, or issues
- 📋 **Submit Requests**: Report issues and request services from your alderman
- 📊 **Track Requests**: Monitor the status of your submitted requests
- 📅 **Stay Informed**: View upcoming ward events and community meetings
- 🏢 **Support Local**: Discover Chicago-based businesses and services

### **For Aldermen**
- 📈 **Request Management**: Track and respond to resident requests
- 📊 **Community Engagement**: Share events and important information
- 🏛️ **Transparency**: Provide clear contact information and platforms

### **For Local Businesses**
- 📢 **Targeted Advertising**: Reach residents in specific wards
- 💼 **Service Discovery**: Connect with potential customers
- 🌟 **Community Support**: Contribute to local civic engagement

---

## 🏆 Credits

**PoliConnect** - Built for the Black CS Success Summit Hackathon 2025 🚀

**Mission**: Bridging the gap between Chicago residents and local government through technology and civic engagement.

---

**Need help?**  
Open an issue on GitHub or reach out to the development team!
