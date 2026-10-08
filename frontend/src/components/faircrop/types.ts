export type CropStatus = 'Available' | 'Limited quantity' | 'Negotiating' | 'Sold' | 'Expired';

export type OfferStatus = 'Pending' | 'Negotiating' | 'Accepted' | 'Rejected' | 'Expired' | 'Cancelled';

export type DealState = 'Confirmed' | 'In Transit' | 'Delivered' | 'Completed' | 'Disputed';

export type DealLifecycle = 'Listing' | 'Offer' | 'Negotiation' | 'Accepted' | 'Deal';

export type MessageSender = 'Farmer' | 'Buyer' | 'FairCrop AI' | 'System';

export interface CropData {
  id: string;
  name: string;
  variety?: string;
  quantity: number;
  unit: string;
  location: string;
  distance?: string;
  harvestDate: string;
  askingPrice: number;
  marketMin?: number;
  marketMax?: number;
  status: CropStatus;
}

export interface OfferData {
  id: string;
  buyerName: string;
  buyerVerified: boolean;
  price: number;
  quantity: number;
  unit: string;
  submittedAt: string;
  status: OfferStatus;
  message?: string;
}
