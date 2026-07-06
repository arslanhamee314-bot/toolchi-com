export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolItem {
  slug: string;
  name: string;
  category: string;
  shortDesc: string;
  iconName: string; // Can be a Lucide name or raw Emoji string
  seoTitle: string;
  seoDescription: string;
  longDesc: string;
  howToUse: string[];
  faqs: FAQItem[];
  popular?: boolean;
  isNew?: boolean;
  ctaText?: string;
  sampleSupported?: boolean;
  relatedSlugs?: string[];
  tags?: string[];
  shortDescription?: string;
}

export const CATEGORIES = [
  { id: "gif-maker", name: "GIF Maker", desc: "Create animated GIFs online from images or video clips." },
  { id: "documents", name: "PDF & Document Tools", desc: "Merge, split, rotate, and compress PDF documents locally." },
  { id: "video-tools", name: "Video Tools", desc: "Convert video to GIF, cut, crop, and resize video files." },
  { id: "audio", name: "Audio", desc: "Cut, join, and optimize audio files locally." },
  { id: "transform", name: "Transform", desc: "Resize, crop, and rotate images or media files." },
  { id: "optimize", name: "Optimize", desc: "Compress and optimize images, GIFs, and other media." },
  { id: "effects", name: "Effects", desc: "Add text, overlays, and color effects to images." },
  { id: "split", name: "Split", desc: "Split animated GIF, APNG, WebP into individual frames." },
  { id: "add-text", name: "Add Text", desc: "Add text overlays and watermarks to media." },
  { id: "webp", name: "WebP", desc: "Convert WebP to JPG, PNG, GIF and vice versa." },
  { id: "apng", name: "APNG", desc: "Assemble or convert APNG (Animated PNG) files." },
  { id: "avif", name: "AVIF", desc: "Optimize and convert AVIF format images." },
  { id: "jxl", name: "JXL", desc: "Convert JPEG XL images to common web formats." },
  { id: "svg", name: "SVG", desc: "Optimize, clean, and convert SVG files." },
  { id: "webmaster", name: "Webmaster Tools", desc: "Check configuration, security, and responsive layouts." },
  { id: "performance", name: "Performance Tools", desc: "Optimize files, verify compression, and measure load times." },
  { id: "operational", name: "Operational Tools", desc: "Utilities to generate mockups, open links, and clean files." },
  { id: "developer", name: "Developer & Casing Tools", desc: "Convert case, count text, format JSON, and generate hashes." },
  { id: "ai", name: "AI Content Utilities", desc: "Analyze AI writing density and humanize text structures." }
];

const RAW_TOOLS_REGISTRY = [
  // Media Tools (Pre-wired Stubs)
  // GIF Maker Suite Tools
  { slug: "gif-maker", name: "GIF Maker", category: "gif-maker", shortDesc: "Create animated GIFs from PNG/JPG images.", iconName: "Image" },
  { slug: "video-to-gif", name: "Video to GIF", category: "gif-maker", shortDesc: "Convert mp4/webm videos into lightweight animated GIFs.", iconName: "Video" },
  { slug: "gif-to-mp4", name: "GIF to MP4", category: "gif-maker", shortDesc: "Convert animated GIF to standard MP4 video.", iconName: "Film" },
  { slug: "gif-to-webm", name: "GIF to WebM", category: "gif-maker", shortDesc: "Convert animated GIF to high-efficiency WebM video.", iconName: "Video" },
  { slug: "gif-to-mov", name: "GIF to MOV", category: "gif-maker", shortDesc: "Convert animated GIF to Apple MOV video format.", iconName: "Film" },
  { slug: "webp-to-gif", name: "WebP to GIF", category: "gif-maker", shortDesc: "Convert WebP images to animated GIF format.", iconName: "RefreshCw" },
  { slug: "apng-to-gif", name: "APNG to GIF", category: "gif-maker", shortDesc: "Convert animated PNG (APNG) to standard animated GIF.", iconName: "RefreshCw" },
  { slug: "avif-to-gif", name: "AVIF to GIF", category: "gif-maker", shortDesc: "Convert AVIF images to animated GIF format.", iconName: "RefreshCw" },
  { slug: "jxl-to-gif", name: "JXL to GIF", category: "gif-maker", shortDesc: "Convert JPEG XL images to animated GIF format.", iconName: "RefreshCw" },
  { slug: "svg-to-gif", name: "SVG to GIF", category: "gif-maker", shortDesc: "Convert vector SVG frames to animated GIF format.", iconName: "RefreshCw" },
  { slug: "gif-analyzer", name: "GIF Analyzer", category: "gif-maker", shortDesc: "Inspect binary metadata, dimensions, and frames of a GIF.", iconName: "BarChart2" },

  { slug: "video-cutter", name: "Video Cutter", category: "video-tools", shortDesc: "Cut and trim video segments online locally.", iconName: "Scissors" },
  { slug: "video-cropper", name: "Video Cropper", category: "video-tools", shortDesc: "Crop video dimensions and remove borders.", iconName: "Crop" },
  { slug: "video-to-webp", name: "Video to WebP", category: "video-tools", shortDesc: "Convert video files to animated WebP format.", iconName: "RefreshCw" },
  { slug: "resize-video", name: "Resize Video", category: "video-tools", shortDesc: "Change video resolution and aspect ratio locally.", iconName: "Maximize2" },
  { slug: "video-to-webm", name: "Video to WebM", category: "video-tools", shortDesc: "Convert video files to WebM container format locally.", iconName: "RefreshCw" },
  { slug: "reverse-video", name: "Reverse Video", category: "video-tools", shortDesc: "Play video backwards by buffering and reversing frames.", iconName: "Rewind" },
  { slug: "mute-video", name: "Mute Video", category: "video-tools", shortDesc: "Remove audio track and export a silent video file.", iconName: "VolumeX" },
  { slug: "video-speed", name: "Video Speed", category: "video-tools", shortDesc: "Speed up or slow down video playback rate.", iconName: "Gauge" },
  { slug: "audio-cutter", name: "Audio Cutter", category: "audio", shortDesc: "Cut, trim, and split audio mp3/wav files locally.", iconName: "Music" },
  { slug: "audio-converter", name: "Audio Converter", category: "audio", shortDesc: "Convert between common audio formats locally.", iconName: "Volume2" },
  { slug: "merge-audio", name: "Merge Audio", category: "audio", shortDesc: "Combine multiple audio tracks into one file.", iconName: "Layers" },
  { slug: "resize-image", name: "Resize Image", category: "transform", shortDesc: "Change dimensions and aspect ratio of images.", iconName: "Maximize2" },
  { slug: "crop-image", name: "Crop Image", category: "transform", shortDesc: "Trim borders and crop custom areas of images.", iconName: "Crop" },
  { slug: "rotate-image", name: "Rotate Image", category: "transform", shortDesc: "Flip and rotate images by custom angles.", iconName: "RotateCw" },
  { slug: "censor-image", name: "Censor Image", category: "transform", shortDesc: "Pixelate or blur sensitive regions of an image.", iconName: "EyeOff" },
  { slug: "invert-colors", name: "Invert Colors", category: "effects", shortDesc: "Negate RGB channel values to invert image colors.", iconName: "SunMoon" },
  { slug: "rounded-corners", name: "Rounded Corners", category: "transform", shortDesc: "Add curved border radius to images.", iconName: "Squircle" },
  { slug: "gif-optimizer", name: "GIF Optimizer", category: "optimize", shortDesc: "Reduce file size of animated GIFs with smart compression.", iconName: "Zap" },
  { slug: "png-optimizer", name: "PNG Optimizer", category: "optimize", shortDesc: "Optimize and compress PNG/JPG files without quality loss.", iconName: "Gauge" },
  { slug: "photo-effects", name: "Photo Effects", category: "effects", shortDesc: "Apply color adjustments, filters, and effects to images.", iconName: "Sparkles" },
  { slug: "image-filters", name: "Image Filters", category: "effects", shortDesc: "Adjust brightness, contrast, and saturation of photos.", iconName: "Sliders" },
  { slug: "gif-splitter", name: "GIF Splitter", category: "split", shortDesc: "Extract individual frames from animated GIFs.", iconName: "Layers" },
  { slug: "apng-splitter", name: "APNG Splitter", category: "split", shortDesc: "Split animated PNG files into separate frames.", iconName: "Columns" },
  { slug: "write-on-image", name: "Write on Image", category: "add-text", shortDesc: "Add text labels, captions, and quotes on top of images.", iconName: "Type" },
  { slug: "watermark-image", name: "Watermark Image", category: "add-text", shortDesc: "Add custom watermarks or logos to protect your images.", iconName: "ShieldAlert" },
  { slug: "webp-to-jpg", name: "WebP to JPG", category: "webp", shortDesc: "Convert WebP images to JPG format locally.", iconName: "ArrowRightLeft" },
  { slug: "jpg-to-webp", name: "JPG to WebP", category: "webp", shortDesc: "Convert JPG and PNG images to WebP format.", iconName: "ArrowLeftRight" },
  { slug: "apng-maker", name: "APNG Maker", category: "apng", shortDesc: "Assemble multiple PNG images into an animated APNG.", iconName: "Flame" },
  { slug: "avif-converter", name: "AVIF Converter", category: "avif", shortDesc: "Convert AVIF images to PNG/JPG format.", iconName: "RefreshCw" },
  { slug: "jpg-to-avif", name: "JPG to AVIF", category: "avif", shortDesc: "Convert standard images to high-efficiency AVIF format.", iconName: "ArrowRightLeft" },
  { slug: "jxl-to-png", name: "JXL to PNG", category: "jxl", shortDesc: "Convert JPEG XL files to compatible PNG images.", iconName: "FileImage" },
  { slug: "svg-optimizer", name: "SVG Optimizer", category: "svg", shortDesc: "Minify and optimize vector SVG files.", iconName: "Activity" },
  { slug: "png-to-svg", name: "PNG to SVG", category: "svg", shortDesc: "Convert raster images to vector SVG formats.", iconName: "Compass" },

  // 1. WEBMASTER TOOLS
  {
    slug: "robots-txt-checker",
    name: "Robots.txt Checker",
    category: "webmaster",
    shortDesc: "Check whether your robots file is accessible and correctly exposed.",
    iconName: "Bot",
    seoTitle: "Robots.txt Checker - Validate Search Engine Directives | Toolchi",
    seoDescription: "Audit your robots.txt file to ensure correct crawl parameters and prevent search indexing errors.",
    longDesc: "Analyze search engine directives in your robots.txt. Ensure Googlebot and Bingbot can crawl intended paths while blocking secure partitions.",
    howToUse: [
      "Enter your domain URL.",
      "Click validate crawler directives.",
      "Review the report for syntax errors and warnings."
    ],
    faqs: [
      { question: "What is a robots.txt file?", answer: "A text file instructions web crawlers which paths they are allowed to index on your site." }
    ]
  },
  {
    slug: "favicon-generator",
    name: "Favicon Generator",
    category: "webmaster",
    shortDesc: "Create favicon-ready outputs for browser tabs and shortcuts.",
    iconName: "Image",
    seoTitle: "Favicon Generator - Create Browser Tab Icons | Toolchi",
    seoDescription: "Convert PNG, JPG, or SVG images into .ico favicon files for browser shortcut displays.",
    longDesc: "Upload image layouts and compile compatible multi-size favicon packaging natively in the browser.",
    howToUse: [
      "Drag and drop a square image file.",
      "Select target display platforms.",
      "Download the packaged ICO and setup markup."
    ],
    faqs: [
      { question: "What sizes does the generator output?", answer: "It packages 16x16, 32x32, and 48x48 sizes into a single .ico file." }
    ]
  },
  {
    slug: "ssl-checker",
    name: "SSL Checker",
    category: "webmaster",
    shortDesc: "Inspect certificate presence and basic HTTPS availability.",
    iconName: "ShieldCheck",
    seoTitle: "SSL Certificate Checker - Verify HTTPS Security | Toolchi",
    seoDescription: "Audit certificate trust chains, expiration timelines, and secure cipher configurations for domains.",
    longDesc: "Confirm SSL credentials. Scan secure handshakes, trust issuers, validity windows, and cipher setups.",
    howToUse: [
      "Provide your domain (e.g., website.com).",
      "Click inspect SSL certificates.",
      "Review trust status and expiry alerts."
    ],
    faqs: [
      { question: "Why check SSL certificates?", answer: "Expired or invalid certificates trigger blocking security warnings for visitors." }
    ]
  },
  {
    slug: "xml-sitemap-validator",
    name: "XML Sitemap Validator",
    category: "webmaster",
    shortDesc: "Validate sitemap visibility and structure for indexing workflows.",
    iconName: "Map",
    seoTitle: "XML Sitemap Validator - Verify Indexing Files | Toolchi",
    seoDescription: "Audit sitemap syntax rules, namespace declarations, and URL structures to prevent indexing failures.",
    longDesc: "Inspect indexing sitemaps. Validate formatting standards, clean namespaces, and verify correct crawl limits.",
    howToUse: [
      "Paste your XML Sitemap URL or upload raw XML.",
      "Click Validate XML syntax.",
      "Examine warning outputs and namespace errors."
    ],
    faqs: [
      { question: "How does the validator work?", answer: "It parses the XML payload against schemas.org schema compliance definitions." }
    ]
  },
  {
    slug: "responsive-checker",
    name: "Responsive Checker",
    category: "webmaster",
    shortDesc: "Preview how a site behaves across desktop and mobile form factors.",
    iconName: "MonitorSmartphone",
    seoTitle: "Responsive Web Design Checker - Test Devices Online | Toolchi",
    seoDescription: "Preview site design across desktop, tablet, and mobile viewport frames directly inside the workspace.",
    longDesc: "Audit responsive design sheets. Load frame containers at specific resolution breaks to test grid layouts.",
    howToUse: [
      "Paste your live target page URL.",
      "Select form factor presets (Desktop, Mobile, Tablet).",
      "Observe media query adaptations inside sandbox frames."
    ],
    faqs: [
      { question: "Does it support custom widths?", answer: "Yes, viewport dimensions can be adjusted dynamically in the review workspace." }
    ]
  },
  {
    slug: "domain-expiration-checker",
    name: "Domain Expiration Checker",
    category: "webmaster",
    shortDesc: "Review domain expiry timing for ownership and renewal awareness.",
    iconName: "Globe",
    seoTitle: "Domain Expiration Checker - Verify Expiry Dates | Toolchi",
    seoDescription: "Check WHOIS registration parameters and expiry timestamps to prevent domain ownership losses.",
    longDesc: "Track domain timeline records. Query registry databases to map renewal margins and safety thresholds.",
    howToUse: [
      "Type the target domain name.",
      "Submit query to WHOIS registries.",
      "Record expiration schedules and warning alerts."
    ],
    faqs: [
      { question: "What is WHOIS?", answer: "An industry database detailing public ownership and registration parameters for domains." }
    ]
  },

  // 2. PERFORMANCE TOOLS
  {
    slug: "gzip-compression",
    name: "Gzip Compression",
    category: "performance",
    shortDesc: "Verify compression support to improve delivery efficiency.",
    iconName: "FileArchive",
    seoTitle: "Gzip Compression Checker - Test Transfer Optimization | Toolchi",
    seoDescription: "Check if your web server has Gzip enabled and measure payload size reductions.",
    longDesc: "Verify transfer optimization headers. Test server response parameters to track compression efficacy and transfer payload sizes.",
    howToUse: [
      "Input a target endpoint URL.",
      "Submit header audit request.",
      "Verify Gzip activation and track savings percentages."
    ],
    faqs: [
      { question: "How does Gzip optimize speed?", answer: "By compressing code payloads before transit, decreasing download timelines." }
    ]
  },
  {
    slug: "compress-image",
    name: "Compress PNG/JPG",
    category: "optimize",
    shortDesc: "Optimize image assets to reduce payload weight and load time.",
    iconName: "ImageDown",
    seoTitle: "Image Compressor - Optimize PNG and JPG files | Toolchi",
    seoDescription: "Compress PNG and JPG images client-side without quality loss to boost page rendering speed.",
    longDesc: "Reduce image file sizes. Compress image payload weights natively inside the browser, using quantization algorithms to preserve visual quality.",
    howToUse: [
      "Choose or drag and drop PNG/JPG assets.",
      "Set desired target compression levels.",
      "Download compressed files directly."
    ],
    faqs: [
      { question: "Are my images safe?", answer: "Yes, compression occurs locally. Your images are never uploaded to any remote server." }
    ]
  },
  {
    slug: "dummy-image-generator",
    name: "Dummy Image Generator",
    category: "performance",
    shortDesc: "Generate placeholders for mockups, layouts, and prototypes.",
    iconName: "ImagePlus",
    seoTitle: "Dummy Image Generator - Create Custom Placeholders | Toolchi",
    seoDescription: "Generate custom placeholder images specifying width, height, colors, and text dynamically.",
    longDesc: "Produce layouts placeholders. Create custom dimensions graphics with label text overlays for mockup prototypes.",
    howToUse: [
      "Specify pixel dimensions (e.g. 800x600).",
      "Pick custom hex colors for background and text.",
      "Enter custom overlay text labels and download."
    ],
    faqs: [
      { question: "What formats can I export?", answer: "It supports PNG, JPEG, and WebP outputs natively." }
    ]
  },
  {
    slug: "redirect-checker",
    name: "Redirect Checker",
    category: "performance",
    shortDesc: "Track redirect paths for SEO, canonicalization, and QA checks.",
    iconName: "ArrowRightLeft",
    seoTitle: "HTTP Redirect Checker - Track URL Paths | Toolchi",
    seoDescription: "Trace the complete path of URL redirects and analyze HTTP status response headers.",
    longDesc: "Verify redirect loops. Audit routing hops, canonical paths, security redirects (HTTPS), and SEO status codes (301/302).",
    howToUse: [
      "Enter the redirecting URL.",
      "Run the trace request.",
      "Audit every hop and response status code in the path."
    ],
    faqs: [
      { question: "What is a 301 redirect?", answer: "A permanent redirect code passing SEO authority to the destination path." }
    ]
  },
  {
    slug: "site-down-checker",
    name: "Site Down or Not",
    category: "performance",
    shortDesc: "Run a quick availability check for public site access.",
    iconName: "WifiOff",
    seoTitle: "Is Website Down or Just Me? - Uptime Checker | Toolchi",
    seoDescription: "Test connection availability for domains from multiple global servers to diagnose outages.",
    longDesc: "Check site availability. Run connection test checks to verify global port access and DNS lookup records.",
    howToUse: [
      "Type in the website domain.",
      "Perform live accessibility request.",
      "Diagnose active outages or regional server routing blocks."
    ],
    faqs: [
      { question: "What does it mean if it's 'just me'?", answer: "Local network configurations or DNS cache failures are likely preventing access." }
    ]
  },
  {
    slug: "ab-test-calculator",
    name: "A/B Test Calculator",
    category: "performance",
    shortDesc: "Estimate experiment significance and compare variant outcomes.",
    iconName: "Split",
    seoTitle: "A/B Testing Significance Calculator | Toolchi",
    seoDescription: "Calculate statistical significance for optimization tests based on control and variant rates.",
    longDesc: "Measure experiment outcomes. Determine statistical confidence indexes, p-values, and conversion variance metrics.",
    howToUse: [
      "Enter visitors and conversion metrics for Variant A (Control).",
      "Enter visitors and conversion metrics for Variant B.",
      "Compute confidence metrics and verify statistical significance."
    ],
    faqs: [
      { question: "What is statistical significance?", answer: "The probability that the variance is driven by design revisions rather than random noise." }
    ]
  },
  {
    slug: "qr-generator",
    name: "Free QR Code Generator",
    category: "performance",
    shortDesc: "Create QR outputs for links, promotions, and printed materials.",
    iconName: "QrCode",
    seoTitle: "QR Code Generator - Create Custom QR Codes | Toolchi",
    seoDescription: "Create custom QR codes for URLs, text, Wi-Fi connections, and vCards. Fully client-side.",
    longDesc: "Generate matrix bar codes. Encode data strings into customized QR blocks, adjusting dimensions and styling parameters.",
    howToUse: [
      "Select data type (URL, plain text, Wi-Fi).",
      "Specify content string parameters.",
      "Generate and download the custom QR graphic."
    ],
    faqs: [
      { question: "Do these QR codes expire?", answer: "No, they contain static encoded data strings and function permanently." }
    ],
    popular: true
  },
  {
    slug: "spell-checker",
    name: "Spell Checker",
    category: "performance",
    shortDesc: "Catch spelling mistakes in short web copy and content blocks.",
    iconName: "SpellCheck",
    seoTitle: "Online Spell Checker - Verify Text Grammar | Toolchi",
    seoDescription: "Audit short articles and website copy to verify spellings and syntax rules.",
    longDesc: "Review copy layouts. Scan vocabulary lists, detect orthographic errors, and suggest standard replacements.",
    howToUse: [
      "Paste your text block into the workspace.",
      "Initiate orthographic check.",
      "Examine warning alerts and choose correct options."
    ],
    faqs: [
      { question: "Does it support multiple languages?", answer: "The local heuristic dictionary verifies standard English dialects." }
    ]
  },

  // 3. OPERATIONAL TOOLS
  {
    slug: "screen-resolution",
    name: "My Screen Resolution",
    category: "operational",
    shortDesc: "Check current display dimensions for QA and design testing.",
    iconName: "Monitor",
    seoTitle: "What is My Screen Resolution? - Display Checker | Toolchi",
    seoDescription: "Detect your display dimensions, viewport sizes, and pixel ratio instantly in the browser.",
    longDesc: "Audit viewport parameters. Read screen dimensions, responsive breakpoints, device pixel ratios, and color depths.",
    howToUse: [
      "Open the viewport tester page.",
      "Observe active screen resolution metrics.",
      "Audit browser window size boundaries."
    ],
    faqs: [
      { question: "What is device pixel ratio (DPR)?", answer: "The scaling factor mapping physical hardware pixels to virtual CSS pixels." }
    ]
  },
  {
    slug: "share-link-creator",
    name: "Share Link Creator",
    category: "operational",
    shortDesc: "Prepare cleaner shareable links for communication workflows.",
    iconName: "Link2",
    seoTitle: "Custom Share Link Creator - Generate URL Links | Toolchi",
    seoDescription: "Create custom links with predefined text to share content on social platforms.",
    longDesc: "Draft share links. Encode content targets into custom URL links for message channels.",
    howToUse: [
      "Paste your target destination link URL.",
      "Add custom messaging parameters.",
      "Copy the custom share link output."
    ],
    faqs: [
      { question: "What channels are supported?", answer: "Generates sharing URLs for email, social messaging, and custom copy links." }
    ]
  },
  {
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    category: "operational",
    shortDesc: "Generate placeholder text for mockups and design drafts.",
    iconName: "FileText",
    seoTitle: "Lorem Ipsum Generator - Generate Dummy Copy | Toolchi",
    seoDescription: "Create customizable placeholder text paragraphs, words, or lists for prototypes.",
    longDesc: "Produce classic copy placeholders. Set paragraph count, configure structures, and format outputs.",
    howToUse: [
      "Pick your desired output format (paragraphs, words).",
      "Specify quantity parameters.",
      "Generate dummy copy and copy to clipboard."
    ],
    faqs: [
      { question: "Is the dummy text customizable?", answer: "Yes, options allow including HTML tags or starting with 'Lorem ipsum dolor sit amet'." }
    ]
  },
  {
    slug: "multiple-url-opener",
    name: "Multiple URL Opener",
    category: "operational",
    shortDesc: "Open multiple destinations for review and operational testing.",
    iconName: "ExternalLink",
    seoTitle: "Multiple URL Opener - Open URLs Instantly | Toolchi",
    seoDescription: "Open multiple links simultaneously in new browser tabs. Secure and client-side.",
    longDesc: "Launch target URLs in bulk. Parse bulk lists of links and open them in separate tabs with a single trigger action.",
    howToUse: [
      "Paste your list of URLs (one per line).",
      "Click Open All.",
      "Configure browser popup permissions if blocked."
    ],
    faqs: [
      { question: "Why did my browser block the links?", answer: "Browsers prevent automated tabs by default; enable popups on this page to allow bulk opening." }
    ]
  },
  {
    slug: "minify-code",
    name: "JS & CSS Minifier",
    category: "operational",
    shortDesc: "Reduce code weight for faster front-end delivery.",
    iconName: "FileCode",
    seoTitle: "JS & CSS Minifier - Compress Code Online | Toolchi",
    seoDescription: "Minify JavaScript and CSS styles client-side to decrease file size and page load times.",
    longDesc: "Compress front-end files. Strip whitespace, remove comments, shorten variables, and output optimized minified scripts.",
    howToUse: [
      "Paste raw CSS or JavaScript styles.",
      "Initiate minification sweep.",
      "Examine compression savings and download output."
    ],
    faqs: [
      { question: "Does minification modify code logic?", answer: "No, it only compresses whitespace and characters while preserving syntax actions." }
    ]
  },
  {
    slug: "unminify-code",
    name: "JS & CSS Unminifier",
    category: "operational",
    shortDesc: "Improve readability for compressed stylesheets and scripts.",
    iconName: "Braces",
    seoTitle: "JS & CSS Unminifier - Pretty Print Code | Toolchi",
    seoDescription: "Format and pretty print minified JavaScript and CSS files back into readable scripts.",
    longDesc: "Decompress minified styling. Format layouts, restore code indentation lines, and improve reading flow.",
    howToUse: [
      "Paste compressed CSS/JS code.",
      "Click Unminify.",
      "Copy formatted, indentation-restored code outputs."
    ],
    faqs: [
      { question: "Can it recover original variable names?", answer: "No, minifiers rename variables permanently; unminifying only restores indentation and structure." }
    ]
  },
  {
    slug: "amp-validator",
    name: "AMP Validator",
    category: "operational",
    shortDesc: "Check Accelerated Mobile Pages markup for validity.",
    iconName: "Zap",
    seoTitle: "AMP HTML Validator - Test Accelerated Mobile Pages | Toolchi",
    seoDescription: "Audit your AMP HTML files to verify syntax parameters and schema rules.",
    longDesc: "Check AMP page standards. Audit styling constraints, namespace checks, and verify correct validation tags.",
    howToUse: [
      "Upload or paste your AMP HTML.",
      "Initiate validation parse.",
      "Review the error console for schema issues."
    ],
    faqs: [
      { question: "Why validate AMP pages?", answer: "Invalid AMP pages cannot be cached by Google or served in search result carousels." }
    ]
  },
  {
    slug: "domain-generator",
    name: "Domain Name Generator",
    category: "operational",
    shortDesc: "Brainstorm available and relevant naming directions.",
    iconName: "Search",
    seoTitle: "Domain Name Generator - Brainstorm Domain Names | Toolchi",
    seoDescription: "Brainstorm creative, professional domain names matching keyword search patterns.",
    longDesc: "Generate domain names. Input keywords to synthesize prefix, suffix, and combination options.",
    howToUse: [
      "Enter your business keywords.",
      "Choose search parameters.",
      "Review generated domain options and copy."
    ],
    faqs: [
      { question: "Does it check availability?", answer: "It suggests common TLDs; availability can be queried via registry links." }
    ]
  },

  // 4. AI CONTENT TOOLS
  {
    slug: "ai-detector",
    name: "AI Content Detector & Humanizer",
    category: "ai",
    shortDesc: "Analyze writing patterns to verify AI-generated text, and humanize content to bypass detection tools.",
    iconName: "BrainCircuit",
    seoTitle: "Free AI Content Detector & Text Humanizer Online | Toolchi",
    seoDescription: "Detect AI-generated text from GPT-4, Gemini, and Claude. Humanize AI text to 100% human score to bypass checkers instantly and securely.",
    longDesc: "Analyze text perplexity, syntactic variance, and transition predictable distributions to detect AI content. Convert AI copy into highly natural humanized formats to bypass modern detector algorithms.",
    howToUse: [
      "Enter your article, paper, or email content into the input workspace.",
      "Click Detect AI Content to check probability distributions and highlight AI sentences.",
      "Switch to the Humanizer tab and click Humanize to rewrite the copy into 100% human-score structure."
    ],
    faqs: [
      { question: "How does the AI Detector work?", answer: "It checks sentence perplexity variance, word repetitions, and density of typical LLM transition phrases." },
      { question: "How does the Humanizer work?", answer: "It restructures sentence patterns, increases word variety (burstiness), and swaps predictable AI phrasing with active human colloquialisms." }
    ],
    popular: true,
    isNew: true
  },

  // 5. PDF & DOCUMENT TOOLS
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    category: "documents",
    shortDesc: "Bundle JPG or PNG images into a PDF document locally.",
    iconName: "FileImage",
    seoTitle: "JPG to PDF Converter - Bundle Images into PDF | Toolchi",
    seoDescription: "Convert JPG and PNG images into a PDF document instantly, client-side. No uploads required.",
    longDesc: "Upload multiple image files and bundle them into a single structured PDF document locally inside your browser.",
    howToUse: ["Upload JPG or PNG image files.", "Arrange order as needed.", "Click Convert to download the compiled PDF."],
    faqs: [{ question: "Can I upload multiple images?", answer: "Yes, each image is added as a separate page in the output PDF." }]
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    category: "documents",
    shortDesc: "Export each PDF page as a separate JPG image file.",
    iconName: "FileOutput",
    seoTitle: "PDF to JPG Converter - Export PDF Pages as Images | Toolchi",
    seoDescription: "Convert PDF pages into JPG image files client-side. Preview and download each page as an image.",
    longDesc: "Extract each page of a PDF document and export them as individual JPG image files inside your browser.",
    howToUse: ["Upload a PDF document.", "Adjust scale if needed.", "Download each exported page image."],
    faqs: [{ question: "Is this tool secure?", answer: "Yes, all processing runs locally in your browser." }]
  },
  {
    slug: "merge-pdf",
    name: "Merge PDF",
    category: "documents",
    shortDesc: "Merge multiple PDF files into a single document locally.",
    iconName: "Combine",
    seoTitle: "Merge PDF Online - Combine PDF Files Locally | Toolchi",
    seoDescription: "Merge multiple PDF documents into a single PDF file instantly and securely in your browser. No files are uploaded.",
    longDesc: "Combine multiple PDF files into a single structured document. Files are processed entirely client-side using JavaScript, guaranteeing that your sensitive data never leaves your device.",
    howToUse: [
      "Select or drag-and-drop multiple PDF files.",
      "Reorder the files using drag handles.",
      "Click Merge PDF to assemble and download the combined file."
    ],
    faqs: [
      { question: "Is there a file size limit?", answer: "No, since processing is done locally, the limit is only determined by your browser's memory." }
    ],
    popular: true
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    category: "documents",
    shortDesc: "Split a PDF file into individual pages or ranges locally.",
    iconName: "Scissors",
    seoTitle: "Split PDF Online - Extract Pages Locally | Toolchi",
    seoDescription: "Split your PDF document into separate pages or custom ranges securely in your browser. No uploads.",
    longDesc: "Extract pages from your PDF file. Split and save pages as separate files or custom ranges locally within your browser.",
    howToUse: [
      "Upload your PDF document.",
      "Choose to extract all pages or specify a custom page range.",
      "Click Split PDF to download the extracted pages."
    ],
    faqs: [
      { question: "Is this tool secure?", answer: "Yes, all extractions are processed locally on your computer." }
    ]
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    category: "documents",
    shortDesc: "Rotate PDF pages and save them with correct orientation.",
    iconName: "RotateCw",
    seoTitle: "Rotate PDF Online - Change Page Orientations | Toolchi",
    seoDescription: "Rotate PDF pages vertically or horizontally and save the corrected file securely. No uploads.",
    longDesc: "Adjust page orientation parameters. Rotate individual pages or all pages of your PDF document natively in your browser.",
    howToUse: [
      "Upload your PDF file.",
      "Choose which pages to rotate (90, 180, or 270 degrees).",
      "Save and download the rotated document."
    ],
    faqs: [
      { question: "Can I rotate specific pages?", answer: "Yes, you can rotate selected pages or all pages at once." }
    ]
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    category: "documents",
    shortDesc: "Reduce the file size of your PDF documents locally.",
    iconName: "FileArchive",
    seoTitle: "Compress PDF Online - Shrink File Size Locally | Toolchi",
    seoDescription: "Compress and reduce the file size of PDF documents securely in your browser without quality loss.",
    longDesc: "Shrink PDF payloads. Optimizes images and resource tags inside the PDF file natively to decrease file size.",
    howToUse: [
      "Drag and drop your PDF document.",
      "Select target compression level.",
      "Download the compressed PDF file."
    ],
    faqs: [
      { question: "Does it reduce text quality?", answer: "No, text remains vector-based and crisp; only heavy images and resources are optimized." }
    ]
  },

  // 6. DEVELOPER & CASING TOOLS
  {
    slug: "case-converter",
    name: "Case Converter",
    category: "developer",
    shortDesc: "Convert text case between lower, upper, title, and sentence cases.",
    iconName: "CaseSensitive",
    seoTitle: "Online Case Converter - UPPERCASE, lowercase, Title Case | Toolchi",
    seoDescription: "Convert text case between upper, lower, title, sentence, camel, and kebab case structures instantly.",
    longDesc: "Format copy layouts. Transform text blocks to conform to case specifications (UPPERCASE, lowercase, Title Case, sentence case).",
    howToUse: [
      "Paste your text into the text area.",
      "Select your target case format button.",
      "Copy the converted text to your clipboard."
    ],
    faqs: [
      { question: "What cases are supported?", answer: "Supports UPPERCASE, lowercase, Title Case, Sentence Case, camelCase, and kebab-case." }
    ],
    popular: true
  },
  {
    slug: "text-counter",
    name: "Word & Character Counter",
    category: "developer",
    shortDesc: "Count words, characters, sentences, and paragraphs in your text.",
    iconName: "AlignLeft",
    seoTitle: "Word Counter - Count Characters & Words Online | Toolchi",
    seoDescription: "Count characters, words, sentences, paragraphs, and reading times for your writing blocks in real time.",
    longDesc: "Audit text length parameters. Measure word density, character counts, reading times, and paragraph distributions instantly.",
    howToUse: [
      "Paste or type your text into the counter box.",
      "View live counts for words, characters, and sentences.",
      "Analyze average reading and speaking times."
    ],
    faqs: [
      { question: "Does it save my text?", answer: "No, counting occurs entirely client-side. Your text is never stored or sent over the internet." }
    ]
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    category: "developer",
    shortDesc: "Format, validate, and pretty print JSON data structures.",
    iconName: "Braces",
    seoTitle: "JSON Formatter & Validator - Pretty Print JSON | Toolchi",
    seoDescription: "Format, validate, parse, and pretty print raw JSON strings securely in your browser.",
    longDesc: "Format developer outputs. Pretty print nested JSON structures, check syntax compliance, and compress payloads.",
    howToUse: [
      "Paste your raw JSON string into the editor.",
      "Click Format to indent or Minify to compress.",
      "Validate syntax errors highlighted in the console."
    ],
    faqs: [
      { question: "Can it validate invalid JSON?", answer: "Yes, it highlights syntax errors and line numbers to help you debug formatting." }
    ],
    popular: true
  },
  {
    slug: "base64",
    name: "Base64 Encoder/Decoder",
    category: "developer",
    shortDesc: "Encode strings or files to Base64 format and decode them back.",
    iconName: "Binary",
    seoTitle: "Base64 Encoder & Decoder Online | Toolchi",
    seoDescription: "Encode text and files to Base64 representations and decode them back to plain layouts securely.",
    longDesc: "Encode developer assets. Convert binary files or plain text strings to Base64 data blocks client-side.",
    howToUse: [
      "Select either Encode or Decode mode.",
      "Paste your input text or upload a file.",
      "Copy or download the translated output."
    ],
    faqs: [
      { question: "Are files supported?", answer: "Yes, you can upload small files to translate into Base64 data URIs." }
    ]
  },
  {
    slug: "url-encoder",
    name: "URL Encoder/Decoder",
    category: "developer",
    shortDesc: "Encode and decode URLs to prevent query transmission issues.",
    iconName: "Link",
    seoTitle: "URL Encoder & Decoder Online - UTF-8 URL Coding | Toolchi",
    seoDescription: "Encode query string characters to safe URL syntax and decode them back securely.",
    longDesc: "Encode URL links. Translate query parameters and escape special characters to build reliable API links.",
    howToUse: [
      "Paste your URL link or query parameters.",
      "Select Encode or Decode.",
      "Copy the safe, escaped URL result."
    ],
    faqs: [
      { question: "Why encode URLs?", answer: "Special characters (like spaces or ampersands) have syntax meanings; encoding them prevents link parsing errors." }
    ]
  },
  {
    slug: "hash-generator",
    name: "Hash Generator (MD5, SHA-256)",
    category: "developer",
    shortDesc: "Generate secure cryptographic hashes for plain text keys.",
    iconName: "Fingerprint",
    seoTitle: "Cryptographic Hash Generator - MD5, SHA-1, SHA-256 | Toolchi",
    seoDescription: "Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes client-side in your browser.",
    longDesc: "Generate secure cryptographic checksums. Input secret strings to build MD5, SHA-1, SHA-256, and SHA-512 outputs natively.",
    howToUse: [
      "Type or paste your input text key.",
      "Observe live cryptographic hash changes.",
      "Copy the resulting hash to your clipboard."
    ],
    faqs: [
      { question: "Is this cryptographic generator secure?", answer: "Yes, hashing algorithms run locally in Javascript. No keys are sent to any server." }
    ]
  },
  {
    slug: "color-converter",
    name: "Color Format Converter",
    category: "developer",
    shortDesc: "Translate colors between HEX, RGB, HSL, and CMYK formats.",
    iconName: "Palette",
    seoTitle: "Color Converter - HEX, RGB, HSL, CMYK Conversion | Toolchi",
    seoDescription: "Translate design colors between HEX, RGB, HSL, and CMYK formats with visual sliders.",
    longDesc: "Translate color formats. Convert design color codes dynamically and match contrast criteria with sliders.",
    howToUse: [
      "Select input format and enter color values.",
      "Adjust sliders to tweak saturation, light, and hue.",
      "Copy corresponding HEX, RGB, and HSL outputs."
    ],
    faqs: [
      { question: "Does it check contrast criteria?", answer: "Yes, it previews text readability on background shades." }
    ]
  },
  {
    slug: "calculator",
    name: "Scientific Calculator",
    category: "developer",
    shortDesc: "Solve equations and calculate mathematical functions.",
    iconName: "Calculator",
    seoTitle: "Scientific Calculator Online - Free Math Calculator | Toolchi",
    seoDescription: "Perform simple arithmetic and scientific mathematical equations directly in your web browser.",
    longDesc: "Perform mathematical equations. Calculate trigonometry, algorithms, square roots, and basic equations natively.",
    howToUse: [
      "Enter digits and functions using the calculator keypad.",
      "Use parentheses to group math operations.",
      "Press '=' to compute results."
    ],
    faqs: [
      { question: "Does it support trigonometric equations?", answer: "Yes, it includes sin, cos, tan, and inverse functions." }
    ]
  },
  {
    slug: "invoice-generator",
    name: "Invoice Generator",
    category: "developer",
    shortDesc: "Generate structured, print-ready PDF invoices for your business.",
    iconName: "Receipt",
    seoTitle: "Free Invoice Generator - Create PDF Invoices | Toolchi",
    seoDescription: "Create print-ready, professional PDF invoices online. Fully client-side and free.",
    longDesc: "Generate invoice receipts. Fill in business coordinates, items, tax metrics, and print or save print-ready invoices natively.",
    howToUse: [
      "Enter your business logo, coordinates, and invoice number.",
      "List service items, quantities, and rates.",
      "Specify tax rates and click Print or Save to export PDF."
    ],
    faqs: [
      { question: "Can I save my invoice details?", answer: "Details are stored in local session cache, keeping records inside your tab." }
    ],
    popular: true
  }
];

// Helper map for custom properties (CTAs, sample support, related slugs)
const CUSTOM_TOOL_PROPERTIES: Record<string, Partial<ToolItem>> = {
  "robots-txt-checker": { ctaText: "Check Robots", sampleSupported: true, relatedSlugs: ["xml-sitemap-validator", "responsive-checker"] },
  "favicon-generator": { ctaText: "Generate Icon", sampleSupported: false, relatedSlugs: ["compress-image"] },
  "ssl-checker": { ctaText: "Check SSL", sampleSupported: true, relatedSlugs: ["domain-expiration-checker"] },
  "xml-sitemap-validator": { ctaText: "Validate Sitemap", sampleSupported: true, relatedSlugs: ["robots-txt-checker"] },
  "responsive-checker": { ctaText: "Test Responsive", sampleSupported: true, relatedSlugs: ["screen-resolution"] },
  "domain-expiration-checker": { ctaText: "Check Expiry", sampleSupported: true, relatedSlugs: ["ssl-checker"] },
  "gzip-compression": { ctaText: "Check Gzip", sampleSupported: true, relatedSlugs: ["redirect-checker"] },
  "compress-image": { ctaText: "Compress Now", sampleSupported: true, relatedSlugs: ["dummy-image-generator"], popular: true },
  "dummy-image-generator": { ctaText: "Generate Placeholder", sampleSupported: false, relatedSlugs: ["compress-image"] },
  "redirect-checker": { ctaText: "Check Redirects", sampleSupported: true, relatedSlugs: ["gzip-compression"] },
  "site-down-checker": { ctaText: "Check Uptime", sampleSupported: true, relatedSlugs: ["redirect-checker"] },
  "ab-test-calculator": { ctaText: "Calculate Significance", sampleSupported: true, relatedSlugs: ["calculator"] },
  "qr-generator": { ctaText: "Generate QR", sampleSupported: true, relatedSlugs: ["share-link-creator"], popular: true },
  "spell-checker": { ctaText: "Check Spelling", sampleSupported: true, relatedSlugs: ["lorem-ipsum"] },
  "screen-resolution": { ctaText: "Check Resolution", sampleSupported: false, relatedSlugs: ["responsive-checker"] },
  "share-link-creator": { ctaText: "Create Link", sampleSupported: false, relatedSlugs: ["qr-generator"] },
  "lorem-ipsum": { ctaText: "Generate Copy", sampleSupported: false, relatedSlugs: ["text-counter"] },
  "multiple-url-opener": { ctaText: "Open URLs", sampleSupported: true, relatedSlugs: ["share-link-creator"] },
  "minify-code": { ctaText: "Minify Code", sampleSupported: true, relatedSlugs: ["unminify-code"] },
  "unminify-code": { ctaText: "Format Code", sampleSupported: true, relatedSlugs: ["minify-code"] },
  "amp-validator": { ctaText: "Validate AMP", sampleSupported: true, relatedSlugs: ["xml-sitemap-validator"] },
  "domain-generator": { ctaText: "Generate Names", sampleSupported: true, relatedSlugs: ["domain-expiration-checker"] },
  "ai-detector": { ctaText: "Analyze Text", sampleSupported: true, relatedSlugs: ["spell-checker"], popular: true, isNew: true },
  "merge-pdf": { ctaText: "Merge PDF", sampleSupported: false, relatedSlugs: ["split-pdf", "compress-pdf"], popular: true },
  "split-pdf": { ctaText: "Split PDF", sampleSupported: false, relatedSlugs: ["merge-pdf", "compress-pdf"], isNew: true },
  "rotate-pdf": { ctaText: "Rotate PDF", sampleSupported: false, relatedSlugs: ["merge-pdf"] },
  "compress-pdf": { ctaText: "Compress PDF", sampleSupported: false, relatedSlugs: ["merge-pdf"] },
  "case-converter": { ctaText: "Convert Case", sampleSupported: true, relatedSlugs: ["text-counter"] },
  "text-counter": { ctaText: "Count Words", sampleSupported: true, relatedSlugs: ["case-converter"] },
  "json-formatter": { ctaText: "Format JSON", sampleSupported: true, relatedSlugs: ["base64"], popular: true },
  "base64": { ctaText: "Convert Base64", sampleSupported: true, relatedSlugs: ["json-formatter"] },
  "url-encoder": { ctaText: "Encode/Decode", sampleSupported: true, relatedSlugs: ["base64"] },
  "hash-generator": { ctaText: "Generate Hash", sampleSupported: true, relatedSlugs: ["base64"] },
  "color-converter": { ctaText: "Convert Colors", sampleSupported: true, relatedSlugs: ["dummy-image-generator"] },
  "calculator": { ctaText: "Calculate", sampleSupported: false, relatedSlugs: ["ab-test-calculator"] },
  "invoice-generator": { ctaText: "Create Invoice", sampleSupported: true, relatedSlugs: ["calculator"], popular: true }
};

export const TOOLS_REGISTRY: ToolItem[] = RAW_TOOLS_REGISTRY.map(tool => {
  const custom = CUSTOM_TOOL_PROPERTIES[tool.slug] || {};
  return {
    ...tool,
    seoTitle: tool.seoTitle || `${tool.name} - Free Online Tool | Toolchi`,
    seoDescription: tool.seoDescription || `Run ${tool.name} locally in your browser. 100% private and secure.`,
    longDesc: tool.longDesc || `A local client-side tool to process ${tool.name} queries in real-time.`,
    howToUse: tool.howToUse || ["Input your data in the tool workspace.", "Configure settings.", "Process and save results."],
    faqs: tool.faqs || [{ question: `Is ${tool.name} free?`, answer: `Yes, it is 100% free and runs entirely inside your browser.` }],
    ctaText: custom.ctaText || "Open Tool",
    sampleSupported: custom.sampleSupported ?? false,
    relatedSlugs: custom.relatedSlugs || [],
    popular: custom.popular ?? tool.popular ?? false,
    isNew: custom.isNew ?? tool.isNew ?? false,
    tags: custom.tags || [tool.category],
    shortDescription: tool.shortDesc
  } as ToolItem;
});

export const getToolBySlug = (slug: string) => {
  return TOOLS_REGISTRY.find(t => t.slug === slug);
};

export const getToolsByCategory = (category: string) => {
  return TOOLS_REGISTRY.filter(t => t.category === category);
};
