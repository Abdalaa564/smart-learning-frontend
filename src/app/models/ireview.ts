export interface IReview {
  id: string;
  reviewerName: string;
  reviewerRole?: string;      // "ML Engineer at Tesla"
  reviewerAvatarUrl?: string;
  rating: number;             // 1..5
  comment: string;
}

