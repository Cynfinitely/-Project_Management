import { useEffect, useState } from "react";

interface IStateStatus {
  text: string,
  clicked: boolean
}

interface ICheckBoxItem {
  text: string
  onChange: (newStatus: string) => void
}

const CheckBox = ({
  text,
  onChange
}: ICheckBoxItem) => {

  const [status, setStatus] = useState<IStateStatus[]>([
    {text: 'Idea', clicked: false},
    {text: 'Todo', clicked: false},
    {text: 'InProgress', clicked: false},
    {text: 'Finished', clicked: false}
  ])

  useEffect(() => {
    status.map(value => {
      if(value.text.trim().toLowerCase() === text.trim().toLowerCase()) {
        value.clicked = true;
      }
    })
  }, [])


  function clickStatus(index: number) {
    status[index].clicked = !status[index].clicked
    const newStatus = status.map((item, i) => {
        if (index != i) {
            item.clicked = false                
        }
        return item
    })
    setStatus([...newStatus])
    onChange(status[index].text)  
  }

  return (
    <div className="w-full flex flex-row gap-8">      
      {status.map((value, index) => {
         return (
          <div className="flex items-center mb-4">
            <input  id="default-checkbox" type="checkbox" checked={status[index].clicked} onChange={() => clickStatus(index)} className=" h-4 w-4  focus:outline-none " />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{value.text}</label>
          </div>
         )
      })}
    </div>
  )
}

export default CheckBox