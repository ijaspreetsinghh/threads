import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser, fetchUsers } from "@/lib/actions/user.action";

import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";
const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const results = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <>
      <section>
        <h1 className='head-text mb-10'>Search</h1>
        {/* Search Bar */}

        <div className='flex flex-col gap-9 mt-14'>
          {results.communities.length === 0 ? (
            <p className='no-result'>No Users</p>
          ) : (
            <>
              {results.communities.map((community) => (
                <CommunityCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  members={community.members}
                  bio={community.bio}
                />
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
