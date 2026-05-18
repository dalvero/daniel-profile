# MASTER BRIEF — Daniel Alfero's Personal Portfolio
**Last Updated:** 19 May 2026  
**Stack:** Next.js (App Router) · JavaScript · TailwindCSS v4 · Framer Motion  
**Owner:** Daniel Jefry Alfero

---

## 1. RINGKASAN PROYEK

Web profile personal milik Daniel Alfero — seorang mahasiswa Universitas Brawijaya, web developer, dan mentor Web Technology di komunitas Provoks. Tujuan utama: **memperkenalkan diri secara profesional** untuk keperluan magang dan kolaborasi.

Scope saat ini: **Landing Page (selesai)**.  
Scope berikutnya: halaman **About**, **Achievement**, **Project**.  
Scope masa depan (opsional): **Dashboard CMS** untuk CRUD konten tanpa menyentuh kode.

---

## 2. DESIGN LANGUAGE & IDENTITAS VISUAL

### 2.1 Palet Warna

| Peran | Nilai |
|---|---|
| Background utama | `rgb(225,227,229)` — abu muda warm |
| Background gelap | `#000000` / `#0a0a0a` |
| Aksen biru | `#007cc2` |
| Teks utama | `#171717` (light) / `#ededed` (dark) |
| Zinc scale | `zinc-50` → `zinc-800` untuk variasi subtle |

### 2.2 Tipografi

| Font | Peran | Variabel CSS |
|---|---|---|
| **League Gothic** | Heading utama, navbar, label besar | `--font-league-gothic` |
| **Inter** | Body text, deskripsi, caption | `--font-inter` |

> **Aturan konsistensi:** Semua heading dekoratif pakai League Gothic. Teks naratif / panjang wajib pakai `font-[family-name:var(--font-inter)]`.

### 2.3 Spacing & Layout

- Grid landing page: **2 kolom** (`grid-cols-2`) untuk hero, footer split
- Padding standar navbar: `px-20 py-5`
- Letter-spacing heading besar: `tracking-[0.2em]` / `tracking-[3]` / `tracking-[6]`
- Semua teks heading: `uppercase`

### 2.4 Motion & Animasi (Framer Motion)

| Pola | Dipakai di |
|---|---|
| `useScroll` + `useTransform` | Parallax: Principles, Journey, Inspires, **TokyoHero (About)** |
| `useSpring` (stiffness 40-100, damping 15-30) | Smoothing semua scroll |
| `AnimatePresence` | Loader exit, Navbar dropdown |
| `whileInView` | Reveal on scroll (Journey images, **semua section About**) |
| Manual scroll listener + CSS transition | Floating images di Perspective |
| 3D `perspective()` + `rotateX/Y` | Hero card, Language card |
| **Sticky + IntersectionObserver** | **Timeline About: foto berganti per milestone** |

### 2.5 Karakter Visual

- **Grayscale → color** on hover (foto profil di Hero, **foto profil di AboutIntro**)
- **Typewriter + scramble effect** (Hero title, Loader, **TokyoHero About**)
- Navbar shrink: animasi nama `DANIEL.ALFERO` → `D.` saat scroll down
- Sticky scroll sections (horizontal card scroll di Process, **foto sticky di TimelineSection**)
- Mix-blend-mode pada Loader text

---

## 3. STRUKTUR FILE SAAT INI

```
src/
├── app/
│   ├── about/
│   │   └── page.js              — Entry point halaman About
│   ├── globals.css
│   ├── layout.js                — Root layout (fonts, Navbar, PageTransition)
│   └── page.js                  — Entry point landing page
├── components/
│   ├── common/                  ← Shared components (dipakai di semua halaman)
│   │   ├── ClientWrapper.js     — Loader wrapper + initial load animation
│   │   ├── Footer.js            — Footer universal
│   │   ├── Loader.js            — Scramble text loader (initial + transition)
│   │   ├── Navbar.js            — Fixed navbar + curtain navigation
│   │   └── PageTransition.js    — Curtain transition + useCurtain context
│   ├── landing/                 ← Landing page sections (hanya dipakai di /)
│   │   ├── Hero.js              — Typewriter + 3D photo card
│   │   ├── Perspective.js       — Floating images reveal on scroll
│   │   ├── Principles.js        — Parallax: Clarity & Consistency
│   │   ├── Process.js           — Horizontal scroll cards
│   │   ├── Inspires.js          — Diagonal marquee quotes
│   │   ├── Started.js           — Sticky timeline + interactive images
│   │   ├── SigLanguage.js       — Carousel quotes tokoh
│   │   ├── Language.js          — 3D hover tech stack infinite scroll
│   │   └── Journey.js           — Parallax banyak foto + quotes
│   └── about/                   ← About page sections (hanya dipakai di /about)
│       ├── HeroAbout.js         — Parallax hero + editorial text (BlurText reveal)
│       ├── AboutIntro.js        — Scroll-driven spotlight: focus areas + image swap
│       ├── CoreValues.js        — Core Values spotlight: Who/What/Why/How + paragraf
│       ├── TimelineSection.js   — Dark editorial timeline + sticky photo
│       ├── AboutCTA.js          — CTA + social icons + parallax background
│       └── BlurText.js          — Scroll-driven per-word blur reveal (shared)
└── data/                        — (Kosong — belum diisi, prioritas selanjutnya)
```

> **Konvensi folder:**
> - `common/` → komponen yang dipakai di layout atau multiple halaman (Navbar, Footer, Loader, PageTransition)
> - `landing/` → section khusus landing page (tidak dipakai di halaman lain)
> - `about/` → section khusus halaman About (tidak dipakai di halaman lain)
> - Saat halaman baru dibuat (`/projects`, `/achievement`), buat folder baru: `components/projects/`, `components/achievement/`

---

## 4. HALAMAN YANG AKAN DIBUAT

### 4.1 Halaman About (`/about`) ✅ SELESAI (struktur & komponen)

**Tujuan:** Menceritakan siapa Daniel secara lebih dalam — kepribadian, nilai, background.

**Konten yang ada:**
- ✅ HeroAbout — parallax hero + editorial text BlurText (Who am i / What drives me)
- ✅ AboutIntro — scroll-driven spotlight: 5 focus areas + image swap (16:9, Next.js Image)
- ✅ CoreValues — Core Values (Who/What/Why/How) spotlight + paragraf bahasa Indonesia
- ✅ TimelineSection — 6 milestone + sticky foto interaktif
- ✅ AboutCTA — Download CV + Let's Talk + social icons (Gmail, GitHub, LinkedIn, Instagram)
- ✅ BlurText — shared component: per-word blur reveal, rAF batched, optimized

**Yang masih perlu dilengkapi (konten):**
- [ ] Ganti semua `[PLACEHOLDER]` teks dengan konten nyata Daniel
- [ ] Ganti semua foto Unsplash dengan foto asli `/public/images/`
- [ ] Isi `EMAIL` di `AboutCTA.js` dengan email asli
- [ ] Upload `cv.pdf` ke `/public/cv.pdf`
- [ ] Pastikan nama file foto profil di `AboutIntro.js` sudah benar

**Teknik animasi yang dipakai di About:**
- **BlurText** — per-word blur reveal via scroll (rAF batched, willChange optimization, normalized stagger)
- **Scroll-driven spotlight** — AboutIntro & CoreValues: active index dari raw `scrollYProgress`, DOM langsung via `applySpotlight()`
- **Sticky viewport locking** — section 200-300vh, content di `sticky top-0 h-screen`, ilusi halaman "membeku"
- `useScroll` + `useTransform` → HeroAbout parallax foto + teks
- `AnimatePresence` → AboutIntro image cross-fade per focus area
- **Grayscale images** → semua foto grayscale (editorial style)
- Outline text (WebkitTextStroke) → heading beberapa section
- Full dark background (`#0a0a0a`) sepanjang halaman
- **Social icons** → AboutCTA: Gmail, GitHub, LinkedIn, Instagram (SVG inline)

---

### 4.2 Halaman Achievement (`/achievement`)

**Tujuan:** Showcase pencapaian, sertifikat, kompetisi.

**Konten yang perlu ada:**
- List achievement dengan tahun, nama event, kategori, posisi
- Gambar sertifikat / foto dokumentasi
- Badge / kategori (kompetisi, akademik, organisasi, project)
- Filter atau tab per kategori (opsional)

**Data awal (dari kode):**
- OLIVIA 2025 — 1st Place Web Technology
- SiCegah Hebat — Play Store app untuk penelitian stunting FKM UB

**Catatan desain:** Section ini punya banyak gambar (dari Perspective component). Pertimbangkan layout masonry atau grid dengan hover effect.

---

### 4.3 Halaman Project (`/projects`)

**Tujuan:** Portofolio proyek nyata untuk dilihat recruiter.

**Konten per proyek:**
- Nama proyek
- Deskripsi singkat
- Tech stack yang dipakai
- Kategori (Web, Mobile/Flutter, Java, IoT, UI Experiment)
- Link GitHub / Live Demo
- Gambar / screenshot
- Status (selesai / ongoing)

**Kategori proyek (dari Footer):**
- Web Projects
- Java Projects
- IoT Projects
- UI Experiment

---

## 5. STRUKTUR FILE TARGET (SETELAH HALAMAN BARU)

```
src/
├── app/
│   ├── about/
│   │   └── page.js              ✅ Ada
│   ├── achievement/
│   │   └── page.js
│   ├── projects/
│   │   └── page.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── [semua komponen landing page yang ada]
│   ├── about/                   ✅ Ada (6 komponen)
│   ├── achievement/
│   │   ├── AchievementCard.js
│   │   └── AchievementGrid.js
│   └── projects/
│       ├── ProjectCard.js
│       └── ProjectGrid.js
├── data/
│   ├── achievements.js
│   ├── projects.js
│   └── timeline.js
└── styles/
```

---

## 6. DATA LAYER — STRATEGI SCALABLE

Ini kunci agar web bisa berkembang ke CMS di masa depan **tanpa refactor besar**.

### 6.1 Sekarang: Static Data Files

Semua konten dinamis (project, achievement, timeline) disimpan di `src/data/` sebagai JavaScript array biasa.

**Contoh `src/data/projects.js`:**
```js
export const projects = [
  {
    id: "sicegah-hebat",
    title: "SiCegah Hebat",
    description: "Aplikasi kesehatan pencegahan stunting untuk penelitian FKM UB.",
    category: ["Mobile", "Flutter"],
    techStack: ["Flutter", "Dart", "Firebase"],
    github: "https://github.com/...",
    liveUrl: "https://play.google.com/...",
    images: ["/images/sicegah_1.jpeg"],
    status: "done",
    year: 2025,
    featured: true,
  },
];
```

**Contoh `src/data/achievements.js`:**
```js
export const achievements = [
  {
    id: "olivia-2025",
    title: "1st Place Web Technology",
    event: "OLIVIA 2025",
    category: "competition",
    year: 2025,
    description: "Juara 1 kategori Web Technology di lomba OLIVIA.",
    images: ["/images/olivia_juara_1.jpeg", "/images/olivia_sertif.jpeg"],
  },
];
```

### 6.2 Nanti: Jika Mau Pakai CMS

Cukup **ganti sumber data** di masing-masing page. Komponen UI tidak perlu diubah.

```js
// Sekarang:
import { projects } from "@/data/projects";

// Nanti (misal pakai Contentlayer, Sanity, atau API sendiri):
const projects = await fetch("/api/projects").then(r => r.json());
```

---

## 7. KONVENSI KODING

### 7.1 Komponen

- Semua komponen: `"use client"` (karena heavy animation)
- Export: default export per file
- Naming: PascalCase (`ProjectCard.js`)
- Section IDs untuk scroll: `id="hero"`, `id="perspective"`, dst.
- **About page IDs:** `about-hero`, `about-intro`, `about-values`, `about-timeline`, `about-cta`

### 7.2 Navbar

Navbar sudah memiliki link ke `/about`, `/projects`, `/achievement`, `/contact`. Ketika halaman baru dibuat, **tidak perlu ubah Navbar** — linknya sudah ada.

### 7.3 Animasi

- Selalu pakai `useSpring` untuk meng-smooth `useTransform` berbasis scroll
- `whileInView` dengan `viewport={{ once: true }}` untuk reveal sekali saja
- Hindari `animate` tanpa kondisi — pakai `AnimatePresence` untuk mount/unmount
- **Untuk parallax multi-layer:** tiap layer punya `speed` multiplier berbeda, layer jauh = speed rendah

### 7.4 Image

- Foto pribadi: `/public/images/` (sudah ada banyak)
- External SVG icon (devicons): dari CDN jsdelivr — sudah dipakai di Language.js
- Selalu pakai `<Image>` dari Next.js, bukan `<img>`. URL Unsplash sudah dikonfigurasi di `next.config.mjs` (`images.unsplash.com`).

---

## 8. CHECKLIST PENGEMBANGAN

### ✅ Selesai
- [x] Loader dengan scramble effect
- [x] Navbar fixed dengan dropdown sections + animasi nama
- [x] Hero: typewriter + scramble + 3D card foto
- [x] Perspective: floating images reveal on scroll
- [x] Principles: parallax (Clarity & Consistency)
- [x] Process: horizontal scroll cards
- [x] Inspires: diagonal marquee quotes
- [x] Started: sticky timeline + gambar interaktif
- [x] SigLanguage: carousel quotes tokoh
- [x] Language: 3D hover tech stack infinite scroll
- [x] Journey: parallax banyak foto + quotes
- [x] Footer: split layout + social links + CTA
- [x] **Halaman `/about` — struktur & semua komponen** (6 Mei 2026)
- [x] **About redesign — editorial spotlight style** (19 Mei 2026)

### 🔲 Selanjutnya (Target Magang)
- [ ] **Isi konten About** — ganti semua `[PLACEHOLDER]` dengan teks nyata Daniel
- [ ] **Ganti foto About** — foto Unsplash → foto asli di `/public/images/`
- [ ] **Email & CV** — isi email di `AboutCTA.js`, upload `cv.pdf` ke `/public/`
- [ ] Ekstrak data ke `src/data/` (projects, achievements, timeline)
- [ ] Halaman `/achievement`
- [ ] Halaman `/projects`
- [ ] Koneksi link footer & navbar ke halaman nyata
- [ ] Isi link sosial (GitHub, Instagram, LinkedIn, Notion) di Footer

### 🔲 Masa Depan (Post-Magang)
- [ ] Halaman `/contact` dengan form (pakai Resend/EmailJS)
- [ ] API Routes Next.js sebagai backend mini
- [ ] Database (PostgreSQL via Supabase / PlanetScale)
- [ ] Dashboard CMS (`/admin`) dengan autentikasi (NextAuth)
- [ ] CRUD: tambah/edit/hapus project & achievement tanpa sentuh kode
- [ ] Dark mode toggle
- [ ] Mobile responsiveness audit

---

## 9. CATATAN TEKNIS PENTING

1. **TailwindCSS v4** — pakai `@import "tailwindcss"` bukan config file. `@theme inline` untuk custom variables.

2. **Font League Gothic** — diset di `body` melalui CSS variable. Untuk Inter, wajib tulis `font-[family-name:var(--font-inter)]` karena Tailwind v4 butuh explicit class.

3. **ClientWrapper** — loader 3.5 detik. Jika di production terasa lambat, turunkan ke 2 detik.

4. **`src/data/` masih kosong** — prioritas pertama sebelum membuat halaman baru, agar komponen halaman baru langsung bisa import data.

5. **`/contact`** belum ada di rencana dekat — tapi sudah ada di Navbar dan Footer. Bisa buat placeholder page dulu (`coming soon`) agar link tidak 404.

6. **Next.js Image + Unsplash** — sudah dikonfigurasi di `next.config.mjs`. Semua komponen About pakai `<Image>` dari next/image.

7. **TokyoHero parallax** — section ini `height: 200vh` dengan `position: sticky`. Pastikan parent (`<main>`) tidak punya `overflow: hidden` agar sticky bekerja.

---

## 10. INSPIRASI REFERENSI DESAIN

Berdasarkan analisis kode, gaya desain ini terinspirasi dari:
- Editorial / magazine layout (tipografi besar, uppercase, tracking lebar)
- Portfolio developer premium (monochromatic, black/white dominant)
- Portofolio interaktif dengan heavy scroll animation
- Arsitektur konten yang "bercerita" (storytelling dari Hero hingga Footer)
- **About page:** cinematic Tokyo night — dark, immersive, layered depth

---

## 11. LOG PERUBAHAN

### 6 Mei 2026 — Halaman About

**File baru yang dibuat:**
- `src/app/about/page.js` — entry point halaman About
- `src/components/about/TokyoHero.js` — full-screen parallax zoom hero (200vh sticky, 3 layer foto)
- `src/components/about/AboutIntro.js` — foto profil + tagline + badges
- `src/components/about/BiographySection.js` — 3 bab bio, split-screen sticky layout (redesigned 18 Mei)
- `src/components/about/ValuesSection.js` — 4 nilai hidup + personal motto (Tokyo bg parallax)
- `src/components/about/TimelineSection.js` — 6 milestone, sticky foto, IntersectionObserver
- `src/components/about/AboutCTA.js` — Download CV + Let's Talk + navigasi ke halaman lain

**Keputusan desain:**
- Tidak install library baru — Framer Motion yang ada sudah cukup
- Foto placeholder dari Unsplash URL (ganti ke `/public/images/` saat foto asli siap)
- `<img>` biasa dipakai (bukan `next/image`) untuk URL Unsplash eksternal
- Tema Tokyo diimplementasi via multi-layer parallax scroll, bukan Three.js/WebGL
- Scramble dengan karakter katakana (アイウ...) — konsisten dengan Loader & Hero landing

**Yang masih perlu dilengkapi (konten, bukan kode):**
- Semua teks `[PLACEHOLDER]` di setiap komponen
- Foto asli Daniel menggantikan URL Unsplash
- Email asli di `AboutCTA.js`
- File `cv.pdf` di `/public/`

### 18 Mei 2026 — Restructure & Page Transition

**Restructure folder components:**
- `components/` flat → terstruktur: `common/`, `landing/`, `about/`
- 5 file shared → `common/` (ClientWrapper, Footer, Loader, Navbar, PageTransition)
- 9 file landing → `landing/` (Hero, Perspective, Principles, Process, Inspires, Started, SigLanguage, Language, Journey)
- `about/` tetap di tempat (tidak berubah)
- Hapus `temp.txt`

**Page Transition system:**
- `PageTransition.js` → Provider + Context (`useCurtain` hook)
- Navbar pakai `curtain.navigate(href)` bukan `<Link>` default
- Alur: klik link → curtain turun (tutup halaman saat ini) → scramble text → `router.push()` di balik tirai → curtain naik (reveal halaman baru)
- Loader.js: tambah `onComplete` prop, progress bar sync dengan durasi scramble

**Fix warnings:**
- Semua `<Image>` dengan `fill` → tambah `sizes` prop (22 komponen)
- `<html>` tambah `relative` → fix framer-motion scroll offset warning
- LCP image (`daniel.jpeg`) → tambah `loading="eager"`
- Hapus unused import `useScroll`/`useTransform`/`useSpring` di TimelineSection.js

### 18 Mei 2026 — BiographySection Redesign

**BiographySection.js → split-screen sticky layout:**
- Left column: `sticky top-0 h-screen` dengan cross-fading image + title yang berubah per active chapter
- Right column: scrolling chapter list dengan IntersectionObserver auto-activate
- Stacking entry animation: section slides up dari bawah covering previous section (z-index: 5)
- Active chapter styling: scale transform, color transition, indicator line
- Mobile fallback: full-width layout dengan image inline per chapter
- `AnimatePresence` untuk cross-fade image swap di left column

### 18 Mei 2026 — About Page Editorial Redesign (Victor Furuya Reference)

**Full redesign halaman About — editorial magazine style:**
- Referensi: victorfuruya.com/about — dark monokromatik, sticky split-screen, manifesto narrative
- **Semua section background: `#0a0a0a`** — tidak ada lagi light section (`rgb(225,227,229)` dihapus)
- TokyoHero: bottom gradient diubah dari light ke `#0a0a0a`

**AboutIntro.js — full rewrite:**
- Split-screen sticky: foto portrait kiri (parallax) + manifesto text kanan
- Section 200vh, foto sticky top-0 h-screen
- Headline editorial: "DEVELOPER, MENTOR, LEARNER." dengan staggered TextReveal
- Info dalam format editorial vertical list (border-t items)
- Mobile: foto di atas, text di bawah

**BiographySection.js — full rewrite:**
- Split-screen sticky: image kiri + scrolling chapters kanan
- Big number watermark (01, 02, 03) sebagai visual anchor
- IntersectionObserver auto-activate + image cross-fade (AnimatePresence)
- Stacking entry animation: slides up dari bawah
- Active state: scale transform, color transition, indicator line biru

**ValuesSection.js — full rewrite:**
- Stacked manifesto blocks: headline sangat besar (clamp(60px, 12vw, 140px))
- Parallax stacked images di antara value blocks (Tokyo photos)
- Personal motto: full-screen section dengan parallax background image
- Number + subtitle sebagai editorial metadata

**TimelineSection.js — full rewrite:**
- Background dark (#0a0a0a) menggantikan light
- Grayscale images dengan opacity-60
- Active state lebih dramatis: zinc-800 → zinc-700 line
- Consistent dark editorial style

**AboutCTA.js — minor tweak:**
- Label color: zinc-400 → zinc-500 (consistency)

### 19 Mei 2026 — About Page Editorial Spotlight Redesign

**Full redesign halaman About — scroll-driven spotlight pattern:**

**BlurText.js — new shared component:**
- Per-word blur reveal driven by scroll position
- Optimized: rAF batching, willChange hanya saat animasi aktif, normalized stagger
- Dipakai di HeroAbout (editorial text) dan AboutIntro (label "Areas of focus")

**HeroAbout.js — updated:**
- Editorial text diubah ke bahasa Indonesia (Who am i / What drives me)
- Bottom gradient dipindah ke section level (absolute bottom-0) supaya tidak ikut scroll
- textY parallax dikurangi dari -80% ke -20%

**AboutIntro.js — full rewrite:**
- Scroll-driven spotlight: 5 focus areas (Strategy, Branding, Art Direction, Visual Design, Interactive Design)
- Sticky viewport locking: section 200-300vh, content di `sticky top-0 h-screen`
- Image swap per focus area: Next.js `<Image>`, 16:9 aspect ratio, AnimatePresence cross-fade
- Spotlight: raw `scrollYProgress` untuk active index (responsif), DOM langsung via `applySpotlight()`
- Label "Areas of focus" pakai BlurText scroll reveal

**BiographySection.js → CoreValues.js — renamed & rewritten:**
- File di-rename dari BiographySection.js ke CoreValues.js
- Export diubah dari `AboutIntro` ke `CoreValues`
- Layout: kiri = "Core Values" label + heading (Who/What/Why/How), kanan = paragraf bahasa Indonesia
- Spotlight per sentence di paragraf, sync dengan heading kiri
- Konten diubah ke bahasa Indonesia sesuai profil Daniel

**AboutCTA.js — updated:**
- `<img>` → `<Image>` dari next/image (Unsplash URL sudah dikonfigurasi)
- Headline diperkecil: `clamp(56px,12vw,160px)` → `clamp(40px,8vw,110px)`
- Font diubah ke League Gothic
- Email text diganti social icons: Gmail, GitHub, LinkedIn, Instagram (SVG inline)

**Navbar.js — updated:**
- Section `/about` disesuaikan: Hero, Timeline, Core Values, CTA
- ID section di-fix: duplikat `about-intro` dipecah jadi `about-timeline` dan `about-values`

**globals.css — updated:**
- Tambah `.focus-list::-webkit-scrollbar { display: none }` untuk hide scrollbar

---

*Brief ini adalah living document. Update setiap ada perubahan signifikan pada arsitektur atau desain.*