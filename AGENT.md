# FairCrop AI — Project Context

## 1. Project Overview

FairCrop AI is an AI-assisted agricultural marketplace that directly connects farmers with legitimate agricultural buyers.

The core problem is market access, price information, and negotiation power.

Farmers may struggle to:
- Find direct buyers
- Understand realistic market prices
- Evaluate buyer offers
- Negotiate effectively
- Understand whether an offer is actually beneficial

FairCrop provides an intelligent representative for the farmer.

### Core Concept

```text
Farmer → FairCrop AI Agent → Buyer → Deal
```

### North Star

> Connect directly. Understand the market. Let AI negotiate. Close the deal.

---

## 2. Current Product Scope

For the current development phase, focus only on:

```text
Farmer
   ↓
Create Crop Listing
   ↓
Buyer Discovers Listing
   ↓
Buyer Makes Offer
   ↓
AI Evaluates Offer
   ↓
AI Negotiates
   ↓
Farmer Approves Outcome
   ↓
Deal Created
```

Do not assume or implement payments, delivery coordination, settlement, disputes, reputation systems, or other future functionality unless explicitly requested.

---

## 3. Team

| Member | Responsibility | Technology |
|---|---|---|
| Abisinan | Frontend | Next.js + TypeScript |
| Najath | Backend / Application | Python + FastAPI + PostgreSQL |
| Fuvad | Agentic AI | Python + LangChain + LangGraph + LLMs |

### Ownership Principle

```text
Abisinan → User experience
Najath   → Application system + source of truth
Fuvad    → Intelligence / Agentic AI
```

Do not blur ownership without discussing the change first.

---

## 4. High-Level Architecture

```text
                    FairCrop AI
                        │
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
      Frontend       Backend          AI
      Next.js        FastAPI       LangGraph
      TypeScript     PostgreSQL    LangChain
          │              │             │
          └──────────────┤             │
                         ↓             │
                    Application        │
                      State            │
                         ↑             │
                         └─────────────┘
```

The backend is the source of truth for marketplace state.

The AI produces recommendations/decisions.

The backend validates AI output before applying state changes.

---

## 5. Core Domain

Current entities:

```text
User
Farmer
Buyer
Listing
Offer
Negotiation
NegotiationRound
AIRecommendation
Deal
```

Main relationship:

```text
Farmer
  │
  └── Listing
        │
        └── Offer
              │
              └── Negotiation
                    │
                    └── Deal
```

Buyer relationship:

```text
Buyer
  │
  └── Offer
        │
        └── Negotiation
```

---

## 6. Important Pricing Concepts

Do not treat every price as the same concept.

FairCrop should distinguish:

```text
Market Price
AI Recommended Range
Farmer Asking Price
Farmer Minimum Acceptable Price
Buyer Offer
Negotiated Price
Final Agreed Price
```

AI recommendations involving money must be explainable.

Example:

> FairCrop recommends negotiating at ₹48/kg because the buyer's offer is below the farmer's minimum and current market range.

Never claim that FairCrop guarantees the highest possible price.

---

## 7. AI Role

The AI is not simply a chatbot.

It acts as an intelligent representative for the farmer.

Potential responsibilities:

```text
Market Analysis
      ↓
Offer Evaluation
      ↓
Negotiation Strategy
      ↓
Counter Offer
      ↓
Recommendation
```

However, AI autonomy must be explicitly defined.

For the current scope:

```text
AI evaluates / negotiates
        ↓
Farmer approves outcome
        ↓
Backend creates deal
```

Do not implement automatic deal acceptance unless explicitly required.

---

## 8. Backend ↔ AI Boundary

```text
Backend
   │
   │ structured context
   ↓
AI Layer
   │
   │ structured decision
   ↓
Backend
   │
   ├── validate
   ├── persist
   └── update state
```

The AI must not directly mutate core marketplace state.

The backend must validate AI output.

---

## 9. Core Lifecycle

Initial lifecycle:

```text
LISTING_ACTIVE
      ↓
OFFER_CREATED
      ↓
AI_EVALUATING
      ↓
NEGOTIATING
      ↓
AWAITING_FARMER_APPROVAL
      ↓
ACCEPTED / REJECTED / EXPIRED
      ↓
DEAL_CREATED
```

State transitions must be explicit.

---

## 10. Project-Wide AI Coding Rules

When using AI coding tools:

1. Read this root file before making project-level changes.
2. Read the more specific `backend/AGENTS.md` or `frontend/AGENTS.md` when working inside those directories.
3. Inspect existing code before creating new architecture.
4. Do not invent product requirements.
5. Do not implement future features without approval.
6. Reuse existing abstractions where appropriate.
7. Avoid unnecessary dependencies.
8. Keep business logic separate from presentation.
9. Keep AI logic separate from core application state.
10. Prefer small, reviewable changes.
11. Do not silently change API contracts.
12. Handle errors and failure states.
13. Preserve security and data integrity.
14. Test important state-changing behavior.

---

## 11. Git Strategy

Use:

```text
main
  ↓
develop
  ↓
feature/*
```

Examples:

```text
feature/frontend-listing
feature/backend-listing
feature/backend-offers
feature/ai-market-agent
feature/ai-negotiation
```

Do not commit directly to `main`.

Avoid modifying another member's ownership area unless coordinated.

---

## 12. Current Priority

Everything should support this flow:

```text
Create Listing
      ↓
Discover Listing
      ↓
Make Offer
      ↓
Evaluate Offer
      ↓
Negotiate
      ↓
Farmer Approval
      ↓
Create Deal
```

The goal is to make this flow simple, trustworthy, explainable, maintainable, and reliable.
