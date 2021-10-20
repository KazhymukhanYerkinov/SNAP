import { UserType } from "../../shared/types";

export interface ModalProps {
  modal: boolean;
  user: UserType;
  deactivateModal: () => void;
}