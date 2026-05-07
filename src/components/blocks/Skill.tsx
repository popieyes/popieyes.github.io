interface SkillProps {
  src : string;
  alt : string;
  techName : string;
  small : string;
};

const Skill : React.FC<SkillProps> = ({src, alt, techName, small}) => (
  <div className='flex flex-col items-center gap-2 '>
    <img className='w-16 min-h-16 object-contain' src={src} alt={alt}/>
    <div className="flex flex-col items-center gap-2 font-mono">
        <h4 className='font-bold'>{techName}</h4>
        <p className="text-xs">{small}</p>
    </div>
  </div>
);

export default Skill;