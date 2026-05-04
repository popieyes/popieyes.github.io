import React, { useState } from "react";
import { useAppContext } from "../../AppContext";

interface ProjectSection {
  title: string,
  cover: string,
  description: string
}
interface ProjectProps {
  hero: ProjectSection,
  discussions: ProjectSection[]
};


const ProjectPage : React.FC<ProjectProps> = ({hero, discussions}) => {
  const {setProjectPageVisibility} = useAppContext();

  const handleHideProject = () => {
    setProjectPageVisibility(false);
  };
  return(
    <section className="text-white flex flex-col justify-center items-center bg-black">

      <button className="border-1 p-4 rounded-full h-2 w-2 flex items-center justify-center fixed z-10 left-0 top-[50vh] mx-8
        hover:bg-white hover:text-black transition-all">
        <i className="fa fa-arrow-left" aria-hidden="true"></i>
      </button>

      <button className="border-1 p-4 rounded-full h-2 w-2 flex items-center justify-center fixed z-10 right-0 top-[50vh] mx-8
        hover:bg-white hover:text-black transition-all">
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
      </button>

      <button className="fixed right-4 top-4 z-10 border-1 rounded-full p-4 transition-all hover:bg-white hover:text-black" onClick={handleHideProject}>
        <i className="fa fa-times"></i>
      </button>

      <div className="flex flex-col gap-16 max-w-3/4 p-8 my-8">

      {/* Hero of the project. Cover image + gallery + description  */}

        <div className="flex flex-row gap-4 justify-around">
          {/* Gallery View */}
          <div className="flex-[2] flex flex-col items-center">
            {/* Main Image */}
            <img className="w-full" src={hero.cover} alt="" />
            <div className="  w-full mt-4 grid grid-cols-4 gap-2 ">
              <img className="min-w-0 aspect-video object-cover" src="/images/projects-ninja.png" alt="" />
              <img className="min-w-0 aspect-video object-cover" src="/images/projects-nori.jpeg" alt="" />
              <img className="min-w-0 aspect-video object-cover" src="/images/projects-szero.png" alt="" />
              <img className="min-w-0 aspect-video object-cover" src="/images/projects-re4.png" alt="" />
            </div>
          </div>
          <div className="flex-[1] flex flex-col max-w-[30%]">
            <h2 className="text-xl">{hero.title}</h2>
            <p> {hero.description} </p>
            <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>

      {/* Discussion of the project. For as many discussion sections in the config props. Map that to a section */}
      {discussions.map((d) => (
        <div className="flex flex-row gap-4 justify-around">
          <div className="flex flex-col max-w-[30%]">
              <h2 className="text-xl">{d.title}</h2>
              <p> {d.description}
                <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
          </div>
             
          <div className="flex flex-col">
            {/* Main Image */}
              <img src={d.cover} alt="" />
          </div>
              
        </div>
      ))}
    
      </div>  
      
    </section>
  );
};

export default ProjectPage;