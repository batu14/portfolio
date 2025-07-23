import React, { useEffect } from "react";
import Container from "../../../../Components/Container";
import { useState } from "react";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/Modal";
import SkillsModal from "../../../../Modals/SkillsModal";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../../../Features/Tab/TabSlice";
import Table from "../../../../Components/Table";
import { CiCirclePlus } from "react-icons/ci";

const index = () => {
    const [skill, setSkill] = useState();
    const [text, setText] = useState();
    const [photo, setPhoto] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const columns = [
        { header: "id", render: (row) => row.id },
        { header: "title", render: (row) => row.title },
        { header: "startDate", render: (row) => row.startDate },
        { header: "endDate", render: (row) => row.endDate },
        { header: "company", render: (row) => row.company },
        { header: "location", render: (row) => row.location },
        { header: "content", render: (row) => row.content },
        {
            header: "Durum",
            render: (row) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs ${row.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
    ];

    const data = [
        {
            id: 1,
            title: "John",
            startDate: "2025",
            endDate: "2025",
            company: "Lorem INC",
            location: "Turket , Istanbul",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, nihil odit dolore quos minus iste totam maxime ipsa ex ratione ad et quaerat dolorum",
            status:'active'

        },
        {
            id: 1,
            title: "John",
            startDate: "2025",
            endDate: "2025",
            company: "Lorem INC",
            location: "Turket , Istanbul",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, nihil odit dolore quos minus iste totam maxime ipsa ex ratione ad et quaerat dolorum",
            status:'active'
            

        },
        {
            id: 1,
            title: "John",
            startDate: "2025",
            endDate: "2025",
            company: "Lorem INC",
            location: "Turket , Istanbul",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, nihil odit dolore quos minus iste totam maxime ipsa ex ratione ad et quaerat dolorum",
            status:'active'

        },
        {
            id: 1,
            title: "John",
            startDate: "2025",
            endDate: "2025",
            company: "Lorem INC",
            location: "Turket , Istanbul",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, nihil odit dolore quos minus iste totam maxime ipsa ex ratione ad et quaerat dolorum",
            status:'active'

        },

    ];

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
                        <SkillsModal></SkillsModal>
                    </Modal>
                )}
            </div>
            <Table
                data={data}
                column={columns}
                striped={true}
                hover={true}
                bordered={true}
                compact={false}
            />
        </Container>
    );
};

export default index;
