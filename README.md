# FairCrop AI

> **Connect directly. Understand the market. Let AI negotiate. Close the deal.**

FairCrop AI is an AI-powered agricultural marketplace designed to connect farmers directly with legitimate agricultural buyers.

The platform addresses a fundamental problem in agricultural markets: farmers can have limited access to buyers, market-price information, and negotiation power. Traditional supply chains often involve intermediaries between farmers and the businesses that ultimately purchase their produce.

FairCrop AI introduces an **AI sales representative for farmers**.

Instead of requiring a farmer to understand market dynamics, search for buyers, and negotiate every offer themselves, the platform allows an intelligent AI agent to assist with market analysis, evaluate offers, and negotiate with buyers according to the farmer's preferences.

---

## The Problem

A farmer may spend months cultivating a crop, but selling it at a reasonable price can still be difficult.

The traditional process can look like:

Farmer
   ↓
Local Vendor / Intermediary
   ↓
Wholesale / Market
   ↓
Retailer / Business
   ↓
Consumer


Farmers may face challenges such as:

- Limited access to direct buyers
- Lack of useful market-price information
- Limited negotiation power
- Difficulty finding legitimate business buyers
- Limited technical resources
- Difficulty comparing offers
- Lack of transparency around the final value of their produce

Meanwhile, buyers such as wholesalers, retailers, restaurants, supermarkets, and food businesses need reliable access to agricultural supply.

FairCrop AI aims to reduce this gap.

---

# Our Solution

FairCrop creates a direct connection between farmers and agricultural buyers.

                 ┌──────────────────────┐
                 │      AI AGENT         │
                 │                      │
                 │ Market Intelligence  │
                 │ Offer Evaluation     │
                 │ Negotiation          │
                 │ Logistics Context    │
                 └──────────┬───────────┘
                            │
                            │
Farmer ─────────────────────┼──────────────────── Buyer
                            │
                            ↓
                          Deal


The farmer provides information about their crop, quantity, location, harvest details, and selling preferences.

The AI agent can then help understand the market context, evaluate buyer offers, and negotiate with buyers on the farmer's behalf.

The goal is not to replace farmers' decisions, but to give them a **digital representative with access to market information and negotiation capabilities**.

---

# Core Product Flow


Farmer creates crop listing
          ↓
Platform analyzes market context
          ↓
AI determines pricing context
          ↓
Buyers discover the listing
          ↓
Buyer makes an offer
          ↓
AI evaluates the offer
          ↓
AI negotiates according to farmer preferences
          ↓
Negotiation reaches an outcome
          ↓
Deal is created
          ↓
Farmer and buyer track the deal


# Key Users

FairCrop AI has three primary user types.

## 1. Farmer

Farmers can:

- Create crop listings
- Specify crop and variety
- Add quantity and location
- Provide harvest and quality information
- View market-price information
- Define selling preferences
- Receive buyer offers
- Allow the AI agent to evaluate and negotiate offers
- Monitor negotiations
- Track completed deals
- View sales and revenue information
- Receive notifications
- Manage their profile

The farmer experience is designed around a simple mental model:

> **"I have crops. I want to sell them. FairCrop helps me reach buyers and negotiate."**

---

## 2. Buyer

Buyers can include:

- Wholesalers
- Supermarkets
- Retailers
- Restaurants
- Food businesses
- Shops
- Other legitimate agricultural buyers

Buyers can:

- Browse agricultural listings
- Search and filter crops
- View crop and quantity information
- Understand pricing context
- Make offers
- Participate in negotiations
- Track their offers
- Track completed deals
- Manage their profile

The buyer experience is centered around:

> **"I need agricultural produce. I want to find suitable supply, make an offer, negotiate, and complete the deal."**

---

## 3. Admin

Administrators manage and monitor the marketplace.

Admin capabilities include:

- User management
- Verification
- Listing moderation
- Offer and negotiation monitoring
- Deal monitoring
- Platform analytics
- Reports
- Suspicious activity monitoring
- User blocking/unblocking
- Listing approval/flagging
- Platform configuration

The admin interface is intentionally more information-dense than the farmer interface.

---

# AI Sales Representative

The AI agent is the primary differentiator of FairCrop AI.

It is designed to operate as an **intelligent sales representative for farmers**, rather than functioning only as a conversational chatbot.

The AI can use information such as:

- Current market prices
- Historical prices
- Crop type
- Crop variety
- Location
- Quantity
- Seasonality
- Buyer offer
- Farmer's selling preferences
- Estimated logistics costs
- Buyer information
- Negotiation history

to support decisions during the selling process.

### Example

A farmer lists:


Crop: Tomato
Quantity: 500 kg
Location: Malappuram

A buyer offers:


₹43/kg


The AI may evaluate the offer against the available market context and farmer-defined preferences.

It could determine that a counter-offer is appropriate:

Buyer offer:        ₹43/kg
Market range:       ₹48–₹54/kg
Farmer minimum:     ₹48/kg
Suggested counter:  ₹51/kg


The AI can then communicate and negotiate with the buyer according to the system's defined negotiation rules.

AI decisions involving money should be explainable.

For example:

> **"The AI recommends countering at ₹51/kg because the offer is below the current market range and the farmer's minimum acceptable price."**

---

# Pricing Model

FairCrop distinguishes between different pricing concepts rather than treating them as the same value.

Market Price
     ↓
AI Recommended Range
     ↓
Farmer Asking Price
     ↓
Farmer Minimum Acceptable Price


These values have different purposes.

- **Market Price** — available market reference
- **AI Recommended Range** — pricing guidance based on available market information
- **Farmer Asking Price** — the farmer's desired selling price
- **Minimum Acceptable Price** — the boundary used when evaluating negotiations

The exact level of AI autonomy is controlled by the product's negotiation rules and farmer preferences.

---

# Marketplace

The marketplace allows buyers to discover available agricultural produce directly from farmers.

Listings can contain:

- Crop type
- Variety
- Quantity
- Remaining quantity
- Location
- Harvest date
- Images
- Quality information
- Asking price
- Market-price context
- Listing status

Buyers can search, filter, sort, view listing details, and make offers.

The platform is designed to support multiple offers and partial quantities where applicable.

---

# Negotiation

A negotiation connects a buyer offer with the AI agent representing the farmer.

A negotiation can involve:

Offer
  ↓
Evaluation
  ↓
Counter Offer
  ↓
Buyer Response
  ↓
Further Negotiation
  ↓
Accepted / Rejected / Expired

Negotiation decisions may consider:

- Offer price
- Requested quantity
- Market price
- Farmer preferences
- Distance
- Estimated logistics cost
- Buyer information
- Previous negotiation rounds

Negotiation history should remain transparent to the relevant users.



# Deal Lifecycle

The intended deal lifecycle is:

Listing
   ↓
Offer
   ↓
Negotiation
   ↓
Accepted / Rejected / Expired
   ↓
Deal
   ↓
In Transit
   ↓
Delivered
   ↓
Completed


The exact payment, settlement, delivery, and dispute workflows are subject to the current product scope and implementation.


# Trust & Transparency

Trust is a critical part of a marketplace involving physical agricultural goods and money.

FairCrop AI is designed to support:

- User verification
- Farmer verification
- Buyer verification
- Listing moderation
- Transparent negotiation history
- Deal history
- Buyer trust information
- Admin monitoring
- Clear deal statuses
- Explainable AI decisions

The platform should never make unsupported claims such as guaranteeing the highest possible selling price.

---

# Technology

The platform is being rebuilt from the original hackathon MVP into a more structured and maintainable application.

## Frontend

- Next.js
- TypeScript
- React
- TanStack Query
- Tailwind CSS
- Zod
- React Hook Form

The frontend is a **responsive web application**.

A dedicated mobile application is a possible future direction, but is not part of the current implementation.

---

## Backend

The backend is based on:

- Node.js
- Express
- TypeScript
- InversifyJS
- MongoDB
- Mongoose
- Redis
- WebSockets / Socket.IO
- Axios
- class-validator

The backend provides APIs for:

- Authentication
- Farmers
- Buyers
- Marketplace
- Offers
- Negotiations
- Deals
- Notifications
- Administration

---

## AI / Agent Service

The AI layer is implemented as a separate service responsible for intelligent marketplace operations.

Current agent concepts include:

### Market Analyst

Analyzes available market data and calculates pricing context.

### Listener / Intent Agent

Extracts structured information from user messages, such as:

Crop
Quantity
District

### Decision / Negotiation Engine

Evaluates offers and determines negotiation actions based on defined rules and market context.

### LLM Communicator

Converts decisions into natural-language communication for buyers and farmers.

### Orchestrator

Coordinates the different AI components into workflows such as:


Full Evaluation
Analyze Only
Negotiate




# Architecture

The high-level architecture is:

                    FairCrop Web App
                          │
                       Next.js
                          │
                          ▼
                    Backend API
                          │
          ┌───────────────┼───────────────┐
          │               │               │
       MongoDB          Redis          WebSocket
          │               │               │
          └───────────────┼───────────────┘
                          │
                          ▼
                    AI Agent Service
                          │
             ┌────────────┼────────────┐
             │            │            │
       Market Analyst  Negotiation  LLM
             │            │            │
             └────────────┼────────────┘
                          │
                          ▼
                    Decision / Deal



# Core Domain Models

The planned domain model includes:

User
 │
 ├── Farmer
 ├── Buyer
 └── Admin

User
 │
 └── CropListing
        │
        └── Offer
              │
              └── Negotiation
                      │
                      └── Deal

User
 │
 └── Notification

### User

Common identity and profile information.

### CropListing

Represents agricultural produce being offered for sale.

### Offer

Represents a buyer's offer for a listing.

### Negotiation

Stores the negotiation process between the buyer and the farmer's AI representative.

### Deal

Represents the final agreed transaction.

### Notification

Provides users with updates about offers, negotiations, deals, and other events.

---

# Planned Authentication

The platform is designed around role-based authentication.

Supported roles:


farmer
buyer
admin


Planned authentication capabilities include:

- Phone OTP authentication for farmers
- Email/password authentication for buyers
- JWT access tokens
- Refresh tokens
- HTTP-only cookies
- Role-based access control
- Account verification
- Session management
- Password recovery
- Optional Google OAuth for applicable users

Authentication behavior may evolve as implementation progresses.

---

# Farmer Experience

The farmer application is designed around simplicity and accessibility.

Planned areas include:


Farmer Dashboard
│
├── Overview
├── My Listings
├── Add Listing
├── Offers
├── Negotiations
├── Deals
├── Notifications
└── Profile / Settings


The UI should avoid unnecessary technical complexity.

Instead of exposing complicated AI terminology, the interface should communicate useful outcomes.

For example:

> **Buyer offered ₹46/kg**

> Market range: ₹48–₹53/kg

> **AI recommends countering at ₹51/kg**

This allows the farmer to understand what is happening without needing to understand the underlying AI system.

---

# Buyer Experience

The buyer application is centered around discovery and purchasing.


Buyer
│
├── Marketplace
├── Crop Details
├── Make Offer
├── My Offers
├── Negotiations
├── Deals
├── Notifications
└── Profile / Settings


The marketplace should make it easy to understand:

- What crop is available
- How much is available
- Where it is located
- Relevant pricing information
- Farmer/listing information
- Current offer status

---

# Admin Experience

The admin application provides operational visibility.

Admin
│
├── Overview
├── Users
├── Listings
├── Negotiations
├── Deals
├── Analytics
├── Reports
└── Configuration


Admin interfaces can use information-dense tables, filters, charts, and monitoring tools where appropriate.



# Real-Time Features

Real-time communication is important for negotiation and marketplace events.

Planned real-time functionality includes:

- Negotiation messages
- AI response status
- Offer notifications
- Deal notifications
- Connection recovery
- Typing / processing indicators
- Read status where appropriate

The system should gracefully handle:

Connected
   ↓
Disconnected
   ↓
Reconnecting
   ↓
Connected


Users should always know the current state of their connection and actions.



# Security

Security is a core requirement because the platform handles user accounts, negotiations, and financial information.

Planned security measures include:

- HTTPS
- Secure authentication
- HTTP-only cookies
- Role-based authorization
- Helmet/security headers
- CORS restrictions
- Rate limiting
- Input validation
- Input sanitization
- Request size limits
- Environment variable validation
- Secure service-to-service communication
- Dependency auditing


# Accessibility

FairCrop AI is intended to be accessible to users with different levels of technical experience.

The interface should prioritize:

- Clear language
- Large, readable typography
- Strong visual hierarchy
- Accessible color contrast
- Clear actions
- Simple navigation
- Helpful feedback
- Responsive web design
- Keyboard accessibility
- Malayalam + English support where appropriate

The product should communicate AI capabilities through **outcomes rather than technical terminology**.

---

# Internationalization

The initial target audience includes farmers in Kerala.

The product is therefore intended to support:

- English
- Malayalam

Malayalam support may extend across the farmer experience and AI interactions as the implementation develops.

---

# Future Possibilities

The following ideas are potential future capabilities and are not necessarily part of the initial release:

- Live agricultural market data
- Multi-crop market intelligence
- Seasonal pricing models
- Farmer preference learning
- AI-assisted crop quality assessment
- Image-based crop grading
- Malayalam AI negotiation
- Smart buyer matching
- Price forecasting
- Delivery route optimization
- Advanced negotiation analytics
- Native mobile application
- Advanced reputation systems
- Payment and settlement integrations

These features should be introduced only when they provide clear product value and fit the platform's core mission.

---

# Product Principles

FairCrop AI follows several core principles.

### 1. Direct Market Access

Help farmers reach legitimate buyers without unnecessary intermediaries.

### 2. Intelligence With Transparency

AI should explain important decisions, especially decisions involving money.

### 3. Simplicity for Farmers

Complexity should exist inside the system, not in the farmer's interface.

### 4. User Control

Farmers should define the boundaries within which the AI can negotiate.

### 5. Trust

Users should have clear information about participants, listings, offers, negotiations, and deals.

### 6. Real-World Usefulness

Every feature should solve a genuine marketplace problem.

### 7. Human-Centered AI

AI should act as a useful representative and assistant rather than becoming a confusing layer of technology.

---

# Vision

FairCrop AI aims to move agricultural commerce toward a more direct and transparent model:


Traditional

Farmer
   ↓
Intermediary
   ↓
Market


FairCrop

Farmer
   ↓
AI Sales Representative
   ↓
Direct Buyer
   ↓
Deal


The long-term vision is to give farmers better access to markets, better information, and stronger negotiating capability through intelligent technology.

---

## North Star

> **Connect directly. Understand the market. Let AI negotiate. Close the deal.**

---

## Project Status

FairCrop AI originated as a rapid MVP developed for an **Agentic AI hackathon**.

The original MVP demonstrated the core concept but was intentionally built under a very short development timeline.

The current project is a **ground-up rebuild** focused on:

- Stronger product definition
- Better UX
- Professional responsive web design
- Scalable frontend architecture
- Maintainable backend architecture
- More reliable AI workflows
- Better authentication and authorization
- Transparent negotiations
- Stronger security
- Testing
- Production readiness

The original MVP is treated as a **proof of concept and functional reference**, not as a constraint on the new architecture.

---

## License

License information will be added as the project moves toward public release.
