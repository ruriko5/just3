export type UserData = {
  isAnonymous: boolean;
  avatarUrl?: string;
  email?: string;
  name?: string;
};

export const returnUserData = (user: any): UserData => {
  return {
    isAnonymous: user.is_anonymous,
    avatarUrl: user.user_metadata.avatar_url,
    email: user.user_metadata.email,
    name: user.user_metadata.name || user.user_metadata.user_name,
  };
};
