# FairCrop AI — Frontend Instructions


**Stack:**

```text
Next.js
TypeScript
Tailwind CSS
```

FairCrop is a responsive web application.

---

## 2. Frontend Goal

The frontend should make FairCrop simple, trustworthy, and action-oriented.

Users should always understand:

1. Where they are
2. Why they are there
3. What matters
4. What action to take
5. What happens after the action
6. What happens if the action fails

Farmer UX has the highest accessibility priority.

---

## 3. Core Flow

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

---

## 4. Architecture

Recommended conceptual structure:

```text
frontend/
│
├── app/
│   ├── (public)/
│   ├── farmer/
│   ├── buyer/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── farmer/
│   ├── buyer/
│   ├── listings/
│   ├── offers/
│   └── negotiations/
│
├── features/
│   ├── listings/
│   ├── offers/
│   ├── negotiations/
│   └── deals/
│
├── lib/
│   ├── api/
│   └── utils/
│
├── types/
└── ...
```

Do not blindly follow this structure if the existing codebase has a better established pattern.

---

## 5. Next.js Rules

Prefer Server Components by default.

Use Client Components only where interactivity or browser APIs require them.

Good Client Component use cases:

- Forms
- Interactive filters
- Negotiation actions
- Real-time UI
- Browser APIs
- Local interactive state

Do not add `"use client"` unnecessarily to large component trees.

---

## 6. API Layer

Do not scatter raw API calls across UI components.

Prefer:

```text
UI
 ↓
Feature logic
 ↓
API service
 ↓
FastAPI
```

Conceptual:

```text
lib/api/
├── listings.ts
├── offers.ts
├── negotiations.ts
└── deals.ts
```

Use the existing project structure if it already has an established equivalent.

---

## 7. API Contract

The backend contract is the source of truth.

Do not invent response fields.

If backend returns:

```json
{
  "id": "offer_123",
  "status": "NEGOTIATING",
  "price_per_unit": 48
}
```

do not assume fields such as `offerStatus` unless a deliberate frontend transformation exists.

Coordinate API changes with Najath.

---

## 8. TypeScript

Use strong typing.

Avoid:

```ts
any
```

unless there is a justified reason.

Prefer explicit types:

```ts
type ListingStatus =
  | "ACTIVE"
  | "CLOSED"
  | "EXPIRED";
```

Avoid duplicating domain types unnecessarily.

---

## 9. Farmer Experience

Farmers may have limited technical experience.

Prioritize:

- Simple language
- Clear labels
- Large understandable actions
- Strong hierarchy
- Minimal unnecessary information
- Clear price explanations
- Clear negotiation status
- Clear next action
- Malayalam + English readiness
- Mobile browser usability

The interface should not require understanding of AI terminology.

---

## 10. Buyer Experience

Buyer UX should prioritize:

- Fast crop discovery
- Search
- Filters
- Listing details
- Quantity
- Location
- Price
- Quality
- Offer creation
- Negotiation status

The buyer should quickly understand:

```text
What is available?
How much?
Where?
At what asking price?
Can I make an offer?
What is happening with my offer?
```

---

## 11. AI UX

Do not expose implementation terminology such as:

```text
LangChain
LangGraph
LLM
Agent state
Prompt
Model inference
```

unless specifically required.

Use understandable outcome-oriented language:

```text
FairCrop recommendation
Market range
Buyer offer
Suggested counter-offer
Why FairCrop recommends this
```

Example:

```text
FairCrop recommends negotiating at ₹48/kg.

Why?
• Current market range: ₹48–₹55/kg
• Farmer minimum: ₹46/kg
• Buyer offer: ₹42/kg
```

Never claim:

> This is the highest price you can get.

Prefer:

> This offer is below the current market range.

---

## 12. Negotiation UI

Clearly distinguish:

```text
Buyer Offer
AI Recommendation
AI Counter Offer
Farmer Decision
Final Agreed Offer
```

Do not visually present an AI recommendation as a confirmed deal.

Current sequence:

```text
AI Recommendation
        ↓
Farmer Approval
        ↓
Final Deal
```

---

## 13. Farmer Approval

The UI can submit an approval action.

The frontend must not decide whether a deal is legally or logically allowed.

Correct:

```text
Farmer clicks Approve
        ↓
FastAPI
        ↓
Validate business rules
        ↓
Create Deal
```

Do not implement:

```ts
if (offer.price >= minimumPrice) {
    createDeal();
}
```

as the final business decision in the frontend.

---

## 14. UI States

Every important flow should handle:

### Loading

```text
Loading listings...
```

### Empty

```text
No active listings found.
```

### Error

```text
We couldn't load the listings.
Try again.
```

### Expired

```text
This offer has expired.
```

### Success

```text
Your listing was created successfully.
```

### Offline / disconnected

Provide a clear recovery action when relevant.

---

## 15. Accessibility

Prioritize:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper form labels
- Useful error messages
- Sufficient contrast
- Touch-friendly controls
- Clear status messages
- Screen-reader-friendly structure

Do not use color alone to communicate status.

---

## 16. Responsive Design

Support:

```text
Mobile browser
Tablet
Laptop
Desktop
```

Do not simply shrink a desktop design for mobile.

Important farmer actions must remain easy on small screens.

---

## 17. Visual Design

FairCrop should feel like a trustworthy agricultural marketplace, not a generic AI SaaS application.

Avoid:

- Generic AI gradients
- Excessive glassmorphism
- Decorative AI robots
- Excessive animation
- Excessive cards
- Repeated "AI-powered" labels
- Generic dashboard patterns

Prefer:

- Clarity
- Trust
- Practicality
- Agricultural context
- Strong hierarchy
- Purposeful whitespace
- Professional visual design
- Clear actions

---

## 18. Frontend Business Logic Boundary

Do not duplicate backend business rules in UI code.

Frontend is responsible for:

```text
Presentation
Interaction
User input
Client-side validation
API communication
UI state
```

Backend is responsible for:

```text
Authorization
Business rules
Data integrity
State transitions
Deal creation
```

---

## 19. AI Boundary

Frontend must not directly call:

```text
LangChain
LangGraph
LLM APIs
AI agent tools
```

Correct architecture:

```text
Next.js
   ↓
FastAPI
   ↓
Agentic AI
   ↓
FastAPI
   ↓
Next.js
```

---

## 20. AI Coding Tool Rules

When using an AI coding tool:

1. Read the root `AGENTS.md`.
2. Read this frontend `AGENTS.md`.
3. Inspect existing components before creating new ones.
4. Reuse existing UI components.
5. Do not rewrite unrelated code.
6. Do not introduce a new state-management library without approval.
7. Do not invent API contracts.
8. Keep business logic out of presentation components.
9. Preserve accessibility.
10. Handle loading/error/empty states.
11. Keep responsive behavior in mind.
12. Avoid unnecessary dependencies.
13. Do not modify backend or AI implementation unless explicitly requested.
14. Keep changes small and reviewable.

Before large changes, ask the AI tool to explain the proposed implementation if the change affects architecture.

---

## 21. Frontend Definition of Done

A feature is complete when:

- [ ] UI works at intended screen sizes
- [ ] API integration is correct
- [ ] Loading state exists
- [ ] Error state exists
- [ ] Empty state exists where applicable
- [ ] User feedback exists
- [ ] Accessibility is considered
- [ ] TypeScript has no avoidable errors
- [ ] Client components are intentional
- [ ] Existing components are reused where appropriate
- [ ] No unrelated changes were introduced
- [ ] Core user flow remains understandable

---

## 22. Frontend Priority

Build only what is required for:

```text
Create Listing
      ↓
Discover Listing
      ↓
Make Offer
      ↓
View AI Evaluation
      ↓
View Negotiation
      ↓
Approve Outcome
      ↓
View Deal
```
