export interface IComment {
 id: number;
 rating: number;
 text: string;
 createdAt: string;
 user: {
   commentUserId: number;
   firstName: string;
   lastName: string;
   avatarUrl: string;
 }
}
