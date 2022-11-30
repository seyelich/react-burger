export interface IModal extends React.HTMLAttributes<HTMLDivElement> {
    handleClose: () => void, 
    title?: string, 
    hasOverlay: boolean,
    titleClassName?: string,
}