// This is only filled with the data we need
export interface Asset {
  id: number;
  token_id: string;
  traits: Trait[];
}

export interface Trait {
  trait_type: string;
  value: string;
  display_type: string | null;
  max_value: number | null;
  trait_count: number;
  order: unknown | null;
}
