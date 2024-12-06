import { Skeleton } from '@/common'

export const PostSkeleton = () => (
  <div
    className={
      'w-[491px] min-h-[816px] border-b mt-[24px] ml-[8%] flex flex-col pb-2 justify-between'
    }
  >
    <div className={'w-full h-8 flex items-center justify-between gap-5'}>
      <Skeleton className={'w-9 h-9 rounded-full'} />
      <Skeleton className={'w-[450px] h-5'} />
    </div>
    <section className={'h-[504px]'}>
      <Skeleton className={'w-full h-full'} />
    </section>
    <Skeleton className={'w-full h-5'} />
    <div className={'w-full flex gap-5 justify-between'}>
      <Skeleton className={'w-9 h-9 rounded-full mt-[10px]'} />
      <Skeleton className={'w-[450px] h-24'} />
    </div>
    <div className={'w-full h-8 flex items-center gap-2'}>
      <Skeleton className={'size-8 rounded-full'} />
      <Skeleton className={'w-[100px] h-5'} />
    </div>
    <Skeleton className={'w-full h-5'} />
    <Skeleton className={'w-full h-5 mb-3'} />
  </div>
)
