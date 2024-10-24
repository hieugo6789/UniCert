import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCourseDetail from "../../../hooks/Course/useCourseDetail";
import CustomButton from "../../../components/UI/CustomButton";
import { allCoursePaginationData } from "../../../models/course";

interface certTab {
    certId: number;
    certName: string;
    certCode: string;
    certDescription: string;
    certImage: string;
    typeName: string;
}

const CourseDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [courseDetail, setCourseDetail] = useState<allCoursePaginationData | null>(null);
    const { state, getCourseDetails } = useCourseDetail();
    const [certList, setCertList] = useState<certTab[]>([]);
    const [voucherList, setVoucherList] = useState<any[]>([]);

    useEffect(() => {
        setCertList([]);
        getCourseDetails(id || "-1");
    }, [id]);

    useEffect(() => {
        if (state) {
            setCourseDetail(state?.currentCourse);
            setCertList(state?.currentCourse?.certificationDetails || []);
            setVoucherList(state?.currentCourse.voucherDetails || []);
            console.log(courseDetail);
        }
    }, [state]);

    // Function to handle the fade-in effect
    const handleIntersection = (entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.1,
        });

        const elements = document.querySelectorAll(".fade-in");
        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => {
            elements.forEach((element) => {
                observer.unobserve(element);
            });
        };
    }, []);

    return (
        <div className="bg-gray-900">
            <p className="fade-in ml-2 pt-2 font-bold cursor-pointer text-blue-800">
                <Link to="/">Home </Link>
                {">"} <Link to="/courses">Courses</Link> {">"} {courseDetail?.courseName}
            </p>

            {/* Course Header */}
            <div className="w-full min-h-36 p-10 text-center">
                <h1 className="fade-in uppercase text-8xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
                    {courseDetail?.courseName || "Course not found"}
                </h1>
                <h2 className="fade-in text-white text-5xl font-bold mt-5 text-center">
                    Course Details
                </h2>
                <CustomButton label="Enroll Now" shining onClick={() => navigate("/enroll/" + courseDetail?.courseId)} className="mt-5" width="w-1/4"/>
                <div
                    className="fade-in prose list-disc whitespace-pre-wrap text-white text-3xl mt-5 text-center"
                    dangerouslySetInnerHTML={{ __html: courseDetail?.courseDescription || "" }}
                />
            </div>

            {/* Certificate Information */}
            <div className="grid grid-cols-2 grid-rows-2 text-center min-h-screen gap-10 px-10">
                {certList && certList.map((cert) => (
                    <div key={cert.certId} className="p-5  bg-gray-700 bg-opacity-30 rounded-lg shadow-lg">
                        <h1 className="uppercase text-2xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
                            {cert.typeName}
                        </h1>
                        {/* <p className="text-white text-xl mb-4 font-bold">{cert.certDescription}</p> */}
                        <div className="w-32 h-32 m-auto">
                            <img
                                src={cert.certImage}
                                alt={cert.certName}
                                className="hover:scale-105 transition-transform cursor-pointer"
                                onClick={() => navigate("/certificate/" + cert.certId)}
                            />
                        </div>
                    </div>
                ))}
                <div className="m-auto fade-in">
                    <CustomButton
                        shining
                        label="Get more certificates"
                        onClick={() => navigate("/certificate")}
                        className="bg-red-500 fade-in"
                    />
                </div>
            </div>
            <div>
                <h1 className="text-white text-5xl font-bold mt-10 text-center">Voucher Available</h1>
                <div className="text-white text-2xl mt-5 text-center p-5">
                    {voucherList.length > 0 ? (
                        voucherList.map((voucher) => (
                            <div className="flex w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
                                {/* Left Side - Coupon Code */}
                                <div className="flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-6">
                                    <span className="text-lg font-bold vertical-text">{voucher.voucherName}</span>
                                </div>

                                {/* Right Side - Voucher Details */}
                                <div className="flex flex-col justify-center flex-1 p-4 bg-red-500 text-white">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold">{voucher.percentage}% OFF</h2>
                                        <p className="text-sm">Sitewide</p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-center text-lg font-semibold">{voucher.voucherName}</p>
                                        <p className="text-center text-sm">{voucher.voucherDescription}</p>
                                    </div>
                                    <div className=" text-center text-sm">
                                        <p>Valid Until: {new Date(voucher.expiryDate).toLocaleDateString()}</p>
                                    </div>
                                    <CustomButton
                                    label="Get Voucher"
                                    shining
                                    onClick={() => navigate("/voucher/" + voucher.voucherId)}
                                    className="bg-blue-500 mt-2"
                                />
                                </div>
                                
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-2xl mt-5 text-center">No voucher available</p>
                    )}


                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
