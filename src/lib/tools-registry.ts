export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolItem {
  slug: string;
  name: string;
  category: string;
  shortDesc: string;
  iconName: string;
  seoTitle: string;
  seoDescription: string;
  longDesc: string;
  howToUse: string[];
  faqs: FAQItem[];
  popular?: boolean;
  isNew?: boolean;
}

export const CATEGORIES = [
  { id: "text", name: "Text Utilities", desc: "Transform, format, and generate text content instantly." },
  { id: "dev", name: "Developer Tools", desc: "Format JSON, encode URLs, generate hashes, and make QR codes." },
  { id: "pdf", name: "PDF Tools", desc: "Split, merge, rotate, compress, and convert PDF files directly in your browser." },
  { id: "image", name: "Image Utilities", desc: "Convert formats and edit dimensions client-side." },
  { id: "color", name: "Color Utilities", desc: "Translate between Hex, RGB, HSL and manage color spaces." },
  { id: "math", name: "Math & Conversions", desc: "Evaluate equations and translate measurement units." },
  { id: "business", name: "Business & Productivity", desc: "Generate invoices and manage client assets." },
  { id: "ai", name: "AI Content Utilities", desc: "Detect AI-generated text and humanize content to bypass checkers." }
];

export const TOOLS_REGISTRY: ToolItem[] = [
  // 1. TEXT TOOLS
  {
    slug: "case-converter",
    name: "Case Converter",
    category: "text",
    shortDesc: "Convert text instantly to UPPERCASE, lowercase, title case, sentence case, and camelCase.",
    iconName: "CaseSensitive",
    seoTitle: "Online Case Converter Tool - Change Text Case Instantly | Toolchi",
    seoDescription: "Convert text case online for free. Support UPPERCASE, lowercase, Title Case, Sentence Case, kebab-case, and snake_case. 100% secure client-side utility.",
    longDesc: "Toolchi Case Converter is a lightweight client-side application designed to quickly modify text capitalization formats. Whether you are correcting copy-pasting layouts, formatting programming variables, or preparing articles, this tool handles everything in the browser without sending any text to external servers.",
    howToUse: [
      "Type or paste your text into the input container.",
      "Select your target casing style from the option panel (e.g., UPPERCASE, sentence case, title case).",
      "Click the Copy button to capture the transformed output to your clipboard."
    ],
    faqs: [
      { question: "Is my text uploaded to a server?", answer: "No, Toolchi processes text entirely inside your browser using JavaScript. No data ever leaves your device." },
      { question: "What is title case?", answer: "Title Case capitalizes the first letter of each word in the text block (e.g., 'Hello World')." }
    ],
    popular: true
  },
  {
    slug: "text-counter",
    name: "Text Counter",
    category: "text",
    shortDesc: "Measure characters, words, sentences, and paragraph counts in real-time.",
    iconName: "FileText",
    seoTitle: "Word Counter & Text Analyzer - Live Character Counter | Toolchi",
    seoDescription: "Count words, characters, sentences, and paragraphs in real-time. Calculate text readability and word length instantly in your browser.",
    longDesc: "Use this online word counter to quickly analyze text structure, calculate character limits for social media, or audit essay lengths. The utility works dynamically as you type.",
    howToUse: [
      "Paste your content into the editing area.",
      "Observe the real-time counters displaying total characters, word counts, and lines.",
      "Click clear to empty the input and start again."
    ],
    faqs: [
      { question: "Does it count spaces?", answer: "Yes, our counter provides metrics for both total characters (with spaces) and character count excluding spaces." }
    ]
  },
  {
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    category: "text",
    shortDesc: "Generate placeholder text paragraphs, sentences, or list items for prototypes.",
    iconName: "FileCode",
    seoTitle: "Lorem Ipsum Placeholder Generator - Quick Dummy Text | Toolchi",
    seoDescription: "Create customizable dummy text for mockups, prototypes, and web design. Choose paragraph counts and formatting types instantly.",
    longDesc: "Generate classic placeholder text (Lorem Ipsum) to fill layout voids during prototype development. Configure paragraph length and structure with ease.",
    howToUse: [
      "Select the desired quantity of paragraphs, sentences, or words.",
      "Click the Generate button to create the placeholder text block.",
      "Use the instant copy link to export."
    ],
    faqs: [
      { question: "Where does Lorem Ipsum come from?", answer: "It is based on a passage from Cicero's classical Latin literature from 45 BC." }
    ]
  },

  // 2. DEVELOPER TOOLS
  {
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    category: "dev",
    shortDesc: "Pretty print, validate, and minify JSON strings with live error mapping.",
    iconName: "Braces",
    seoTitle: "JSON Formatter, Validator & Minifier Online | Toolchi",
    seoDescription: "Pretty print JSON code, format nested arrays, validate syntax rules, and compress json scripts. Local parser ensures high security.",
    longDesc: "An indispensable tool for developers to inspect JSON payloads, format raw API responses into legible tree structures, and strip whitespace for production payloads.",
    howToUse: [
      "Paste your raw JSON text into the code editor.",
      "Click Format to beautify or Minify to compact your JSON code.",
      "Check the validator footer to fix syntax errors like missing commas or quotes."
    ],
    faqs: [
      { question: "Does it support large JSON files?", answer: "Yes, it efficiently processes large payloads client-side in milliseconds." }
    ],
    popular: true
  },
  {
    slug: "base64",
    name: "Base64 Encoder & Decoder",
    category: "dev",
    shortDesc: "Translate text string inputs to and from Base64 binary formats.",
    iconName: "Binary",
    seoTitle: "Base64 Encode and Decode Online - Secure Converter | Toolchi",
    seoDescription: "Convert plain text to Base64 encoded format or decode base64 hashes back to readable strings. 100% browser-side parsing.",
    longDesc: "Easily encode string data to Base64 or decode hashes back. Perfect for testing authentication headers, data URLs, and basic obfuscations.",
    howToUse: [
      "Enter your input text into the source panel.",
      "Click Encode to generate the Base64 value, or Decode to translate a Base64 string back.",
      "Copy the result instantly."
    ],
    faqs: [
      { question: "Is Base64 secure encryption?", answer: "No, Base64 is an encoding format for binary-to-text transmission, not a form of secure cryptography." }
    ]
  },
  {
    slug: "url-encoder",
    name: "URL Encoder & Decoder",
    category: "dev",
    shortDesc: "Encode or decode query parameters and URLs to prevent browser parsing errors.",
    iconName: "Link",
    seoTitle: "URL Encoder and Decoder Online - Percent Encoding | Toolchi",
    seoDescription: "Encode query parameters into safe URL format or decode percent-encoded strings back to plain text. Web-safe conversion.",
    longDesc: "Convert special characters inside URLs to their percent-encoded counterparts (e.g., spaces to %20) to ensure reliable browser rendering.",
    howToUse: [
      "Input your raw string or target URL in the textarea.",
      "Click Encode to escape characters, or Decode to convert back.",
      "Copy the formatted output."
    ],
    faqs: [
      { question: "Why do we need URL encoding?", answer: "URLs can only contain standard ASCII characters. Special characters like spaces or symbols must be escaped." }
    ]
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    category: "dev",
    shortDesc: "Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic checksums.",
    iconName: "Key",
    seoTitle: "Online Hash Generator - SHA-256, MD5, SHA-512 Hash Checksums | Toolchi",
    seoDescription: "Generate secure cryptographic hashes online. Calculate SHA-256, MD5, SHA-1, and SHA-512 checksums instantly inside your browser.",
    longDesc: "Calculate checksum hashes for validation, verify file integrity, or hash data payloads using industry-standard cryptographic algorithms.",
    howToUse: [
      "Type or paste your text input.",
      "Select your target algorithm (MD5, SHA-256, etc.).",
      "Copy the generated hex hash output."
    ],
    faqs: [
      { question: "Can hashes be reversed?", answer: "Cryptographic hashes are one-way functions and cannot be easily reversed back to the original text." }
    ]
  },
  {
    slug: "qr-generator",
    name: "QR Code Generator",
    category: "dev",
    shortDesc: "Create downloadable QR codes for URLs, text blocks, or contact cards.",
    iconName: "QrCode",
    seoTitle: "Free QR Code Generator - Generate QR Codes for URLs & Text | Toolchi",
    seoDescription: "Create custom QR codes online. Generate QR codes for websites, links, Wi-Fi details, or text. Download as high-quality images.",
    longDesc: "Generate high-resolution QR codes from text, phone numbers, or URLs. Perfect for business cards, flyers, and direct website links.",
    howToUse: [
      "Enter the destination link or text content.",
      "Observe the QR code graphic update instantly.",
      "Click Download to save the QR code image to your local device."
    ],
    faqs: [
      { question: "Do QR codes expire?", answer: "Static QR codes contain encoded text directly and never expire. They will work indefinitely." }
    ],
    isNew: true
  },

  // 3. PDF TOOLS
  {
    slug: "merge-pdf",
    name: "Merge PDFs",
    category: "pdf",
    shortDesc: "Combine multiple PDF documents into a single organized file.",
    iconName: "Combine",
    seoTitle: "Merge PDF Files Online - Combine PDFs in Browser | Toolchi",
    seoDescription: "Combine multiple PDF documents into one PDF file online. 100% local browser merging ensures files remain private and secure.",
    longDesc: "Merge separate report sheets, scanned documentation, or files into a single consolidated PDF document. Since it runs in WebAssembly/JS, your files are never uploaded to any remote server.",
    howToUse: [
      "Drag and drop or select your PDF files in order.",
      "Reorder the files using drag handles if necessary.",
      "Click Merge PDFs to output and download the consolidated document."
    ],
    faqs: [
      { question: "Is there a limit on file size?", answer: "No, as long as your browser has enough system memory (RAM) to compile the output document." }
    ],
    popular: true
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    category: "pdf",
    shortDesc: "Extract specific pages from a PDF document into a new file.",
    iconName: "Scissors",
    seoTitle: "Split PDF Online - Extract Pages from PDF | Toolchi",
    seoDescription: "Split your PDF document into individual pages or extract custom page ranges. Browser-side processing secures your data.",
    longDesc: "Divide multi-page reports or extract single pages from a PDF. Specify page ranges or split every page into separate documents.",
    howToUse: [
      "Select or upload your multi-page PDF.",
      "Define page ranges (e.g., '1-3, 5') or select split mode.",
      "Process and download the resulting extracted PDF."
    ],
    faqs: [
      { question: "Is splitting secure?", answer: "Absolutely. All operations occur in local client memory so your documents are never transmitted across the network." }
    ]
  },
  {
    slug: "rotate-pdf",
    name: "Rotate PDF",
    category: "pdf",
    shortDesc: "Rotate pages inside a PDF file permanently.",
    iconName: "RotateCw",
    seoTitle: "Rotate PDF Pages Online - Permanently Rotate PDFs | Toolchi",
    seoDescription: "Rotate PDF files clockwise or counter-clockwise online. Save permanently rotated PDF documents instantly in your browser.",
    longDesc: "Correct orientation errors on scanned documents. Rotate pages 90, 180, or 270 degrees and download the updated PDF file.",
    howToUse: [
      "Upload the PDF document.",
      "Select the rotation direction (90° CW, 90° CCW, 180°).",
      "Click Rotate and save the download."
    ],
    faqs: [
      { question: "Can I rotate specific pages?", answer: "Currently, our rotation utility rotates all pages uniformly. Specific page rotation is being added soon." }
    ]
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    category: "pdf",
    shortDesc: "Reduce the file size of PDF documents while maintaining readability.",
    iconName: "FileDown",
    seoTitle: "Compress PDF Online - Reduce PDF File Size | Toolchi",
    seoDescription: "Make PDF files smaller online. Re-optimize PDF data streams to compress files directly in the browser.",
    longDesc: "Optimize large PDF documents for email attachments or fast web loads. Our compressor restructures object streams to minimize size while protecting document clarity.",
    howToUse: [
      "Upload your target PDF file.",
      "Process with our automated optimization engine.",
      "Download the compressed PDF file."
    ],
    faqs: [
      { question: "Does compression lower text quality?", answer: "No, text and vectors remain fully crisp. It optimizes duplicate streams and file metadata." }
    ]
  },

  // 4. IMAGE TOOLS
  {
    slug: "image-converter",
    name: "Image Converter",
    category: "image",
    shortDesc: "Convert image files to JPEG, PNG, and WebP formats instantly.",
    iconName: "Image",
    seoTitle: "Online Image Converter - Convert to PNG, JPG, WebP | Toolchi",
    seoDescription: "Convert images to JPEG, WebP, or PNG formats online. Free client-side converter protects your privacy. No uploads.",
    longDesc: "Switch formats of photos or graphics locally. Speed up web pages by converting heavy PNGs to modern lightweight WebP formats.",
    howToUse: [
      "Upload or drop the source image file.",
      "Choose your desired output format (JPEG, PNG, WebP).",
      "Download the converted asset."
    ],
    faqs: [
      { question: "Can I convert multiple images?", answer: "Yes, you can drag and drop multiple images to batch-convert them in sequence." }
    ]
  },

  // 5. COLOR TOOLS
  {
    slug: "color-converter",
    name: "Color Converter",
    category: "color",
    shortDesc: "Convert color formats between HEX, RGB, HSL, and CMYK codes.",
    iconName: "Palette",
    seoTitle: "Color Code Converter - HEX, RGB, HSL, CMYK Online | Toolchi",
    seoDescription: "Convert color codes online. Translate between HEX hexadecimals, RGB coordinates, HSL metrics, and CMYK formats. Pick values with ease.",
    longDesc: "A complete color utility dashboard for designers. Convert CSS variables between formats, preview color values, and verify design palettes.",
    howToUse: [
      "Input a color value (like '#046bd2' or 'rgb(4, 107, 210)').",
      "Observe the automatic conversions across all target code systems.",
      "Copy any code format to your editor clipboards."
    ],
    faqs: [
      { question: "What is HSL?", answer: "HSL stands for Hue, Saturation, and Lightness, offering a human-friendly way to construct color variations." }
    ]
  },

  // 6. MATH TOOLS
  {
    slug: "calculator",
    name: "Math Calculator",
    category: "math",
    shortDesc: "Evaluate complex mathematical equations and expressions locally.",
    iconName: "Calculator",
    seoTitle: "Scientific Math Calculator - Parse Math Equations Online | Toolchi",
    seoDescription: "Solve equations, evaluate scientific formulas, parse matrices, and calculate answers instantly. Fully local execution.",
    longDesc: "Perform quick math calculations using a scientific parser. Supports algebra, variable bindings, trigonometric operations, and vector calculations.",
    howToUse: [
      "Type your expression (e.g., 'sqrt(9) + 5').",
      "Press Enter or click Calculate to solve.",
      "Store variables to reuse outcomes in sequential lines."
    ],
    faqs: [
      { question: "Does it support formulas?", answer: "Yes, standard syntax like 'sin(pi/2)' or 'pow(2, 8)' are recognized." }
    ]
  },

  // 7. BUSINESS TOOLS
  {
    slug: "invoice-generator",
    name: "Invoice Generator",
    category: "business",
    shortDesc: "Create professional PDF invoices dynamically to bill your clients.",
    iconName: "Receipt",
    seoTitle: "Free Invoice Generator - Create PDF Invoices Online | Toolchi",
    seoDescription: "Create professional business invoices in seconds. Customize terms, client details, items, and print/download directly as PDF.",
    longDesc: "Draft client bills in seconds. Fill in services, quantities, prices, taxes, and download a print-ready invoice. No data is stored, keeping your business transactions confidential.",
    howToUse: [
      "Fill in your company branding, invoice number, and client addresses.",
      "Add service line-items, specifying pricing rate details and item counts.",
      "Verify subtotals, tax rates, and download the print-ready PDF."
    ],
    faqs: [
      { question: "Are my invoices saved online?", answer: "No, Toolchi does not store any customer bills or invoices. All details are kept in client-side states." }
    ],
    popular: true
  },

  // 8. AI CONTENT TOOLS
  {
    slug: "ai-detector",
    name: "AI Content Detector & Humanizer",
    category: "ai",
    shortDesc: "Analyze writing patterns to verify AI-generated text, and humanize content to bypass detection tools.",
    iconName: "Cpu",
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
  }
];

export const getToolBySlug = (slug: string) => {
  return TOOLS_REGISTRY.find(t => t.slug === slug);
};

export const getToolsByCategory = (category: string) => {
  return TOOLS_REGISTRY.filter(t => t.category === category);
};
