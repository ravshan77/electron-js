// ---- Meta ----
export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: [
    {
      url: string | null;
      label: string;
      active: boolean;
    },
  ];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export const inital_meta: Meta = {
    current_page: 1,
    from: 1,
    last_page: 1,
    links: [ { url: null, label: "", active: false }],
    path: "",
    per_page: 1,
    to: 1,
    total: 1
}

// ---- Resposne types ----
export type Response<T> = {
  resoult?: T;
  error?: { message: string } | any;
  failure?: boolean;
  success: boolean;
};


export type ResponseWithPagination<T> = {
  resoult?: { data: T[]; meta: Meta; links: any };
  error?: { message: string } | any;
  failure?: boolean;
  success: boolean;
};
