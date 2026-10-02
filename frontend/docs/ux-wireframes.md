# FairCrop AI — UX Wireframes & Screen Architecture

> **Phase 4 Document**
>
> Defines the structure, information hierarchy, interaction design, and responsive behavior for every FairCrop screen. This is NOT final visual design. Colors, shadows, and decoration follow the Phase 1 design system. This document answers: *what*, *where*, *why*, and *what next*.

---

## Specification Format

Every screen uses this structure:

```
Screen:         Name
Route:          URL path
User:           Farmer | Buyer | Admin
Purpose:        One-sentence reason this screen exists
Primary goal:   What the user wants to accomplish
Primary action: The single most important action
Secondary:      Other available actions
Info hierarchy: Ordered list of what to show and why
Layout:         Desktop structure
Responsive:     Tablet and mobile behavior
States:         Loading / Empty / Error / Success
Permissions:    Who can access
Next:           Where the user goes after the primary action
```

---

---

# PART 1 — FARMER EXPERIENCE

---

## F-01 — Farmer Dashboard

```
Screen:         Farmer Dashboard
Route:          /farmer/dashboard
User:           Farmer
Purpose:        Surface what requires attention and give a quick overview of crop activity
Primary goal:   Understand what is happening and decide what to do next
Primary action: Respond to the highest-priority item requiring attention
Secondary:      Create new listing
```

### Information hierarchy (desktop)

Priority 1 — **Attention required** (always shown at the top, only if there is something to act on)

```
┌─────────────────────────────────────────────────────────────────┐
│  Good morning, Rajan                        [ Create Listing ]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Needs your attention                                           │
│  ──────────────────────────────────────────                     │
│                                                                 │
│  New offer                                                      │
│  Green Valley Foods offered ₹46/kg for 300 kg of Tomato         │
│  [ Review Offer ]                                               │
│                                                                 │
│  Negotiation update                                             │
│  Buyer responded to your counter — ₹49/kg for Banana            │
│  [ View Negotiation ]                                           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Summary                                                        │
│  ──────────────────────────────────────────                     │
│                                                                 │
│  3 Active listings                                              │
│  2 Pending offers                                               │
│  1 Active negotiation                                           │
│  0 Confirmed deals                                              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Your listings                                                  │
│  ──────────────────────────────────────────                     │
│                                                                 │
│  Tomato · 500 kg · ₹52/kg · Malappuram    [Active]  [ View ]   │
│  Banana · 200 kg · ₹35/kg · Thrissur      [Negotiating] [View] │
│  Coconut · 1000 · ₹18/kg · Kozhikode     [Active]  [ View ]   │
│                                                                 │
│                          [ View All Listings ]                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Design decisions

- **"Needs your attention" section** only renders if there are pending actions. Zero-state hides it entirely — no empty placeholder cards.
- **Summary row** is plain numbers, not decorated stat cards. Farmers need facts, not infographics.
- **Listing rows** are compact — crop name, quantity, price, status, one action. No overloading.
- Charts and analytics are **not shown** on the farmer dashboard. Priority is action, not data exploration.

### Responsive behavior

**Tablet:**
- Layout is single column
- "Needs your attention" stays at top
- Summary row wraps into 2×2 grid
- Listing rows become stacked

**Mobile:**
- Same priority order
- Summary numbers inline (e.g., "3 active · 2 offers · 1 negotiation")
- "Create Listing" becomes a floating action button pinned to bottom-right

### States

| State | UI |
|-------|----|
| Loading | Skeleton: header + 2 attention cards + 3 listing rows |
| Empty (new farmer) | "You haven't added any listings yet." + large "Create Listing" CTA |
| No pending actions | "Needs your attention" section hidden entirely |
| Error loading data | "Unable to load your dashboard. Try again." + Retry button |

```
Permissions:    Authenticated farmer only
Next:           Review Offer → F-06 | View Negotiation → F-08 | View Listing → F-04
```

---

## F-02 — My Listings

```
Screen:         My Listings
Route:          /farmer/listings
User:           Farmer
Purpose:        Show all of the farmer's crop listings with their current status
Primary goal:   Find a specific listing or understand the status of all crops
Primary action: View listing details / Create new listing
Secondary:      Filter by status, search by crop name
```

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  My Listings                              [ + Create Listing ]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [All] [Active] [Negotiating] [Sold] [Expired] [Draft]          │
│                                                                 │
│  [ Search crops... ]                                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Crop          Qty        Price      Location    Status   Act.  │
│  ──────────────────────────────────────────────────────────     │
│  Tomato        500 kg     ₹52/kg     Malappuram  Active  [View] │
│  Banana        200 kg     ₹35/kg     Thrissur    Negot.  [View] │
│  Coconut      1,000 u     ₹18/unit   Kozhikode   Active  [View] │
│  Ginger        300 kg     ₹85/kg     Malappuram  Expired [View] │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Listing row information

Each row exposes:
- **Crop name** (most prominent)
- **Quantity + unit**
- **Asking price**
- **Location** (district)
- **Status badge**
- **Single action:** View

Offer count is shown inline only if offers exist (e.g., "2 offers" as a subtle label next to status).

### Responsive behavior

**Tablet:** Location column hidden. Status + action retained.

**Mobile:** Each listing becomes a compact card:
```
Tomato                          [Active]
500 kg · ₹52/kg · Malappuram
                                [View]
```

### States

| State | UI |
|-------|----|
| Loading | 4–5 skeleton rows |
| Empty (all) | "No listings yet. Create your first listing." + CTA |
| Empty (filtered) | "No [Active] listings." + "Clear filter" link |
| Error | "Unable to load listings. Try again." |

```
Permissions:    Authenticated farmer
Next:           Create Listing → F-03 | Row click → F-04
```

---

## F-03 — Create Listing

```
Screen:         Create Listing
Route:          /farmer/listings/new
User:           Farmer
Purpose:        Allow the farmer to add a new crop listing to the marketplace
Primary goal:   Describe and publish a crop listing
Primary action: Publish listing
Secondary:      Save as draft
```

### Form design decision

A **single-page progressive form** (not a multi-step wizard). Reasoning:
- Farmers can see the whole form at once and understand what's needed
- Wizards hide information and require extra navigation
- Steps can be visually grouped with clear section headers
- Save draft works naturally on a single form

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Listings                                             │
│  Create Listing                                                 │
├────────────────────────────┬────────────────────────────────────┤
│                            │                                    │
│  FORM                      │  PREVIEW + MARKET CONTEXT          │
│  ─────────                 │  ────────────────────────          │
│                            │                                    │
│  What are you selling?     │  Listing preview                   │
│  Crop *                    │  ─────────────                     │
│  [ Tomato              ▾ ] │  Tomato                            │
│                            │  Local variety                     │
│  Variety                   │  500 kg · ₹52/kg                   │
│  [ Local variety       ]   │  Malappuram, Kerala                │
│                            │                                    │
│  ─────────────────────     │  Market context                    │
│                            │  ─────────────                     │
│  How much do you have?     │  Current range for Tomato          │
│  Quantity *                │  ₹48–₹53/kg (Malappuram)          │
│  [ 500            ] kg ▾   │                                    │
│                            │  FairCrop suggestion               │
│  ─────────────────────     │  ₹51–₹53/kg                       │
│                            │                                    │
│  When is it available?     │  This is a suggestion only.        │
│  Harvest date *            │  You set the final price.          │
│  [ 12 Oct 2026        ]    │                                    │
│                            │                                    │
│  ─────────────────────     │                                    │
│                            │                                    │
│  Where is it located?      │                                    │
│  Location *                │                                    │
│  [ Malappuram, Kerala  ]   │                                    │
│                            │                                    │
│  ─────────────────────     │                                    │
│                            │                                    │
│  What price do you want?   │                                    │
│  Asking price *            │                                    │
│  ₹ [ 52          ] /kg     │                                    │
│                            │                                    │
│  Minimum acceptable (?)    │                                    │
│  ₹ [ 49          ] /kg     │                                    │
│  Private — buyers cannot   │                                    │
│  see your minimum price    │                                    │
│                            │                                    │
│  ─────────────────────     │                                    │
│                            │                                    │
│  Additional notes          │                                    │
│  [ Optional...        ]    │                                    │
│                            │                                    │
│  [ Save Draft ]  [ Publish Listing ]                            │
│                                                                 │
└────────────────────────────┴────────────────────────────────────┘
```

### AI pricing assistance

Market context panel on the right updates when the farmer enters:
- Crop name
- Location

It shows:
- Current market range for that crop + district
- FairCrop suggestion (range, not a fixed value)
- Clear disclaimer: "This is a suggestion only. You set the final price."

If market data is unavailable: panel shows "Market information not available for this crop/location."

### Minimum price field

- Tooltip explains: "Your minimum price is private. FairCrop uses it to evaluate offers on your behalf. Buyers cannot see this."
- Not mandatory but strongly recommended

### Responsive behavior

**Tablet:** Right preview panel collapses below the form.

**Mobile:** Single column. Preview panel removed. Market context shown as a small inline callout below the price field:
```
Current market: ₹48–₹53/kg
FairCrop suggests: ₹51–₹53/kg
```

### Validation

- Required: Crop, Quantity, Harvest date, Location, Asking price
- Inline validation on blur (not on every keystroke)
- Publish button disabled until required fields are complete
- Clear error text beneath each invalid field (not tooltip-only)

### States

| State | UI |
|-------|----|
| Loading market data | Skeleton in right panel |
| Market data unavailable | "Market information unavailable" notice |
| Submit loading | Publish button: spinner + "Publishing..." + disabled |
| Validation error | Inline field errors, scroll to first error |
| Success | Redirect to listing detail with "Listing published" toast |

```
Permissions:    Authenticated farmer
Next:           Success → F-04 (listing detail) | Draft → F-02 with draft visible
```

---

## F-04 — Listing Details

```
Screen:         Listing Details
Route:          /farmer/listings/[listingId]
User:           Farmer
Purpose:        Show full details of a single listing and its associated offers
Primary goal:   Understand listing status and offers; take action if needed
Primary action: Depends on state (see below)
```

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ← My Listings                                                  │
│                                                                 │
│  Tomato                                          [Active]       │
│  Local variety                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  500 kg available                                               │
│  ₹52/kg                                                         │
│  Malappuram, Kerala                                             │
│  Harvest: 12 Oct 2026                                           │
│                                                                 │
│  Market range: ₹48–₹53/kg                                       │
│                                                                 │
│  Notes: Harvested fresh. No pesticides used.                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Actions                                                        │
│  [ Edit Listing ]  [ Close Listing ]                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Offers  (2)                                                    │
│  ─────────────────────────────────────────────                  │
│                                                                 │
│  Green Valley Foods · ✓ Verified · ₹46/kg · 300 kg · Pending   │
│  [ Review Offer ]                                               │
│                                                                 │
│  Fresh Mart Ltd · ₹44/kg · 200 kg · Pending                     │
│  [ Review Offer ]                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### State-based actions

| Listing state | Primary actions shown |
|---------------|----------------------|
| Draft | Publish / Delete |
| Active | Edit / Close / (offers section if any) |
| Negotiating | View Negotiation (prominent) / Edit disabled |
| Sold | View Deal |
| Expired | Renew / Archive |
| Flagged | Contact Support |

### Responsive

**Mobile:** Vertical stack. Actions become full-width buttons. Offer rows become mini-cards.

### States

| State | UI |
|-------|----|
| Loading | Skeleton for all sections |
| No offers | "No offers yet. Your listing is visible to buyers." |
| Error | "Unable to load listing. Try again." |

```
Permissions:    Authenticated farmer, owner of listing
Next:           Review Offer → F-06 | View Negotiation → F-08 | Edit → F-03 (edit mode)
```

---

## F-05 — My Offers (List)

```
Screen:         My Offers
Route:          /farmer/offers
User:           Farmer
Purpose:        Show all offers received across all listings
Primary goal:   Identify offers that need a response
Primary action: Review highest-priority pending offer
Secondary:      Filter by status
```

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Offers                                                         │
├─────────────────────────────────────────────────────────────────┤
│  [All] [Pending] [Negotiating] [Accepted] [Rejected] [Expired]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ● NEW                                                          │
│  Green Valley Foods · ✓ Verified                                │
│  Tomato · 300 kg · ₹46/kg                                       │
│  Today 4:32 PM                          [Pending] [Review]      │
│                                                                 │
│  Fresh Mart Ltd                                                 │
│  Banana · 200 kg · ₹32/kg                                       │
│  Yesterday 11:15 AM                  [Negotiating] [View]       │
│                                                                 │
│  Kerala Organics                                                 │
│  Tomato · 150 kg · ₹51/kg                                       │
│  2 days ago                            [Accepted] [View Deal]   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Sorting

Default: Pending first, then by recency. Farmer does not need to manually sort.

### Responsive

**Mobile:** Each offer is a stacked card. The crop+buyer are prominent. Status and action are below.

### States

| State | UI |
|-------|----|
| Loading | 3 skeleton rows |
| Empty (all) | "No offers yet. When buyers make offers, they will appear here." |
| Empty (filtered) | "No [Pending] offers." + Clear filter |

```
Permissions:    Authenticated farmer
Next:           Review Offer → F-06
```

---

## F-06 — Offer Details

```
Screen:         Offer Details
Route:          /farmer/offers/[offerId]
User:           Farmer
Purpose:        Show full offer information and AI recommendation so farmer can decide
Primary goal:   Understand the offer and decide to accept, counter, or reject
Primary action: Counter at recommended price OR Accept OR Reject
```

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Offers                                                       │
│                                                                 │
│  Offer from Green Valley Foods                   [Pending]      │
│  ✓ Verified buyer                                               │
├────────────────────────────┬────────────────────────────────────┤
│                            │                                    │
│  OFFER DETAILS             │  FAIRCROP RECOMMENDATION           │
│  ─────────────             │  ────────────────────────          │
│                            │                                    │
│  Listing                   │  ✦ FairCrop recommendation         │
│  Tomato · Local variety    │                                    │
│  500 kg available          │  Buyer offered   ₹46/kg            │
│                            │  Market range    ₹48–₹53/kg        │
│  Offer                     │  Your minimum    ₹49/kg            │
│  300 kg at ₹46/kg          │  Suggested       ₹51/kg            │
│  Total ≈ ₹13,800           │                                    │
│                            │  Why?                              │
│  Submitted                 │  The offer is below the current    │
│  Today, 4:32 PM            │  market range and below your       │
│                            │  minimum price. Countering at      │
│  Buyer message             │  ₹51/kg is within the market       │
│  "Can you do ₹47/kg?       │  range and above your minimum.     │
│   We can pick up tmrw."    │                                    │
│                            │  [ Counter at ₹51/kg ]            │
│                            │                                    │
│  Market context            │  [ Enter a different price ]      │
│  Current: ₹48–₹53/kg       │                                    │
│  [────────▲──────]         │  ──────────────────────            │
│       ₹46                  │                                    │
│                            │  [ Accept ₹46/kg ]                │
│                            │  [ Reject Offer ]                  │
│                            │                                    │
└────────────────────────────┴────────────────────────────────────┘
```

### Key design decisions

- **AI recommendation is prominent but not the only choice.** Farmer can enter a manual price.
- **"Accept" is secondary** to the counter — accepting a below-market offer is not the recommended path.
- **Reject** is available but de-emphasized (ghost button style).
- **Market price range bar** shows where ₹46 falls visually — below the market band.
- **Total value** shown (qty × price) because farmers think in terms of total income.
- Buyer's message shown in quotes, clearly attributed.

### Responsive

**Tablet:** Two-column side-by-side collapses to stacked. AI recommendation moves below offer details.

**Mobile:**
```
Offer from Green Valley Foods    [Pending]
✓ Verified buyer

Tomato · 300 kg · ₹46/kg
Submitted: Today 4:32 PM

──────────────────────────

FairCrop recommendation

Buyer offered ₹46/kg · Market ₹48–₹53/kg
Your minimum ₹49/kg

Suggested: ₹51/kg
[Below market range explanation]

[ Counter at ₹51/kg ]         ← full width
[ Enter a different price ]   ← full width
[ Accept ] [ Reject ]         ← row, smaller
```

### States

| State | UI |
|-------|----|
| Loading | Skeleton both columns |
| AI unavailable | "Market information temporarily unavailable. You can still respond." |
| Counter submitted | "Counter sent. Waiting for buyer response." |
| Already actioned | Show read-only state + current status |

```
Permissions:    Authenticated farmer, owner of related listing
Next:           Counter → F-08 | Accept → F-10 | Reject → F-05
```

---

## F-07 — Counter Offer Input

This is a modal or inline expansion (not a separate route) triggered from F-06 when farmer taps "Enter a different price."

```
┌────────────────────────────────────────┐
│  Enter your counter price              │
│                                        │
│  ₹ [ 51         ] /kg                 │
│                                        │
│  Suggested: ₹51/kg                     │
│  Market range: ₹48–₹53/kg             │
│                                        │
│  Optional message to buyer             │
│  [ I can do ₹51/kg...            ]    │
│                                        │
│  [ Send Counter ]  [ Cancel ]         │
└────────────────────────────────────────┘
```

Validation: Price must be a number. Warn (not block) if price is outside market range.

---

## F-08 — Negotiation Thread

```
Screen:         Negotiation
Route:          /farmer/negotiations/[negotiationId]
User:           Farmer
Purpose:        Show the full negotiation conversation and allow the farmer to respond
Primary goal:   Understand the current state and take action if required
Primary action: Counter / Accept (when farmer action is required)
```

### Desktop layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Negotiations                                                 │
│                                                                 │
│  Tomato · 300 kg · Green Valley Foods         [Negotiating]     │
├───────────────────────────────┬─────────────────────────────────┤
│                               │                                 │
│  CONVERSATION                 │  SUMMARY & ACTION               │
│  ────────────                 │  ────────────────               │
│                               │                                 │
│  Buyer                        │  Listing                        │
│  ₹46/kg for 300 kg?           │  Tomato · Local variety         │
│  2:31 PM                      │  500 kg available               │
│                               │                                 │
│  ✦ FairCrop                   │  Buyer: Green Valley Foods      │
│  Below market range.          │  ✓ Verified buyer               │
│  Recommend counter ₹51/kg.    │                                 │
│  2:32 PM                      │  Negotiation                    │
│                               │  Round 1 of 5                   │
│  You                          │  Status: Your turn              │
│  I can do ₹51/kg.             │                                 │
│  2:33 PM                      │  Farmer asking   ₹52/kg         │
│                               │  Buyer offered   ₹46/kg         │
│  Buyer                        │  Your counter    ₹51/kg         │
│  Can you do ₹49/kg?           │  Market range    ₹48–₹53/kg     │
│  2:41 PM                      │                                 │
│                               │  ✦ FairCrop                     │
│  ✦ FairCrop                   │  Buyer countered at ₹49/kg.     │
│  ₹49/kg is within market      │  ₹49/kg is within range but     │
│  range and above your min.    │  below your minimum.            │
│  Consider accepting or        │  Suggested: ₹51/kg counter.     │
│  counter at ₹51/kg.           │                                 │
│  2:41 PM                      │  [ Counter at ₹51/kg ]         │
│                               │  [ Accept ₹49/kg ]             │
│                               │  [ End Negotiation ]           │
│  ────────────────────────     │                                 │
│  Your turn                    │                                 │
│  [ Counter ] [ Accept ]       │                                 │
│                               │                                 │
└───────────────────────────────┴─────────────────────────────────┘
```

### Conversation rules

- **Farmer messages:** Right-aligned, primary color background
- **Buyer messages:** Left-aligned, surface/white background, border
- **FairCrop AI messages:** Left-aligned, accent/light-green background, small sparkle icon, "FairCrop" label
- **System messages:** Centered, small pill (e.g., "Negotiation started · Oct 12")
- AI messages are informational, not commanding

### Right panel behavior

- Always shows current negotiation state
- Primary action changes based on whose turn it is
- When waiting for buyer: shows "Waiting for buyer to respond." No action buttons
- When farmer's turn: shows recommendation + action buttons

### Responsive

**Tablet (< 1024px):** Two-column collapses. Summary panel moves above conversation thread.

**Mobile:**
```
[Tomato · 300 kg]                [Negotiating]

Summary:
Round 2 · Buyer offered ₹49/kg

FairCrop: Counter at ₹51/kg

[ Counter at ₹51/kg ] ← prominent
[ Accept ₹49/kg ]
[ End ]

─────── Conversation ───────

[Buyer] ₹46/kg for 300 kg? 2:31
[FairCrop] Counter ₹51/kg 2:32
[You] ₹51/kg 2:33
[Buyer] ₹49/kg? 2:41
[FairCrop] Consider ₹51 2:41
```

Action panel is pinned at top. Thread scrolls below.

### States

| State | Description |
|-------|-------------|
| Farmer's turn | AI recommendation shown, action buttons active |
| Waiting for buyer | "Waiting for buyer to respond." No farmer action |
| AI evaluating | "FairCrop is reviewing..." — skeleton in recommendation area |
| Accepted | Read-only thread, "Deal confirmed" notice |
| Rejected | Read-only thread, "Negotiation ended" notice |
| Expired | "Negotiation expired" notice |
| Connection lost | "Reconnecting..." banner, thread still visible |

```
Permissions:    Authenticated farmer, party to this negotiation
Next:           Accept → F-10 | End → F-05 (offers)
```

---

## F-09 — My Negotiations (List)

```
Screen:         My Negotiations
Route:          /farmer/negotiations
User:           Farmer
Purpose:        Show all active and recent negotiations
Primary goal:   Identify which negotiations need attention
```

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Negotiations                                                   │
├─────────────────────────────────────────────────────────────────┤
│  [All] [Active] [Your turn] [Waiting] [Completed]               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ● YOUR TURN                                                    │
│  Tomato · Green Valley Foods · Round 2                          │
│  Buyer offered ₹49/kg for 300 kg          [Negotiating] [View]  │
│                                                                 │
│  Banana · Fresh Mart Ltd · Round 1                              │
│  Waiting for buyer response               [Waiting]    [View]   │
│                                                                 │
│  Paddy · Kerala Organics · Completed                            │
│  Accepted at ₹28/kg · 500 kg             [Accepted]   [View]    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

"Your turn" items always appear at top regardless of filter.

```
Permissions:    Authenticated farmer
Next:           View → F-08
```

---

## F-10 — My Deals (List)

```
Screen:         My Deals
Route:          /farmer/deals
User:           Farmer
Purpose:        Show all confirmed deals
```

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Deals                                                          │
├─────────────────────────────────────────────────────────────────┤
│  [All] [Confirmed] [Completed] [Disputed]                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Tomato · Green Valley Foods                                    │
│  300 kg · ₹51/kg · Total ≈ ₹15,300                             │
│  Confirmed: Oct 12, 2026               [Confirmed] [View]       │
│                                                                 │
│  Paddy · Kerala Organics                                        │
│  500 kg · ₹28/kg · Total ≈ ₹14,000                             │
│  Completed: Sep 30, 2026               [Completed] [View]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

```
Permissions:    Authenticated farmer
Next:           View → F-11
```

---

## F-11 — Deal Details

```
Screen:         Deal Details
Route:          /farmer/deals/[dealId]
User:           Farmer
Purpose:        Show the confirmed deal information
```

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ← My Deals                                                     │
│                                                                 │
│  Deal · Tomato                                   [Confirmed]    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Crop           Tomato · Local variety                          │
│  Quantity       300 kg                                          │
│  Final price    ₹51/kg                                          │
│  Total value    ≈ ₹15,300                                       │
│  Buyer          Green Valley Foods · ✓ Verified                 │
│  Confirmed      Oct 12, 2026 · 3:15 PM                          │
│  Status         Confirmed                                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Deal lifecycle                                                 │
│                                                                 │
│  [✓ Listing]─[✓ Offer]─[✓ Negotiation]─[✓ Accepted]─[○ Deal]  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Negotiation summary                                            │
│  Started: ₹46/kg → Final: ₹51/kg · 2 rounds                    │
│  [ View Negotiation Thread ]                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

No payment or delivery information shown — not confirmed for this phase.

```
Permissions:    Authenticated farmer, party to this deal
```

---

## F-12 — Notifications

```
Screen:         Notifications
Route:          /farmer/notifications
User:           Farmer
```

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Notifications                               [ Mark all read ]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Offers                                                         │
│  ─────────────────────────────────────────────                  │
│                                                                 │
│  ● New offer from Green Valley Foods                            │
│  ₹46/kg for 300 kg of Tomato · Just now     [ Review Offer ]   │
│                                                                 │
│  Negotiations                                                   │
│  ─────────────────────────────────────────────                  │
│                                                                 │
│  ● Buyer responded to your counter                              │
│  Fresh Mart Ltd: ₹33/kg for Banana · 1 hour [View Negotiation] │
│                                                                 │
│  Listings                                                       │
│  ─────────────────────────────────────────────                  │
│                                                                 │
│  Your Coconut listing expires in 48 hours                       │
│  2 days ago                               [ View Listing ]      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Unread notifications have a solid indicator dot. Read notifications are visually muted.

Each notification: event description + timestamp + one contextual action.

```
Permissions:    Authenticated farmer
Next:           Action button → relevant screen
```

---

## F-13 — Profile / Settings

```
Screen:         Profile
Route:          /farmer/profile
User:           Farmer
```

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Profile                                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Personal information                                           │
│  ─────────────────────────────────────────────                  │
│  Name          Rajan Kumar                    [ Edit ]          │
│  Phone         +91 94470 00000                                  │
│  Location      Malappuram, Kerala             [ Edit ]          │
│  Language      Malayalam                      [ Edit ]          │
│                                                                 │
│  Account                                                        │
│  ─────────────────────────────────────────────                  │
│  Email         rajan@example.com                                │
│  Member since  January 2026                                     │
│                                                                 │
│  Security                                                       │
│  ─────────────────────────────────────────────                  │
│  [ Change Password ]                                            │
│                                                                 │
│  [ Sign Out ]                                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Farmer verification status shown if applicable (NEEDS CONFIRMATION on what verification entails).

---

---

# PART 2 — BUYER EXPERIENCE

---

## B-01 — Marketplace

```
Screen:         Marketplace
Route:          /buyer/marketplace
User:           Buyer
Purpose:        Help buyers discover and compare available crop listings
Primary goal:   Find suitable crops to make an offer on
Primary action: View listing / Make offer
Secondary:      Search, filter, sort
```

### Desktop layout

```
┌─────────────────────────────────────────────────────────────────┐
│  [ Search: crop, location...  ]             Sort: [Newest ▾]    │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│  FILTERS     │  CROP GRID                                       │
│  ────────    │  ─────────────────────────────────────           │
│              │                                                  │
│  Crop type   │  [Tomato Card]  [Banana Card]  [Coconut Card]    │
│  [ ▾ ]       │                                                  │
│              │  [Paddy Card]   [Ginger Card]  [Pepper Card]     │
│  Location    │                                                  │
│  [ ▾ ]       │  [Tapioca Card] [Tomato Card]  [Banana Card]     │
│              │                                                  │
│  Quantity    │                        [ Load more ]             │
│  Min [ ]     │                                                  │
│  Max [ ]     │                                                  │
│              │                                                  │
│  Price/kg    │                                                  │
│  Min [ ]     │                                                  │
│  Max [ ]     │                                                  │
│              │                                                  │
│  Available   │                                                  │
│  [ ] Harvest │                                                  │
│  this week   │                                                  │
│              │                                                  │
│  [ Apply ]   │                                                  │
│  [ Reset ]   │                                                  │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

Each crop card (CropCard component from Phase 2):
- Crop name + variety
- Quantity available
- Location (district)
- Asking price + market range indicator
- Harvest date
- Status (Active)
- [ View Details ] action

### Grid vs list view

Default: Grid (3 columns desktop, 2 tablet). Buyer can switch to list view for comparison. `PROPOSED`

### Responsive

**Tablet:** 2-column grid. Filters collapse into a "Filters" button that opens a bottom sheet.

**Mobile:** Single column list. Filters behind a top "Filter" button. Search bar prominent.

### States

| State | UI |
|-------|----|
| Loading | 6 skeleton cards |
| No results (filtered) | "No crops match your filters." + Clear Filters |
| No results (empty) | "No crops listed yet. Check back soon." |
| Error | "Unable to load listings. Try again." |

```
Permissions:    Authenticated buyer
Next:           View listing → B-02
```

---

## B-02 — Listing Details (Buyer View)

```
Screen:         Listing Details
Route:          /buyer/listings/[listingId]
User:           Buyer
Purpose:        Show complete crop information to help buyer decide to make an offer
Primary goal:   Evaluate crop quality, price, and quantity to make an offer
Primary action: Make Offer
Secondary:      Save / Share (PROPOSED)
```

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Marketplace                                                  │
│                                                                 │
│  Tomato · Local variety                          [Active]       │
├────────────────────────────┬────────────────────────────────────┤
│                            │                                    │
│  LISTING INFO              │  MAKE AN OFFER                     │
│  ────────────              │  ─────────────                     │
│                            │                                    │
│  500 kg available          │  Quantity                          │
│  Malappuram, Kerala        │  [ 300        ] kg                 │
│  Harvest: 12 Oct 2026      │                                    │
│                            │  Your price                        │
│  Asking price              │  ₹ [ 46       ] /kg               │
│  ₹52/kg                    │                                    │
│                            │  Market range                      │
│  Market range              │  ₹48–₹53/kg                       │
│  ₹48──────▲────₹53/kg      │                                    │
│       ₹52                  │  Total ≈ ₹13,800                   │
│                            │                                    │
│  Notes                     │  [ Submit Offer ]                  │
│  Fresh. No pesticides.     │                                    │
│                            │  Offers are binding for 48 hours.  │
│  Farmer info               │                                    │
│  Verified seller           │                                    │
│                            │                                    │
└────────────────────────────┴────────────────────────────────────┘
```

### Key decisions

- Farmer's **minimum price is never shown** to the buyer
- **Market range is shown** — buyers can self-evaluate their offer against market
- Total price updates dynamically as buyer types quantity and price
- "Offers are binding for 48 hours" — binding period needs confirmation but the concept is documented
- Farmer is identified as "Verified seller" — not full name/details unless confirmed

### Responsive

**Tablet:** Two-column collapses. Offer form moves below listing info.

**Mobile:** Listing info first, full-width "Make Offer" form below. Market range is an inline notice, not a graphic.

### States

| State | UI |
|-------|----|
| Loading | Skeleton |
| Listing expired | "This listing is no longer available." + Back to Marketplace |
| Listing sold | "This crop has been sold." + Back |
| Offer submitted | Success state, redirect to B-03 |
| Form error | Inline validation messages |

```
Permissions:    Authenticated buyer
Next:           Submit Offer → B-03 (offer tracking)
```

---

## B-03 — My Offers (Buyer)

```
Screen:         My Offers
Route:          /buyer/offers
User:           Buyer
Purpose:        Show all offers the buyer has submitted
Primary goal:   Monitor offer status and respond to counters
Primary action: Respond to a pending counter offer
```

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  My Offers                                                      │
├─────────────────────────────────────────────────────────────────┤
│  [All] [Pending] [Negotiating] [Accepted] [Rejected] [Expired]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ● COUNTER RECEIVED                                             │
│  Tomato · Malappuram                                            │
│  Farmer countered at ₹51/kg                                     │
│  Your offer: ₹46/kg · 300 kg      [Negotiating] [Respond]      │
│                                                                 │
│  Banana · Thrissur                                              │
│  Awaiting farmer response                                       │
│  Your offer: ₹32/kg · 200 kg        [Pending]   [View]         │
│                                                                 │
│  Paddy · Kozhikode                                              │
│  Offer rejected by farmer                                       │
│  Your offer: ₹25/kg · 500 kg        [Rejected]  [View]         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

"Counter received" items pinned at top.

```
Permissions:    Authenticated buyer
Next:           Respond → B-04 | View → B-04
```

---

## B-04 — Offer Details / Negotiation (Buyer)

```
Screen:         Offer/Negotiation
Route:          /buyer/negotiations/[negotiationId]
User:           Buyer
Purpose:        Show negotiation thread and allow buyer to respond to counters
Primary goal:   Respond to farmer's counter or track status
Primary action: Accept counter / Send counter offer
```

### Layout (mirrors F-08 but from buyer's perspective)

```
┌─────────────────────────────────────────────────────────────────┐
│  ← My Offers                                                    │
│                                                                 │
│  Tomato · Malappuram                              [Negotiating] │
├───────────────────────────────┬─────────────────────────────────┤
│                               │                                 │
│  CONVERSATION                 │  OFFER SUMMARY                  │
│  ────────────                 │  ────────────                   │
│                               │                                 │
│  You                          │  Listing                        │
│  ₹46/kg for 300 kg?           │  Tomato · 500 kg available      │
│  2:31 PM                      │  Malappuram, Kerala             │
│                               │                                 │
│  FairCrop (on behalf          │  Your offer: ₹46/kg · 300 kg   │
│  of farmer)                   │                                 │
│  Counter: ₹51/kg              │  Farmer countered: ₹51/kg       │
│  2:33 PM                      │                                 │
│                               │  Market range: ₹48–₹53/kg      │
│                               │                                 │
│                               │  [ Accept ₹51/kg ]             │
│                               │  [ Counter with lower price ]  │
│                               │  [ Withdraw offer ]            │
│                               │                                 │
│  ────────────────────────     │                                 │
│  Farmer countered at ₹51/kg   │                                 │
│  [ Accept ] [ Counter ]       │                                 │
│                               │                                 │
└───────────────────────────────┴─────────────────────────────────┘
```

**FairCrop messages in the buyer's thread:** The FairCrop AI appears as acting on behalf of the farmer. The buyer sees AI involvement transparently but does not see the farmer's internal recommendation details (minimum price, etc.).

```
Permissions:    Authenticated buyer, party to this negotiation
Next:           Accept → B-05 | Counter → continues | Withdraw → B-03
```

---

## B-05 — My Deals (Buyer)

```
Screen:         My Deals
Route:          /buyer/deals
User:           Buyer
Purpose:        Track confirmed deals
```

### Layout

Same structure as F-10 but from buyer's perspective:

```
┌─────────────────────────────────────────────────────────────────┐
│  My Deals                                                       │
├─────────────────────────────────────────────────────────────────┤
│  [All] [Confirmed] [Completed] [Disputed]                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Tomato · Malappuram                                            │
│  300 kg · ₹51/kg · Total ≈ ₹15,300                             │
│  Confirmed: Oct 12, 2026               [Confirmed] [View]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## B-06 — Deal Details (Buyer)

Mirror of F-11. Shows:
- Crop, farmer (as "Verified seller"), quantity, final price, total value, status, lifecycle bar
- No payment or delivery unless confirmed

---

---

# PART 3 — AUTHENTICATION SCREENS

---

## A-01 — Login

```
Screen:         Login
Route:          /login
User:           All
```

### Layout

```
┌──────────────────────────────────────┐
│                                      │
│  FairCrop                            │
│  Agricultural marketplace            │
│                                      │
│  Sign in to your account             │
│                                      │
│  Phone / Email                       │
│  [                              ]    │
│                                      │
│  Password                            │
│  [                              ]    │
│                                      │
│  [ Sign In ]                         │
│                                      │
│  [ Forgot password? ]                │
│                                      │
│  Don't have an account?              │
│  [ Create account ]                  │
│                                      │
└──────────────────────────────────────┘
```

No role selection on login. Role determined from account.

---

## A-02 — Register (Role Select)

```
Screen:         Register
Route:          /register
User:           New user
```

```
┌──────────────────────────────────────┐
│                                      │
│  FairCrop                            │
│  Join the marketplace                │
│                                      │
│  I am a...                           │
│                                      │
│  ┌─────────────────┐                 │
│  │ 🌾 Farmer       │                 │
│  │                 │                 │
│  │ I grow crops    │                 │
│  │ and want to     │                 │
│  │ sell directly   │                 │
│  │ to buyers       │                 │
│  └─────────────────┘                 │
│                                      │
│  ┌─────────────────┐                 │
│  │ 🏪 Buyer        │                 │
│  │                 │                 │
│  │ I need          │                 │
│  │ agricultural    │                 │
│  │ produce         │                 │
│  └─────────────────┘                 │
│                                      │
│  Already have an account?            │
│  [ Sign in ]                         │
│                                      │
└──────────────────────────────────────┘
```

---

## A-03 — Farmer Registration

```
Screen:         Farmer Registration
Route:          /register/farmer
```

```
┌──────────────────────────────────────┐
│  Create farmer account               │
│                                      │
│  Full name *                         │
│  [                              ]    │
│                                      │
│  Phone number *                      │
│  [                              ]    │
│                                      │
│  Location (district) *               │
│  [ Malappuram, Kerala           ▾ ]  │
│                                      │
│  Password *                          │
│  [                              ]    │
│                                      │
│  Confirm password *                  │
│  [                              ]    │
│                                      │
│  [ Create Account ]                  │
│                                      │
│  By creating an account you agree    │
│  to FairCrop's terms of use.         │
│                                      │
└──────────────────────────────────────┘
```

Farmer verification specifics: NEEDS CONFIRMATION

---

## A-04 — OTP Verification

```
Screen:         OTP
Route:          /verify-otp
```

```
┌──────────────────────────────────────┐
│  Verify your phone                   │
│                                      │
│  We sent a code to                   │
│  +91 94470 XXXXX                     │
│                                      │
│  Enter code                          │
│  [ _ ] [ _ ] [ _ ] [ _ ] [ _ ] [ _ ]│
│                                      │
│  [ Verify ]                          │
│                                      │
│  Didn't receive it?                  │
│  [ Resend code ] (in 55s)            │
│                                      │
└──────────────────────────────────────┘
```

---

---

# PART 4 — ADMIN SCREENS

---

## ADM-01 — Overview

```
Screen:         Admin Overview
Route:          /admin/overview
User:           Admin
Purpose:        Platform health and activity at a glance
```

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Platform Overview                               Oct 2, 2026    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Today                                                          │
│  ────────────────────────────────────────────────               │
│  New users: 12   New listings: 8   New offers: 24               │
│  Active negotiations: 15   Deals confirmed: 3                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Requires attention                                             │
│  ────────────────────────────────────────────────               │
│                                                                 │
│  3 users pending verification                   [ Review ]      │
│  2 listings flagged                             [ Review ]      │
│  1 disputed deal                                [ Review ]      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Recent activity                                                │
│  ────────────────────────────────────────────────               │
│  [Activity table: user, action, entity, time]                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ADM-02 — Users

```
Screen:         Users
Route:          /admin/users
User:           Admin
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Users                                                          │
│  [ Search users... ]   Role: [All ▾]   Status: [All ▾]         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Name              Role     Location     Status       Action    │
│  ──────────────────────────────────────────────────────         │
│  Rajan Kumar       Farmer   Malappuram   Active   [ View ]      │
│  Green Valley      Buyer    Kozhikode    Pending  [ Review ]    │
│  Fathima A.        Farmer   Thrissur     Active   [ View ]      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ADM-03 — User Detail

```
Screen:         User Detail
Route:          /admin/users/[userId]
User:           Admin
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Users                                                        │
│                                                                 │
│  Rajan Kumar · Farmer                            [Active]       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Details                                                        │
│  Phone: +91 94470 00000                                         │
│  Location: Malappuram, Kerala                                   │
│  Member since: Jan 2026                                         │
│                                                                 │
│  Activity                                                       │
│  Listings: 3 active · 2 expired                                 │
│  Offers: 7 received · 2 accepted                                │
│  Deals: 2 completed                                             │
│                                                                 │
│  Actions                                                        │
│  [ Verify Account ]  [ Suspend Account ]  [ View Listings ]     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ADM-04 — Listings (Admin)

```
Screen:         Listings (Admin)
Route:          /admin/listings
User:           Admin
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Listings                                                       │
│  [ Search... ]   Status: [All ▾]   Crop: [All ▾]               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Crop      Farmer        Qty    Price    Status     Action      │
│  ────────────────────────────────────────────────────           │
│  Tomato    Rajan K.     500kg  ₹52/kg  Active    [ View ]      │
│  Banana    Fathima A.   200kg  ₹35/kg  Flagged   [ Review ]    │
│  Paddy     Suresh M.   1000kg  ₹28/kg  Sold      [ View ]      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ADM-05 — Negotiations (Admin)

```
Screen:         Negotiations (Admin)
Route:          /admin/negotiations
User:           Admin
Purpose:        Monitor all negotiations, intervene in exceptional cases
```

```
┌─────────────────────────────────────────────────────────────────┐
│  Negotiations                                                   │
│  Status: [All ▾]   [ Search... ]                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Crop     Farmer      Buyer            Round  Status   Action  │
│  ──────────────────────────────────────────────────────         │
│  Tomato   Rajan K.   Green Valley      2/5   Active  [ View ]  │
│  Banana   Fathima    Fresh Mart        1/5   Active  [ View ]  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Admin has read-only view of all negotiation threads. Intervention capability: NEEDS CONFIRMATION.

---

---

# PART 5 — RESPONSIVE DESIGN DECISIONS

---

## Navigation breakpoints

| Width | Farmer nav | Buyer nav |
|-------|-----------|-----------|
| ≥ 1024px | Persistent sidebar 240px | Top bar + sidebar 200px |
| 768–1023px | Collapsible sidebar (icon + label) | Top bar + icon sidebar |
| < 768px | Hidden, hamburger opens overlay | Top bar, hamburger |

## Information hierarchy on mobile

Rule: **Actions before analytics. Labels before numbers. Most important first.**

For screens with two-column desktop layout (e.g., Offer Details, Negotiation):
1. Status / context header
2. AI recommendation / action panel (farmer needs this first)
3. Offer/conversation details
4. Secondary info

This ordering is reversed from desktop (where conversation is left and panel is right) because on mobile the farmer's required action is the primary concern.

## Tables on mobile

Admin tables → Transform into card-per-row on mobile.

```
[Row card]
Name: Rajan Kumar
Role: Farmer
Status: Active          [ View ]
```

Farmer listing rows → Already card-like. No additional transformation needed.

---

---

# PART 6 — ACCESSIBILITY NOTES

---

| Concern | Decision |
|---------|---------|
| Heading hierarchy | Every page uses exactly one `<h1>` (page title). Sections use `<h2>`. Cards use `<h3>`. |
| Focus order | Left-to-right, top-to-bottom. Mobile: top-to-bottom. Priority action receives focus after page load on action-required screens. |
| AI recommendation | Announced to screen readers as "FairCrop recommendation: [text]" — not just visual label |
| Status badges | Always include text. Never color-only. E.g., "Pending" not just a yellow dot. |
| Form fields | Every input has a visible label above, not placeholder-only. |
| Error messages | Linked to field via `aria-describedby`. Announced after submission. |
| Touch targets | Minimum 44×44px for all interactive elements. |
| Negotiation messages | Each message bubble role="article" with sender and time as accessible text. |
| Modal focus trap | Dialogs (counter offer, confirmation) trap focus and restore on close. |

---

---

# PART 7 — STATE REFERENCE

---

## Global loading patterns

| Context | Skeleton pattern |
|---------|----------------|
| Marketplace grid | 6 cards, 2 columns mobile, 3 desktop |
| List screens (offers, deals) | 4 rows with avatar + text lines |
| Detail screens | Header block + 2-3 section blocks |
| Negotiation thread | 4 message bubbles alternating sides |
| Dashboard | Header + attention area + 3 listing rows |
| Right panel / AI recommendation | 4 text lines + 2 button shapes |

## Global empty patterns

Per role:

**Farmer:** When empty, always suggest the next productive action (Create Listing if no listings; wait copy if offers are empty).

**Buyer:** Empty marketplace with filters → Clear Filters. Empty marketplace without filters → "Check back soon."

## Global error patterns

All errors:
1. Explain what failed (briefly)
2. Provide a recovery action
3. Never show technical details (stack traces, HTTP codes)

---

---

# PART 8 — OPEN PRODUCT QUESTIONS

These affect screen design directly and must be confirmed before Phase 5 implementation:

| # | Question | Affected screens |
|---|----------|----------------|
| 1 | Can AI auto-accept a deal within farmer preferences? | F-06, F-08, negotiation flow |
| 2 | Maximum negotiation rounds? | F-08, round indicator |
| 3 | Are offers binding? For how long? | B-02, offer form |
| 4 | Can buyer see that FairCrop AI is acting on farmer's behalf? | B-04 conversation |
| 5 | What farmer info is shown to buyers? (name, location, verification only?) | B-02 listing detail |
| 6 | Notification delivery: in-app only or SMS/email? | F-12, all notification UX |
| 7 | Buyer verification: required before making offers? | B-02 offer form gate |
| 8 | Can a listing have multiple simultaneous offers? | F-04 offers section |
| 9 | Is there a dispute resolution flow? | F-11, ADM-05 |
| 10 | Is the listing expiry period configurable? | F-04 expiry date display |

---

*Document version: Phase 4 | Last updated: 2026-10-02*
