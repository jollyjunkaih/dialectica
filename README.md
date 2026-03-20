# Dialectica — Infinite Knowledge CMS

Dialectica is an infinite recursive knowledge management system. It organizes knowledge into a 3D bookshelf interface where shelves represent categories, books represent topics, and each topic opens into an infinite recursive Q&A tree.

## Concept

- **Bookshelf Homepage**: A 3D bookshelf where each shelf is a category and each book is a topic
- **Topic View**: Lists the root-level ideas/questions for a given topic
- **Node View**: An infinite recursive tree — questions lead to viewpoints, viewpoints lead to answers, answers spawn new questions, and so on forever
- **CMS Editor**: Admin/editor interface for managing content

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **ORM**: Prisma with SQLite (local dev)
- **Auth**: NextAuth.js
- **Animation**: Framer Motion
- **Rich Text**: Tiptap editor
- **State**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/jollyjunkaih/dialectica.git
cd dialectica
npm install
```

### Database Setup

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
dialectica/
├── app/
│   ├── api/
│   │   ├── categories/route.ts    # GET all categories with topics
│   │   ├── topics/[slug]/route.ts # GET topic with root nodes
│   │   └── nodes/[id]/
│   │       ├── route.ts           # GET node with children
│   │       └── children/route.ts  # GET just children array
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── bookshelf/   # 3D bookshelf components
│   ├── node-tree/   # Recursive node tree components
│   └── editor/      # Tiptap CMS editor components
├── lib/
│   ├── prisma.ts    # Prisma singleton client
│   ├── auth.ts      # NextAuth configuration
│   └── types.ts     # TypeScript interfaces
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── package.json
```

## Data Model

- **Category**: Groups of related topics (e.g., Religion, Science)
- **Topic**: A subject area containing a tree of nodes (e.g., "The Eucharist")
- **Node**: A recursive unit with types: QUESTION, VIEWPOINT, ANSWER. Nodes reference a parent, forming an infinite tree.
- **User**: Roles include READER, EDITOR, ADMIN

## API Routes

| Endpoint | Method | Description |
|---|---|---|
| `/api/categories` | GET | All categories with their topics |
| `/api/topics/[slug]` | GET | Single topic with root-level nodes |
| `/api/nodes/[id]` | GET | Single node with direct children |
| `/api/nodes/[id]/children` | GET | Just the children array of a node |

## License

ISC
