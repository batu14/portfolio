import React, { useEffect } from "react";
import Container from "../../../../Components/Container";
import { useState } from "react";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/Modal";
import SkillsModal from "../../../../Modals/SkillsModal";
import { useDispatch, useSelector } from "react-redux";
import { setId, removeId } from "../../../../Features/Tab/SkillsReducer";
import Table from "../../../../Components/Table";
import { CiCirclePlus } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import Loading from "../../../../Components/Loading";

const index = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.skills);
  const token = useSelector((state) => state.token.token);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const columns = [
    { header: "Title", render: (row) => row.title },
    { header: "Description", render: (row) => row.description },
    { header: "Type", render: (row) => row.type },
    {
      header: "Action",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button onClick={() => handleEdit(row)}>
            <CiEdit />
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row.id)}>
            <CiTrash />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(import.meta.env.VITE_API_URL + "skills",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(import.meta.env.VITE_API_URL + "skills/delete/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    if (isOpen == false) {
      setEditData(null);
    }
  }, [isOpen]);

  const handleEdit = (row) => {
    dispatch(setId(row.id));
    setIsOpen(true);
    setEditData(row);
  };

  if(loading){
    return <Loading />;
  }

  return (
    <Container isPadding={false}>
      <div className="w-full flex items-center justify-end py-4">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Ekle
          <CiCirclePlus />
        </Button>
        {isOpen && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <SkillsModal token={token} editData={editData} setIsOpen={setIsOpen}></SkillsModal>
          </Modal>
        )}
      </div>
      {data.length > 0 ? (
        <Table
          data={data}
          column={columns}
          striped={true}
          hover={true}
          bordered={true}
          compact={false}
        />
      ) : (
        <div>No data</div>
      )}
    </Container>
  );
};

export default index;
