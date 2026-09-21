# وجهة | Wijhah 📍
> منصة ويب متكاملة لخدمات التوصيل داخل الحرم الجامعي | Full-Stack Campus Delivery Web Platform

---

### 🇸🇦 نبذة عن المشروع
**وجهة** هو تطبيق ويب (Full-Stack) يهدف إلى تسهيل طلب الوجبات والمشروبات من المقاهي والمطاعم داخل الحرم الجامعي وتوصيلها مباشرة إلى مباني الكليات والعمادات، مع دعم التسعير التلقائي لرسوم التوصيل وتتبع حالة الطلب لحظياً.

**أبرز المميزات:**
- تصفح قوائم المتاجر والأصناف مع إدارة تفاعلية لسلة الطلبات.
- التحقق الفوري من صحة أرقام الجوال المحلية (صيغة 05 / 966+).
- احتساب تلقائي ودقيق لرسوم التوصيل بحسب مبنى الاستلام المختار.
- محاكاة تتبع حي لحالة الطلب برقم مرجعي فريد لكل طلب (`WJ-XXXXXX`).
- معمارية برمجية مفصولة بالكامل (Decoupled Client-Server Architecture).

---

### 🇬🇧 Project Overview
**Wijhah** is a decoupled full-stack web application designed to streamline ordering food and beverages to specific university campus buildings. It offers dynamic delivery tier calculations, robust input validation, and real-time order lifecycle tracking.

**Key Highlights:**
- Vendor menu exploration with responsive cart state management.
- Real-time order progress simulation via automated lifecycle state transitions.
- Client-side and server-side Saudi phone format validation.
- Clean RESTful API architecture connecting lightweight static pages to a Flask backend.

---

### 🛠 التقنيات المستخدمة | Tech Stack
- **Frontend:** Vanilla JavaScript (ES6+), HTML5, Modern CSS3
- **Backend:** Python (Flask, Flask-CORS)
- **Database & ORM:** SQLite, SQLAlchemy

---

### 🔌 مسارات الـ API الأساسية | Main Endpoints

| Method | Endpoint | الوصف (Description) |
| :--- | :--- | :--- |
| `GET` | `/api/buildings` | جلب قائمة مباني الحرم الجامعي ورسوم التوصيل |
| `POST` | `/api/orders` | إنشاء طلب جديد ومعالجة الإجمالي والتحقق من المدخلات |
| `GET` | `/api/orders/<id>` | الاستعلام عن بيانات الطلب وتحديث مسار التتبع الزمني |

---

### 🚀 التشغيل السريع | Quick Start

#### 1. إعداد وتشغيل الخادم (Backend)
```bash
# تثبيت الحزم المطلوبة
pip install -r requirements.txt

# تشغيل خادم Flask
python app.py