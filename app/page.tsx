import {
  sanityClient,
  readingTime,
  extractPlainText,
  formatHebrewDate,
} from "@/lib/sanity";

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  publishedAt,
  body,
  mainImage{asset->{url}}
}`;

interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  body?: Array<{ children?: Array<{ text: string }> }>;
  mainImage?: { asset: { url: string } };
}

function buildArticlesSection(
  posts: {
    title: string;
    slug: string;
    publishedAt: string;
    excerpt: string;
    readingTime: number;
    imageUrl?: string;
  }[]
): string {
  if (posts.length === 0) return "";

  const cards = posts
    .map(
      (p) => `
      <div class="article-card" data-animate>
        ${
          p.imageUrl
            ? `<div class="article-card__image">
            <img src="${p.imageUrl}" alt="${p.title}" loading="lazy" />
          </div>`
            : ""
        }
        <div class="article-card__body">
          <span class="article-card__date">${p.publishedAt}</span>
          <h3 class="article-card__title">${p.title}</h3>
          <p class="article-card__excerpt">${p.excerpt}</p>
          <div class="article-card__footer">
            <span class="article-card__reading-time">${p.readingTime} דק׳ קריאה</span>
            <a href="/blog/${p.slug}" class="article-card__link">קרא עוד ←</a>
          </div>
        </div>
      </div>`
    )
    .join("\n");

  return `
  <!-- ═══════════════════════════════════════════
       ARTICLES — מאמרים אחרונים
  ═══════════════════════════════════════════ -->
  <section class="articles" id="articles">
    <div class="articles__inner">
      <div class="articles__header" data-animate>
        <span class="section-label">מהבלוג</span>
        <h2 class="section-title">מאמרים אחרונים</h2>
      </div>
      <div class="articles__grid">
        ${cards}
      </div>
      <div class="articles__cta" data-animate>
        <a href="/blog" class="btn btn--outline">לכל המאמרים ←</a>
      </div>
    </div>
  </section>`;
}

export default async function HomePage() {
  // Fetch latest articles from Sanity
  let articles: {
    title: string;
    slug: string;
    publishedAt: string;
    excerpt: string;
    readingTime: number;
    imageUrl?: string;
  }[] = [];

  try {
    const sanityPosts: SanityPost[] = await sanityClient.fetch(
      POSTS_QUERY,
      {},
      { next: { revalidate: 0 } }
    );
    articles = sanityPosts.map((p) => ({
      title: p.title,
      slug: p.slug.current,
      publishedAt: formatHebrewDate(p.publishedAt),
      excerpt: extractPlainText(p.body ?? []).slice(0, 150) + "...",
      readingTime: readingTime(p.body ?? []),
      imageUrl: p.mainImage?.asset?.url,
    }));
  } catch {
    // Sanity unreachable — skip articles section
  }

  const articlesHTML = buildArticlesSection(articles);

  const bodyHTML = BODY_BEFORE_ARTICLES + articlesHTML + BODY_AFTER_ARTICLES;

  return <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />;
}

/* ─────────────────────────────────────────────
   Original HTML body content from deployment E9UJYDc3U
   Split into two parts: before articles & after articles
   (articles section injected between Services and Contact)
   ───────────────────────────────────────────── */

const BODY_BEFORE_ARTICLES = `
  <!-- ═══════════════════════════════════════════
       FLOATING WHATSAPP BUTTON
  ═══════════════════════════════════════════ -->
  <a class="wa-float"
     href="https://wa.me/972509591974?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%91%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%98%D7%99%D7%A4%D7%95%D7%9C.%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%90%D7%9D%20%D7%A0%D7%95%D7%9B%D7%9C%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%96%D7%9E%D7%9F%20%D7%A7%D7%A6%D7%A8%20%D7%9C%D7%A9%D7%99%D7%97%D7%94%20%D7%A8%D7%90%D7%A9%D7%95%D7%A0%D7%99%D7%AA.%20%D7%AA%D7%95%D7%93%D7%94."
     target="_blank"
     rel="noopener noreferrer"
     aria-label="שלח הודעה ב-WhatsApp">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
    <span class="wa-float__pulse"></span>
  </a>

  <!-- ═══════════════════════════════════════════
       NAVBAR
  ═══════════════════════════════════════════ -->
  <nav class="navbar" id="navbar">
    <div class="navbar__inner">
      <a href="#home" class="navbar__logo">
        <img src="images/logo.png" alt="דניאל וסטפריד" />
      </a>

      <div class="navbar__menu" id="navMenu">
        <ul class="navbar__links">
          <li><a href="#about">אודות</a></li>
          <li><a href="#method">שיטת הטיפול</a></li>
          <li><a href="#soldiers">לחיילים</a></li>
          <li><a href="#services">שירותים</a></li>
          <li><a href="/blog">בלוג</a></li>
          <li><a href="#contact">צור קשר</a></li>
        </ul>
        <a class="btn btn--wa-sm"
           href="https://wa.me/972509591974?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%91%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%98%D7%99%D7%A4%D7%95%D7%9C.%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%90%D7%9D%20%D7%A0%D7%95%D7%9B%D7%9C%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%96%D7%9E%D7%9F%20%D7%A7%D7%A6%D7%A8%20%D7%9C%D7%A9%D7%99%D7%97%D7%94%20%D7%A8%D7%90%D7%A9%D7%95%D7%A0%D7%99%D7%AA.%20%D7%AA%D7%95%D7%93%D7%94."
           target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          שלח הודעה
        </a>
      </div>

      <button class="navbar__toggle" id="navToggle" aria-label="פתח תפריט" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- ═══════════════════════════════════════════
       HERO
  ═══════════════════════════════════════════ -->
  <section class="hero" id="home">
    <div class="hero__blob hero__blob--1" aria-hidden="true"></div>
    <div class="hero__blob hero__blob--2" aria-hidden="true"></div>

    <div class="hero__inner">
      <div class="hero__content" data-animate>
        <div class="hero__badge">
          <span>10+ שנות ניסיון</span>
        </div>
        <h1 class="hero__name">דניאל וסטפריד</h1>
        <p class="hero__sub">
          פסיכותרפיסט ומטפל גוף-נפש<br />
          מסע לעבר הכרה, קבלה, ושלום פנימי
        </p>
        <p class="hero__tagline">"השינוי שלך מתחיל במישהו שבאמת מאמין בך."</p>
        <div class="hero__banners">
          <a class="hero-banner hero-banner--soldiers" href="#soldiers">
            🪖 לחיילים ומילואימניקים — טיפול בהחזר מלא מקרן הסיוע ←
          </a>
          <a class="hero-banner hero-banner--guide" href="#lead-magnet">
            📖 מדריך חינמי: 5 כלים לשלום פנימי — קבל עכשיו ←
          </a>
          <a class="hero-banner hero-banner--articles" href="#articles">
            ✍️ מאמרים חדשים בבלוג — קרא עכשיו ←
          </a>
        </div>
        <div class="hero__actions">
          <a class="btn btn--outline" href="#about">קרא עוד ↓</a>
        </div>
      </div>

      <div class="hero__image-wrap" data-animate data-delay="200">
        <div class="hero__image-ring" aria-hidden="true"></div>
        <div class="hero__image">
          <img src="images/daniel-hero.jpg" alt="דניאל וסטפריד, פסיכותרפיסט ומטפל גוף-נפש" />
        </div>
      </div>
    </div>

    <!-- Wave divider -->
    <div class="wave-bottom" aria-hidden="true">
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70 Z" fill="#17366B"/>
      </svg>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       PAIN POINTS
  ═══════════════════════════════════════════ -->
  <section class="pain-points">
    <div class="pain-points__inner">
      <p class="pain-points__intro" data-animate>מרגיש אחד מאלה?</p>
      <div class="pain-points__grid">
        <div class="pain-card" data-animate>
          <div class="pain-card__icon" aria-hidden="true">🔄</div>
          <p>מרגיש תקוע, חוזר על אותם דפוסים שוב ושוב, ולא מצליח לצאת מהמעגל?</p>
        </div>
        <div class="pain-card" data-animate data-delay="120">
          <div class="pain-card__icon" aria-hidden="true">💔</div>
          <p>יחסים שמאתגרים אותך: קשיים בזוגיות, במשפחה, בעבודה?</p>
        </div>
        <div class="pain-card" data-animate data-delay="240">
          <div class="pain-card__icon" aria-hidden="true">🌊</div>
          <p>חרדה, פחד ועצב שלא עוזבים, אפילו כשאין סיבה ברורה?</p>
        </div>
      </div>
      <p class="pain-points__outro" data-animate>
        אם הרגשת חיבור לאחד מאלה, <strong>יש כאן מקום בשבילך</strong>
      </p>
    </div>

    <!-- Wave divider -->
    <div class="wave-bottom" aria-hidden="true">
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,20 C360,60 1080,0 1440,40 L1440,70 L0,70 Z" fill="#F7F2EB"/>
      </svg>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       ABOUT
  ═══════════════════════════════════════════ -->
  <section class="about" id="about">
    <div class="about__inner">
      <div class="about__image-wrap" data-animate>
        <div class="about__image">
          <img src="images/daniel-about.jpg" alt="דניאל וסטפריד" />
        </div>
        <div class="about__image-ring" aria-hidden="true"></div>
      </div>

      <div class="about__content" data-animate data-delay="150">
        <h2 class="section-title">שלום, אני דניאל</h2>
        <p>נשוי ואב לשישה, גר בכפר תפוח בשומרון. מעל עשור שאני עוסק בטיפול נפשי, מתוך שליחות אמיתית ואמונה עמוקה ביכולתו של האדם להשתנות.</p>
        <p>למדתי פסיכותרפיה אינטגרטיבית במכון אבולעפיה (אוניברסיטת חיפה). בחרתי לעסוק בתחום הטיפול מתוך שליחות, ומאמין שכל אדם יכול להתפתח, להשתנות, ולקחת אחריות על חייו.</p>
        <p>במהלך עבודתי החינוכית נחשפתי להרבה קשיים, טראומות ומצבי נפש לא פשוטים של נערים ובוגרים. ראיתי כמה הם זקוקים להכוונה, ולכן בחרתי לעסוק בטיפול.</p>

        <div class="credentials">
          <div class="credential-badge">
            <span class="credential-badge__icon" aria-hidden="true">📚</span>
            <span>פסיכותרפיה אינטגרטיבית, מכון אבולעפיה, אוניברסיטת חיפה</span>
          </div>
          <div class="credential-badge">
            <span class="credential-badge__icon" aria-hidden="true">🌿</span>
            <span>שיטת ימימה, למעלה מ-10 שנות לימוד ועיסוק</span>
          </div>
          <div class="credential-badge">
            <span class="credential-badge__icon" aria-hidden="true">🪖</span>
            <span>סדנאות טיפול ועיבוד מיוחדות לחיילים</span>
          </div>
          <div class="credential-badge">
            <span class="credential-badge__icon" aria-hidden="true">🎓</span>
            <span>לימודי תואר שני בעבודה סוציאלית, אוניברסיטת אריאל</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PHOTO STRIP -->
  <div class="photo-strip" data-animate>
    <img src="images/daniel-bench.jpg" alt="דניאל וסטפריד" loading="lazy" />
  </div>

  <!-- ═══════════════════════════════════════════
       METHOD
  ═══════════════════════════════════════════ -->
  <section class="method" id="method">
    <div class="method__inner">
      <div class="method__header" data-animate>
        <span class="section-label">הגישה הטיפולית</span>
        <h2 class="section-title">שיטת ימימה</h2>
        <p class="method__lead">הבסיס הטיפולי שלי שואב מעולמות שונים ומשלב אותם לתהליך אחד: מותאם, עמוק ומשחרר.</p>
      </div>

      <div class="method__grid">
        <div class="method-card" data-animate>
          <div class="method-card__num" aria-hidden="true">01</div>
          <h3>שיטת ימימה</h3>
          <p>מפגש של האדם עם ההווה, עם מה שמאתגר אותו כאן ועכשיו. מתוך כך נבנית <strong>הכרה</strong> והבנה הקושרת אל העבר, אל המקום בו התקבעו ההתנהגויות ודפוסי החשיבה.</p>
          <p>הריפוי מתהווה מתוך קבלה עצמית, חום ואהבה פנימיים ל"ילד" שבתוכנו.</p>
        </div>
        <div class="method-card" data-animate data-delay="120">
          <div class="method-card__num" aria-hidden="true">02</div>
          <h3>טיפול דינאמי</h3>
          <p>עבודה עם שכבות עמוקות של הנפש: הבנת מקורות הכאב, הדפוסים הפנימיים, ומה שמניע את ההתנהגות שלנו.</p>
          <p>שיטה המאפשרת שינוי עמוק ומתמשך, שמחזיק לאורך זמן.</p>
        </div>
        <div class="method-card" data-animate data-delay="240">
          <div class="method-card__num" aria-hidden="true">03</div>
          <h3>כלי גוף-נפש</h3>
          <p>שיטת <strong>המסע</strong>, <strong>התמקדות</strong>, ו<strong>נשימות מעגליות</strong>: כלים גופניים המאפשרים גמישות טיפולית.</p>
          <p>מצליחים לקדם את התהליך במקומות הקשים ביותר, שם המילים לבדן אינן מספיקות.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       LEAD MAGNET
  ═══════════════════════════════════════════ -->
  <section class="lead-magnet" id="lead-magnet">
    <div class="lead-magnet__inner" data-animate>
      <div class="lead-magnet__card">
        <div class="lead-magnet__badge">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
          מתנה בחינם
        </div>
        <h2 class="lead-magnet__title">מדריך לשלום פנימי</h2>
        <p class="lead-magnet__sub">
          קבל/י מדריך חינמי עם 5 כלים מעשיים לטיפוח שלום פנימי בחיי היומיום —
          מגישת שיטת ימימה.
        </p>
        <a href="https://danielw.ravpage.co.il/guide.takeoff"
           target="_blank" rel="noopener noreferrer"
           class="btn btn--primary lead-magnet__btn lead-magnet__btn--big">
          שלחו לי את המדריך ←
        </a>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       SOLDIERS — לחיילים ומילואימניקים
  ═══════════════════════════════════════════ -->
  <section class="soldiers" id="soldiers">
    <div class="soldiers__inner">
      <div class="soldiers__header" data-animate>
        <span class="soldiers__label">לחיילים ומילואימניקים</span>
        <h2 class="soldiers__title">גיבור, נתת בשביל המדינה —<br />זה הזמן לתת לך בחזרה</h2>
        <p class="soldiers__lead">במהלך שנות עבודתי פיתחתי סדנאות טיפול מיוחדות לחיילים בסדיר ומילואים. מרחב לעיבוד, לשחרור, ולחזרה לעצמך.</p>
      </div>

      <div class="soldiers__body">
        <div class="soldiers__poster" data-animate>
          <img src="images/פוסטר לחיילים.jpg"
               alt="נתת בשביל המדינה? זה הזמן לתת לך בחזרה"
               class="soldiers__poster-img" loading="lazy" />
        </div>

        <div class="soldiers__workshop" data-animate data-delay="150">
          <div class="soldiers__workshop-badge">ממומן ב-100% ע"י קרן הסיוע</div>
          <h3 class="soldiers__workshop-title">סדנת טיפול ועיבוד</h3>
          <h4 class="soldiers__workshop-subtitle">סדנה להרפיה ושחרור</h4>
          <p class="soldiers__workshop-desc">סדנאות מיוחדות לחיילים הגיבורים שלנו. נתנסה במספר כלים טיפוליים שיעזרו לנו לשחרר את מה שיושב לנו בבטן.</p>

          <div class="soldiers__workshop-details">
            <div class="soldiers__detail">
              <span class="soldiers__detail-icon" aria-hidden="true">📍</span>
              <span>אריאל, מכון לוז (מרכז אלמוג)</span>
            </div>
            <div class="soldiers__detail">
              <span class="soldiers__detail-icon" aria-hidden="true">👥</span>
              <span>מספר מקומות מוגבל</span>
            </div>
          </div>

          <div class="soldiers__workshop-free">
            <strong>עלות אפקטיבית לך: ₪0</strong><br />
            קרן הסיוע למילואים מכסה את הכל — אתה לא משלם שקל מכיסך
          </div>

          <div class="soldiers__workshop-image">
            <img src="images/yoga-mats.jpg" alt="סדנת טיפול ועיבוד" loading="lazy" />
          </div>

          <div class="soldiers__workshop-actions">
            <a class="btn btn--primary"
               href="https://wa.me/972509591974?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%97%D7%99%D7%99%D7%9C%2F%D7%9E%D7%99%D7%9C%D7%95%D7%90%D7%99%D7%9E%D7%A0%D7%99%D7%A7%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%94%D7%A1%D7%93%D7%A0%D7%94."
               target="_blank" rel="noopener noreferrer">
              להרשמה ופרטים נוספים
            </a>
            <a class="soldiers__phone" href="tel:0509591974" dir="ltr">050-959-1974</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       PROCESS
  ═══════════════════════════════════════════ -->
  <section class="process">
    <div class="process__inner">
      <div class="process__header" data-animate>
        <span class="section-label">איך מתחילים</span>
        <h2 class="section-title">ארבעה צעדים פשוטים</h2>
      </div>

      <div class="process__steps">
        <div class="process-step" data-animate>
          <div class="process-step__circle"><span>1</span></div>
          <div class="process-step__connector" aria-hidden="true"></div>
          <div class="process-step__content">
            <h3>יצירת קשר</h3>
            <p>שלח הודעה פשוטה ב-WhatsApp, ללא התחייבות ולחץ</p>
          </div>
        </div>
        <div class="process-step" data-animate data-delay="120">
          <div class="process-step__circle"><span>2</span></div>
          <div class="process-step__connector" aria-hidden="true"></div>
          <div class="process-step__content">
            <h3>שיחת היכרות</h3>
            <p>שיחת טלפון של 20 דק' להכיר, לשאול ולהבין מה מתאים לך</p>
          </div>
        </div>
        <div class="process-step" data-animate data-delay="240">
          <div class="process-step__circle"><span>3</span></div>
          <div class="process-step__connector" aria-hidden="true"></div>
          <div class="process-step__content">
            <h3>תהליך הטיפול</h3>
            <p>מסע עמוק ומותאם אישית, בקצב שלך ועם כלים שמדברים אליך</p>
          </div>
        </div>
        <div class="process-step process-step--last" data-animate data-delay="360">
          <div class="process-step__circle process-step__circle--accent"><span>4</span></div>
          <div class="process-step__content">
            <h3>צמיחה ושינוי</h3>
            <p>שינוי אמיתי שמחזיק לאורך זמן: ביחסים, בתפיסה, בחיים</p>
          </div>
        </div>
      </div>

      <div class="process__cta" data-animate>
        <a class="btn btn--primary"
           href="https://wa.me/972509591974?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%91%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%98%D7%99%D7%A4%D7%95%D7%9C.%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%90%D7%9D%20%D7%A0%D7%95%D7%9B%D7%9C%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%96%D7%9E%D7%9F%20%D7%A7%D7%A6%D7%A8%20%D7%9C%D7%A9%D7%99%D7%97%D7%94%20%D7%A8%D7%90%D7%A9%D7%95%D7%A0%D7%99%D7%AA.%20%D7%AA%D7%95%D7%93%D7%94."
           target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          התחל את הצעד הראשון
        </a>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       SERVICES
  ═══════════════════════════════════════════ -->
  <section class="services" id="services">
    <div class="services__inner">
      <div class="services__header" data-animate>
        <span class="section-label">שירותים</span>
        <h2 class="section-title">במה אני מתמחה</h2>
      </div>

      <div class="services__grid">
        <div class="service-card" data-animate>
          <div class="service-card__icon" aria-hidden="true">🌿</div>
          <h3>טיפול אישי</h3>
          <a class="service-card__cta"
             href="https://wa.me/972509591974?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%91%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%98%D7%99%D7%A4%D7%95%D7%9C.%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%90%D7%9D%20%D7%A0%D7%95%D7%9B%D7%9C%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%96%D7%9E%D7%9F%20%D7%A7%D7%A6%D7%A8%20%D7%9C%D7%A9%D7%99%D7%97%D7%94%20%D7%A8%D7%90%D7%A9%D7%95%D7%A0%D7%99%D7%AA.%20%D7%AA%D7%95%D7%93%D7%94."
             target="_blank" rel="noopener noreferrer">
            לתיאום פגישה ←
          </a>
        </div>
        <div class="service-card" data-animate data-delay="120">
          <div class="service-card__icon" aria-hidden="true">👥</div>
          <h3>ליווי קבוצתי</h3>
          <a class="service-card__cta"
             href="https://wa.me/972509591974?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%91%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%98%D7%99%D7%A4%D7%95%D7%9C.%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%90%D7%9D%20%D7%A0%D7%95%D7%9B%D7%9C%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%96%D7%9E%D7%9F%20%D7%A7%D7%A6%D7%A8%20%D7%9C%D7%A9%D7%99%D7%97%D7%94%20%D7%A8%D7%90%D7%A9%D7%95%D7%A0%D7%99%D7%AA.%20%D7%AA%D7%95%D7%93%D7%94."
             target="_blank" rel="noopener noreferrer">
            לפרטים נוספים ←
          </a>
        </div>
        <div class="service-card" data-animate data-delay="240">
          <div class="service-card__icon" aria-hidden="true">🤲</div>
          <h3>טיפול גוף-נפש</h3>
          <a class="service-card__cta"
             href="https://wa.me/972509591974?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%91%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%98%D7%99%D7%A4%D7%95%D7%9C.%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%90%D7%9D%20%D7%A0%D7%95%D7%9B%D7%9C%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%96%D7%9E%D7%9F%20%D7%A7%D7%A6%D7%A8%20%D7%9C%D7%A9%D7%99%D7%97%D7%94%20%D7%A8%D7%90%D7%A9%D7%95%D7%A0%D7%99%D7%AA.%20%D7%AA%D7%95%D7%93%D7%94."
             target="_blank" rel="noopener noreferrer">
            לתיאום פגישה ←
          </a>
        </div>
      </div>
    </div>
  </section>
`;

const BODY_AFTER_ARTICLES = `
  <!-- ═══════════════════════════════════════════
       CONTACT
  ═══════════════════════════════════════════ -->
  <section class="contact" id="contact">
    <div class="contact__inner">
      <div class="contact__header" data-animate>
        <span class="section-label section-label--light">צור קשר</span>
        <h2 class="section-title section-title--light">המסע שלך מתחיל כאן</h2>
        <p class="contact__lead">שיחת היכרות של 20 דקות — חינמית, ללא התחייבות, ובלי לחץ.<br />הצעד הראשון הוא הכי קשה. אני כאן.</p>
        <div class="contact__trust">
          <span>✓ מענה אישי</span>
          <span>✓ ללא התחייבות</span>
          <span>✓ שיחה ראשונה חינמית</span>
        </div>
      </div>

      <div class="contact__layout" data-animate data-delay="100">
        <div class="contact__info">
          <div class="contact-info-item">
            <div class="contact-info-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <div>
              <p class="contact-info-item__label">טלפון / WhatsApp</p>
              <a href="tel:0509591974" class="contact-info-item__value" dir="ltr">050-959-1974</a>
            </div>
          </div>
          <div class="contact-info-item">
            <div class="contact-info-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <p class="contact-info-item__label">אזורי פעילות</p>
              <p class="contact-info-item__value">רמת גן | אריאל</p>
            </div>
          </div>

          <a class="btn btn--wa contact__wa-cta"
             href="https://wa.me/972509591974?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%91%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%98%D7%99%D7%A4%D7%95%D7%9C.%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%90%D7%9D%20%D7%A0%D7%95%D7%9B%D7%9C%20%D7%9C%D7%AA%D7%90%D7%9D%20%D7%96%D7%9E%D7%9F%20%D7%A7%D7%A6%D7%A8%20%D7%9C%D7%A9%D7%99%D7%97%D7%94%20%D7%A8%D7%90%D7%A9%D7%95%D7%A0%D7%99%D7%AA.%20%D7%AA%D7%95%D7%93%D7%94."
             target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            שלח הודעה ב-WhatsApp
          </a>
        </div>

        <div class="contact__form-wrap">
          <form class="contact-form" id="contactForm" novalidate>
            <h3 class="contact-form__title">השאר פרטים ואחזור אליך</h3>
            <div class="contact-form__field">
              <label for="contactName" class="contact-form__label">שם מלא</label>
              <input type="text" id="contactName" name="name" placeholder="הכנס שם..." required autocomplete="name" class="contact-form__input" />
            </div>
            <div class="contact-form__field">
              <label for="contactPhone" class="contact-form__label">טלפון</label>
              <input type="tel" id="contactPhone" name="phone" placeholder="05x-xxxxxxx" required autocomplete="tel" dir="ltr" class="contact-form__input" />
            </div>
            <div class="contact-form__field">
              <label for="contactArea" class="contact-form__label">תחום עניין</label>
              <select id="contactArea" name="area" required class="contact-form__input contact-form__select">
                <option value="" disabled selected>בחר/י...</option>
                <option value="personal">טיפול אישי</option>
                <option value="soldier">חייל / מילואימניק</option>
                <option value="workshop">סדנה קבוצתית</option>
              </select>
            </div>
            <button type="submit" class="btn btn--wa contact-form__submit">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              שלח ב-WhatsApp
            </button>
            <p class="contact-form__disclaimer">הפרטים שלך לא יועברו לגורם שלישי</p>
          </form>
          <div class="contact-form__success" id="contactFormSuccess" aria-live="polite" hidden>
            <div class="contact-form__success-icon" aria-hidden="true">✅</div>
            <h3>תודה! נשלחת ל-WhatsApp</h3>
            <p>אחזור אליך בהקדם.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       FOOTER
  ═══════════════════════════════════════════ -->
  <footer class="footer">
    <div class="footer__inner">
      <a href="#home" class="footer__logo">
        <img src="images/logo.png" alt="דניאל וסטפריד" />
      </a>
      <nav class="footer__nav" aria-label="ניווט תחתון">
        <a href="#about">אודות</a>
        <a href="#method">שיטת הטיפול</a>
        <a href="#soldiers">לחיילים</a>
        <a href="#services">שירותים</a>
        <a href="/blog">בלוג</a>
        <a href="#contact">צור קשר</a>
      </nav>
      <p class="footer__copy">&copy; 2026 שילה מאיר | כל הזכויות שמורות</p>
    </div>
  </footer>
`;
