export interface IUser {
  success : boolean;
  statusCode : number;
  message : string;
  data : {
    id : string;
    name : string;
    email : string; 
    activeStatus : string;
    role : string;
    createdAt : string;
    updatedAt : string;
    isPremium : boolean;
    profile : {
      id : string;
      profilePhoto : string;
      bio : string | null;
      userId : string;
      createdAt : string;
      updatedAt : string;
    }
  }
}

export interface NavbarProps {
  user : IUser
}

export interface Author {
  id: string
  name: string
  email: string
  activeStatus: string
  role: string
  createdAt: string
  updatedAt: string
  isPremium: boolean
}

export interface NewsPost {
  id: string
  title: string
  content: string
  thumbnail: string
  isFeatured: boolean
  status: string
  tags: string[]
  views: number
  createdAt: string
  updatedAt: string
  isPremium: boolean
  authorId: string
  comments: unknown[]
  author: Author
  _count: {
    comments: number
  }
}

export interface NewsPageListProps {
  posts: NewsPost[]
}

enum PostStatus{
    DRAFT,
  PUBLISHED,
  ARCHIVED
}

export interface IPost {
     id: string;
    title: string;
    content: string;
    thumbnail: string;
    isFeatured: boolean;
    status: PostStatus;
    tags: string[];
    views: number;
    createdAt: Date;
    updatedAt: Date;
    isPremium: boolean;
    authorId: string;
}