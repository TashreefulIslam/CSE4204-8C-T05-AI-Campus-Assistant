import api from "./api";

const unwrapList = (value) => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
};

export const getTeacherDashboard = async () => {
  const response = await api.get("/teacher-dashboard");
  const payload = response.data?.data ?? response.data ?? {};

  return {
    stats: {
      totalCourses: Number(payload?.total_courses ?? 0),
      totalAssignments: Number(payload?.total_assignments ?? 0),
      totalCtNotices: Number(payload?.total_ct_notices ?? 0),
      totalCourseMaterials: Number(payload?.total_course_materials ?? 0),
    },
    courses: unwrapList(payload?.my_courses),
    assignments: unwrapList(payload?.recent_assignments),
    ctNotices: unwrapList(payload?.recent_ct_notices),
    materials: unwrapList(payload?.recent_course_materials),
  };
};

export const getTeacherStudents = async () => {
  const response = await api.get("/teacher-students");
  return response.data?.data ?? response.data ?? [];
};
