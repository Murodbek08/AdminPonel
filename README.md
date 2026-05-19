# 🛡️ Admin Panel — Role-Based Access Control

Foydalanuvchi va rollarni boshqarish tizimining frontend qismi.  
Backend yo'q — barcha API so'rovlari **Mock Service Worker (MSW)** orqali simulatsiya qilinadi.

---

## ✨ Loyiha imkoniyatlari

- 🔐 JWT asosidagi login / logout (mock token)
- 👥 Rol asosidagi navigatsiya — **RBAC**
- 🧑‍💼 Foydalanuvchilar CRUD paneli (ADMIN uchun)
- 💳 To'lovlar ro'yxati — filter va pagination (PAYMENT uchun)
- 📊 Hisobotlar — jadval + grafik (REPORTS uchun)
- 🚫 Ruxsatsiz kirish — `/403` sahifasi
- 🌙 Dark / Light tema
- 🌐 Ko'p tillilik — O'zbek / Rus / Ingliz
- 📱 Responsive dizayn (360px dan boshlab)

---

## 🚀 Ishga tushirish

### Talablar

- **Node.js** `>= 18`
- **npm** `>= 9`

### O'rnatish

```bash
# 1. Repositoryni clone qiling
git clone https://github.com/Murodbek08/AdminPonel.git
cd AdminPonel

# 2. Bog'liqliklarni o'rnating
npm install

# 3. Development serverni ishga tushiring
npm run dev
```

Brauzerda **[http://localhost:5173](http://localhost:5173)** ni oching.

> ⚠️ `node_modules/` va `.env` fayllari `.gitignore`ga qo'shilgan — commitga tushmaydi.

---

## 🧪 Test foydalanuvchilar

Quyidagi ma'lumotlar bilan tizimga kirishingiz mumkin:

| Email              | Parol       | Rollar                  | Kirish huquqi     |
| ------------------ | ----------- | ----------------------- | ----------------- |
| `admin@test.com`   | `Admin@123` | ADMIN, PAYMENT, REPORTS | Barcha sahifalar  |
| `payment@test.com` | `Payment@1` | PAYMENT                 | Faqat `/payments` |
| `reports@test.com` | `Reports@1` | REPORTS                 | Faqat `/reports`  |
| `user@test.com`    | `User@1234` | —                       | Rol yo'q → `/403` |

---

## 🗂️ Sahifalar va routelar

| Route        | Tavsif                     | Ruxsat             |
| ------------ | -------------------------- | ------------------ |
| `/login`     | Kirish sahifasi            | Hamma              |
| `/dashboard` | Asosiy sahifa — statistika | Autentifikatsiya   |
| `/users`     | Foydalanuvchilar CRUD      | `ADMIN`            |
| `/payments`  | To'lovlar ro'yxati         | `PAYMENT`          |
| `/reports`   | Hisobotlar + grafik        | `REPORTS`          |
| `/403`       | Ruxsat yo'q                | Avtomatik redirect |

---

## 🔌 Mock API

MSW avtomatik ravishda **faqat development rejimida** yoqiladi — hech qanday server kerak emas.

Barcha so'rovlarga `delay(600ms)` qo'shilgan — loading holatlarini sinash uchun.

| Method   | Endpoint          | Tavsif                                    |
| -------- | ----------------- | ----------------------------------------- |
| `POST`   | `/api/auth/login` | Login — token qaytaradi                   |
| `GET`    | `/api/auth/me`    | Joriy foydalanuvchi ma'lumotlari          |
| `GET`    | `/api/users`      | Ro'yxat (pagination + search)             |
| `POST`   | `/api/users`      | Yangi foydalanuvchi yaratish              |
| `PUT`    | `/api/users/:id`  | Foydalanuvchini tahrirlash                |
| `DELETE` | `/api/users/:id`  | Foydalanuvchini o'chirish                 |
| `GET`    | `/api/roles`      | Mavjud rollar ro'yxati                    |
| `GET`    | `/api/payments`   | To'lovlar (50+ yozuv, filter, pagination) |
| `GET`    | `/api/reports`    | Hisobot ma'lumotlari (grafik uchun)       |

**Xato holatlari:**

- Noto'g'ri parol → `401 Unauthorized`
- Ruxsatsiz so'rov → `403 Forbidden`
- Token muddati tugasa → avtomatik logout + `/login` redirect

---

## 📦 Texnologiyalar steki

| Texnologiya           | Maqsad                               |
| --------------------- | ------------------------------------ |
| React 18 + TypeScript | UI framework                         |
| Vite                  | Build tool                           |
| Ant Design 5          | UI komponentlar                      |
| TanStack Query v5     | Server state, caching, loading/error |
| Zustand               | Client state (auth, theme)           |
| React Router v6       | Routing, protected routes            |
| MSW 2.x               | Mock API                             |
| i18next               | Ko'p tillilik (UZ/RU/EN)             |
| Recharts              | Grafik va chartlar                   |
---

## 🏗️ Loyiha arxitekturasi (FSD)

Loyiha **Feature-Sliced Design** arxitekturasi asosida qurilgan:

```
src/
├── app/              # Entry point, provayderlar, global stillar
│   └── providers/    # ThemeProvider, QueryClientProvider
├── pages/            # Route sahifalari
│   ├── dashboard/
│   ├── users/
│   ├── payments/
│   ├── reports/
│   ├── login/
│   ├── forbidden/
│   └── not-found/
├── widgets/          # Yirik mustaqil UI bloklari
│   └── layout/       # AppLayout, AppSidebar, AppHeader
├── features/         # Foydalanuvchi amallari
│   ├── auth/         # Login forma, authStore
│   ├── users/        # UserForm, UserTable
│   ├── theme/        # ThemeSwitcher, themeStore
│   └── language-switcher/
├── entities/         # Biznes entitiyalar
│   ├── user/
│   ├── payment/
│   ├── report/
│   └── role/
└── shared/           # Umumiy foydalaniladigan modullar
    ├── api/          # axios instance, queryClient
    ├── components/   # PageSkeleton, EmptyState, ConfirmDelete
    ├── guards/       # AuthGuard, RoleGuard
    ├── types/        # TypeScript interfeyslari
    ├── utils/        # notify, getApiError
    ├── config/i18n/  # Til fayllari (uz/ru/en)
    └── router/       # App routing
```

> Har bir slice o'z `index.ts` public API orqali eksport qiladi — ichki fayllarga tashqaridan to'g'ridan-to'g'ri import qilinmaydi.

---

## 🛠️ Mavjud skriptlar

```bash
npm run dev       # Development serverni ishga tushirish
npm run build     # Production build
npm run preview   # Production buildni preview qilish
npm run lint      # ESLint tekshiruvi
```

---

## 🎁 Bonus imkoniyatlar

- ✅ Dark / Light mode toggle
- ✅ i18n — O'zbek / Rus / Ingliz tili
- ✅ Recharts — `/reports` sahifasida grafik
- ✅ Feature-Sliced Design (FSD) arxitekturasi
- ✅ Zustand persist — token sahifa yangilansa ham saqlanadi
