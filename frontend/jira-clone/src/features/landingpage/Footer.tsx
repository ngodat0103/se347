export function Footer() {
  return (
    <>
      <footer className="grotesk bg-[#f9fbfb]">
        <div className="px-2">
          <div className="max-w-8xl mx-auto px-5 py-6">
            <h2 className="text-black">Jira brings you convenience.</h2>
            <div>
              <h2 className="my-4 text-sm">
                Join millions of teams that trust Jira to manage their workflows
                and deliver results. <br className="hidden lg:inline-block" />{" "}
                Want to learn more? Explore our features and see how Jira can
                boost your productivity.
              </h2>
            </div>
            <div className="absolute right-0 -mt-20 hidden text-black lg:inline-block">
              <a href="/" className="mr-16">
                Terms & Conditions
              </a>
              <a href="/" className="mr-16">
                Privacy Policy
              </a>
              <a href="/" className="mr-16">
                Cookie Policy
              </a>
            </div>

            <p className="text-center text-sm text-gray-500">
              Thank you for visiting. Stay productive with Jira and keep your
              projects organized!
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
