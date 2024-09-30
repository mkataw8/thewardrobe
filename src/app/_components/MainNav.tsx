import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const MainNav = () => {
  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center lg:flex-row lg:justify-between">
      <h1 className=":ml-[200px] text-7xl text-white underline underline-offset-8 sm:text-center lg:ml-[200px]">
        Wardrobe
      </h1>
      <div className="mt-[50px] flex text-white sm:mt-4 sm:flex-col sm:items-center lg:mr-[200px]">
        <span className="mx-2 sm:hidden">/</span>
        <header className="sm:mt-2">
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
