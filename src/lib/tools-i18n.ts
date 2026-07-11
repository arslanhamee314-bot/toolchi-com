export interface LocalizedToolMeta {
  name: string;
  shortDesc: string;
  seoTitle: string;
  seoDescription: string;
}

const urTools: Record<string, LocalizedToolMeta> = {
  "compress-image": {
    name: "تصویر کمپریس کریں",
    shortDesc: "PNG اور JPG تصاویر کا سائز براؤزر میں کم کریں، اپ لوڈ کے بغیر۔",
    seoTitle: "آن لائن تصویر کمپریسر - مفت اور محفوظ | Toolchi",
    seoDescription: "PNG اور JPG تصاویر کو اپنے براؤزر میں کمپریس کریں۔ فائلیں آپ کے ڈیوائس پر رہتی ہیں۔",
  },
  "resize-image": {
    name: "تصویر کا سائز بدلیں",
    shortDesc: "تصویر کی چوڑائی، اونچائی اور تناسب جلدی تبدیل کریں۔",
    seoTitle: "آن لائن امیج ریسائزر - مفت اور تیز | Toolchi",
    seoDescription: "تصاویر کے پکسل سائز کو اپ لوڈ کے بغیر محفوظ طریقے سے تبدیل کریں۔",
  },
  "jpg-to-webp": {
    name: "JPG سے WebP",
    shortDesc: "JPG اور PNG تصاویر کو تیز ویب فارمیٹ WebP میں بدلیں۔",
    seoTitle: "JPG سے WebP کنورٹر - مفت آن لائن | Toolchi",
    seoDescription: "تصاویر کو WebP میں تبدیل کریں تاکہ ویب سائٹ کی رفتار بہتر ہو۔",
  },
  "webp-to-jpg": {
    name: "WebP سے JPG",
    shortDesc: "WebP تصاویر کو عام JPG فارمیٹ میں تبدیل کریں۔",
    seoTitle: "WebP سے JPG کنورٹر - تیز اور مفت | Toolchi",
    seoDescription: "WebP تصاویر کو سیکنڈز میں JPG میں تبدیل کریں، بغیر سرور اپ لوڈ کے۔",
  },
  "merge-pdf": {
    name: "PDF فائلیں جوڑیں",
    shortDesc: "متعدد PDF فائلوں کو ایک دستاویز میں محفوظ طریقے سے ملائیں۔",
    seoTitle: "آن لائن PDF مرجر - مفت اور محفوظ | Toolchi",
    seoDescription: "PDF فائلیں اپنے براؤزر میں جوڑیں۔ کوئی فائل سرور پر اپ لوڈ نہیں ہوتی۔",
  },
  "split-pdf": {
    name: "PDF تقسیم کریں",
    shortDesc: "PDF صفحات کو الگ کریں یا مخصوص رینج کے مطابق نئی فائل بنائیں۔",
    seoTitle: "آن لائن PDF سپلٹر - صفحات الگ کریں | Toolchi",
    seoDescription: "PDF صفحات کو محفوظ طریقے سے الگ کریں اور نتیجہ ڈاؤن لوڈ کریں۔",
  },
  "compress-pdf": {
    name: "PDF کمپریس کریں",
    shortDesc: "PDF فائل کا سائز کم کریں تاکہ شیئر کرنا آسان ہو۔",
    seoTitle: "PDF کمپریسر - فائل سائز کم کریں | Toolchi",
    seoDescription: "PDF فائلیں براؤزر میں کمپریس کریں، فائلیں آپ کے ڈیوائس پر رہتی ہیں۔",
  },
  "qr-generator": {
    name: "QR کوڈ جنریٹر",
    shortDesc: "لنک، ٹیکسٹ، فون یا کاروباری معلومات کے لیے QR کوڈ بنائیں۔",
    seoTitle: "مفت آن لائن QR کوڈ جنریٹر | Toolchi",
    seoDescription: "حسب ضرورت QR کوڈ بنائیں، رنگ منتخب کریں، اور PNG یا SVG ڈاؤن لوڈ کریں۔",
  },
  "invoice-generator": {
    name: "انوائس جنریٹر",
    shortDesc: "پیشہ ورانہ انوائس بنائیں، ٹیکس شامل کریں، اور PDF برآمد کریں۔",
    seoTitle: "مفت آن لائن انوائس جنریٹر - PDF بل میکر | Toolchi",
    seoDescription: "فری لانسرز اور کاروبار کے لیے فوری PDF انوائس بنائیں۔",
  },
  "json-formatter": {
    name: "JSON فارمیٹر",
    shortDesc: "JSON کو خوبصورت بنائیں، غلطیاں چیک کریں، اور کوڈ صاف کریں۔",
    seoTitle: "JSON فارمیٹر اور ویلیڈیٹر | Toolchi",
    seoDescription: "JSON کو پڑھنے کے قابل بنائیں، syntax errors دیکھیں، اور صاف output حاصل کریں۔",
  },
  "text-counter": {
    name: "ورڈ کاؤنٹر",
    shortDesc: "الفاظ، حروف، جملے، پیراگراف اور پڑھنے کا وقت گنیں۔",
    seoTitle: "مفت آن لائن ورڈ کاؤنٹر | Toolchi",
    seoDescription: "اپنے بلاگ، مضمون یا کاپی کے الفاظ اور حروف فوراً چیک کریں۔",
  },
  "case-converter": {
    name: "کیس کنورٹر",
    shortDesc: "ٹیکسٹ کو uppercase، lowercase، title case اور slug format میں بدلیں۔",
    seoTitle: "ٹیکسٹ کیس کنورٹر - آن لائن ایڈیٹر | Toolchi",
    seoDescription: "ہیڈنگز، عنوانات اور کوڈ کے لیے ٹیکسٹ کیس سیکنڈز میں تبدیل کریں۔",
  },
  "ssl-checker": {
    name: "SSL چیکر",
    shortDesc: "ویب سائٹ کا SSL سرٹیفکیٹ، expiry اور HTTPS status چیک کریں۔",
    seoTitle: "SSL سرٹیفکیٹ چیکر | Toolchi",
    seoDescription: "کسی بھی ڈومین کا SSL status اور expiry معلومات حاصل کریں۔",
  },
  "robots-txt-checker": {
    name: "Robots.txt چیکر",
    shortDesc: "robots.txt rules، sitemap references اور crawl settings چیک کریں۔",
    seoTitle: "Robots.txt ویلیڈیٹر | Toolchi",
    seoDescription: "اپنی ویب سائٹ کے robots.txt rules چیک کریں تاکہ indexing بہتر ہو۔",
  },
  "xml-sitemap-validator": {
    name: "XML سائٹ میپ ویلیڈیٹر",
    shortDesc: "سائٹ میپ structure، URLs اور XML formatting چیک کریں۔",
    seoTitle: "XML Sitemap Validator - SEO ٹول | Toolchi",
    seoDescription: "اپنے XML sitemap کو verify کریں اور indexing issues کم کریں۔",
  },
  "redirect-checker": {
    name: "ری ڈائریکٹ چیکر",
    shortDesc: "URL redirect chain، status codes اور final destination چیک کریں۔",
    seoTitle: "301/302 ری ڈائریکٹ چیکر | Toolchi",
    seoDescription: "URL redirects کا path، hops اور SEO risk quickly analyze کریں۔",
  },
  "domain-generator": {
    name: "ڈومین نام جنریٹر",
    shortDesc: "بلاگ، برانڈ یا SaaS کے لیے domain name ideas بنائیں۔",
    seoTitle: "مفت ڈومین نام جنریٹر | Toolchi",
    seoDescription: "keywords سے brandable domain ideas تلاش کریں۔",
  },
};

const trTools: Record<string, LocalizedToolMeta> = {
  "compress-image": {
    name: "Görsel Sıkıştır",
    shortDesc: "PNG ve JPG görsellerin dosya boyutunu tarayıcıda azaltın.",
    seoTitle: "Online Görsel Sıkıştırıcı - Ücretsiz ve Güvenli | Toolchi",
    seoDescription: "PNG ve JPG görselleri yüklemeden tarayıcınızda sıkıştırın. Dosyalar cihazınızda kalır.",
  },
  "resize-image": {
    name: "Görsel Boyutlandır",
    shortDesc: "Görsellerin genişlik, yükseklik ve oranlarını hızlıca değiştirin.",
    seoTitle: "Online Görsel Boyutlandırıcı - Ücretsiz | Toolchi",
    seoDescription: "Fotoğrafların piksel boyutlarını yükleme yapmadan güvenli şekilde değiştirin.",
  },
  "jpg-to-webp": {
    name: "JPG'den WebP'ye",
    shortDesc: "JPG ve PNG görselleri modern WebP formatına dönüştürün.",
    seoTitle: "JPG'den WebP'ye Dönüştürücü - Ücretsiz | Toolchi",
    seoDescription: "Web sitenizi hızlandırmak için görselleri anında WebP formatına çevirin.",
  },
  "webp-to-jpg": {
    name: "WebP'den JPG'ye",
    shortDesc: "WebP görselleri yaygın JPG formatına dönüştürün.",
    seoTitle: "WebP'den JPG'ye Dönüştürücü | Toolchi",
    seoDescription: "WebP resimlerinizi güvenli şekilde JPG formatına dönüştürün.",
  },
  "merge-pdf": {
    name: "PDF Birleştir",
    shortDesc: "Birden fazla PDF dosyasını tek belgede birleştirin.",
    seoTitle: "Online PDF Birleştirici - Ücretsiz ve Güvenli | Toolchi",
    seoDescription: "PDF dosyalarını tarayıcınızda birleştirin. Dosyalar sunucuya yüklenmez.",
  },
  "split-pdf": {
    name: "PDF Böl",
    shortDesc: "PDF sayfalarını ayırın veya sayfa aralıklarına göre çıkarın.",
    seoTitle: "Online PDF Bölme Aracı | Toolchi",
    seoDescription: "PDF sayfalarını güvenli şekilde ayırın ve sonucu indirin.",
  },
  "compress-pdf": {
    name: "PDF Sıkıştır",
    shortDesc: "PDF dosya boyutunu paylaşım için küçültün.",
    seoTitle: "PDF Sıkıştırıcı - Dosya Boyutu Küçültme | Toolchi",
    seoDescription: "PDF dosyalarını tarayıcınızda sıkıştırın. Gizli belgeler cihazınızda kalır.",
  },
  "qr-generator": {
    name: "QR Kod Oluşturucu",
    shortDesc: "URL, metin, telefon veya işletme bilgileri için QR kod oluşturun.",
    seoTitle: "Ücretsiz QR Kod Oluşturucu | Toolchi",
    seoDescription: "Renkli ve özelleştirilebilir QR kodlar oluşturun, PNG veya SVG indirin.",
  },
  "invoice-generator": {
    name: "Fatura Oluşturucu",
    shortDesc: "Profesyonel fatura hazırlayın, vergi ekleyin ve PDF olarak dışa aktarın.",
    seoTitle: "Ücretsiz Online Fatura Oluşturucu | Toolchi",
    seoDescription: "Freelancerlar ve işletmeler için hızlı PDF faturalar oluşturun.",
  },
  "json-formatter": {
    name: "JSON Biçimlendirici",
    shortDesc: "JSON verisini düzenleyin, doğrulayın ve okunabilir hale getirin.",
    seoTitle: "JSON Biçimlendirici ve Doğrulayıcı | Toolchi",
    seoDescription: "JSON kodunu güzelleştirin, syntax hatalarını görün ve temiz çıktı alın.",
  },
  "text-counter": {
    name: "Kelime Sayacı",
    shortDesc: "Kelime, karakter, cümle, paragraf ve okuma süresini hesaplayın.",
    seoTitle: "Ücretsiz Online Kelime Sayacı | Toolchi",
    seoDescription: "Blog yazıları ve metinler için kelime ve karakter sayısını anında kontrol edin.",
  },
  "case-converter": {
    name: "Harf Durumu Dönüştürücü",
    shortDesc: "Metni uppercase, lowercase, title case ve slug formatına dönüştürün.",
    seoTitle: "Online Harf Durumu Dönüştürücü | Toolchi",
    seoDescription: "Başlıklar, metinler ve kod değişkenleri için harf durumunu hızlıca değiştirin.",
  },
  "ssl-checker": {
    name: "SSL Kontrolü",
    shortDesc: "Web sitesinin SSL sertifikasını, süresini ve HTTPS durumunu kontrol edin.",
    seoTitle: "SSL Sertifikası Kontrol Aracı | Toolchi",
    seoDescription: "Herhangi bir alan adının SSL durumunu ve bitiş tarihini kontrol edin.",
  },
  "robots-txt-checker": {
    name: "Robots.txt Kontrolü",
    shortDesc: "robots.txt kurallarını, sitemap referanslarını ve tarama ayarlarını kontrol edin.",
    seoTitle: "Robots.txt Doğrulayıcı | Toolchi",
    seoDescription: "Web sitenizin robots.txt kurallarını kontrol ederek indeksleme sorunlarını azaltın.",
  },
  "xml-sitemap-validator": {
    name: "XML Sitemap Doğrulayıcı",
    shortDesc: "Sitemap yapısını, URL listesini ve XML biçimini kontrol edin.",
    seoTitle: "XML Sitemap Validator - SEO Aracı | Toolchi",
    seoDescription: "XML sitemap dosyanızı doğrulayın ve indeksleme kalitesini iyileştirin.",
  },
  "redirect-checker": {
    name: "Yönlendirme Kontrolü",
    shortDesc: "URL yönlendirme zincirini, status kodlarını ve final adresi kontrol edin.",
    seoTitle: "301/302 Yönlendirme Kontrol Aracı | Toolchi",
    seoDescription: "URL redirect path, hops ve SEO risklerini hızlıca analiz edin.",
  },
  "domain-generator": {
    name: "Alan Adı Üretici",
    shortDesc: "Blog, marka veya SaaS için alan adı fikirleri üretin.",
    seoTitle: "Ücretsiz Alan Adı Üretici | Toolchi",
    seoDescription: "Anahtar kelimelerden marka dostu domain fikirleri bulun.",
  },
};

export const TOOL_TRANSLATIONS: Record<string, Record<string, LocalizedToolMeta>> = {
  ur: urTools,
  tr: trTools,
};

export function getLocalizedTool(slug: string, locale: string): LocalizedToolMeta | null {
  const normLocale = (locale || "en").toLowerCase();
  if (normLocale === "ur" || normLocale === "tr") {
    return TOOL_TRANSLATIONS[normLocale]?.[slug] || null;
  }
  return null;
}
