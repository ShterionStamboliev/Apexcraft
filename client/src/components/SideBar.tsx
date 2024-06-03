const SideBar = () => {
    return (
        <>
        {/* Sidebar */}
        <nav className="w-400 bg-gray-800 text-white shadow-lg flex flex-col  items-center" style={{ height: "100vh",}}>
        <ul className="mt-10 text-center">
  <li className="border-3 border-white underline py-3">
    <a href="#home">Home</a>
  </li>
  <li className="border-3 border-white underline py-3">
    <a href="#about">About</a>
  </li>
  <li className="border-3 border-white underline py-3">
    <a href="#projects">Projects</a>
  </li>
</ul>


        </nav>
      </>
      
    );
}

export default SideBar