import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const MainNav = () => {
  return (
    <div className="mt-20 flex w-full items-center justify-between">
      <h1 className="ml-[200px] text-7xl text-white underline underline-offset-8">
        Wardrobe
      </h1>
      <div className="mr-[200px] mt-[50px] flex text-white">
        <span className="mx-2">/</span>
        <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
      </div>
    </div>
  );
};

export default MainNav;
