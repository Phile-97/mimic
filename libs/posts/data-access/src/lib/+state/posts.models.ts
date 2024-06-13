/**
 * Interface for the 'Posts' data
 */
export interface PostsEntity {
  id: string | number; // Primary ID
  title:      string;
  content:    string;
  published:  boolean;
  created_at: string;
  owner_id:   number;
  owner:      Owner;
  votes:      number;
}

export interface Owner {
  username: string;
  email:    string;
}

