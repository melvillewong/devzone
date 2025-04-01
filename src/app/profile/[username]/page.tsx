import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing,
} from "@/actions/profile.action";
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";
import { getDbUserId } from "@/actions/user.action";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const userProfile = await getProfileByUsername(username);
  if (!userProfile) return;

  return {
    title: `${userProfile.displayName ?? userProfile.username}`,
    description:
      userProfile.bio || `Check out ${userProfile.username}'s profile.`,
  };
}

async function ProfilePageServer({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const userProfile = await getProfileByUsername(username);
  const currUserId = await getDbUserId();

  if (!userProfile) notFound();

  const [posts, likedPost, isCurrUserFollowing] = await Promise.all([
    getUserPosts(userProfile.id),
    getUserLikedPosts(userProfile.id),
    isFollowing(userProfile.id),
  ]);

  return (
    <ProfilePageClient
      user={userProfile}
      posts={posts}
      likedPosts={likedPost}
      isFollowing={isCurrUserFollowing}
      currUserId={currUserId}
    />
  );
}

export default ProfilePageServer;
