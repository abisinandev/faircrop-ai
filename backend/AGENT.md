# FairCrop AI — Backend Instructions

**Stack:**

```text
Python
FastAPI
PostgreSQL
SQLAlchemy
Pydantic
```

The backend is the **source of truth** for application state and business rules.

---

## 2. Backend Responsibilities

The backend owns:

- Authentication
- Authorization
- Users
- Farmers
- Buyers
- Crop listings
- Offers
- Negotiations
- Negotiation history
- Farmer approvals
- Deals
- Database integrity
- Business rules
- AI integration boundary

The backend does not own the internal reasoning implementation of the AI agents.

---

## 3. Core Flow

```text
Farmer
   ↓
Create Listing
   ↓
Buyer Discovers Listing
   ↓
Buyer Makes Offer
   ↓
AI Evaluates
   ↓
AI Negotiates
   ↓
Farmer Approves
   ↓
Deal Created
```

---

## 4. Recommended Architecture

Use a modular FastAPI architecture.

```text
backend/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── listings/
│   │   ├── offers/
│   │   ├── negotiations/
│   │   └── deals/
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   │
│   ├── models/
│   ├── schemas/
│   ├── repositories/
│   ├── services/
│   ├── ai/
│   │   └── client/
│   └── main.py
│
└── tests/
```

This is a guideline, not a requirement to blindly follow if the existing project has a better structure.

---

## 5. Layer Responsibilities

Use a clear separation:

```text
Router / API
     ↓
Service / Use Case
     ↓
Repository
     ↓
PostgreSQL
```

AI integration:

```text
Service
   ↓
AI Interface / Client
   ↓
Agentic AI
```

### Router

Responsible for:
- HTTP concerns
- Request parsing
- Authentication dependencies
- Calling services
- Returning responses

Do not put large business rules in route handlers.

### Service

Responsible for:
- Business rules
- Use-case orchestration
- State transitions
- Calling repositories
- Calling AI interfaces

### Repository

Responsible for:
- Database queries
- Persistence
- Data retrieval

Do not put business rules in repositories.

---

## 6. Database

Use:

```text
PostgreSQL
```

with SQLAlchemy.

Core entities:

```text
User
Listing
Offer
Negotiation
NegotiationRound
AIRecommendation
Deal
```

Use relationships, foreign keys, constraints, indexes, and transactions appropriately.

---

## 7. User and Role Model

Current roles:

```text
FARMER
BUYER
ADMIN
```

The current core flow primarily requires:

```text
FARMER
BUYER
```

Authorization must be enforced by the backend.

Never rely on frontend checks for security.

---

## 8. Listing

Conceptual model:

```text
Listing
├── id
├── farmer_id
├── crop
├── variety
├── quantity
├── remaining_quantity
├── unit
├── asking_price
├── minimum_price
├── location
├── harvest_date
├── quality
└── status
```

Possible statuses:

```text
ACTIVE
CLOSED
EXPIRED
SOLD
```

Do not add unnecessary states without a real requirement.

---

## 9. Offer

Conceptual model:

```text
Offer
├── id
├── listing_id
├── buyer_id
├── quantity
├── price_per_unit
├── status
├── created_at
└── expires_at
```

Validate:

- Buyer is authorized
- Listing exists
- Listing is active
- Quantity is available
- Price is valid
- Offer state is valid
- Buyer cannot make invalid self-offers

---

## 10. Negotiation

Conceptual model:

```text
Negotiation
├── id
├── listing_id
├── offer_id
├── farmer_id
├── buyer_id
├── current_price
├── current_quantity
├── status
└── rounds
```

Preserve negotiation history.

Do not overwrite previous offers/counter-offers.

---

## 11. State Machine

Use explicit state transitions.

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

Do not expose generic endpoints that allow arbitrary state changes.

Reject invalid transitions.

---

## 12. AI Integration

The backend treats AI as an intelligence component.

```text
FastAPI
   ↓
AI Interface
   ↓
Fuvad's Agentic AI
   ↓
Structured Result
   ↓
FastAPI Validation
   ↓
PostgreSQL
```

Keep the business layer independent from a specific LLM provider.

Prefer an abstraction such as:

```text
NegotiationAI
    ↓
evaluate_offer(...)
    ↓
negotiate(...)
```

The exact implementation can evolve.

---

## 13. AI Request

Backend should send structured context.

Potential input:

```text
Listing information
Farmer preferences
Buyer offer
Market context
Negotiation history
Relevant buyer context
```

Send only information required by the AI.

Do not expose unnecessary private data.

---

## 14. AI Response

AI must return structured data.

Example:

```json
{
  "decision": "NEGOTIATE",
  "counter_price": 48,
  "counter_quantity": 500,
  "reason": "The offer is below the farmer's minimum and current market range."
}
```

Possible decisions:

```text
ACCEPT_RECOMMENDATION
NEGOTIATE
REJECT_RECOMMENDATION
```

Backend must validate:

- Decision
- Price
- Quantity
- Current negotiation state
- Business constraints
- Required explanation

Never trust raw LLM output.

---

## 15. AI Autonomy

Current product flow:

```text
Buyer Offer
     ↓
AI Evaluation
     ↓
AI Negotiation
     ↓
Farmer Approval
     ↓
Deal
```

Do not automatically create a deal from an AI response.

The backend must enforce:

```text
AI recommendation
        ↓
Farmer approval
        ↓
Deal creation
```

---

## 16. Farmer Approval

Approval must:

1. Authenticate the farmer.
2. Verify ownership.
3. Verify negotiation state.
4. Verify current outcome.
5. Apply approval.
6. Create/update the deal transactionally.
7. Prevent duplicate deals.

---

## 17. Deal

Current model:

```text
Deal
├── id
├── listing_id
├── negotiation_id
├── farmer_id
├── buyer_id
├── quantity
├── agreed_price
└── status
```

Deal creation occurs only after required farmer approval.

Do not add payment or settlement logic yet.

---

## 18. API Design

Use:

```text
/api/v1/
```

Conceptual endpoints:

### Listings

```text
POST   /listings
GET    /listings
GET    /listings/{id}
PATCH  /listings/{id}
```

### Offers

```text
POST   /offers
GET    /offers/{id}
```

### Negotiations

```text
GET    /negotiations/{id}
POST   /negotiations/{id}/actions
```

### Farmer Approval

```text
POST /negotiations/{id}/approve
POST /negotiations/{id}/reject
```

### Deals

```text
GET /deals/{id}
```

Exact contracts must be agreed with the frontend owner.

---

## 19. Validation

Use Pydantic:

```text
HTTP Input
   ↓
Pydantic Validation
   ↓
Service Business Rules
   ↓
Database Constraints
```

Never depend only on frontend validation.

---

## 20. Error Handling

Use consistent errors.

Examples:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Validation Error
500 Internal Server Error
```

Use `409 Conflict` for:

- Insufficient remaining quantity
- Closed negotiation
- Duplicate deal
- Invalid state transition

Never expose internal stack traces.

---

## 21. Transactions and Concurrency

Pay special attention to:

```text
Offer → Negotiation
Negotiation → Approval
Approval → Deal
Listing quantity → Deal
```

Prevent race conditions where multiple buyers attempt to consume the same remaining quantity.

Use PostgreSQL transactions and appropriate locking/constraints.

---

## 22. Testing

Test at least:

### Listings
- Create listing
- Invalid listing
- Update listing
- Close listing

### Offers
- Valid offer
- Invalid quantity
- Invalid listing
- Unauthorized buyer

### Negotiations
- Create negotiation
- AI evaluation
- Counter-offer
- Invalid transition
- Expired negotiation

### Approval
- Authorized approval
- Unauthorized approval
- Duplicate approval
- Expired approval

### Deals
- Correct deal creation
- Duplicate deal prevention
- Quantity consistency
- Correct agreed price

---

## 23. AI Coding Tool Rules

When using an AI coding tool:

1. Read the root `AGENTS.md`.
2. Read this backend `AGENTS.md`.
3. Inspect existing code before changing architecture.
4. Do not invent requirements.
5. Do not rewrite unrelated code.
6. Do not silently change API contracts.
7. Do not trust AI output without validation.
8. Keep business logic in services/use cases.
9. Keep database access in repositories.
10. Use Pydantic validation.
11. Use transactions where required.
12. Add tests for important state changes.
13. Avoid unnecessary dependencies.
14. Keep changes focused.
15. Do not modify frontend or AI implementation unless explicitly requested.

---

## 24. Backend Definition of Done

A backend feature is complete when:

- [ ] API contract is defined
- [ ] Request validation exists
- [ ] Authorization is enforced
- [ ] Business rules are implemented
- [ ] Database persistence works
- [ ] Transactions are used where needed
- [ ] Errors are handled
- [ ] Important paths are tested
- [ ] AI output is validated where applicable
- [ ] No unrelated files were changed
- [ ] API documentation is accurate

---

## 25. Backend Priority

Implement in this order:

```text
Database + Domain Models
        ↓
Authentication / Roles
        ↓
Listings
        ↓
Offers
        ↓
Negotiation Persistence
        ↓
AI Integration
        ↓
Farmer Approval
        ↓
Deal Creation
        ↓
End-to-End Testing
```
