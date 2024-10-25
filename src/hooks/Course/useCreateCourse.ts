import { createCourse } from "../../models/course";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  createCourseFailure,
  createCourseStart,
  createCourseSuccess,
} from "../../redux/slice/Course/createCourseSlice";
import agent from "../../utils/agent";

export function useCreateCourse() {
  const state = useAppSelector((state) => state.createCourse);
  const dispatch = useAppDispatch();

  const handleCreateCourse = async (courseData: createCourse) => {
    dispatch(createCourseStart());
    try {
      const response = await agent.InternalCourse.createCourse(courseData);
      dispatch(createCourseSuccess(response));
    } catch (error) {
      console.error("Error creating Course:", error);
      dispatch(createCourseFailure());
    }
  };

  return { state, handleCreateCourse };
}
