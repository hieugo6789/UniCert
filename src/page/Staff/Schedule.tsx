import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Descriptions, Dropdown, Menu, Modal, Spin, Tag } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import useSchedule from "../../hooks/Schedule/useSchedule";
import useDeleteSchedule from "../../hooks/Schedule/useDeleteSchedule";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import CreateSchedule from "../../components/Calendar/CreateSchedule";
import useScheduleDetail from "../../hooks/Schedule/useScheduleDetail"; // Hook for fetching schedule details
import useCertDetail from "../../hooks/Certification/useCertDetail";
import UpdateSchedule from "../../components/Calendar/UpdateSchedule";
import Notification from "../../components/Notification/Notification";

const Schedule: React.FC = () => {
  const { schedule, loading, refetchSchedule } = useSchedule();
  const { handleDeleteSchedule } = useDeleteSchedule();
  const { getScheduleDetails, state } = useScheduleDetail();
  const { getCertDetails, state: certDetail } = useCertDetail();
  const [events, setEvents] = useState<any[]>([]);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);

  useEffect(() => {
    const formattedEvents = schedule.map((session) => {
      const startDate = new Date(session.sessionDate); // Parse sessionDate
      if (isNaN(startDate.getTime())) {
        console.error("Invalid sessionDate:", session.sessionDate);
        return null; // Skip invalid dates
      }
      return {
        id: session.sessionId.toString(),
        sessionId: session.sessionId,
        title: session.sessionCode,
        sessionName: session.sessionName,
        start: startDate.toISOString(), // Use a valid ISO string
        end: startDate.toISOString(), // Use same date for end if no range
        sessionDate: session.sessionDate,
        location: session.sessionAddress,
        time: session.sessionTime,
        certId: session.certId,
      };
    }).filter(Boolean); // Remove null events
    setEvents(formattedEvents);
  }, [schedule]);
  

  const handleEventClick = (eventInfo: any) => {
    const sessionId = eventInfo.event.extendedProps.sessionId;
    getScheduleDetails(sessionId); // Fetch the details
    const certId = eventInfo.event.extendedProps.certId;
    getCertDetails(certId);
    setSelectedSchedule(eventInfo.event); // Store the clicked event's details
    setDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedSchedule(null); // Clear the selected schedule
  };

  const handleDeleteClick = (sessionId: number) => {
    Modal.confirm({
      title: "Delete Schedule",
      content: "Are you sure you want to delete this schedule?",
      onOk: async () => {
        await handleDeleteSchedule(sessionId); // Call your delete function here
        refetchSchedule(); // Refetch schedule after deletion
        setDetailModalVisible(false); // Close the modal after deletion
        setSelectedSchedule(null); // Clear the selected schedule
      },
      onCancel() {},
    });
  };

  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div className="ml-10">
          <CreateSchedule refetchSchedules={refetchSchedule} />
        </div>
        <div className="mr-10 flex items-center">
          <div className="mr-6">
            <Notification />
          </div>
          <AvatarAdmin />
        </div>
      </div>

      <div className="p-2 min-h-[90vh]">
        <div className="bg-white p-4 rounded-lg shadow-lg ">
          <Spin spinning={loading}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              events={events}
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }}
              eventContent={(eventInfo) => (
                <div className="flex items-center justify-between w-full">
                  <div className="px-2 truncate max-w-[150px]">
                    <i>{eventInfo.event.title}</i> -{" "}
                    <b>
                      {new Date(
                        eventInfo.event.start as Date
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </b>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item key="update">
                            <UpdateSchedule
                              sessionId={
                                eventInfo.event.extendedProps.sessionId
                              }
                              refetchSchedules={refetchSchedule}
                            />
                          </Menu.Item>
                          <Menu.Item
                            key="delete"
                            danger
                            onClick={() =>
                              handleDeleteClick(
                                eventInfo.event.extendedProps.sessionId
                              )
                            }
                          >
                            Delete
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <EllipsisOutlined
                        style={{ fontSize: "18px", cursor: "pointer" }}
                      />
                    </Dropdown>
                  </div>
                </div>
              )}
              height="auto"
              eventClick={handleEventClick}
            />
          </Spin>
        </div>
      </div>

      <Modal
        width={900}
        open={isDetailModalVisible}
        onCancel={handleCloseDetailModal}
        footer={null}
      >
        {state.isLoading ? (
          <Spin />
        ) : selectedSchedule ? (
          <div>
            <Descriptions
              bordered
              size="middle"
              column={1}
              className="mb-4"
              labelStyle={{ width: "150px", fontWeight: "bold" }} // Fixed label width
              contentStyle={{ width: "600px", textAlign: "left" }} // Fixed content width
              title={
                <h3 className="text-2xl text-blue-600">Schedule Details</h3>
              }
            >
              <Descriptions.Item label="Session Name">
                <span className="text-blue-700">
                  {selectedSchedule.extendedProps.sessionName}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Session Code">
                <span className="text-gray-600">{selectedSchedule.title}</span>
              </Descriptions.Item>
              <Descriptions.Item label="Location">
                <span className="text-gray-600">
                  {selectedSchedule.extendedProps.location}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Session Date">
                <span className="text-gray-600">
                  {new Date(selectedSchedule.start).toLocaleString()}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Time">
                <span className="text-gray-600">
                  {selectedSchedule.extendedProps.time}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Certification">
                <Tag color="green">{certDetail?.currentCert.certName} </Tag>
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};

export default Schedule;
