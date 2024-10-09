import { useEffect, useState } from "react";
import MenuAdmin from "../../components/Layout/MenuAdmin";
import { useAppDispatch } from "../../redux/hook";
import { allOrganizationPaginationData } from "../../models/organization";
import { fetchAllOrganizationPagination } from "../../redux/slice/organizationSlice";
import { useCreateOrganize } from "../../hooks/useCreateOrganize";
import { Modal, Input, Button } from "antd";

const Organizations = () => {
  const { handleCreateOrganize } = useCreateOrganize();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState<
    allOrganizationPaginationData[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    organizeName: "",
    organizeAddress: "",
    organizeContact: "",
  });

  useEffect(() => {
    fetchServices();
  }, [dispatch]);

  const fetchServices = async (name?: string) => {
    setLoading(true);
    try {
      const response = await dispatch(fetchAllOrganizationPagination(name));
      setOrganization(response.payload.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const { organizeName, organizeAddress, organizeContact } = formData;
    if (
      organizeName.trim() &&
      organizeAddress.trim() &&
      organizeContact.trim()
    ) {
      try {
        await handleCreateOrganize(formData);
        fetchServices();
        setIsModalVisible(false);
        setFormData({
          organizeName: "",
          organizeAddress: "",
          organizeContact: "",
        });
      } catch (error) {
        console.error("Error creating organization:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="h-[10vh] ">
        <div className="flex  items-center mb-4">
          <Button
            type="primary"
            onClick={showModal}
          >
            + Organization
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 p-2 bg-slate-100 h-[90vh]">
        <div className="col-span-2">
          <MenuAdmin />
        </div>
        <div className=" p-4">
          {loading ? (
            <div>Loading...</div>
          ) : organization.length > 0 ? (
            organization.map((m) => (
              <div key={m.organizeId}>{m.organizeName}</div>
            ))
          ) : (
            <div>No organizations available.</div>
          )}

          <Modal
            title="Tạo Organization"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="OK"
            cancelText="Cancel"
          >
            <Input
              placeholder="Nhập tên tổ chức"
              name="organizeName"
              value={formData.organizeName}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              placeholder="Nhập địa chỉ tổ chức"
              name="organizeAddress"
              value={formData.organizeAddress}
              onChange={handleInputChange}
              className="mb-2"
            />
            <Input
              placeholder="Nhập thông tin liên lạc"
              name="organizeContact"
              value={formData.organizeContact}
              onChange={handleInputChange}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Organizations;
