import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import type { ReactNode } from 'react'
interface IProps {
  isOpen: boolean
  close: () => boolean
  children: ReactNode
  title?: string
}
export default function Modal({ isOpen, close, children, title }: IProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={close}
      >
        {/* الخلفية المظللة مع البلور */}
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 " />

        {/* المودال */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-surface p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-md"
            >
              <DialogTitle
                as="h3"
                className="font-semibold text-center text-3xl mb-5 text-text"
              >
                {title}
              </DialogTitle>
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
