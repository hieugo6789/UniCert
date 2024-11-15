import { Avatar, Button, Card, message, Modal, Spin } from "antd";
import AvatarAdmin from "../Header/AvatarAdmin";
import useDeleteFeedback from "../../hooks/Feedback/useDeleteFeedback";
import defaultAvatar from "../../assets/images/Avatar/DefaultAvatar.jpg";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import useFeedback from "../../hooks/Feedback/useFeedback";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { feedbackPagination } from "../../models/feedback";
import Breadcrumbs from "../UI/Breadcrumb";

const { confirm } = Modal;

const FeedbackForStaff = () => {
  const id = useParams().id;
  const { feedback, loading, refetchFeedbacks } = useFeedback({
    examId: Number(id),
  });
  const { handleDeleteFeedback } = useDeleteFeedback();
  const [feedbacks, setFeedbacks] = useState<feedbackPagination[]>([]);

  useEffect(() => {
    refetchFeedbacks(Number(id));
  }, [id]);

  useEffect(() => {
    setFeedbacks(feedback);
  }, [feedback]);
  const showDeleteConfirm = (feedbackId: number) => {
    confirm({
      title: "Are you sure delete this job position?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        await handleDeleteFeedback(feedbackId);
        message.success("Feedback deleted successfully!");
        refetchFeedbacks(Number(id));
      },
      onCancel() {
        console.log("Cancel deletion");
      },
    });
  };
  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4 ml-6">
            Feedback Management
          </h2>
        </div>
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>
      <div className=" gap-4 p-2 min-h-[90vh]">
        <Breadcrumbs
          items={[
            { label: "Feedback Management", link: "/admin/feedback" },
            { label: `EID-${id}` },
          ]}
        />
        <div className="p-4">
          {loading ? (
            <div className="flex justify-center items-center h-[80vh]">
              <Spin size="large" />
            </div>
          ) : (
            <div className="space-y-4">
              {feedbacks.map((item) => (
                <Card
                  key={item.feedbackId}
                  hoverable
                  className="rounded-lg shadow-md"
                >
                  <div className="flex items-start">
                    <Avatar
                      src={item.userDetails.userImage || defaultAvatar}
                      icon={<UserOutlined />}
                      alt={item.userDetails.username}
                      size="large"
                      className="mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">
                            {item.userDetails.username}
                          </h4>
                          <span className="text-gray-500 text-xs">
                            {new Date(
                              item.feedbackCreatedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="space-x-2">
                          <Button
                            size="small"
                            onClick={() => showDeleteConfirm(item.feedbackId)}
                            danger
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">
                        {item.feedbackDescription}
                      </p>
                    </div>
                  </div>
                  {item.feedbackImage ? (
                    <img
                      alt="Feedback"
                      src={item.feedbackImage}
                      className="h-full w-full object-cover mt-4 rounded-md"
                    />
                  ) : (
                    // <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-400 mt-4 rounded-md">
                    //   <PictureOutlined style={{ fontSize: 40 }} />
                    // </div>
                    ""
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default FeedbackForStaff;
