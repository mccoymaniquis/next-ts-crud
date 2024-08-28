import { ReactElement } from 'react'
interface SkeletonProps {
  className?: string
}
const Skeleton = (props: SkeletonProps): ReactElement => {
  const { className = '' } = props
  return <div className={`animate-pulse bg-neutral-100 ${className}`}></div>
}

export default Skeleton
