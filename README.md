# AI GrowthOS / RetargetOS

A first-party data activation and revenue intelligence platform for merchants, e-commerce sellers, and agencies.

## Overview

AI GrowthOS is a consent-safe, profit-driven system that converts existing customer and lead data into measurable revenue through intelligent audience building, campaign orchestration, and attribution tracking.

### Core Capabilities

- **Data Foundation**: Unified profile management with consent tracking and suppression enforcement
- **Identity Resolution**: Multi-channel identity matching (email, phone, external IDs) with deduplication
- **Audience Building**: Consent-safe, suppression-aware audience segmentation
- **Platform Connectors**: Direct integration with Meta, TikTok, Google, and X
- **Event Tracking**: Server-side conversion attribution with revenue reconciliation
- **AI Copilot**: Intelligent campaign recommendations and performance analysis

### Key Architecture Principles

- **Suppression First**: Suppressed profiles never activate, regardless of consent or business logic
- **Consent Enforcement**: Unknown consent defaults to blocked (no activation)
- **Profit-Driven**: All optimizations target net profit, not vanity metrics
- **Audit Trail**: All sensitive actions logged with PII masking
- **Production-Grade**: Idempotent jobs, exponential backoff, graceful degradation

## Tech Stack

- **Frontend/Backend**: Next.js 14+ (App Router)
- **Database**: Supabase (PostgreSQL)
- **ORM**: Drizzle ORM
- **Queuing**: BullMQ + Redis
- **Monorepo**: Turborepo
- **Language**: TypeScript (Strict Mode)

## Project Structure

```
retargetos/
├── apps/
│   ├── web/                 # Next.js application (client/server)
│   └── worker/              # Background job processor
├── packages/
│   ├── db/                  # Drizzle ORM schemas and client
│   ├── queue/               # BullMQ queue definitions and job types
│   ├── consent/             # Consent/suppression enforcement
│   ├── events/              # Event tracking taxonomy
│   ├── audiences/           # Audience building logic
│   ├── identity/            # Identity resolution engine
│   ├── connectors/          # Platform connector implementations
│   ├── ai/                  # AI copilot and recommendations
│   └── monetization/        # Revenue and profit calculations
└── docs/
    └── specifications/      # Product and technical specifications
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL 14+ (via Supabase)
- Redis instance (local Docker or cloud provider)

### Installation

```bash
# Clone the repository
git clone https://github.com/besfeng23/RetargetOS.git
cd RetargetOS

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Configure your environment variables
nano .env.local
```

### Development

```bash
# Start all development servers
pnpm dev

# The web application runs on http://localhost:3000
# The worker begins processing jobs from BullMQ queues
```

## Core Workflows

### 1. Data Import and Profile Resolution

1. User uploads CSV file via web interface
2. Ingestion worker normalizes and validates records
3. Processing worker resolves identities and deduplicates
4. Profiles created with identity keys

### 2. Audience Building and Sync

1. User defines audience rules in web interface
2. Audience builder applies filters (consent, suppression, segmentation)
3. Activation worker syncs to external platform via connector
4. Platform-specific match rate and error tracking recorded

### 3. Event Attribution

1. Customer performs action (purchase, lead submission, etc.)
2. Server-side event is captured
3. Event service links to campaign, creative, and audience
4. Revenue is attributed and profit calculated

## Safety Guarantees

### Suppression Enforcement

Profiles marked as suppressed are never activated, regardless of audience inclusion rules, consent status, AI recommendations, campaign objectives, or revenue potential.

### Consent Validation

Activation only proceeds if consent is explicitly granted for the destination channel, not expired, not revoked, and with unknown consent defaulting to blocked.

### Audit Trail

All sensitive operations are logged. Audit logs never contain raw PII (emails, phone numbers, addresses are hashed or masked).

## Contributing

Please refer to CONTRIBUTING.md for development guidelines, code standards, and pull request procedures.

## License

This project is proprietary and confidential.