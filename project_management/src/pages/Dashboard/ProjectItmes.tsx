import { Link } from 'react-router-dom';

interface IProjectItemsProps {
  projectId: string
  projectDate: string
  projectName: string
  deleteProject: (projectId: string) => void
  goProject: (projectId: string) => void
};

export default function ProjectItems({
  projectId,
  projectName,
  projectDate,
  deleteProject,
  goProject
}: IProjectItemsProps) {
  return (
    <div className="flex justify-center my-2 cursor-pointer">
    <div className="flex flex-row justify-center border border-indigo-600 rounded-lg w-1/2">
      <div className="py-1 basis-2/3 flex justify-start">
        <div className="px-2 basis-1/2 text-left font-semibold"><p>{projectName}</p></div>
        <div className="px-2 basis-1/2 text-left"><p>{projectDate}</p></div>
      </div>
      <div className="py-1 basis-1/3 flex justify-around" >
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-1 px-4 rounded" onClick={() => goProject(projectId)}>
          View
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded" onClick={() => deleteProject(projectId)}>
          Delete
      </button>
      </div>
    </div>
    </div>
  );
}
