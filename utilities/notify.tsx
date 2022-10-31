import { toast } from 'react-toastify'

export const notifyAdded = (label: string) => toast.success(
  <div className="text-xs pl-1">
    <p className="m-0 text-dark-4">Added: <span className=" font-bold">{label}</span></p>
  </div>
)

export const notifyDeleted = (label: string) => toast.success(
  <div className="text-xs pl-1">
    <p className="m-0 text-dark-4">Deleted: <span className=" font-bold">{label}</span></p>
  </div>
)
