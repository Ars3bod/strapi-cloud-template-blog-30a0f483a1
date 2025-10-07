# 🚀 SERA Mobile App CMS

A Strapi 5.x backend CMS designed specifically for the SERA Mobile Application, providing dynamic content management with full internationalization support (Arabic/English).

## 🎯 **Features**

- **Internationalization (i18n)**: Full Arabic/English content support
- **Compensation Standards**: Dynamic management of service compensation information
- **Consumption Tariffs**: Flexible tariff category management
- **FAQ Management**: Multi-language frequently asked questions
- **Important Links**: Organized link management by categories
- **Policies**: Legal documents and policy management
- **REST API**: Complete API for mobile app integration
- **Role-based Access**: Secure content management

## 🏗️ **Content Types**

### 1. **Translation (i18n)**
- Translation key management
- Arabic/English language support
- Category-based organization
- Active/inactive status control

### 2. **Compensation Standards**
- Bilingual content (Arabic/English)
- Service categories with icons and colors
- Detailed compensation information
- Order-based sorting

### 3. **Consumption Tariff**
- Tariff range management
- Icon and color customization
- Translation key integration
- Flexible tariff structure

### 4. **FAQ**
- Bilingual questions and answers
- Category organization
- Tag-based search
- Rich text content support

### 5. **Important Links**
- Government, services, and resource links
- Icon and color customization
- Category-based organization
- Description support

### 6. **Policies**
- Legal document management
- Version control
- Effective date tracking
- Rich text content support

## 🔌 **API Endpoints**

### **Translation Endpoints**
```
GET /api/translations?language=ar&category=common
GET /api/translations/key/home.welcome?language=ar
PUT /api/translations/bulk
```

### **Content Endpoints**
```
GET /api/compensation-standards?populate=icon&sort=order:asc
GET /api/consumption-tariffs?populate=icon&sort=order:asc
GET /api/faqs?filters[category][$eq]=general&sort=order:asc
GET /api/important-links?populate=icon&sort=order:asc
GET /api/policies?populate=icon&sort=order:asc
```

### **Combined Endpoints**
```
GET /api/app-content?language=ar
GET /api/app-content/screen/compensation-standards?language=ar
GET /api/app-content/screen/consumption-tariff?language=en
```

## 🚀 **Quick Start**

### **1. Installation**
```bash
npm install
```

### **2. Environment Setup**
```bash
cp env.example .env
# Edit .env with your configuration
```

### **3. Generate Security Keys**
```bash
# Generate APP_KEYS
node -e "console.log(require('crypto').randomBytes(16).toString('base64') + ',' + require('crypto').randomBytes(16).toString('base64') + ',' + require('crypto').randomBytes(16).toString('base64') + ',' + require('crypto').randomBytes(16).toString('base64'))"

# Generate API_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"

# Generate ADMIN_JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"

# Generate TRANSFER_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

### **4. Development**
```bash
npm run develop
```

### **5. Production Build**
```bash
npm run build
npm run start
```

## 🔐 **Authentication**

### **API Tokens**
- **Public Token**: For mobile app (read-only access)
- **Admin Token**: For content management (full access)
- **Editor Token**: For content editors (limited access)

### **Role-Based Access Control**
- **Public**: Read-only access to published content
- **Editor**: Can create/edit content, cannot publish
- **Admin**: Full access including user management
- **Super Admin**: System administration

## 📱 **Mobile App Integration**

The API is designed to work seamlessly with React Native applications. All endpoints return data in the format expected by the mobile app:

```javascript
// Example API Response
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "titleAr": "مدة تسجيل العداد باسم المستهلك",
        "titleEn": "Meter Registration Period in Consumer Name",
        "icon": {
          "data": {
            "attributes": {
              "url": "/uploads/icon_document.png"
            }
          }
        },
        "color": "#00623B",
        "order": 1,
        "isActive": true
      }
    }
  ]
}
```

## 🌐 **Deployment**

### **Strapi Cloud**
```bash
npm run deploy
```

### **Self-Hosted**
1. Set up PostgreSQL database
2. Update database configuration
3. Build and deploy application

## 📊 **Content Management**

1. **Access Admin Panel**: `http://localhost:1337/admin`
2. **Create Admin User**: First-time setup
3. **Configure Content Types**: Add your content
4. **Set Permissions**: Configure API access
5. **Test API Endpoints**: Verify mobile app integration

## 🔧 **Configuration**

### **Database**
- **Development**: SQLite (default)
- **Production**: PostgreSQL (recommended)

### **Media Files**
- Local storage for development
- Cloud storage for production (Strapi Cloud)

## 📈 **Performance**

- **Caching**: Implemented for frequently accessed content
- **Pagination**: Available for large datasets
- **Field Selection**: Reduce payload size
- **Compression**: gzip compression enabled

## 🛡️ **Security**

- **JWT Authentication**: Secure API access
- **Role-based Permissions**: Granular access control
- **Input Validation**: All inputs validated
- **CORS Configuration**: Properly configured

## 📝 **Development Notes**

- **Strapi Version**: 5.15.0
- **Node.js**: 18.x or higher
- **Database**: PostgreSQL recommended for production
- **Deployment**: Strapi Cloud ready

## 🤝 **Support**

For issues and questions:
1. Check the Strapi documentation
2. Review the API endpoints
3. Verify environment configuration
4. Check content type schemas

---

**Built with ❤️ for SERA Mobile Application**