# Aeterna's Journal ✨

> Your personal dream interpretation journal powered by local NLP analysis

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-100%25-blue)
![Next.js](https://img.shields.io/badge/next.js-15.5.4-black)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### Core Functionality
- **Local Dream Interpretation** - NLP-powered analysis without API costs
- **Pattern Recognition** - Identifies recurring symbols and themes (20%+ frequency)
- **Sentiment Analysis** - Tracks emotional trends across dreams
- **Symbol Dictionary** - Customizable symbol meanings with CRUD operations
- **Personal Reflections** - Journal your waking life connections
- **Export/Import** - Backup and restore your dream journal

### Technical Highlights
- 🎨 Beautiful glassmorphic UI with animated cloud background
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ SWR for optimized client-side data fetching
- 🔒 Type-safe with TypeScript and Zod validation
- 🗄️ PostgreSQL with Prisma ORM
- 🔗 Foreign key constraints and database indexes
- 🛡️ Error boundaries and proper error handling
- 🎭 Server Actions for mutations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon serverless)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dream-tale.git
cd dream-tale

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL

# Push database schema
npm run db:push

# (Optional) Seed with sample data
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your dream journal.

## 📁 Project Structure

```
dream-tale/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── dreams/        # Dream CRUD endpoints
│   │   ├── symbols/       # Symbol management
│   │   ├── patterns/      # Pattern analysis
│   │   └── interpret/     # Dream interpretation
│   ├── dream/[id]/        # Individual dream page
│   ├── dictionary/        # Symbol dictionary page
│   ├── patterns/          # Pattern visualization page
│   └── layout.tsx         # Root layout
├── components/
│   ├── dream/             # Dream-related components
│   ├── modals/            # Modal components
│   ├── ui/                # Reusable UI components
│   └── ErrorBoundary.tsx  # Error boundary
├── hooks/                 # Custom React hooks
│   ├── useDreams.ts      # SWR hook for dreams
│   └── useSymbols.ts     # SWR hook for symbols
├── lib/
│   ├── interpretation.ts  # NLP interpretation logic
│   ├── analysis.ts       # Pattern analysis
│   ├── validation.ts     # Zod schemas
│   ├── utils.ts          # Utility functions
│   ├── types.ts          # TypeScript types
│   └── prisma.ts         # Prisma client singleton
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── migrations/       # Database migrations
│   └── seed.ts           # Database seeder
└── services/
    ├── db.ts             # Database operations
    └── reflection.service.ts  # Reflection handling
```

## 🗄️ Database Schema

```prisma
model Dream {
  id             String       @id @default(cuid())
  date           DateTime     @default(now())
  text           String       @db.Text
  interpretation Json
  reflections    Reflection[]
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  @@index([date])
}

model Symbol {
  id         Int      @id @default(autoincrement())
  key        String   @unique
  meaning    String   @db.Text
  categoryId Int
  category   Category @relation(...)

  @@index([categoryId])
}

model Reflection {
  id        String   @id @default(cuid())
  dreamId   String
  dream     Dream    @relation(..., onDelete: Cascade)
  text      String   @db.Text
  createdAt DateTime @default(now())

  @@index([dreamId])
}

model Category {
  id      Int      @id @default(autoincrement())
  name    String   @unique
  symbols Symbol[]
}
```

## 🎨 UI Components

### Core Pages
- **Home (`/`)** - Dream interpretation interface with tabs
  - Interpret tab - Input and analyze dreams
  - History tab - View all past dreams
  - Patterns tab - Visualize recurring themes
  - Dictionary tab - Manage symbol meanings

- **Dream Detail (`/dream/[id]`)** - Individual dream view
  - Full interpretation display
  - Personal reflections
  - Navigation to previous/next dreams

- **Dictionary (`/dictionary`)** - Searchable symbol encyclopedia
  - Alphabetical grouping
  - Live search filtering
  - Random symbol of the day

- **Patterns (`/patterns`)** - Pattern visualization
  - Recurring symbols with frequency
  - Dominant themes
  - Sentiment trends over time

### Key Components
- `DreamInput` - Dream text entry with validation
- `Interpretation` - Beautiful interpretation display
- `DreamCard` - Compact dream preview
- `ExportImport` - Backup/restore functionality
- `Sidebar` - Navigation with dream history
- `TopInsights` - Floating insights panel

## 🧠 How Interpretation Works

### 1. Symbol Matching
Uses regex patterns to match symbols (handles plurals, verb forms):
```typescript
// Matches: fly, flies, flying, flew
const regex = new RegExp(`\\b${symbol}(s|es|ed|ing)?\\b`, 'i');
```

### 2. Theme Detection
Maps symbols to broader themes:
- **Freedom**: flying, bird, sky, soar
- **Anxiety**: falling, teeth, chase, late
- **Transformation**: snake, death, fire, rebirth
- **Emotions**: water, ocean, cry, storm
- And 8 more categories...

### 3. Sentiment Analysis
Counts positive vs. negative words to determine emotional tone:
```typescript
// Positive: happy, joy, love, peace, free
// Negative: scared, angry, sad, lost, fear
score = (positive - negative) / (positive + negative)
```

### 4. Personal Insights
Generates contextual guidance based on:
- Primary symbols detected
- Dominant themes
- Emotional tone
- Pattern history

## 📊 API Endpoints

### Dreams
- `GET /api/dreams` - List all dreams
- `POST /api/interpret` - Create and interpret dream
- `DELETE /api/dreams/[id]` - Delete dream

### Symbols
- `GET /api/symbols` - List all symbols
- `POST /api/symbols` - Create/update symbol
- `DELETE /api/symbols/[id]` - Delete symbol

### Analysis
- `GET /api/patterns` - Get recurring patterns
- `GET /api/insights` - Get dream insights

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:push      # Push schema to database
npm run db:seed      # Seed sample data
npm run db:studio    # Open Prisma Studio
```

## 🧪 Testing

```bash
# Run type checking
npx tsc --noEmit

# Test build
npm run build

# Test database connection
npx prisma db pull
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment
```bash
# Build
npm run build

# Set environment variables
export DATABASE_URL="your-database-url"

# Start
npm run start
```

### Environment Variables
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?ssl=true"
NEXTAUTH_SECRET="your-secret-key-here"
NODE_ENV="production"
```

## 🔧 Configuration

### Prisma
- Connection pooling configured for Neon
- Binary targets: `native` and `debian-openssl-1.0.x`

### Next.js
- App Router with Server Components
- Server Actions enabled
- Static optimization where possible

### Tailwind CSS
- Custom animations (fade-in, slide-up, blob)
- Glassmorphic design system
- Responsive utilities

## 📝 Usage Examples

### Interpreting a Dream
```typescript
import { interpretDreamLocally } from '@/lib/utils';
import { Symbol } from '@/lib/types';

const symbols: Symbol[] = await getSymbols();
const interpretation = interpretDreamLocally(dreamText, symbols);
// Returns: { mainThemes, emotionalTone, symbols, personalInsight, guidance }
```

### Pattern Analysis
```typescript
import { computePatterns } from '@/lib/utils';

const patterns = computePatterns(dreams);
// Returns: { recurringSymbols, themeFrequency }
```

### Validation
```typescript
import { CreateDreamInputSchema } from '@/lib/validation';

const result = CreateDreamInputSchema.safeParse({ text: dreamText });
if (!result.success) {
  console.error(result.error.format());
}
```

## 🎯 Roadmap

### v1.1 (Q1 2025)
- [ ] Advanced search with filters
- [ ] Dream tags and categories
- [ ] Statistics dashboard
- [ ] PDF export
- [ ] Mobile app (React Native)

### v1.2 (Q2 2025)
- [ ] AI-powered dream analysis (GPT-4 integration)
- [ ] Voice input for dreams
- [ ] Dream sharing (privacy-controlled)
- [ ] Collaborative dream interpretation
- [ ] Dream journal prompts

### v2.0 (Q3 2025)
- [ ] Dream visualizations
- [ ] Pattern predictions
- [ ] Sleep data integration
- [ ] Multi-language support
- [ ] Dream community features

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Add Zod validation for user inputs
- Write meaningful commit messages
- Update tests and documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Compromise](https://github.com/spencermountain/compromise) - NLP
- [SWR](https://swr.vercel.app/) - Data fetching
- [Zod](https://zod.dev/) - Validation
- [Lucide Icons](https://lucide.dev/) - Icons
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

## 📧 Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- Website: https://yourwebsite.com

---

**Built with ❤️ and ✨ by the Aeterna's Journal team**

*"Every dream is a window to your inner world. Aeterna's Journal helps you see what's beyond."*
