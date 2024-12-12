import {
  HiEllipsisVertical,
  HiOutlinePencil,
  HiOutlineTrash,
  HiSquare2Stack,
} from "react-icons/hi2";
import styled from "styled-components";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

function CabinRow({ cabin }) {
  const { id: cabinId, name, maxCapacity, regularPrice, discount, description, image } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount ? formatCurrency(discount) : <span>&mdash;</span>}</Discount>
        <Buttons>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId}>
                <HiEllipsisVertical />
              </Menus.Toggle>
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                  disabled={isCreating}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit-cabin">
                  <Menus.Button icon={<HiOutlinePencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="confirm-delete">
                  <Menus.Button icon={<HiOutlineTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit-cabin">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="confirm-delete">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </Buttons>
      </Table.Row>
    </>
  );
}

export default CabinRow;
