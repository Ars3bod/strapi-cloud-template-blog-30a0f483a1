## 📋 **SERA Mobile App - Strapi CMS Requirements Document**

Here's a complete requirements document covering all aspects needed for your Strapi CMS integration:

### **🎯 Project Overview**
We need a Strapi CMS backend to dynamically manage content for the SERA mobile application, providing both i18n content management and dynamic content control for specific screens, with fallback mechanisms for offline scenarios.

### **🔧 Technical Requirements**

#### **1. Strapi Setup**
- **Version**: Strapi 5.x (latest stable)
- **Database**: PostgreSQL (recommended)
- **Node.js**: 18.x or higher
- **Deployment**: cloud
- **API**: REST API with GraphQL support
- **Authentication**: JWT tokens with role-based access control

#### **2. Content Types Required**

**A. Internationalization (i18n) Content Type:**
```javascript
{
  "key": "string", // Translation key (e.g., "home.welcome")
  "language": "enum", // "ar" | "en"
  "value": "text", // Translated text
  "category": "enum", // "common", "navigation", "forms", "errors"
  "isActive": "boolean",
  "lastModified": "datetime"
}
```

**B. Compensation Standards Content Type:**
```javascript
{
  "id": "number",
  "titleAr": "text",
  "titleEn": "text",
  "descriptionAr": "richtext",
  "descriptionEn": "richtext",
  "conditionsAr": "text",
  "conditionsEn": "text",
  "periodAr": "text",
  "periodEn": "text",
  "compensationAr": "text",
  "compensationEn": "text",
  "additionalCompensationAr": "text",
  "additionalCompensationEn": "text",
  "notesAr": "text",
  "notesEn": "text",
  "icon": "media",
  "color": "string", // Hex color code
  "category": "enum", // "service", "restoration", "notification", "emergency", "violation", "complaint"
  "order": "number",
  "isActive": "boolean"
}
```

**C. Consumption Tariff Content Type:**
```javascript
{
  "id": "string", // "residential", "commercial", etc.
  "titleKey": "string", // i18n key
  "icon": "media",
  "color": "string",
  "descriptionKey": "string", // Optional i18n key
  "noteKey": "string", // Optional i18n key
  "tariffRanges": "json", // Array of {range: string, tariff: string}
  "order": "number",
  "isActive": "boolean"
}
```

**D. FAQ Content Type:**
```javascript
{
  "id": "number",
  "questionAr": "text",
  "questionEn": "text",
  "answerAr": "richtext",
  "answerEn": "richtext",
  "category": "enum", // "general", "services", "billing", "technical"
  "order": "number",
  "isActive": "boolean",
  "tags": "json", // Array of tags for search
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

**E. Important Links Content Type:**
```javascript
{
  "id": "number",
  "labelAr": "text",
  "labelEn": "text",
  "url": "string",
  "category": "enum", // "government", "services", "resources"
  "icon": "media",
  "color": "string",
  "order": "number",
  "isActive": "boolean",
  "descriptionAr": "text", // Optional
  "descriptionEn": "text" // Optional
}
```

**F. Policies Content Type:**
```javascript
{
  "id": "number",
  "titleAr": "text",
  "titleEn": "text",
  "descriptionAr": "text",
  "descriptionEn": "text",
  "contentAr": "richtext", // Full policy content
  "contentEn": "richtext",
  "type": "enum", // "usage", "privacy", "dataProtection", "cookie"
  "icon": "media",
  "color": "string",
  "order": "number",
  "isActive": "boolean",
  "version": "string", // Policy version
  "effectiveDate": "date",
  "lastUpdated": "datetime"
}
```

### **🌐 API Endpoints Required**

#### **Translation Endpoints:**
```javascript
GET /api/translations?language=ar&category=common
GET /api/translations/key/home.welcome?language=ar
PUT /api/translations/bulk
```

#### **Content Endpoints:**
```javascript
GET /api/compensation-standards?populate=icon&sort=order:asc
GET /api/tariff-categories?populate=icon&sort=order:asc
GET /api/faqs?filters[category][$eq]=general&sort=order:asc
GET /api/important-links?populate=icon&sort=order:asc
GET /api/policies?populate=icon&sort=order:asc
```

#### **Combined Endpoints:**
```javascript
GET /api/app-content?language=ar
// Returns: { translations, compensationStandards, tariffCategories, faqs, importantLinks, policies }

GET /api/app-content/screen/compensation-standards?language=ar
GET /api/app-content/screen/consumption-tariff?language=en
```

### **🔐 Authentication & Security**

#### **API Tokens:**
- **Public Token**: For mobile app (read-only access)
- **Admin Token**: For content management (full access)
- **Editor Token**: For content editors (limited access)

#### **Role-Based Access Control:**
- **Public**: Read-only access to published content
- **Editor**: Can create/edit content, cannot publish
- **Admin**: Full access including user management
- **Super Admin**: System administration

### **📱 Mobile App Integration Requirements**

#### **Data Structure Compatibility:**
The API responses should match existing data structures:

```javascript
// Example: Compensation Standards API Response
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "titleAr": "مدة تسجيل العداد باسم المستهلك",
        "titleEn": "Meter Registration Period in Consumer Name",
        "descriptionAr": "طلب تسجيل العداد باسم مالك المنشأة...",
        "descriptionEn": "Request to register the meter...",
        "conditionsAr": "إرفاق كافة المستندات المطلوبة",
        "conditionsEn": "Attach all required documents",
        "periodAr": "3 أيام عمل",
        "periodEn": "3 working days",
        "compensationAr": "100 ريال",
        "compensationEn": "SAR 100",
        "additionalCompensationAr": "20 ريال عن كل يوم عمل إضافي",
        "additionalCompensationEn": "SAR 20 per additional working day",
        "notesAr": "يتم حساب بداية المدة من يوم العمل التالي",
        "notesEn": "Period starts from the working day following",
        "icon": {
          "data": {
            "attributes": {
              "url": "/uploads/icon_document.png"
            }
          }
        },
        "color": "#00623B",
        "category": "service",
        "order": 1,
        "isActive": true
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 9
    }
  }
}
```

### **📊 Content Migration & Import**

#### **Initial Content to Migrate:**
- 9 Compensation Standards
- 10 Tariff Categories  
- FAQ questions and answers
- Important links (government, services, resources)
- Policy documents
- All i18n translations (Arabic/English)

#### **Import Format Required:**
- CSV/JSON import templates for all content types
- Translation keys and values
- Media file organization
- Content relationships

### **⚡ Performance & Optimization**

#### **Caching Strategy:**
- Redis caching for frequently accessed content
- CDN integration for media files
- API response caching
- Cache invalidation on content updates

#### **API Optimization:**
- Pagination for large datasets
- Field selection to reduce payload size
- Compression (gzip) for API responses
- GraphQL for flexible data fetching

### **🚀 Deliverables Expected**

#### **Technical Deliverables:**
- [ ] Strapi CMS instance (Docker container)
- [ ] Database schema and migrations
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Admin panel configuration
- [ ] Content import scripts
- [ ] Deployment scripts and documentation

#### **Content Deliverables:**
- [ ] All static content migrated to CMS
- [ ] Translation keys and values imported
- [ ] Media files uploaded and organized
- [ ] Content categories and relationships established
- [ ] User accounts and permissions configured

#### **Integration Deliverables:**
- [ ] API endpoints tested with mobile app
- [ ] Fallback mechanisms implemented
- [ ] Performance optimization completed
- [ ] Security audit and hardening
- [ ] Monitoring and alerting setup

### **📅 Timeline & Milestones**

#### **Phase 1: Setup & Basic Content Types (Week 1-2)**
- Strapi installation and configuration
- Basic content types creation
- API endpoint development
- Initial content import

#### **Phase 2: Advanced Features & Integration (Week 3-4)**
- Rich text editor configuration
- Media management setup
- Authentication and security implementation
- Mobile app integration testing

#### **Phase 3: Optimization & Deployment (Week 5-6)**
- Performance optimization
- Caching implementation
- Production deployment
- Documentation completion

### **❓ Key Questions for Strapi Developer**

#### **Technical Questions:**
1. What's your preferred database setup for this project?
2. Do you recommend any specific Strapi plugins for i18n management?
3. What's your approach to handling RTL text in Strapi?
4. How would you implement content versioning and rollback?
5. What caching strategy would you recommend for mobile app performance?

#### **Content Management Questions:**
1. How would you handle bulk content updates efficiently?
2. What's your approach to content approval workflows?
3. How would you implement content scheduling for future publishing?
4. What media optimization strategies would you use?
5. How would you handle content backup and recovery?

#### **Integration Questions:**
1. What's the best approach for API versioning with mobile apps?
2. How would you handle offline content synchronization?
3. What's your recommended approach for content caching in the mobile app?
4. How would you implement content change notifications?
5. What's your strategy for handling API rate limiting?

### **✅ Success Criteria**

#### **Functional Requirements:**
- [ ] All content types are created and functional
- [ ] API endpoints return data in expected format
- [ ] Mobile app can load content dynamically
- [ ] Fallback mechanism works when API is unavailable
- [ ] Content management interface is user-friendly

#### **Performance Requirements:**
- [ ] API response time < 500ms for content requests
- [ ] Mobile app loads content within 2 seconds
- [ ] System handles 1000+ concurrent users
- [ ] 99.9% uptime for production environment
- [ ] Content updates reflect in mobile app within 5 minutes

#### **Security Requirements:**
- [ ] All API endpoints are properly secured
- [ ] Content access is role-based
- [ ] Sensitive data is encrypted
- [ ] Regular security audits passed
- [ ] Backup and recovery procedures tested

### **📝 Additional Notes**

- Mobile app is built with React Native 0.79.4
- Current app supports Arabic (RTL) and English (LTR)
- App targets iOS and Android platforms
- Content should be optimized for mobile viewing
- Consider future scalability for additional content types

---

This comprehensive document covers all aspects needed for your Strapi CMS integration. You can save this as a markdown file and share it with your Strapi developer. The document includes technical specifications, content types, API requirements, security considerations, and success criteria to ensure a successful implementation! 🚀

```javascript
{
  "key": "string", // Translation key (e.g., "home.welcome")
  "language": "enum", // "ar" | "en"
  "value": "text", // Translated text
  "category": "enum", // "common", "navigation", "forms", "errors"
  "isActive": "boolean",
  "lastModified": "datetime"
}
```

```javascript
{
  "id": "number",
  "titleAr": "text",
  "titleEn": "text",
  "descriptionAr": "richtext",
  "descriptionEn": "richtext",
  "conditionsAr": "text",
  "conditionsEn": "text",
  "periodAr": "text",
  "periodEn": "text",
  "compensationAr": "text",
  "compensationEn": "text",
  "additionalCompensationAr": "text",
  "additionalCompensationEn": "text",
  "notesAr": "text",
  "notesEn": "text",
  "icon": "media",
  "color": "string", // Hex color code
  "category": "enum", // "service", "restoration", "notification", "emergency", "violation", "complaint"
  "order": "number",
  "isActive": "boolean"
}
```

```javascript
{
  "id": "string", // "residential", "commercial", etc.
  "titleKey": "string", // i18n key
  "icon": "media",
  "color": "string",
  "descriptionKey": "string", // Optional i18n key
  "noteKey": "string", // Optional i18n key
  "tariffRanges": "json", // Array of {range: string, tariff: string}
  "order": "number",
  "isActive": "boolean"
}
```

```javascript
{
  "id": "number",
  "questionAr": "text",
  "questionEn": "text",
  "answerAr": "richtext",
  "answerEn": "richtext",
  "category": "enum", // "general", "services", "billing", "technical"
  "order": "number",
  "isActive": "boolean",
  "tags": "json", // Array of tags for search
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

```javascript
{
  "id": "number",
  "labelAr": "text",
  "labelEn": "text",
  "url": "string",
  "category": "enum", // "government", "services", "resources"
  "icon": "media",
  "color": "string",
  "order": "number",
  "isActive": "boolean",
  "descriptionAr": "text", // Optional
  "descriptionEn": "text" // Optional
}
```

```javascript
{
  "id": "number",
  "titleAr": "text",
  "titleEn": "text",
  "descriptionAr": "text",
  "descriptionEn": "text",
  "contentAr": "richtext", // Full policy content
  "contentEn": "richtext",
  "type": "enum", // "usage", "privacy", "dataProtection", "cookie"
  "icon": "media",
  "color": "string",
  "order": "number",
  "isActive": "boolean",
  "version": "string", // Policy version
  "effectiveDate": "date",
  "lastUpdated": "datetime"
}
```

```javascript
GET /api/translations?language=ar&category=common
GET /api/translations/key/home.welcome?language=ar
PUT /api/translations/bulk
```

```javascript
GET /api/compensation-standards?populate=icon&sort=order:asc
GET /api/tariff-categories?populate=icon&sort=order:asc
GET /api/faqs?filters[category][$eq]=general&sort=order:asc
GET /api/important-links?populate=icon&sort=order:asc
GET /api/policies?populate=icon&sort=order:asc
```

```javascript
GET /api/app-content?language=ar
// Returns: { translations, compensationStandards, tariffCategories, faqs, importantLinks, policies }

GET /api/app-content/screen/compensation-standards?language=ar
GET /api/app-content/screen/consumption-tariff?language=en
```

```javascript
// Example: Compensation Standards API Response
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "titleAr": "مدة تسجيل العداد باسم المستهلك",
        "titleEn": "Meter Registration Period in Consumer Name",
        "descriptionAr": "طلب تسجيل العداد باسم مالك المنشأة...",
        "descriptionEn": "Request to register the meter...",
        "conditionsAr": "إرفاق كافة المستندات المطلوبة",
        "conditionsEn": "Attach all required documents",
        "periodAr": "3 أيام عمل",
        "periodEn": "3 working days",
        "compensationAr": "100 ريال",
        "compensationEn": "SAR 100",
        "additionalCompensationAr": "20 ريال عن كل يوم عمل إضافي",
        "additionalCompensationEn": "SAR 20 per additional working day",
        "notesAr": "يتم حساب بداية المدة من يوم العمل التالي",
        "notesEn": "Period starts from the working day following",
        "icon": {
          "data": {
            "attributes": {
              "url": "/uploads/icon_document.png"
            }
          }
        },
        "color": "#00623B",
        "category": "service",
        "order": 1,
        "isActive": true
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 9
    }
  }
}
```

