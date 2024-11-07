import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Descriptions, Modal, Spin, Tag } from "antd";
import useSchedule from "../../hooks/Schedule/useSchedule";
import useDeleteSchedule from "../../hooks/Schedule/useDeleteSchedule";
import AvatarAdmin from "../../components/Header/AvatarAdmin";
import CreateSchedule from "../../components/Calendar/CreateSchedule";
import useScheduleDetail from "../../hooks/Schedule/useScheduleDetail"; // Hook for fetching schedule details
import useCertDetail from "../../hooks/Certification/useCertDetail";

const Schedule: React.FC = () => {
  const { schedule, loading, refetchSchedule } = useSchedule();
  const { handleDeleteSchedule } = useDeleteSchedule();
  const { getScheduleDetails, state } = useScheduleDetail();
  const { getCertDetails, state: certDetail } = useCertDetail();
  const [events, setEvents] = useState<any[]>([]);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);

  useEffect(() => {
    const formattedEvents = schedule.map((session) => ({
      id: session.sessionId.toString(),
      title: session.sessionCode,
      sessionName: session.sessionName,
      start: session.sessionDate, // Ensure sessionDate is a Date or ISO string
      end: session.sessionDate, // Use end if there is an end time
      location: session.sessionAddress,
      time: session.sessionTime,
      sessionId: session.sessionId,
      certId: session.certId,
    }));
    setEvents(formattedEvents);
  }, [schedule]);

  // Handle event click to fetch details and show in modal
  const handleEventClick = (eventInfo: any) => {
    const sessionId = eventInfo.event.extendedProps.sessionId;
    getScheduleDetails(sessionId); // Fetch the details
    const certId = eventInfo.event.extendedProps.certId;
    getCertDetails(certId);
    setSelectedSchedule(eventInfo.event); // Store the clicked event's details
    setDetailModalVisible(true); // Show the modal
  };

  // Handle closing the detail modal
  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedSchedule(null); // Clear the selected schedule
  };

  const confirmDelete = (sessionId: number) => {
    Modal.confirm({
      title: "Delete Schedule",
      content: "Are you sure you want to delete this schedule?",
      onOk: async () => {
        await handleDeleteSchedule(sessionId);
        refetchSchedule();
        setDetailModalVisible(false);
        setSelectedSchedule(null);
      },
    });
  };

  return (
    <>
      <div className="h-[10vh] flex justify-between items-center">
        <div>
          <CreateSchedule refetchSchedules={refetchSchedule} />
        </div>
        <div className="mr-10">
          <AvatarAdmin />
        </div>
      </div>

      <div className="p-2 min-h-[90vh]">
        <div className="bg-white p-4 rounded-lg shadow-lg ">
          <Spin spinning={loading}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
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
                <div className="flex items-center justify-between w-full ">
                  <div className="px-2">
                    <i>{eventInfo.event.title}</i> - <b>{eventInfo.timeText}</b>
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
            <div className="flex justify-end gap-4">
              <Button
                danger
                onClick={() =>
                  confirmDelete(selectedSchedule.extendedProps.sessionId)
                }
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </Modal>
    </>
  );
};

export default Schedule;
