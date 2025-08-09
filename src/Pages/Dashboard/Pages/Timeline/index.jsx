import React, { useEffect, useState } from "react";
import Container from "../../../../Components/Container";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/Modal";
import Table from "../../../../Components/Table";
import { CiCirclePlus } from "react-icons/ci";
import { Toaster, toast } from "react-hot-toast";
import TimelineModal from "../../../../Modals/TimelineModal";
import { useSelector } from "react-redux";
import Loading from "../../../../Components/Loading";

const index = () => {
  const token = useSelector((state) => state.token.token);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    { header: "id", render: (row) => row.id },
    { header: "title", render: (row) => row.title },
    { header: "startDate", render: (row) => row.start },
    { header: "endDate", render: (row) => row.end },
    { header: "company", render: (row) => row.company },
    { header: "location", render: (row) => row.location },
    { header: "content", render: (row) => row.text },
    {
      header: "İşlemler",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setIsOpen(true);
              setEditData(row);
            }}
          >
            Düzenle
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteTimeline(row.id);
            }}
          >
            Sil
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    fetch(import.meta.env.VITE_API_URL + "timeline",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteTimeline = (id) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", id);
    fetch(import.meta.env.VITE_API_URL + "timeline/delete", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success(data.message);
          setData(data.filter((item) => item.id !== id));
        } else {
          toast.error(data.message);
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  if(isLoading){
    return <Loading />;
  }

  return (
    <Container isPadding={false}>
      <Toaster />
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
            <TimelineModal
              token={token}
              setIsOpen={setIsOpen}
              editData={editData}
            ></TimelineModal>
          </Modal>
        )}
      </div>
      {data && (
        <Table
          data={data}
          column={columns}
          striped={true}
          hover={true}
          bordered={true}
          compact={false}
        />
      )}
    </Container>
  );
};

export default index;
