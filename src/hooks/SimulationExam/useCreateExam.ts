import { createExam } from "../../models/SimulationExam/simulationExam";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  createExamFailure,
  createExamStart,
  createExamSuccess,
} from "../../redux/slice/SimulationExam/createExamSlice";
import agent from "../../utils/agent";

export function useCreateExam() {
  const state = useAppSelector((state) => state.createExam);
  const dispatch = useAppDispatch();

  const handleCreateExam = async (data: createExam) => {
    dispatch(createExamStart());
    try {
      const response = await agent.SimulationExam.createSimulationExam(data);
      dispatch(createExamSuccess(response));
    } catch (error) {
      console.error("Error creating simulation exam:", error);
      dispatch(createExamFailure());
    }
  };

  return { state, handleCreateExam };
}
