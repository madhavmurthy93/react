import { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash, HiOutlineXMark, HiSquare2Stack } from "react-icons/hi2";
import styled from "styled-components";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1.5fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const [showForm, setShowForm] = useState(false);

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
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount ? formatCurrency(discount) : "None"}</Discount>
        <Buttons>
          <Button onClick={handleDuplicate} disabled={isCreating}>
            <HiSquare2Stack />
          </Button>
          <Button onClick={() => setShowForm((show) => !show)}>
            {showForm ? <HiOutlineXMark /> : <HiOutlinePencil />}
          </Button>
          <Button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
            <HiOutlineTrash />
          </Button>
        </Buttons>
      </TableRow>
      {showForm && (
        <CreateCabinForm cabinToEdit={cabin} onEditCompletion={() => setShowForm(false)} />
      )}
    </>
  );
}

export default CabinRow;
