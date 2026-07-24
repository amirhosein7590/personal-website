export type CloseModal = (id: string | number, data?: unknown) => void
export type UpdateData = (id: string | number, newData: object) => void
export type ShowModal = (config: Modal) => string | number
import { FC } from "react"

export type Size = "sm" | "lg" | "xl" | "2xl"

type ContentProps = {
  id: string | number,
  title?: string
  size?: Size,
  data?: object,
  closeModal: CloseModal,
  updateData: UpdateData,
  openNested?: (config: Modal) => string | number
}

export type Modal = {
  id?: string | number,
  parentId?: string | number
  title?: string
  size?: Size,
  data?: object
  content: FC<ContentProps> | string,
  header?: React.FC | string,
  onClose?: () => void,
  showModal?: ShowModal,
  closeModal?: CloseModal,
  updateData?: UpdateData,
}