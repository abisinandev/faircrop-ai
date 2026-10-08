# FairCrop AI — Information Architecture

> **Phase 3 Document** | Status: Complete
>
> This document defines the product's information architecture, navigation, user journeys, screen responsibilities, and lifecycle states. It is the authoritative reference before building application pages.

---

## Requirement Classification

Throughout this document, requirements are marked:

| Tag | Meaning |
|-----|---------|
| `CONFIRMED` | Explicitly established by the project |
| `PROPOSED` | Useful but not yet confirmed |
| `NEEDS CONFIRMATION` | Affects product behavior — must be decided |

---

## 1. User Roles

### Farmer `CONFIRMED`
**Mental model:** *"I have crops. I want to sell them. FairCrop helps me reach buyers and negotiate."*

- Creates crop listings
- Receives offers from buyers
- Reviews AI recommendations
- Approves or participates in negotiation actions
- Tracks deals
- Manages profile

**UX requirements:** Simple, guided, action-oriented. Low cognitive load. Farmer may have limited technical experience.

---

### Buyer `CONFIRMED`
**Mental model:** *"I need agricultural produce. I want to find suitable supply, make an offer, negotiate, and complete the deal."*

- Discovers and filters crop listings
- Makes offers on listings
- Negotiates
- Tracks offers and deals
- Manages profile

**UX requirements:** Optimized for discovery, comparison, speed, and negotiation efficiency. Higher information density acceptable.

---

### Admin `CONFIRMED`
**Mental model:** *"I manage the platform — users, listings, verification, and deal integrity."*

- Manages user accounts and verification
- Moderates listings
- Oversees negotiations and deals
- Handles reports and analytics

**UX requirements:** Information-dense. Operator-focused. Does NOT share farmer UX patterns.

---

## 2. Sitemap

```
faircrop.ai/
|
+-- (public)
|   +-- /                           -> Landing/home
|   +-- /how-it-works               -> Product explainer
|
+-- (auth)
|   +-- /login                      -> Login (all roles)
|   +-- /register                   -> Registration (role select)
|   +-- /register/farmer            -> Farmer registration
|   +-- /register/buyer             -> Buyer registration
|   +-- /verify-otp                 -> OTP verification
|   +-- /forgot-password            -> Password reset request
|   +-- /reset-password             -> Password reset
|
+-- (farmer)
|   +-- /farmer/dashboard           -> Farmer home
|   +-- /farmer/listings            -> All listings
|   +-- /farmer/listings/new        -> Create listing
|   +-- /farmer/listings/[id]       -> Listing details
|   +-- /farmer/listings/[id]/edit  -> Edit listing
|   +-- /farmer/offers              -> All received offers
|   +-- /farmer/offers/[id]         -> Offer details
|   +-- /farmer/negotiations        -> All negotiations
|   +-- /farmer/negotiations/[id]   -> Negotiation thread
|   +-- /farmer/deals               -> All deals
|   +-- /farmer/deals/[id]          -> Deal details
|   +-- /farmer/notifications       -> Notifications
|   +-- /farmer/profile             -> Profile & settings
|
+-- (buyer)
|   +-- /buyer/marketplace          -> Crop discovery
|   +-- /buyer/listings/[id]        -> Listing detail (buyer view)
|   +-- /buyer/offers               -> All submitted offers
|   +-- /buyer/offers/[id]          -> Offer detail
|   +-- /buyer/negotiations         -> All negotiations
|   +-- /buyer/negotiations/[id]    -> Negotiation thread
|   +-- /buyer/deals                -> All deals
|   +-- /buyer/deals/[id]           -> Deal details
|   +-- /buyer/notifications        -> Notifications
|   +-- /buyer/profile              -> Profile & settings
|
+-- (admin)
|   +-- /admin/overview             -> Platform overview
|   +-- /admin/users                -> User management
|   +-- /admin/users/[id]           -> User detail
|   +-- /admin/listings             -> All listings
|   +-- /admin/listings/[id]        -> Listing detail
|   +-- /admin/offers               -> All offers
|   +-- /admin/negotiations         -> All negotiations
|   +-- /admin/deals                -> All deals
|   +-- /admin/reports              -> Reports
|   +-- /admin/settings             -> Platform settings
|
+-- (error)
    +-- /not-found                  -> 404
    +-- /unauthorized               -> 401
    +-- /forbidden                  -> 403
```

---

## 3. Next.js App Router Route Architecture

```
src/app/
|
+-- layout.tsx                          <- Root layout (font, tooltip provider)
+-- page.tsx                            <- Redirects based on auth state
+-- not-found.tsx
|
+-- (public)/
|   +-- layout.tsx                      <- Marketing nav + footer
|   +-- page.tsx                        <- Landing page
|   +-- how-it-works/
|       +-- page.tsx
|
+-- (auth)/
|   +-- layout.tsx                      <- Centered card, no app nav
|   +-- login/page.tsx
|   +-- register/
|   |   +-- page.tsx                    <- Role selection
|   |   +-- farmer/page.tsx
|   |   +-- buyer/page.tsx
|   +-- verify-otp/page.tsx
|   +-- forgot-password/page.tsx
|   +-- reset-password/page.tsx
|
+-- (farmer)/
|   +-- layout.tsx                      <- Sidebar nav
|   +-- farmer/
|       +-- dashboard/page.tsx
|       +-- listings/
|       |   +-- page.tsx
|       |   +-- new/page.tsx
|       |   +-- [listingId]/
|       |       +-- page.tsx
|       |       +-- edit/page.tsx
|       +-- offers/
|       |   +-- page.tsx
|       |   +-- [offerId]/page.tsx
|       +-- negotiations/
|       |   +-- page.tsx
|       |   +-- [negotiationId]/page.tsx
|       +-- deals/
|       |   +-- page.tsx
|       |   +-- [dealId]/page.tsx
|       +-- notifications/page.tsx
|       +-- profile/page.tsx
|
+-- (buyer)/
|   +-- layout.tsx                      <- Top nav + sidebar
|   +-- buyer/
|       +-- marketplace/page.tsx
|       +-- listings/[listingId]/page.tsx
|       +-- offers/
|       |   +-- page.tsx
|       |   +-- [offerId]/page.tsx
|       +-- negotiations/
|       |   +-- page.tsx
|       |   +-- [negotiationId]/page.tsx
|       +-- deals/
|       |   +-- page.tsx
|       |   +-- [dealId]/page.tsx
|       +-- notifications/page.tsx
|       +-- profile/page.tsx
|
+-- (admin)/
    +-- layout.tsx                      <- Dense sidebar
    +-- admin/
        +-- overview/page.tsx
        +-- users/
        |   +-- page.tsx
        |   +-- [userId]/page.tsx
        +-- listings/
        |   +-- page.tsx
        |   +-- [listingId]/page.tsx
        +-- offers/page.tsx
        +-- negotiations/page.tsx
        +-- deals/page.tsx
        +-- reports/page.tsx
        +-- settings/page.tsx
```

> **Note:** Route groups `(farmer)`, `(buyer)`, `(admin)` are invisible in the URL. Actual paths are `/farmer/...`, `/buyer/...`, `/admin/...`.

---

## 4. Navigation Architecture

### 4.1 Farmer Navigation `CONFIRMED`

**Primary (sidebar, desktop):**

```
FairCrop

Dashboard
Listings         [3]   <- badge: active listing count
Offers           [2]   <- badge: pending offers
Negotiations     [1]   <- badge: active
Deals
Notifications    [5]   <- badge: unread

----------------
Profile
```

**Mobile:** Collapsible sidebar via hamburger. Critical badges visible in top bar.

**Key principle:** Always show what needs attention via numeric badges. Navigation should be predictable and minimal.

---

### 4.2 Buyer Navigation `CONFIRMED`

**Primary (top bar + sidebar, desktop):**

```
[FairCrop]  [Search crops...]                [Notifications]  [Profile]

Sidebar:
Marketplace      <- Primary entry point (prominent)
My Offers   [1]
Negotiations
Deals

----------------
Profile
```

**Mobile:** Top search bar. Sidebar via hamburger.

**Key principle:** Marketplace/discovery is always the primary entry point for buyers.

---

### 4.3 Admin Navigation `CONFIRMED`

**Primary (dense sidebar, desktop):**

```
FairCrop Admin

Overview
---------
Users
Listings
Offers
Negotiations
Deals
---------
Reports
Settings
```

**Mobile:** `PROPOSED` — Responsive layout required, but admin is primarily a desktop tool.

---

## 5. Farmer Core Journey

```
Dashboard
    |
    v
Create Listing
    |
    v
Enter: crop name, variety, quantity, unit
    |
    v
Set: asking price, minimum acceptable price (private)
    |
    v
Set: harvest date, location
    |
    v
Preview & Publish
    |
    v
Listing Active (visible to buyers)
    |
    v
Buyer makes offer
    |
    v
Notification: "New offer received"
    |
    v
AI evaluates offer vs market + farmer minimum
    |
    v
Farmer reviews recommendation
(offer price / market range / minimum / recommended counter / reason)
    |
    v
Farmer decides:
  [Accept] -> Deal Confirmed
  [Counter] -> Counter sent to Buyer -> Negotiation continues
  [Reject]  -> Offer Rejected
```

### Step details

| Step | Goal | Primary Action | Failure |
|------|------|----------------|---------|
| Dashboard | See what needs attention | Go to listing or offer | Data error -> retry |
| Create Listing | Add crop to marketplace | Publish / Save Draft | Validation error -> inline message |
| Crop Info | Describe produce | Next | Missing field -> highlight |
| Set Price | Set financial terms | Next | Invalid price -> message |
| Publish | Confirm listing | Publish | Network error -> retry |
| Offer Received | Understand offer | Review Offer | — |
| Review Offer | Decide on offer | Accept / Counter / Reject | — |
| Negotiation | Track thread | Send counter / Accept | Timeout -> notification |
| Deal | Track outcome | View Details | — |

---

## 6. Buyer Core Journey

```
Marketplace
    |
    v
Search / Filter (crop type, location, price, quantity)
    |
    v
Listing Details
(name, quantity, price, location, harvest date, market range)
    |
    v
Choose quantity + set offer price
    |
    v
Submit Offer
    |
    v
Farmer reviews with AI recommendation
    |
    v
Farmer decides:
  [Accepted]  -> Deal Confirmed
  [Counter]   -> Buyer receives counter -> Buyer decides
  [Rejected]  -> Offer Rejected, can re-offer
```

### Step details

| Step | Goal | Primary Action | Failure |
|------|------|----------------|---------|
| Marketplace | Discover crops | Browse / Filter / View | No results -> empty state |
| Listing Detail | Evaluate crop | Make Offer | Listing expired -> explain |
| Make Offer | Submit offer | Submit | Validation / network error |
| Offer Tracking | Monitor status | View Negotiation | — |
| Counter Received | Review counter | Accept / Counter | — |
| Deal | Track outcome | View Details | — |

---

## 7. AI Negotiation Flow

```
Buyer submits offer
    |
    v
AI evaluates:
  - offer price vs market range (min/max)
  - offer price vs farmer's minimum (private, not shown to buyer)
    |
    v
AI generates recommendation:
  - If below market AND below minimum: recommend counter at market midpoint or minimum+
  - If within market range: may recommend accept or slight counter
  - Explanation always provided
    |
    v
Farmer sees:
  Buyer offered     X/kg
  Market range      Y-Z/kg
  Your minimum      W/kg
  Recommended       V/kg
  Reason            [plain text explanation]
    |
    v
Farmer action:
  [Counter at V/kg] <- AI suggested action
  [Enter own price] <- Manual override
  [Accept offer]    <- Accept as-is
    |
    v
Counter sent to Buyer
    |
    v
Buyer responds:
  [Accept counter]
  [Counter back]
  [Reject]
```

### NEEDS CONFIRMATION

- **Who can accept a final deal?** Current assumption: Farmer must confirm every acceptance. AI only recommends.
- **Can AI auto-accept** if offer meets farmer minimum + market range? Not confirmed.
- **Maximum negotiation rounds?** Round limit and what happens when reached.
- **Can farmer opt out of AI assistance** and negotiate manually without recommendations?

---

## 8. Listing Lifecycle

```
[Draft] --publish--> [Active] --offer negotiating--> [Negotiating]
                     [Active] --offer accepted-----> [Sold]
                     [Active] --time limit----------> [Expired]
                     [Active] --admin action---------> [Flagged]
                  [Negotiating] --rejected----------> [Active]
                  [Negotiating] --accepted----------> [Sold]
                    [Flagged] --cleared-------------> [Active]
                    [Flagged] --removed-------------> (removed)
```

| State | Farmer sees | Buyer sees | Available actions |
|-------|-------------|------------|-------------------|
| Draft | Unpublished draft | Not visible | Farmer: Publish / Delete |
| Active | Active listing | Visible in marketplace | Farmer: Edit / Deactivate; Buyer: Make Offer |
| Negotiating | Listing with active negotiation badge | Not available for new offers | Farmer: View negotiation |
| Sold | Deal confirmed notice | No longer available | Farmer: View deal |
| Expired | Listing expired | No longer available | Farmer: Renew / Archive |
| Flagged | Flagged warning | Not visible | Farmer: Contact support; Admin: Clear / Remove |

---

## 9. Offer Lifecycle

```
[Pending] --farmer counters-------> [Negotiating]
[Pending] --farmer accepts---------> [Accepted] -> Deal created
[Pending] --farmer rejects---------> [Rejected]
[Pending] --time limit-------------> [Expired]
[Pending] --buyer withdraws---------> [Cancelled]
[Negotiating] --agreement----------> [Accepted] -> Deal created
[Negotiating] --either party ends---> [Rejected]
[Negotiating] --time limit----------> [Expired]
[Negotiating] --buyer withdraws------> [Cancelled]
```

| State | Farmer experience | Buyer experience |
|-------|-------------------|-----------------|
| Pending | New offer notification; Review prompt | Waiting for response |
| Negotiating | Active thread with AI rec | Active thread |
| Accepted | Deal created | Deal created |
| Rejected | Declined | Rejected notification |
| Expired | Notice; can accept new offers | Can resubmit offer |
| Cancelled | Withdrawn notice | Confirmed withdrawal |

---

## 10. Negotiation Lifecycle

```
[Active] --farmer counters-------> [Waiting for Buyer]
[Active] --buyer counters---------> [Waiting for Farmer]
[Waiting for Buyer] --buyer responds--> [Waiting for Farmer]
[Waiting for Farmer] --farmer acts----> [Waiting for Buyer] or [Accepted] or [Rejected]
[Waiting for Buyer] --buyer accepts---> [Accepted]
[Waiting for Buyer] --buyer rejects---> [Rejected]
[Active/Waiting] --time/round limit---> [Expired]
```

### UI sub-states (derived, no extra backend state required)

| Sub-state | Farmer UI | Buyer UI |
|-----------|-----------|----------|
| Waiting for Buyer | "Waiting for buyer to respond" | CTA: Respond to counter |
| Farmer Action Required | CTA: Review offer + AI recommendation | "Awaiting farmer response" |
| AI Evaluating | "FairCrop is reviewing..." | "Awaiting farmer response" |

---

## 11. Deal Lifecycle `CONFIRMED`

```
[Confirmed] --both parties confirm--> [Completed]
[Confirmed] --dispute raised---------> [Disputed]
[Disputed] --admin resolves----------> [Completed]
[Disputed] --admin cancels-----------> (cancelled)
```

### PROPOSED (not confirmed)

```
Confirmed -> In Transit -> Delivered -> Completed
```
These require delivery/logistics tracking. **Not confirmed for this phase.**

### NEEDS CONFIRMATION

- What marks a deal as Completed? (Manual confirm / time-based / payment confirmation?)
- Is there a payment layer in scope?
- Are In Transit / Delivered states needed?
- How is a dispute resolved? Who has authority?

---

## 12. Notification Events `CONFIRMED`

### Farmer

| Event | Message | Destination |
|-------|---------|-------------|
| New offer received | "New offer from {Buyer} — {price}/kg for {qty} kg" | `/farmer/offers/[id]` |
| Buyer countered | "{Buyer} countered at {price}/kg" | `/farmer/negotiations/[id]` |
| Offer accepted | "Accepted at {price}/kg" | `/farmer/deals/[id]` |
| Buyer rejected counter | "{Buyer} declined your counter" | `/farmer/negotiations/[id]` |
| Negotiation expired | "Negotiation expired" | `/farmer/negotiations/[id]` |
| Listing expiring soon | "{Crop} listing expires in 48 hours" | `/farmer/listings/[id]` |
| Deal confirmed | "Deal confirmed with {Buyer}" | `/farmer/deals/[id]` |

### Buyer

| Event | Message | Destination |
|-------|---------|-------------|
| Farmer countered | "{Farmer/FairCrop} countered at {price}/kg" | `/buyer/negotiations/[id]` |
| Offer accepted | "Your offer was accepted" | `/buyer/deals/[id]` |
| Offer rejected | "Offer declined" | `/buyer/offers/[id]` |
| Negotiation expired | "Negotiation expired" | `/buyer/negotiations/[id]` |
| Deal confirmed | "Deal confirmed" | `/buyer/deals/[id]` |

### NEEDS CONFIRMATION

- Notification delivery channels: In-app only? Email? SMS? Push?

---

## 13. Loading States

| Context | Pattern |
|---------|---------|
| Marketplace crop list | Skeleton cards (4-6 cards) |
| Listing detail | Skeleton layout (header + body sections) |
| Offer submission | Button loading state (spinner in button, disabled) |
| AI evaluation | "FairCrop is reviewing the offer..." with subtle spinner |
| Negotiation thread | Skeleton message bubbles |
| Dashboard widgets | Per-widget skeleton, page structure loads immediately |
| Navigation badges | Badges load async; nav structure shows immediately |

**Rule:** Prefer skeleton loaders over full-page spinners. Never block the entire page for partial data.

---

## 14. Empty States

| Screen | Message | CTA |
|--------|---------|-----|
| Farmer: Listings | "You haven't listed any crops yet. Create your first listing to reach buyers." | Create Listing |
| Farmer: Offers | "No offers yet. Offers from buyers will appear here." | — |
| Farmer: Negotiations | "No active negotiations." | — |
| Farmer: Deals | "No deals yet. Accepted offers will appear here." | — |
| Buyer: Marketplace (filtered) | "No crops matching your filters." | Clear Filters |
| Buyer: Marketplace (empty) | "No crops are currently listed. Check back soon." | — |
| Buyer: Offers | "You haven't made any offers yet." | Browse Marketplace |
| Buyer: Negotiations | "No active negotiations." | — |
| Buyer: Deals | "No deals yet." | — |
| Notifications | "You are all caught up. No new notifications." | — |

---

## 15. Error States

| Scenario | Message | Action |
|----------|---------|--------|
| Unable to load listings | "Unable to load listings. Please try again." | Try Again |
| Listing not found / expired | "This listing is no longer available." | Browse Marketplace |
| Offer submission failed | "Unable to submit your offer. Please try again." | Try Again |
| Session expired | "Your session has expired. Please sign in again." | Sign In |
| Unauthorized | "You don't have permission to view this page." | Go Home |
| Forbidden | "Access denied." | Go Home |
| Negotiation connection lost | "Connection lost. Reconnecting..." | Auto-retry with visual indicator |
| AI recommendation unavailable | "Market information is currently unavailable. You can still respond to the offer." | Continue without rec |
| Offline | "You appear to be offline." | Retry on reconnect |

**Rule:** Every error explains (1) what happened and (2) what the user can do next.

---

## 16. Authentication Flow

### Screens `CONFIRMED`

| Screen | Route |
|--------|-------|
| Login | `/login` |
| Register (role select) | `/register` |
| Farmer registration | `/register/farmer` |
| Buyer registration | `/register/buyer` |
| OTP Verification | `/verify-otp` |
| Forgot Password | `/forgot-password` |
| Reset Password | `/reset-password` |

### Redirect rules

```
Unauthenticated -> /login
After login:
    Farmer -> /farmer/dashboard
    Buyer  -> /buyer/marketplace
    Admin  -> /admin/overview
```

### NEEDS CONFIRMATION

- Admin account provisioning: self-registration disabled?
- Buyer verification required before making offers?
- Farmer verification (land/farm) required?
- Social login (Google etc.): `PROPOSED`

---

## 17. Layout Decisions

### Farmer layout (desktop)
```
+-----sidebar-240px----+------content-max-1200px------+
|                      |                              |
|  FairCrop            |   [Page title]               |
|  ---------           |                              |
|  Dashboard           |   [Page content]             |
|  Listings  [3]       |                              |
|  Offers    [2]       |                              |
|  Negotiat. [1]       |                              |
|  Deals               |                              |
|  Notifs.   [5]       |                              |
|  --------            |                              |
|  Profile             |                              |
|                      |                              |
+----------------------+------------------------------+
```

### Farmer layout (mobile)
```
+-------------------------------------------+
|  [=]  FairCrop                    [bell]  |
+-------------------------------------------+
|                                           |
|   [Page content]  16px padding            |
|                                           |
+-------------------------------------------+
```

### Buyer layout (desktop)
```
+--topbar----------------------------------------------+
|  FairCrop  [Search crops...]     [bell]  [avatar]   |
+--sidebar-200px--+------content-max-1400px-----------+
|                 |                                   |
|  Marketplace    |   [Crop grid or list]             |
|  My Offers [1]  |                                   |
|  Negotiations   |                                   |
|  Deals          |                                   |
|                 |                                   |
+-----------------+-----------------------------------+
```

### Admin layout (desktop)
```
+--sidebar-220px--+------content-full-width-----------+
|                 |  [Page title]  [Admin actions]    |
|  Admin          +-----------------------------------+
|  -------        |                                   |
|  Overview       |   [Dense page content]            |
|  Users          |                                   |
|  Listings       |                                   |
|  ...            |                                   |
|  Reports        |                                   |
|  Settings       |                                   |
|                 |                                   |
+-----------------+-----------------------------------+
```

---

## 18. Confirmed Requirements Summary

| # | Requirement |
|---|-------------|
| 1 | Three user roles: Farmer, Buyer, Admin |
| 2 | Farmer creates listings: name, variety, quantity, unit, price, min price, harvest date, location |
| 3 | Buyer discovers listings in marketplace |
| 4 | Buyer makes offers: price per unit + quantity |
| 5 | AI generates recommendations with explanation (offer / market / minimum / recommended / reason) |
| 6 | Farmer reviews AI recommendation before acting |
| 7 | Negotiation is a multi-round offer/counter thread |
| 8 | Listing lifecycle: Draft -> Active -> Negotiating -> Sold / Expired |
| 9 | Offer lifecycle: Pending -> Negotiating -> Accepted / Rejected / Expired / Cancelled |
| 10 | Deal created on accepted offer |
| 11 | In-app notifications for key events |
| 12 | Farmer must confirm all acceptances — AI does not auto-accept |
| 13 | Product is a responsive web application, not a native mobile app |
| 14 | Design system: Manrope font, FairCrop green palette, Phase 1 tokens |

---

## 19. NEEDS CONFIRMATION

| # | Question | Why it matters |
|---|----------|----------------|
| 1 | Can AI auto-accept a deal if offer meets farmer minimum + market range? | Core negotiation authority |
| 2 | Maximum negotiation round limit and what happens at limit? | Negotiation expiry UX |
| 3 | Can farmer disable AI recommendations and negotiate manually? | UX path branching |
| 4 | Notification delivery channels (in-app / email / SMS / push)? | Notification architecture |
| 5 | Is buyer business verification required before making offers? | Offer flow + buyer registration |
| 6 | Is farmer verification required? | Farmer registration |
| 7 | How is a deal marked Completed? | Deal lifecycle |
| 8 | Are In Transit / Delivered deal states needed? | Deal UI states |
| 9 | Is payment processing in scope? | Entire payment layer |
| 10 | Is delivery/logistics coordination in scope? | Post-deal flow |
| 11 | How are admin accounts provisioned? | Auth + admin setup |
| 12 | Is there a dispute resolution workflow? | Deal lifecycle + admin |
| 13 | What is the listing expiry period? | Listing notifications |
| 14 | Can a listing have multiple simultaneous offers from different buyers? | Offer + listing logic |
| 15 | Can a buyer make multiple simultaneous offers on different listings? | Buyer offer management |

---

## 20. PROPOSED Features (Not Confirmed)

| Feature | Why useful |
|---------|-----------|
| SMS / push notifications | Farmers may have limited email access |
| Social login (Google) | Reduces friction |
| Historical market price chart | Helps both parties understand trends |
| Reputation / rating system | Builds trust |
| In-app messaging beyond negotiation | General buyer-farmer contact |
| Wishlist / saved listings | Supports buyer discovery |
| Bulk listing for farmers | Efficiency for large farms |
| Delivery coordination | Post-deal logistics |
| Payment gateway | Direct settlement |
| Farmer analytics (offer history, price trends) | Farmer empowerment |

---

## 21. Component-to-Screen Mapping

| Component | Screens |
|-----------|---------|
| `CropCard` | Marketplace, Farmer listings list |
| `OfferCard` | Farmer offers list, Buyer offers list |
| `AIRecommendation` | Farmer offer detail, Negotiation view |
| `NegotiationMessage` | Negotiation thread (both roles) |
| `NegotiationSummary` | Negotiation sidebar / header |
| `DealStatus` | Deal detail (both roles) |
| `ListingSummary` | Offer detail, Negotiation context, Deal context |
| `MarketPriceRange` | Listing detail, Offer review, AI recommendation |
| `PriceDisplay` | Cards, summaries, deal detail |
| `StatusBadge` | All list views |
| `VerificationBadge` | Offer card, Buyer profile |
| `LocationDisplay` | Crop card, Listing detail |
| `QuantityDisplay` | Crop card, Offer card, Deal detail |

---

*Document version: Phase 3 | Last updated: 2026-10-02*
