import React, { useState, useEffect } from "react";
import Container from "../../../Components/Container";
import { RiAddLine } from "react-icons/ri";
import Button from "../../../Components/Button";
import Table from "../../../Components/Table";
import { useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Loading from "../../../Components/Loading";

const index = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    { header: "Title", render: (row) => row.title },
    { header: "Client Name", render: (row) => row.clientName },
    { header: "Timeline", render: (row) => row.timeline },
    {
      header: "Technologies",
      render: (row) =>
        <>
        {row.tecs
          .replaceAll('"', "")
          .split(",")
          .slice(0, 3)
          .map((tech) => (
            <>
              <div className="bg-gray-200 text-xs capitalize text-gray-600 p-1 rounded-full w-auto inline-block ml-1 px-2">
                {tech}
              </div>
            
            
            </>
          ))}
          {
            row.tecs.replaceAll('"', "").split(",").length > 3 && (
              <div className="bg-gray-200 text-xs capitalize text-gray-600 p-1 rounded-full w-auto inline-block ml-1 px-2">
                +{row.tecs.replaceAll('"', "").split(",").length - 3}
              </div>
            )
          }
        </>
    },
    { header: "Github Link", render: (row) => row.github },
    { header: "Website Link", render: (row) => row.demo },
    {
      header: "Status",
      render: (row) =>
        row.is_active ? (
          <div
            onClick={() => handleStatus(row.id, 0)}
            className="bg-green-500 text-xs text-center text-white p-2 rounded-full px-4"
          >
            Aktif
          </div>
        ) : (
          <div
            onClick={() => handleStatus(row.id, 1)}
            className="bg-red-500 text-xs text-center text-white p-2 rounded-full px-4"
          >
            Pasif
          </div>
        ),
    },
    {
      header: "İşlemler",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(`/admin/dashboard/editProject/${row.id}`)}
          >
            Düzenle
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => deleteHandler(row.id)}
          >
            Sil
          </Button>
        </div>
      ),
    },
  ];

  const handleStatus = (id, status) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", status);
    fetch(import.meta.env.VITE_API_URL + "projects/status", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Proje durumu güncellendi");
        fetchData();
      } else {
        toast.error("Proje durumu güncellenemedi");
      }
    });
  };

  const fetchData = () => {
    setIsLoading(true);
    fetch(import.meta.env.VITE_API_URL + "projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setIsLoading(false);
      });
  };

  const deleteHandler = (id) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", id);
    fetch(import.meta.env.VITE_API_URL + "projects/delete", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Proje silindi");
        fetchData();
      } else {
        toast.error("Proje silinemedi");
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container pageName="Projeler">
      <Toaster />
      <div className="w-full flex items-center justify-end p-4">
        <Button onClick={() => navigate("/admin/dashboard/addProject")}>
          <RiAddLine className="h-5 w-5" />
          Yeni Proje
        </Button>
      </div>
      <Table data={data} column={columns} />
    </Container>
  );
};

export default index;
