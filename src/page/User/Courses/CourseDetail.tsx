import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useCourseDetail from "../../../hooks/Course/useCourseDetail";
import CustomButton from "../../../components/UI/CustomButton";
import { allCoursePaginationData } from "../../../models/course";
import useCartByUserId from "../../../hooks/Cart/useCartByUserId";
import useCourseEnrollment from "../../../hooks/Enrollment/useCourse";
import { courseEnrollment } from "../../../models/enrollment";
import Coin from "../../../assets/images/Coin.png"
import Cookies from "js-cookie";
import { showToast } from "../../../utils/toastUtils";
import { usePayNow } from "../../../hooks/Payment/usePayNow";
import { Modal } from "antd";
import useWalletDetail from "../../../hooks/Wallet/useWalletDetail";

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
    const [cert, setCert] = useState<certTab[]>([]);
    //const [voucherList, setVoucherList] = useState<any[]>([]);
        
    const userId = Cookies.get("userId");
    const [purchasedCourses, setPurchasedCourses] = useState<courseEnrollment[]>([]);
    const [pendingPaymentCourses, setPendingPaymentCourses] = useState<courseEnrollment[]>([]);
    const { state: cartState, getCart } = useCartByUserId();    
    const { courseEnrollment, refetchCourseEnrollments } = useCourseEnrollment({ userId: userId || "" });
    const [isPurchased, setIsPurchased] = useState(false);
    const [isPendingPayment, setIsPendingPayment] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const { handlePayNow } = usePayNow();
    const { wallets, getWalletDetails } = useWalletDetail();

    useEffect(() => {
        setCert([]);
        getCourseDetails(id || "-1");
    }, [id]);

    useEffect(() => {
        if (state.currentCourse.coursePermission === "Pending" || state.currentCourse.coursePermission === "Reject"){
          navigate('/courses');
        }
      }, [state, navigate]);

    useEffect(() => {
        if (state) {
            setCourseDetail(state?.currentCourse);
            setCert(state?.currentCourse?.certificationDetails || []);
            //setVoucherList(state?.currentCourse.voucherDetails || []);
        }
    }, [state]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
        const elements = document.querySelectorAll(".fade-in");
        elements.forEach((element) => observer.observe(element));
        return () => elements.forEach((element) => observer.unobserve(element));
    }, []);

    const handleIntersection = (entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    };

    useEffect(() => {
        if (userId) {
            getCart(userId);
            refetchCourseEnrollments(userId);
        } else {
            setPurchasedCourses([]);            
            setIsPurchased(false);
            setIsPendingPayment(false);
        }
    }, [userId]);

    useEffect(() => {
        const successfulCourses = courseEnrollment.filter((course) => course.courseEnrollmentStatus === "Completed");
        const pendingPaymentCourses = courseEnrollment.filter((course) => course.courseEnrollmentStatus === "OnGoing");
        setPurchasedCourses(successfulCourses);
        setPendingPaymentCourses(pendingPaymentCourses);
    }, [courseEnrollment]);

    useEffect(() => {
        const purchased = purchasedCourses.some((e) =>
            (e.courseDetails || []).some((c) => c.courseId.toString() === id)
        );
        const pendingPayment = pendingPaymentCourses.some((e) =>
            (e.courseDetails || []).some((c) => c.courseId.toString() === id)
        );        
        setIsPurchased(!!purchased);
        setIsPendingPayment(!!pendingPayment);
    }, [purchasedCourses, pendingPaymentCourses, cartState.currentCart, id]);

    useEffect(() => {
        if (userId) {
          getWalletDetails(userId, null);
        }
      }, [userId]);

    const handleBuyNow = (courseItem: any) => {
        if (!userId) {
            showToast("Please log in to purchase course", "error");
            return;
        }
        setSelectedCourse(courseItem);
        setShowPaymentModal(true);
    };

    const handleConfirmPayment = async () => {
        if (!userId || !selectedCourse) return;
    
        try {
          const response = await handlePayNow({
            userId: Number(userId),
            simulation_Exams: [],
            courses: [selectedCourse.courseId],
          });
    
          console.log("Payment Response:", response);
    
          showToast("Payment successful", "success");
          setShowPaymentModal(false);
    
          if (userId) {
            refetchCourseEnrollments(userId);
          }
    
          if (response.data.courseEnrollmentId) {
            navigate(`/enrollment/${response.data.courseEnrollmentId}`);
          }
    
        } catch (error: any) {
          showToast(`${error.response?.data?.message || "Unknown error"}`, "error");
          if (userId) {
            refetchCourseEnrollments(userId);
          }
        }
      };

    useEffect(() => {
        const scrollToTop = () => {
          window.scrollTo({
            top: 0,
            behavior: "smooth", // Cuộn mượt mà
          });
        };
        scrollToTop();
      });

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            {/* Breadcrumb Navigation */}
            <nav className="px-4 py-3 text-sm md:text-base">
                <div className="max-w-7xl mx-auto flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                <span>/</span>
                <Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Courses</Link>
                <span>/</span>
                <span className="text-blue-600 dark:text-blue-400">{courseDetail?.courseName}</span>
                </div>
            </nav>

            {/* Course Header */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-8">
                <h1 className="text-center fade-in uppercase text-4xl md:text-6xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
                    {courseDetail?.courseName || "Course not found"}
                </h1>
                <h2 className="fade-in text-gray-800 dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold mt-5 text-center">
                    Course Details
                </h2>
                <div className="fade-in text-gray-900 dark:text-white prose list-disc max-w-5xl mx-auto
                                h-full p-6 md:p-8 bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 rounded-2xl backdrop-blur-sm 
                                border border-gray-200 dark:border-gray-700 shadow-xl mt-5" 
                    dangerouslySetInnerHTML={{ __html: courseDetail?.courseDescription || "" }} 
                />

                {/* Course Fee */}
                <div className="flex items-center justify-center flex-wrap fade-in text-gray-900 dark:text-white text-xl md:text-2xl mt-5 gap-2">
                    <p>Course Fee: </p>
                    {courseDetail?.courseDiscountFee === courseDetail?.courseFee ? (
                        <div className="flex items-center">
                            <img src={Coin} alt="Coin Icon" className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="ml-1 text-yellow-600 dark:text-yellow-500 font-bold">
                                {courseDetail?.courseDiscountFee?.toLocaleString('en-US')}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center flex-wrap gap-2">
                            <div className="flex items-center">
                                <span className="text-yellow-600 dark:text-yellow-500 font-bold">
                                    {courseDetail?.courseDiscountFee?.toLocaleString('en-US')}
                                </span>
                                <img src={Coin} alt="Coin Icon" className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-500 dark:text-gray-400 line-through">
                                    {courseDetail?.courseFee?.toLocaleString('en-US')}
                                </span>
                                <img src={Coin} alt="Coin Icon" className="w-4 h-4 md:w-5 md:h-5 ml-1" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <div className="mt-5 px-4 text-center">
                    {isPurchased ? (
                        <CustomButton label="Purchased" disabled className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4" />                    
                    ) : isPendingPayment ? (
                        <CustomButton label="Pending Payment" disabled className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4" />
                    ) : (
                        <CustomButton 
                            label="Buy Now" 
                            shining 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleBuyNow(state.currentCourse.courseId);
                              }}                            
                            className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4" 
                        />
                    )}
                </div>
            </div>

            {/* Certificate Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 px-4 md:px-10 pb-10">
                {cert.map((cert) => (
                    <div key={cert.certId} className="p-4 md:p-5 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg flex flex-col items-center">
                        <h1 className="uppercase text-xl md:text-2xl lg:text-3xl font-extrabold text-center bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
                            Prepare for the certificate
                        </h1>
                        <p className="text-gray-900 dark:text-white text-lg md:text-xl lg:text-2xl font-semibold mt-4 mb-2 text-center">
                            {cert.certName}
                        </p>
                        <div className="w-24 h-24 md:w-36 md:h-36 m-auto">
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
                    <CustomButton label="Get more certificates" shining onClick={() => navigate("/certificate")} className="fade-in" />
                </div>
            </div>

            {/* Voucher Information */}
            {/* <div className="text-center px-4 md:px-5 pb-10">
                <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl font-bold mt-10">
                    Voucher Available
                </h1>
                <div className="text-gray-900 dark:text-white text-xl md:text-2xl lg:text-3xl flex flex-wrap justify-center gap-4 mt-6">
                    {voucherList.length ? voucherList.map((voucher, index) => (
                        <div key={index} className="p-4 bg-blue-600 dark:bg-blue-700 rounded-md w-full sm:w-auto">
                            <p className="font-semibold">{voucher.name}</p>
                            <p className="text-sm md:text-base text-gray-100 dark:text-gray-200">{voucher.description}</p>
                        </div>
                    )) : (
                        <p className="text-gray-500 dark:text-gray-400">No vouchers available.</p>
                    )}
                </div>
            </div> */}
            <Modal
                title="Confirm Payment"
                visible={showPaymentModal}
                onCancel={() => setShowPaymentModal(false)}
                footer={null}
                destroyOnClose
            >
                <div className="p-4">
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Course Price:</span>
                    <span className="flex items-center gap-2 font-medium">
                        {selectedCourse?.courseDiscountFee}
                        <img src={Coin} alt="coin" className="h-5" />
                    </span>
                    </div>
                    <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Your Balance:</span>
                    <span className="flex items-center gap-2 font-medium">
                        {userId ? wallets[userId]?.point || 0 : 0}
                        <img src={Coin} alt="coin" className="h-5" />
                    </span>
                    </div>
                    <div className="border-t dark:border-gray-600 pt-4">
                    <button
                        onClick={handleConfirmPayment}
                        className="w-full px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg font-medium 
                        hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors disabled:bg-purple-300 dark:disabled:bg-purple-500"
                    >
                        Confirm Payment
                    </button>
                    </div>
                </div>
                </div>
            </Modal>
        </div>
    );
};

export default CourseDetail;
